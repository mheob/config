import { GLOB_ASTRO } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { ensurePackages, interopDefault } from '../utils';

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
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: parserTs,
				},
			},
			name: 'mheob/astro/rules',
			rules: {
				'astro/no-set-html-directive': 'off',
				'astro/semi': 'off',

				...overrides,
			},
		},
	];
}
