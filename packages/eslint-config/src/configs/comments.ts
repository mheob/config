import { pluginComments } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for comments.
 *
 * This function sets up the necessary ESLint plugin for comments,
 * including the `eslint-plugin-eslint-comments`. It also configures
 * the rules for comments, including the no-aggregating-enable,
 * no-duplicate-disable, no-unlimited-disable, and no-unused-enable rules.
 *
 * @returns Promise that resolves once the comments ESLint rules are configured.
 */
export async function comments(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/eslint-comments/rules',
			plugins: {
				'eslint-comments': pluginComments,
			},
			rules: {
				'eslint-comments/no-aggregating-enable': 'error',
				'eslint-comments/no-duplicate-disable': 'error',
				'eslint-comments/no-unlimited-disable': 'error',
				'eslint-comments/no-unused-enable': 'error',
			},
		},
	];
}
