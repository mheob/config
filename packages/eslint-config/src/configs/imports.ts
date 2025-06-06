import { pluginAntfu } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

export async function imports(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/imports/rules',
			plugins: {
				antfu: pluginAntfu,
			},
			rules: {
				'antfu/import-dedupe': 'error',
				'antfu/no-import-dist': 'error',
				'antfu/no-import-node-modules-by-path': 'error',
			},
		},
	];
}
