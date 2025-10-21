// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import { configs } from 'eslint-plugin-regexp';

import type { OptionsOverrides, OptionsRegExp, TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for regexp.
 *
 * This function sets up the necessary ESLint plugin for regexp,
 * including the `eslint-plugin-regexp`. It also configures the rules for regexp,
 * including the flat/recommended rules and the overrides.
 *
 * @param options - The options for configuring the regexp ESLint rules.
 * @returns Promise that resolves once the regexp ESLint rules are configured.
 */
export async function regexp(
	options: OptionsOverrides & OptionsRegExp = {},
): Promise<TypedFlatConfigItem[]> {
	const config = configs['flat/recommended'] as TypedFlatConfigItem;

	const rules = {
		...config.rules,
	};

	if (options.level === 'warn') {
		for (const key in rules) {
			if (rules[key] === 'error') rules[key] = 'warn';
		}
	}

	return [
		{
			...config,
			name: 'mheob/regexp/rules',
			rules: {
				...rules,
				...options.overrides,
			},
		},
	];
}
