import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs';
import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export async function jsonc(
	options: OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC], overrides = {} } = options;

	const [pluginJsonc, parserJsonc] = await Promise.all([
		interopDefault(import('eslint-plugin-jsonc')),
		interopDefault(import('jsonc-eslint-parser')),
	] as const);

	return [
		{
			name: 'mheob/jsonc/setup',
			plugins: {
				jsonc: pluginJsonc,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserJsonc,
			},
			name: 'mheob/jsonc/rules',
			rules: {
				'jsonc/no-bigint-literals': 'error',
				'jsonc/no-binary-expression': 'error',
				'jsonc/no-binary-numeric-literals': 'error',
				'jsonc/no-dupe-keys': 'error',
				'jsonc/no-escape-sequence-in-identifier': 'error',
				'jsonc/no-floating-decimal': 'error',
				'jsonc/no-hexadecimal-numeric-literals': 'error',
				'jsonc/no-infinity': 'error',
				'jsonc/no-multi-str': 'error',
				'jsonc/no-nan': 'error',
				'jsonc/no-number-props': 'error',
				'jsonc/no-numeric-separators': 'error',
				'jsonc/no-octal': 'error',
				'jsonc/no-octal-escape': 'error',
				'jsonc/no-octal-numeric-literals': 'error',
				'jsonc/no-parenthesized': 'error',
				'jsonc/no-plus-sign': 'error',
				'jsonc/no-regexp-literals': 'error',
				'jsonc/no-sparse-arrays': 'error',
				'jsonc/no-template-literals': 'error',
				'jsonc/no-undefined-value': 'error',
				'jsonc/no-unicode-codepoint-escapes': 'error',
				'jsonc/no-useless-escape': 'error',
				'jsonc/sort-keys': [
					'error',
					{
						minKeys: 2,
						order: { natural: true, type: 'asc' },
						pathPattern: '^$',
					},
					{
						minKeys: 2,
						order: ['id', { order: { natural: true, type: 'asc' } }],
						pathPattern: '.*',
					},
				],
				'jsonc/space-unary-ops': 'error',
				'jsonc/valid-json-number': 'error',
				'jsonc/vue-custom-block/no-parsing-error': 'error',

				...overrides,
			},
		},
	];
}
