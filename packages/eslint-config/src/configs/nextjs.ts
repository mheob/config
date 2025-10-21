import { GLOB_SRC } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { ensurePackages, interopDefault } from '../utils';

/**
 *
 * @param rules
 */
function normalizeRules(rules: Record<string, any>): Record<string, any> {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => [key, typeof value === 'string' ? [value] : value]),
	);
}

/**
 * Configures the ESLint rules for Next.js.
 *
 * This function sets up the necessary ESLint plugin for Next.js,
 * including the `@next/eslint-plugin-next`. It also configures the rules for Next.js,
 * including the recommended rules, core-web-vitals rules, and overrides.
 *
 * @param options - The options for configuring the Next.js ESLint rules.
 * @returns Promise that resolves once the Next.js ESLint rules are configured.
 */
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
