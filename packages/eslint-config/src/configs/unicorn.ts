import { GLOB_MARKDOWN, GLOB_REACT } from '../globs';
import { pluginUnicorn } from '../plugins';
import type { OptionsOverrides, TypedFlatConfigItem } from '../types';

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
			files: [GLOB_MARKDOWN, `${GLOB_MARKDOWN}/**/*`],
			name: 'nbp/unicorn/rules/markdown',
			rules: {
				'unicorn/filename-case': 'off',
			},
		},
		{
			files: [GLOB_REACT],
			name: 'nbp/unicorn/rules/react',
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
	];
}
