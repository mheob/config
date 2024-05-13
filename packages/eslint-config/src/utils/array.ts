import type { Awaitable, TypedFlatConfigItem } from '../types';

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(
	...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
) {
	const resolved = await Promise.all(configs);
	return resolved.flat();
}

export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}
