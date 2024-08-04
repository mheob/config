import type { Awaitable, TypedFlatConfigItem } from '../types';

/**
 * Combines multiple asynchronous configuration items into a single array.
 *
 * This function takes an array of asynchronous configuration items (either a single item or
 * an array of items) and resolves them all concurrently. The resolved configuration items are
 * then flattened into a single array.
 *
 * @param configs - An array of asynchronous configuration items to combine.
 * @returns A Promise that resolves to an array of resolved configuration items.
 */
export async function combine(
	...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]
): Promise<TypedFlatConfigItem[]> {
	const resolved = await Promise.all(configs);
	return resolved.flat();
}

/**
 * Converts a value to an array.
 *
 * If the input `value` is an array, it is returned as-is. Otherwise, a new array
 * is created with the `value` as its only element.
 *
 * @param value - The value to convert to an array.
 * @returns The array representation of the input value.
 */
export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value];
}
