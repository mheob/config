import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export async function disables(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
			name: 'mheob/disables/bin',
			rules: {
				'antfu/no-import-dist': 'off',
				'antfu/no-import-node-modules-by-path': 'off',
			},
		},
		{
			files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
			name: 'mheob/disables/cli',
			rules: {
				'antfu/no-top-level-await': 'off',
				'no-console': 'off',
			},
		},
		{
			files: ['**/*.js', '**/*.cjs'],
			name: 'mheob/disables/cjs',
			rules: {
				'ts/no-require-imports': 'off',
			},
		},
		{
			files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
			name: 'mheob/disables/config-files',
			rules: {
				'antfu/no-top-level-await': 'off',
				'no-console': 'off',
				'ts/explicit-function-return-type': 'off',
			},
		},
		{
			files: [`**/*.${GLOB_SRC_EXT}`],
			name: 'mheob/disables/conflicts',
			rules: {
				'import/order': 'off', // conflicts with `perfectionist/sort-imports`
				'sort-imports': 'off', // conflicts with `perfectionist/sort-imports`
			},
		},
		{
			files: ['**/*.d.?([cm])ts'],
			name: 'mheob/disables/dts',
			rules: {
				'eslint-comments/no-unlimited-disable': 'off',
				'import/no-duplicates': 'off',
				'no-restricted-syntax': 'off',
				'unused-imports/no-unused-vars': 'off',
			},
		},
		{
			files: [`**/scripts/${GLOB_SRC}`],
			name: 'mheob/disables/scripts',
			rules: {
				'antfu/no-top-level-await': 'off',
				'no-console': 'off',
				'ts/explicit-function-return-type': 'off',
			},
		},
		{
			files: ['**/*.{test,spec}.ts?(x)'],
			name: 'mheob/disables/test',
			rules: {
				'no-unused-expressions': 'off',
			},
		},
	];
}
