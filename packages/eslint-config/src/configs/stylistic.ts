import { pluginAntfu } from '../plugins';
import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types';
import { interopDefault } from '../utils';

export const StylisticConfigDefaults: StylisticConfig = {
	indent: 'tab',
	jsx: true,
	quotes: 'single',
	semi: true,
};

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {}

export async function stylistic(options: StylisticOptions = {}): Promise<TypedFlatConfigItem[]> {
	const {
		indent,
		jsx,
		overrides = {},
		quotes,
		semi,
	} = {
		...StylisticConfigDefaults,
		...options,
	};

	const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'));

	const config = pluginStylistic.configs.customize({
		flat: true,
		indent,
		jsx,
		pluginName: 'style',
		quotes,
		semi,
	});

	return [
		{
			name: 'mheob/stylistic/rules',
			plugins: {
				antfu: pluginAntfu,
				style: pluginStylistic,
			},
			rules: {
				...config.rules,

				'antfu/consistent-list-newline': 'error',
				'antfu/top-level-function': 'error',

				'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
				'style/comma-dangle': ['error', 'always-multiline'],
				'style/max-statements-per-line': ['error', { max: 2 }],

				...overrides,
			},
		},
	];
}
