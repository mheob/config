import { GLOB_TOML } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

/**
 *
 * @param options
 */
export async function toml(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_TOML], overrides = {} } = options;

	const [pluginToml, parserToml] = await Promise.all([
		interopDefault(import('eslint-plugin-toml')),
		interopDefault(import('toml-eslint-parser')),
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
