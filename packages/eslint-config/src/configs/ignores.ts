import { GLOB_EXCLUDE } from '../globs';
import type { TypedFlatConfigItem } from '../types';

export async function ignores(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			ignores: GLOB_EXCLUDE,
			name: 'mheob/ignores',
		},
	];
}
