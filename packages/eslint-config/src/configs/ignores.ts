import { GLOB_EXCLUDE, GLOB_TS, GLOB_TSX } from '../globs';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for ignores.
 *
 * This function sets up the necessary ESLint rules for ignores,
 * including the rules for ignores, including the GLOB_EXCLUDE,
 * and the userIgnores.
 *
 * @param userIgnores - The user's choices from the CLI prompt.
 * @param ignoreTypeScript - Whether to ignore TypeScript files.
 * @returns Promise that resolves once the ignores ESLint rules are configured.
 */
export async function ignores(
	userIgnores: ((originals: string[]) => string[]) | string[] = [],
	ignoreTypeScript = false,
): Promise<TypedFlatConfigItem[]> {
	let ignores = [...GLOB_EXCLUDE];

	if (ignoreTypeScript) ignores.push(GLOB_TS, GLOB_TSX);

	ignores = typeof userIgnores === 'function' ? userIgnores(ignores) : [...ignores, ...userIgnores];

	return [
		{
			ignores,
			name: 'mheob/ignores',
		},
	];
}
