import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import type { UserConfig } from 'cz-git';

/**
 * Returns all packages inside the given path.
 *
 * @param directoryPaths The directory paths with the containing the packages.
 * @returns An array of package names.
 */
function getPackagesFromPath(...directoryPaths: string[]) {
	const packages: string[] = [];

	for (const directoryPath of directoryPaths) {
		const path = resolve(process.cwd(), directoryPath);
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
 *
 * @returns The issue number.
 */
function getIssue() {
	const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
	const firstNamePart = branchName.split('-')[0];
	return firstNamePart && Number.parseInt(firstNamePart) ? `#${firstNamePart}` : undefined;
}

const options: UserConfig = {
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
	prompt: {
		messages: {
			type: "Select the type of change that you're committing:",
			scope: 'Denote the SCOPE of this change (optional):',
			customScope: 'Denote the SCOPE of this change:',
			subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
			customFooterPrefix: 'Input ISSUES prefix:',
			footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
			confirmCommit: 'Are you sure you want to proceed with the commit above?',
		},
		types: [
			{ value: 'feat', name: 'feat:     A new feature' },
			{ value: 'fix', name: 'fix:      A bug fix' },
			{ value: 'docs', name: 'docs:     Documentation only changes' },
			{ value: 'style', name: 'style:    Changes that do not affect the meaning of the code' },
			{
				value: 'refactor',
				name: 'refactor: A code change that neither fixes a bug nor adds a feature',
			},
			{ value: 'perf', name: 'perf:     A code change that improves performance' },
			{ value: 'test', name: 'test:     Adding missing tests or correcting existing tests' },
			{ value: 'ci', name: 'ci:       Changes to our CI configuration files and scripts' },
			{ value: 'chore', name: "chore:    Other changes that don't modify src or test files" },
			{ value: 'revert', name: 'revert:   Reverts a previous commit' },
		],
		useEmoji: false,
		emojiAlign: 'center',
		themeColorCode: '',
		scopes: getScopes(),
		enableMultipleScopes: true,
		scopeEnumSeparator: ',',
		allowCustomScopes: false,
		allowEmptyScopes: false,
		customScopesAlign: 'bottom',
		customScopesAlias: 'custom',
		emptyScopesAlias: 'empty',
		upperCaseSubject: false,
		markBreakingChangeMode: true,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 80,
		breaklineChar: '|',
		skipQuestions: [],
		issuePrefixes: [{ value: 'closes', name: 'closes:   ISSUES has been processed' }],
		customIssuePrefixAlign: getIssue() ? 'bottom' : 'top',
		emptyIssuePrefixAlias: 'skip',
		customIssuePrefixAlias: 'custom',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		maxHeaderLength: 100,
		maxSubjectLength: 72,
		minSubjectLength: 0,
		defaultBody: '',
		defaultIssues: getIssue() ?? '',
		defaultScope: '',
		defaultSubject: '',
	},
};

export = options;
