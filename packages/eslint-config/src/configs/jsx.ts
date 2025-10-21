import { GLOB_JSX, GLOB_TSX } from '../globs';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for JSX.
 *
 * This function sets up the necessary ESLint rules for JSX,
 * including the rules for JSX, including the GLOB_JSX, GLOB_TSX,
 * and the parser options.
 *
 * @returns Promise that resolves once the JSX ESLint rules are configured.
 */
export async function jsx(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			files: [GLOB_JSX, GLOB_TSX],
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			name: 'mheob/jsx/setup',
		},
	];
}
