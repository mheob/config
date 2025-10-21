import { GLOB_YAML } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

/**
 * Configures the ESLint rules for YAML.
 *
 * This function sets up the necessary ESLint plugins and parsers for YAML projects,
 * including the `eslint-plugin-yml` and `yaml-eslint-parser`. It also configures
 * the language options for the YAML files, including the parser.
 *
 * @param options - The options for configuring the YAML ESLint rules.
 * @returns Promise that resolves once the YAML ESLint rules are configured.
 */
export async function yaml(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_YAML], overrides = {} } = options;

	const [pluginYaml, parserYaml] = await Promise.all([
		interopDefault(import('eslint-plugin-yml')),
		interopDefault(import('yaml-eslint-parser')),
	] as const);

	return [
		{
			name: 'mheob/yaml/setup',
			plugins: {
				yaml: pluginYaml,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserYaml,
			},
			name: 'mheob/yaml/rules',
			rules: {
				'yaml/block-mapping': 'error',
				'yaml/block-sequence': 'error',
				'yaml/no-empty-key': 'error',
				'yaml/no-empty-sequence-entry': 'error',
				'yaml/no-irregular-whitespace': 'error',
				'yaml/plain-scalar': 'error',
				'yaml/vue-custom-block/no-parsing-error': 'error',

				...overrides,
			},
		},
	];
}
