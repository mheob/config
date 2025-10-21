import { pluginNode } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for Node.js.
 *
 * This function sets up the necessary ESLint plugin for Node.js,
 * including the `eslint-plugin-node`. It also configures the rules for Node.js,
 * including the handle-callback-err, no-deprecated-api, no-exports-assign,
 * no-new-require, no-path-concat, prefer-global/buffer, prefer-global/process,
 * and process-exit-as-throw rules.
 *
 * @returns Promise that resolves once the Node.js ESLint rules are configured.
 */
export async function node(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/node/rules',
			plugins: {
				node: pluginNode,
			},
			rules: {
				'node/handle-callback-err': ['error', '^(err|error)$'],
				'node/no-deprecated-api': 'error',
				'node/no-exports-assign': 'error',
				'node/no-new-require': 'error',
				'node/no-path-concat': 'error',
				'node/prefer-global/buffer': ['error', 'never'],
				'node/prefer-global/process': ['error', 'never'],
				'node/process-exit-as-throw': 'error',
			},
		},
	];
}
