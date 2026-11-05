import { describe, expect, it } from 'vite-plus/test';

import { tailwindcssConfig } from '../src/tailwindcss';
import type { TailwindcssConfig } from '../src/tailwindcss.types';

/** The rules that report unknown or non-canonical classes, and therefore accept `ignore`. */
const IGNORING_RULES = [
	'better-tailwindcss/enforce-canonical-classes',
	'better-tailwindcss/no-unknown-classes',
];

const RULE_NAMES = Object.keys(tailwindcssConfig().rules ?? {});

/**
 * Builds the preset and collects the options object of every rule.
 *
 * @param input The input of the preset.
 * @returns The options per rule name.
 */
// `TailwindcssConfig` can't be made deeply readonly here.
// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
function ruleOptions(input?: Readonly<TailwindcssConfig>): Record<string, unknown> {
	return Object.fromEntries(
		Object.entries(tailwindcssConfig(input).rules ?? {}).map(
			([name, setting]: readonly [string, unknown]) => [
				name,
				Array.isArray(setting) ? setting[1] : undefined,
			],
		),
	);
}

/**
 * Builds the expected options for every rule of the preset.
 *
 * @param options The options of the rules that don't accept `ignore`.
 * @param ignoringOptions The options of the rules that accept `ignore`.
 * @returns The expected options per rule name.
 */
function expectedOptions(options: object, ignoringOptions: object): Record<string, object> {
	return Object.fromEntries(
		RULE_NAMES.map((name) => [name, IGNORING_RULES.includes(name) ? ignoringOptions : options]),
	);
}

describe(tailwindcssConfig, () => {
	it('loads the better-tailwindcss plugin', () => {
		expect(tailwindcssConfig().jsPlugins).toStrictEqual(['eslint-plugin-better-tailwindcss']);
	});

	it('enables the rules that accept `ignore`', () => {
		expect(RULE_NAMES).toStrictEqual(expect.arrayContaining(IGNORING_RULES));
	});

	it('works without any options', () => {
		expect(ruleOptions()).toStrictEqual(expectedOptions({}, { ignore: [] }));
	});

	it('passes the options to every rule, because oxlint drops `settings` in `extends`', () => {
		const options = { entryPoint: 'src/app.css', rootFontSize: 16 };

		expect(ruleOptions({ options })).toStrictEqual(
			expectedOptions(options, { ...options, ignore: [] }),
		);
	});

	it('passes the ignored classes only to the rules that accept them', () => {
		const ignoredClasses = ['brand-card'];

		expect(ruleOptions({ ignoredClasses })).toStrictEqual(
			expectedOptions({}, { ignore: ignoredClasses }),
		);
	});
});
