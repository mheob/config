import { GLOB_MARKDOWN, GLOB_REACT } from '../globs';
import { pluginUnicorn } from '../plugins';
import type { OptionsOverrides, TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for Unicorn.
 *
 * This function sets up the necessary ESLint plugin for Unicorn,
 * including the `eslint-plugin-unicorn`. It also configures the rules for Unicorn,
 * including the recommended rules, filename-case, no-array-reduce, no-negated-condition,
 * no-null, prevent-abbreviations, and the overrides.
 *
 * @param options - The options for configuring the Unicorn ESLint rules.
 * @returns Promise that resolves once the Unicorn ESLint rules are configured.
 */
export async function unicorn(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options;

	return [
		{
			...pluginUnicorn.configs.recommended,
			name: 'mheob/unicorn/rules',
			rules: {
				...pluginUnicorn.configs.recommended.rules,

				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
						},
						ignore: [/readme\.md$/i],
					},
				],
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-negated-condition': 'off',
				'unicorn/no-null': 'off',
				'unicorn/prevent-abbreviations': [
					'warn',
					{
						replacements: {
							args: false,
							db: false,
							doc: false,
							env: false,
							i: false,
							idx: false,
							params: false,
							pkg: false,
							props: false,
							temp: false,
							tmp: false,
							utils: false,
						},
					},
				],

				...overrides,
			},
		},
		{
			files: [GLOB_REACT],
			name: 'mheob/unicorn/rules/react',
			rules: {
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
							pascalCase: true,
						},
					},
				],
			},
		},
		{
			files: [GLOB_MARKDOWN, `${GLOB_MARKDOWN}/**/*`],
			name: 'mheob/unicorn/rules/markdown',
			rules: {
				'unicorn/filename-case': 'off',
			},
		},
	];
}
