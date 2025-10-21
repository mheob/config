import { GLOB_ALL_SRC } from '../globs';
import { pluginPrettier } from '../plugins';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for prettier.
 *
 * This function sets up the necessary ESLint plugin for prettier,
 * including the `eslint-plugin-prettier`. It also configures the rules for prettier,
 * including the prettier/prettier rule and the overrides.
 *
 * @param options - The options for configuring the ESLint rules for prettier.
 * @returns Promise that resolves once the ESLint rules for prettier are configured.
 */
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
