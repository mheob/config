import { GLOB_SRC } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export async function stylistic(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_SRC], overrides = {} } = options;

	const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'));

	return [
		{
			name: 'mheob/stylistic/setup',
			plugins: {
				'@stylistic': pluginStylistic,
			},
		},
		{
			files,
			name: 'mheob/stylistic/rules',
			rules: {
				'@stylistic/lines-between-class-members': ['error', 'always'],
				'@stylistic/padding-line-between-statements': [
					'warn',
					{ blankLine: 'always', next: '*', prev: 'directive' },
					{ blankLine: 'any', next: 'directive', prev: 'directive' },

					{ blankLine: 'always', next: 'export', prev: 'export' },
					{ blankLine: 'always', next: '*', prev: 'export' },
					{ blankLine: 'always', next: 'export', prev: '*' },

					{ blankLine: 'always', next: 'function', prev: 'function' },
					{ blankLine: 'always', next: '*', prev: 'function' },
					{ blankLine: 'always', next: 'function', prev: '*' },
				],

				...overrides,
			},
		},
	];
}
