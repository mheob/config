// cspell:words canonicalurl, fetchcontent, getentrybyslug

import { GLOB_ASTRO } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { ensurePackages, interopDefault } from '../utils';

/**
 * Configures the ESLint rules for Astro projects.
 *
 * This function sets up the necessary ESLint plugins and parsers for Astro projects,
 * including the `eslint-plugin-astro` and `astro-eslint-parser`. It also configures
 * the language options for the Astro files, including the globals, parser, and parser options.
 *
 * @param options - The options for configuring the Astro ESLint rules.
 * @returns Promise that resolves once the Astro ESLint rules are configured.
 */
export async function astro(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_ASTRO], overrides = {} } = options;

	await ensurePackages(['eslint-plugin-astro', 'astro-eslint-parser', '@typescript-eslint/parser']);

	const [pluginAstro, parserAstro, parserTs] = await Promise.all([
		interopDefault(import('eslint-plugin-astro')),
		interopDefault(import('astro-eslint-parser')),
		interopDefault(import('@typescript-eslint/parser')),
	] as const);

	return [
		{
			name: 'mheob/astro/setup',
			plugins: {
				astro: pluginAstro,
			},
		},
		{
			files,
			languageOptions: {
				globals: pluginAstro.environments.astro.globals,
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: parserTs,
				},
				sourceType: 'module',
			},
			name: 'mheob/astro/rules',
			processor: 'astro/client-side-ts',
			rules: {
				// use recommended rules
				'astro/missing-client-only-directive-value': 'error',
				'astro/no-conflict-set-directives': 'error',
				'astro/no-deprecated-astro-canonicalurl': 'error',
				'astro/no-deprecated-astro-fetchcontent': 'error',
				'astro/no-deprecated-astro-resolve': 'error',
				'astro/no-deprecated-getentrybyslug': 'error',
				'astro/no-set-html-directive': 'off',
				'astro/no-unused-define-vars-in-style': 'error',
				'astro/semi': 'off',
				'astro/valid-compile': 'error',

				...overrides,
			},
		},
	];
}
