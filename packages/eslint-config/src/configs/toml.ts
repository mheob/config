import { GLOB_TOML } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

/**
 * Configures the ESLint rules for TOML.
 *
 * This function sets up the necessary ESLint plugins and parsers for TOML projects,
 * including the `eslint-plugin-toml` and `toml-eslint-parser`. It also configures
 * the language options for the TOML files, including the parser.
 *
 * @param options - The options for configuring the TOML ESLint rules.
 * @returns Promise that resolves once the TOML ESLint rules are configured.
 */
export async function toml(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_TOML], overrides = {} } = options;

	const [pluginToml, parserToml, _prettierParser] = await Promise.all([
		interopDefault(import('eslint-plugin-toml')),
		interopDefault(import('toml-eslint-parser')),
		interopDefault(import('prettier-plugin-toml')),
	] as const);

	return [
		{
			name: 'mheob/toml/setup',
			plugins: {
				toml: pluginToml,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserToml,
			},
			name: 'mheob/toml/rules',
			rules: {
				'toml/comma-style': 'error',
				'toml/keys-order': 'error',
				'toml/no-space-dots': 'error',
				'toml/no-unreadable-number-separator': 'error',
				'toml/precision-of-fractional-seconds': 'error',
				'toml/precision-of-integer': 'error',
				'toml/tables-order': 'error',

				'toml/vue-custom-block/no-parsing-error': 'error',

				...overrides,
			},
		},
	];
}
