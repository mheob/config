/* eslint-disable node/prefer-global/process */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import nodePath from 'node:path';

import type { UserConfig } from 'cz-git';

export type { UserConfig } from 'cz-git';

/**
 * Returns all packages inside the given path.
 *
 * @param directoryPaths The directory paths with the containing the packages.
 * @returns An array of package names.
 */
function getPackagesFromPath(...directoryPaths: string[]) {
	const packages: string[] = [];

	for (const directoryPath of directoryPaths) {
		const path = nodePath.resolve(process.cwd(), directoryPath);
		if (!existsSync(path)) continue;
		const packages = readdirSync(path);
		packages.push(...packages);
	}

	return packages;
}

/**
 * Returns all scopes.
 *
 * @returns An array of scopes.
 */
function getScopes() {
	const defaultScopes = ['deps', 'release', 'repo'];
	const packages = getPackagesFromPath('apps', 'packages');
	return [...defaultScopes, ...packages];
}

/**
 * Returns the issue number, if the branch name starts with a number.
 *
 * @example
 *   git branch name = `123-my-branch`  =>  defaultIssues = `#123`
 * @returns The issue number.
 */
function getIssue() {
	const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
	const firstNamePart = branchName.split('-')[0];
	return firstNamePart && Number.parseInt(firstNamePart) ? `#${firstNamePart}` : undefined;
}

const options: UserConfig = {
	ignores: [message => /wip/i.test(message)],
	prompt: {
		allowBreakingChanges: ['feat', 'fix'],
		allowCustomIssuePrefix: true,
		allowCustomScopes: false,
		allowEmptyIssuePrefix: true,
		allowEmptyScopes: false,
		breaklineChar: '|',
		breaklineNumber: 80,
		confirmColorize: true,
		customIssuePrefixAlias: 'custom',
		customIssuePrefixAlign: getIssue() ? 'bottom' : 'top',
		customScopesAlias: 'custom',
		customScopesAlign: 'bottom',
		defaultBody: '',
		defaultIssues: getIssue() ?? '',
		defaultScope: '',
		defaultSubject: '',
		emojiAlign: 'center',
		emptyIssuePrefixAlias: 'skip',
		emptyScopesAlias: 'empty',
		enableMultipleScopes: true,
		issuePrefixes: [{ name: 'closes:   ISSUES has been processed', value: 'closes' }],
		markBreakingChangeMode: true,
		maxHeaderLength: 100,
		maxSubjectLength: 72,
		messages: {
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			confirmCommit: 'Are you sure you want to proceed with the commit above?',
			customFooterPrefix: 'Input ISSUES prefix:',
			customScope: 'Denote the SCOPE of this change:',
			footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
			footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
			generatedSelectByAI: 'Select suitable subject by AI generated:',
			generatingByAI: 'Generating your AI commit subject...',
			scope: 'Denote the SCOPE of this change (optional):',
			subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
			type: "Select the type of change that you're committing:",
		},
		minSubjectLength: 0,
		scopeEnumSeparator: ',',
		scopes: getScopes(),
		skipQuestions: [],
		themeColorCode: '',
		types: [
			{ name: 'feat:     A new feature', value: 'feat' },
			{ name: 'fix:      A bug fix', value: 'fix' },
			{ name: 'docs:     Documentation only changes', value: 'docs' },
			{ name: 'style:    Changes that do not affect the meaning of the code', value: 'style' },
			{
				name: 'refactor: A code change that neither fixes a bug nor adds a feature',
				value: 'refactor',
			},
			{ name: 'perf:     A code change that improves performance', value: 'perf' },
			{ name: 'test:     Adding missing tests or correcting existing tests', value: 'test' },
			{ name: 'ci:       Changes to our CI configuration files and scripts', value: 'ci' },
			{ name: "chore:    Other changes that don't modify src or test files", value: 'chore' },
			{ name: 'revert:   Reverts a previous commit', value: 'revert' },
		],
		upperCaseSubject: false,
		useEmoji: false,
	},
	rules: {
		'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', 100],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', 100],
		'header-max-length': [2, 'always', 100],
		'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'subject-max-length': [2, 'always', 72],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			['chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
		],
	},
};

export default options;
