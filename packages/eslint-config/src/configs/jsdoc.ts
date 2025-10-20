import type { TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export async function jsdoc(): Promise<TypedFlatConfigItem[]> {
	const jsdocPlugin = await interopDefault(import('eslint-plugin-jsdoc'));
	const recommendedRules = jsdocPlugin.configs['flat/recommended'].rules;

	return [
		{
			name: 'mheob/jsdoc/rules',
			plugins: {
				jsdoc: jsdocPlugin,
			},
			rules: {
				...recommendedRules,

				'jsdoc/no-restricted-syntax': 'warn',
				'jsdoc/reject-any-type': 'warn',
				'jsdoc/reject-function-type': 'warn',
				'jsdoc/require-jsdoc': 'warn',
				'jsdoc/require-next-type': 'warn',
				'jsdoc/tag-lines': ['warn', 'always', { count: 0, startLines: 1 }],
			},
		},
	];
}
