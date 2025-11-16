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
				'@stylistic/padding-line-between-statements': [
					'warn',
					{ blankLine: 'always', next: '*', prev: 'directive' },
					{ blankLine: 'any', next: 'directive', prev: 'directive' },

					{ blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
					{ blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },

					{ blankLine: 'always', next: '*', prev: 'block-like' },
					{ blankLine: 'always', next: 'block-like', prev: '*' },

					{ blankLine: 'always', next: 'return', prev: '*' },
				],

				...overrides,
			},
		},
	];
}
