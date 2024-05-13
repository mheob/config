import type { TypedFlatConfigItem } from '../types';

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 * import { renameRules } from '@antfu/eslint-config'
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export function renameRules(rules: Record<string, any>, map: Record<string, string>) {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			for (const [from, to] of Object.entries(map)) {
				if (key.startsWith(`${from}/`))
					return [to + key.slice(from.length), value];
			}

			return [key, value];
		}),
	);
}

/**
 * Rename plugin names a flat configs array
 *
 * @example
 * ```ts
 * import { renamePluginInConfigs } from '@antfu/eslint-config'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 *   'import-x': 'import',
 * })
 * ```
 */
export function renamePluginInConfigs(
	configs: TypedFlatConfigItem[],
	map: Record<string, string>,
): TypedFlatConfigItem[] {
	return configs.map((i) => {
		const clone = { ...i };

		if (clone.rules)
			clone.rules = renameRules(clone.rules, map);

		if (clone.plugins) {
			clone.plugins = Object.fromEntries(
				Object.entries(clone.plugins).map(([key, value]) => {
					if (key in map)
						return [map[key], value];
					return [key, value];
				}),
			);
		}

		return clone;
	});
}
