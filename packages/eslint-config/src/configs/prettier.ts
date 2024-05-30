import { GLOB_ALL_SRC } from '../globs';
import { pluginPrettier } from '../plugins';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';

export async function prettier(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_ALL_SRC], overrides = {} } = options;

	return [
		{
			...pluginPrettier,
			name: 'mheob/prettier/setup',
		},
		{
			files,
			name: 'mheob/prettier/rules',
			rules: {
				...pluginPrettier.rules,

				'prettier/prettier': 'warn',

				...overrides,
			},
		},
	];
}
