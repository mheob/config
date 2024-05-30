import type { TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export async function jsdoc(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/jsdoc/rules',
			plugins: {
				jsdoc: await interopDefault(import('eslint-plugin-jsdoc')),
			},
			rules: {
				'jsdoc/check-access': 'warn',
				'jsdoc/check-alignment': 'warn',
				'jsdoc/check-param-names': 'warn',
				'jsdoc/check-property-names': 'warn',
				'jsdoc/check-tag-names': 'warn',
				'jsdoc/check-types': 'warn',
				'jsdoc/check-values': 'warn',
				'jsdoc/empty-tags': 'warn',
				'jsdoc/implements-on-classes': 'warn',
				'jsdoc/multiline-blocks': 'warn',
				'jsdoc/no-defaults': 'warn',
				'jsdoc/no-multi-asterisks': 'warn',
				'jsdoc/no-undefined-types': 'warn',
				'jsdoc/require-param': 'warn',
				'jsdoc/require-param-description': 'warn',
				'jsdoc/require-param-name': 'warn',
				'jsdoc/require-property': 'warn',
				'jsdoc/require-property-description': 'warn',
				'jsdoc/require-property-name': 'warn',
				'jsdoc/require-returns': 'warn',
				'jsdoc/require-returns-check': 'warn',
				'jsdoc/require-returns-description': 'warn',
				'jsdoc/require-yields': 'warn',
				'jsdoc/require-yields-check': 'warn',
				'jsdoc/tag-lines': ['warn', 'always', { count: 0, startLines: 1 }],
				'jsdoc/valid-types': 'warn',
			},
		},
	];
}
