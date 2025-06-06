/* eslint-disable ts/no-explicit-any */
import type { TypedFlatConfigItem } from '../types';

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @param rules Rules object
 * @param map Map of prefixes to rename
 * @returns Renamed rules object
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
export function renameRules(
	rules: Record<string, any>,
	map: Record<string, string>,
): Record<string, any> {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			for (const [from, to] of Object.entries(map)) {
				if (key.startsWith(`${from}/`)) {
					return [to + key.slice(from.length), value];
				}
			}

			return [key, value];
		}),
	);
}

/**
 * Rename plugin names a flat configs array
 *
 * @param configs Configs to rename
 * @param map Map of prefixes to rename
 * @returns Renamed configs
 *
 * @example
 * ```ts
 * import { renamePluginInConfigs } from '@mheob/eslint-config'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 * })
 * ```
 */
export function renamePluginInConfigs(
	configs: TypedFlatConfigItem[],
	map: Record<string, string>,
): TypedFlatConfigItem[] {
	return configs.map(i => {
		const clone = { ...i };

		if (clone.rules) {
			clone.rules = renameRules(clone.rules, map);
		}

		if (clone.plugins) {
			clone.plugins = Object.fromEntries(
				Object.entries(clone.plugins).map(([key, value]) => {
					if (key in map) {
						return [map[key], value];
					}
					return [key, value];
				}),
			);
		}

		return clone;
	});
}
