import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import * as p from '@clack/prompts';
import { green } from 'ansis';

import { vscodeSettingsString } from '../constants';
import type { PromptResult } from '../types';

/**
 * Updates the VSCode settings file to include the recommended ESLint configuration.
 *
 * This function creates or updates the .vscode/settings.json file with the recommended
 * ESLint configuration based on the user's choices.
 *
 * @param result - The user's choices from the CLI prompt.
 * @returns Promise that resolves once the settings file is updated.
 */
export async function updateVscodeSettings(result: PromptResult): Promise<void> {
	const cwd = process.cwd();

	if (!result.updateVscodeSettings) return;

	const dotVscodePath: string = path.join(cwd, '.vscode');
	const settingsPath: string = path.join(dotVscodePath, 'settings.json');

	if (!fs.existsSync(dotVscodePath)) await fsp.mkdir(dotVscodePath, { recursive: true });

	if (!fs.existsSync(settingsPath)) {
		await fsp.writeFile(settingsPath, `{${vscodeSettingsString}}\n`, 'utf8');
		p.log.success(green`Created .vscode/settings.json`);
	} else {
		let settingsContent = await fsp.readFile(settingsPath, 'utf8');

		settingsContent = settingsContent.trim().replace(/\s*\}$/, '');
		settingsContent += settingsContent.endsWith(',') || settingsContent.endsWith('{') ? '' : ',';
		settingsContent += `${vscodeSettingsString}}\n`;

		await fsp.writeFile(settingsPath, settingsContent, 'utf8');
		p.log.success(green`Updated .vscode/settings.json`);
	}
}
