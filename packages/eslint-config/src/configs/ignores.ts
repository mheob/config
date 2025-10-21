import { GLOB_EXCLUDE } from '../globs';
import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for ignores.
 *
 * This function sets up the necessary ESLint rules for ignores,
 * including the rules for ignores, including the GLOB_EXCLUDE,
 * and the userIgnores.
 *
 * @param userIgnores - The user's choices from the CLI prompt.
 * @returns Promise that resolves once the ignores ESLint rules are configured.
 */
export async function ignores(userIgnores: string[] = []): Promise<TypedFlatConfigItem[]> {
	return [
		{
			ignores: [...GLOB_EXCLUDE, ...userIgnores],
			name: 'mheob/ignores',
		},
	];
}
