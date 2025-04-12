/* eslint-disable perfectionist/sort-objects */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import * as p from '@clack/prompts';
import c from 'ansis';

import { frameworkOptions, frameworks } from './constants';
import { updateEslintFiles } from './stages/update-eslint-files';
import { updatePackageJson } from './stages/update-package-json';
import { updateVscodeSettings } from './stages/update-vscode-settings';
import type { FrameworkOption, PromptResult } from './types';
import { isGitClean } from './utils';

/**
 * CLI options for `@mheob/eslint-config`
 */
export interface CliRunOptions {
	/**
	 * Use the framework template for optimal customization: vue / react / svelte / astro
	 */
	frameworks?: string[];
	/**
	 * Skip prompts and use default values
	 */
	yes?: boolean;
}

export async function run(options: CliRunOptions = {}): Promise<void> {
	const argumentSkipPrompt = Boolean(process.env.SKIP_PROMPT) || options.yes;
	const argumentTemplate = <FrameworkOption[]>(
		options.frameworks?.map(m => m?.trim()).filter(Boolean)
	);

	const configFileExists = (fileNames: string[]): boolean =>
		fileNames.some(fileName => fs.existsSync(path.join(process.cwd(), fileName)));

	if (configFileExists(['eslint.config.js', 'eslint.config.mjs'])) {
		p.log.warn(c.yellow`eslint.config.js already exists, migration wizard exited.`);
		return process.exit(1);
	}

	// Set default value for promptResult if `argSkipPrompt` is enabled
	let result: PromptResult = {
		frameworks: argumentTemplate ?? [],
		uncommittedConfirmed: false,
		updateVscodeSettings: true,
	};

	if (!argumentSkipPrompt) {
		result = (await p.group(
			{
				uncommittedConfirmed: () => {
					if (argumentSkipPrompt || isGitClean()) return Promise.resolve(true);

					return p.confirm({
						initialValue: false,
						message:
							'There are uncommitted changes in the current repository, are you sure to continue?',
					});
				},
				frameworks: ({ results }) => {
					const isArgumentTemplateValid =
						typeof argumentTemplate === 'string' &&
						Boolean(frameworks.includes(<FrameworkOption>argumentTemplate));

					if (!results.uncommittedConfirmed || isArgumentTemplateValid) return;

					const message =
						!isArgumentTemplateValid && argumentTemplate
							? `"${argumentTemplate}" isn't a valid template. Please choose from below: `
							: 'Select a framework:';

					return p.multiselect<FrameworkOption>({
						message: c.reset(message),
						options: frameworkOptions,
						required: false,
					});
				},

				updateVscodeSettings: ({ results }) => {
					if (!results.uncommittedConfirmed) return;

					return p.confirm({
						initialValue: true,
						message: 'Update .vscode/settings.json for better VS Code experience?',
					});
				},
			},
			{
				onCancel: () => {
					p.cancel('Operation cancelled.');
					process.exit(0);
				},
			},
		)) as PromptResult;

		if (!result.uncommittedConfirmed) return process.exit(1);
	}

	await updatePackageJson(result);
	await updateEslintFiles(result);
	await updateVscodeSettings(result);

	p.log.success(c.green`Setup completed`);
	p.outro(
		`Now you can update the dependencies by run ${c.blue('pnpm install')} and run ${c.blue('eslint --fix')}\n`,
	);
}
