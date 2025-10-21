import type { TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

/**
 * Configures the ESLint rules for JSDoc.
 *
 * This function sets up the necessary ESLint plugin for JSDoc,
 * including the `eslint-plugin-jsdoc`. It also configures the rules for JSDoc,
 * including the recommended rules, no-restricted-syntax, reject-any-type,
 * reject-function-type, require-jsdoc, require-next-type, and tag-lines rules.
 *
 * @returns Promise that resolves once the JSDoc ESLint rules are configured.
 */
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
