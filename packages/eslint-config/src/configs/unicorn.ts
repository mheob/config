import { pluginUnicorn } from '../plugins';
import type { OptionsOverrides, TypedFlatConfigItem } from '../types';

export async function unicorn(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options;

	return [
		{
			...pluginUnicorn.configs['flat/recommended'],
			name: 'mheob/unicorn/rules',
			rules: {
				...pluginUnicorn.configs['flat/recommended'].rules,

				'unicorn/no-array-reduce': 'off',
				'unicorn/no-negated-condition': 'off',
				'unicorn/no-null': 'off',
				'unicorn/prevent-abbreviations': [
					'warn',
					{
						replacements: {
							args: false,
							doc: false,
							env: false,
							i: false,
							params: false,
							props: false,
							temp: false,
							tmp: false,
						},
					},
				],

				...overrides,
			},
		},
		{
			files: ['**/*.jsx', '**/*.tsx'],
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
	];
}
