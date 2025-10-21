import { GLOB_SVELTE } from '../globs';
import type {
	OptionsFiles,
	OptionsHasTypeScript,
	OptionsOverrides,
	TypedFlatConfigItem,
} from '../types';
import { ensurePackages, interopDefault } from '../utils';

/**
 * Configures the ESLint rules for Svelte.
 *
 * This function sets up the necessary ESLint plugins and parsers for Svelte projects,
 * including the `eslint-plugin-svelte` and `svelte-eslint-parser`. It also configures
 * the language options for the Svelte files, including the parser, parser options,
 * and source type.
 *
 * @param options - The options for configuring the Svelte ESLint rules.
 * @returns Promise that resolves once the Svelte ESLint rules are configured.
 */
export async function svelte(
	options: OptionsFiles & OptionsHasTypeScript & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_SVELTE], overrides = {} } = options;

	await ensurePackages(['eslint-plugin-svelte']);

	const [pluginSvelte, parserSvelte] = await Promise.all([
		interopDefault(import('eslint-plugin-svelte')),
		interopDefault(import('svelte-eslint-parser')),
	] as const);

	return [
		{
			name: 'mheob/svelte/setup',
			plugins: {
				svelte: pluginSvelte,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserSvelte,
				parserOptions: {
					extraFileExtensions: ['.svelte'],
					parser: options.typescript
						? await interopDefault(import('@typescript-eslint/parser'))
						: null,
				},
			},
			name: 'mheob/svelte/rules',
			processor: pluginSvelte.processors['.svelte'],
			rules: {
				'no-undef': 'off', // incompatible with most recent (attribute-form) generic types RFC
				'no-unused-vars': [
					'error',
					{
						args: 'none',
						caughtErrors: 'none',
						ignoreRestSiblings: true,
						vars: 'all',
						varsIgnorePattern: String.raw`^(\$\$Props$|\$\$Events$|\$\$Slots$)`,
					},
				],

				'svelte/comment-directive': 'error',
				'svelte/no-at-debug-tags': 'warn',
				'svelte/no-at-html-tags': 'error',
				'svelte/no-dupe-else-if-blocks': 'error',
				'svelte/no-dupe-style-properties': 'error',
				'svelte/no-dupe-use-directives': 'error',
				'svelte/no-dynamic-slot-name': 'error',
				'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
				'svelte/no-inner-declarations': 'error',
				'svelte/no-not-function-handler': 'error',
				'svelte/no-object-in-text-mustaches': 'error',
				'svelte/no-reactive-functions': 'error',
				'svelte/no-reactive-literals': 'error',
				'svelte/no-shorthand-style-property-overrides': 'error',
				'svelte/no-unknown-style-directive-property': 'error',
				'svelte/no-unused-svelte-ignore': 'error',
				'svelte/no-useless-mustaches': 'error',
				'svelte/require-store-callbacks-use-set-param': 'error',
				'svelte/system': 'error',
				'svelte/valid-compile': 'error',
				'svelte/valid-each-key': 'error',

				'unused-imports/no-unused-vars': [
					'error',
					{
						args: 'after-used',
						argsIgnorePattern: '^_',
						vars: 'all',
						varsIgnorePattern: String.raw`^(_|\$\$Props$|\$\$Events$|\$\$Slots$)`,
					},
				],

				...overrides,
			},
		},
	];
}
