// oxlint-disable no-magic-numbers node/no-sync typescript/no-unsafe-enum-assignment

import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import nodePath from 'node:path';
import process from 'node:process';

import createPreset from 'conventional-changelog-conventionalcommits';
import type { CommitizenGitOptions, UserConfig } from 'czg';

/** The maximum length of the first line, including the type, the scopes, and the `!` marker. */
const MAX_HEADER_LENGTH = 72;
/** The maximum length of the description after `type(scope): `. */
const MAX_SUBJECT_LENGTH = 50;
/** The maximum length of each line in the body and the footer. */
const MAX_LINE_LENGTH = 72;

/** The commit types the prompt offers. The `type-enum` rule accepts exactly these values. */
const TYPES: NonNullable<CommitizenGitOptions['types']> = [
	{ name: 'feat:     A new feature', value: 'feat' },
	{ name: 'fix:      A bug fix', value: 'fix' },
	{ name: 'docs:     Documentation only changes', value: 'docs' },
	{
		name: 'style:    Formatting, whitespace, or other changes that do not affect meaning',
		value: 'style',
	},
	{ name: 'refactor: Code changes that preserve external behaviour', value: 'refactor' },
	{ name: 'perf:     Performance improvements', value: 'perf' },
	{ name: 'test:     Adding or changing tests', value: 'test' },
	{ name: 'build:    Build system or dependency changes', value: 'build' },
	{ name: 'ci:       CI configuration or pipeline changes', value: 'ci' },
	{ name: 'chore:    Maintenance tasks that do not change production code', value: 'chore' },
	{ name: 'revert:   Reverting an earlier commit', value: 'revert' },
];

/**
 * Returns all packages inside the given path.
 *
 * @param directoryPaths The directory paths with the containing the packages.
 * @returns An array of package names.
 */
function getPackagesFromPath(...directoryPaths: readonly string[]): string[] {
	const packages: string[] = [];

	for (const directoryPath of directoryPaths) {
		const path = nodePath.resolve(process.cwd(), directoryPath);

		if (existsSync(path)) {
			const packagesInPath = readdirSync(path);

			packages.push(...packagesInPath);
		}
	}

	return packages;
}

/**
 * Returns all scopes.
 *
 * @returns An array of scopes.
 */
function getScopes(): string[] {
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
function getIssue(): string | null {
	const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
	const firstNamePart = branchName.split('-')[0];

	if (!firstNamePart || !Math.trunc(Number(firstNamePart))) {
		return null;
	}

	return `#${firstNamePart}`;
}

// The preset's typings declare its return type as `{}`, the parser options live under `parser`.
// oxlint-disable-next-line typescript/no-unsafe-type-assertion
const { parser: parserOpts } = createPreset() as { readonly parser: unknown };

const options: UserConfig = {
	ignores: [(message) => /wip/iu.test(message)],
	// Without a preset, commitlint parses headers with the Angular pattern, which has no `!`
	// breaking-change marker. Passing the parser options directly keeps them independent of where
	// the consumer's config file resolves packages from.
	parserPreset: { parserOpts },
	prompt: {
		allowBreakingChanges: ['feat', 'fix'],
		allowCustomIssuePrefix: true,
		allowCustomScopes: false,
		allowEmptyIssuePrefix: true,
		allowEmptyScopes: false,
		breaklineChar: '|',
		breaklineNumber: MAX_LINE_LENGTH,
		confirmColorize: true,
		customIssuePrefixAlias: 'custom',
		customIssuePrefixAlign: getIssue() === null ? 'top' : 'bottom',
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
		maxHeaderLength: MAX_HEADER_LENGTH,
		maxSubjectLength: MAX_SUBJECT_LENGTH,
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
		types: TYPES,
		upperCaseSubject: false,
		useEmoji: false,
	},
	rules: {
		'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', MAX_LINE_LENGTH],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', MAX_LINE_LENGTH],
		'header-max-length': [2, 'always', MAX_HEADER_LENGTH],
		'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'subject-max-length': [2, 'always', MAX_SUBJECT_LENGTH],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [2, 'always', TYPES.map(({ value }: { readonly value: string }) => value)],
	},
};

export type { UserConfig } from 'czg';

export default options;
