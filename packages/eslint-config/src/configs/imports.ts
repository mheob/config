import { pluginAntfu } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for imports.
 *
 * This function sets up the necessary ESLint plugin for imports,
 * including the `eslint-plugin-antfu`. It also configures the rules for imports,
 * including the import-dedupe, no-import-dist, and no-import-node-modules-by-path rules.
 *
 * @returns Promise that resolves once the imports ESLint rules are configured.
 */
export async function imports(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/imports/rules',
			plugins: {
				antfu: pluginAntfu,
			},
			rules: {
				'antfu/import-dedupe': 'error',
				'antfu/no-import-dist': 'error',
				'antfu/no-import-node-modules-by-path': 'error',
			},
		},
	];
}
