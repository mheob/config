import { GLOB_SRC } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { ensurePackages, interopDefault } from '../utils';

// eslint-disable-next-line ts/no-explicit-any
function normalizeRules(rules: Record<string, any>): Record<string, any> {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => [key, typeof value === 'string' ? [value] : value]),
	);
}

export async function nextjs(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_SRC], overrides = {} } = options;

	await ensurePackages(['@next/eslint-plugin-next']);

	const pluginNextJS = await interopDefault(import('@next/eslint-plugin-next'));

	return [
		{
			name: 'mheob/nextjs/setup',
			plugins: {
				next: pluginNextJS,
			},
		},
		{
			files,
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
				sourceType: 'module',
			},
			name: 'mheob/nextjs/rules',
			rules: {
				...normalizeRules(pluginNextJS.configs.recommended.rules),
				...normalizeRules(pluginNextJS.configs['core-web-vitals'].rules),

				// overrides
				...overrides,
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
		},
	];
}
