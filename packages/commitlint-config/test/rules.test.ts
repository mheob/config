import lint from '@commitlint/lint';
import { describe, expect, it } from 'vite-plus/test';

import config from '../src/index';

type Rules = Parameters<typeof lint>[1];
type ParserOptions = NonNullable<Parameters<typeof lint>[2]>['parserOpts'];

const MAX_HEADER_LENGTH = 72;
const MAX_SUBJECT_LENGTH = 50;
const MAX_LINE_LENGTH = 72;
/** A long header prefix, so a header can reach its limit while the subject stays below its own. */
const LONG_PREFIX = 'refactor(commitlint-config)!: ';
/** A note keyword the parser puts into the footer. */
const BREAKING_NOTE = 'BREAKING CHANGE: ';

/**
 * Builds a lowercase filler text, so only the length rules can fail.
 *
 * @param length The number of characters.
 * @returns The filler text.
 */
function filler(length: number): string {
	return 'a'.repeat(length);
}

/**
 * Lints a commit message with the config from `src`, the same way the commitlint CLI passes a
 * loaded config to `@commitlint/lint`.
 *
 * @param message The commit message to lint.
 * @returns The lint outcome with the errors and warnings per rule.
 */
async function lintMessage(message: string): Promise<Awaited<ReturnType<typeof lint>>> {
	const { ignores, parserPreset, rules } = config;
	const parserOpts =
		typeof parserPreset === 'object' && 'parserOpts' in parserPreset
			? parserPreset.parserOpts
			: undefined;

	// czg and commitlint type the same rule tuples and parser options differently.
	// oxlint-disable-next-line typescript/no-unsafe-type-assertion
	return lint(message, rules as Rules, { ignores, parserOpts: parserOpts as ParserOptions });
}

describe('commitlint rules', () => {
	it.each([
		'feat(api): remove the GetMe query',
		'feat(api)!: remove the GetMe query',
		'feat!: remove the GetMe query',
		'fix(deps,repo)!: drop the support for Node.js 22',
		'build(deps): update vite-plus to v1.3.0',
		`${LONG_PREFIX}${filler(MAX_HEADER_LENGTH - LONG_PREFIX.length)}`,
		`feat: ${filler(MAX_SUBJECT_LENGTH)}`,
		`feat: add a body\n\n${filler(MAX_LINE_LENGTH)}`,
		`feat!: drop the old API\n\n${BREAKING_NOTE}${filler(MAX_LINE_LENGTH - BREAKING_NOTE.length)}`,
	])('accepts `%s`', async (message) => {
		await expect(lintMessage(message)).resolves.toMatchObject({
			errors: [],
			valid: true,
			warnings: [],
		});
	});

	it.each([
		{ message: 'feet(api)!: remove the GetMe query', rule: 'type-enum' },
		{ message: 'FEAT: remove the GetMe query', rule: 'type-case' },
		{ message: ': remove the GetMe query', rule: 'type-empty' },
		{ message: 'feat(api):', rule: 'subject-empty' },
		{ message: 'feat(api)!: Remove the query', rule: 'subject-case' },
		{ message: 'feat(api)!: remove the GetMe query.', rule: 'subject-full-stop' },
		{
			message: `${LONG_PREFIX}${filler(MAX_HEADER_LENGTH - LONG_PREFIX.length + 1)}`,
			rule: 'header-max-length',
		},
		{ message: `feat: ${filler(MAX_SUBJECT_LENGTH + 1)}`, rule: 'subject-max-length' },
		{
			message: `feat: add a body\n\n${filler(MAX_LINE_LENGTH + 1)}`,
			rule: 'body-max-line-length',
		},
		{
			message: `feat!: drop the old API\n\n${BREAKING_NOTE}${filler(MAX_LINE_LENGTH - BREAKING_NOTE.length + 1)}`,
			rule: 'footer-max-line-length',
		},
	] as const)('rejects `$message` with $rule', async ({ message, rule }) => {
		const { errors, valid } = await lintMessage(message);

		expect(valid).toBe(false);
		expect(errors.map(({ name }: { readonly name: string }) => name)).toContain(rule);
	});

	it.each([
		{ message: 'feat: add a body\nwithout a blank line', rule: 'body-leading-blank' },
		{
			message: `feat!: drop the old API\n\nThe old API is gone.\n${BREAKING_NOTE}remove the calls`,
			rule: 'footer-leading-blank',
		},
	] as const)('warns about `$message` with $rule', async ({ message, rule }) => {
		const { valid, warnings } = await lintMessage(message);

		expect(valid).toBe(true);
		expect(warnings.map(({ name }: { readonly name: string }) => name)).toContain(rule);
	});

	it('skips work-in-progress commits', async () => {
		await expect(lintMessage('WIP')).resolves.toMatchObject({ errors: [], valid: true });
	});
});
