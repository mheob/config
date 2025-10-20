import { GLOB_EXCLUDE } from '../globs';
import type { TypedFlatConfigItem } from '../types';

/**
 *
 * @param userIgnores
 */
export async function ignores(userIgnores: string[] = []): Promise<TypedFlatConfigItem[]> {
	return [
		{
			ignores: [...GLOB_EXCLUDE, ...userIgnores],
			name: 'mheob/ignores',
		},
	];
}
