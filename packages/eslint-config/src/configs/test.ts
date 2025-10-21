/* eslint-disable ts/no-explicit-any */
import { GLOB_TESTS } from '../globs';
import type {
	OptionsFiles,
	OptionsIsInEditor,
	OptionsOverrides,
	TypedFlatConfigItem,
} from '../types';
import { interopDefault } from '../utils';

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any;

/**
 * Configures the ESLint rules for testing.
 *
 * This function sets up the necessary ESLint plugins for testing,
 * including the `@vitest/eslint-plugin` and `eslint-plugin-no-only-tests`.
 * It also configures the rules for testing, including the node/prefer-global/process,
 * test/consistent-test-it, test/no-identical-title, test/no-import-node-test,
 * test/no-only-tests, test/prefer-hooks-in-order, test/prefer-lowercase-title,
 * and the overrides.
 *
 * @param options - The options for configuring the testing ESLint rules.
 * @returns Promise that resolves once the testing ESLint rules are configured.
 */
export async function test(
	options: OptionsFiles & OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = GLOB_TESTS, isInEditor = false, overrides = {} } = options;

	const [pluginVitest, pluginNoOnlyTests] = await Promise.all([
		interopDefault(import('@vitest/eslint-plugin')),
		// @ts-expect-error missing types
		interopDefault(import('eslint-plugin-no-only-tests')),
	] as const);

	_pluginTest = _pluginTest ?? {
		...pluginVitest,
		rules: {
			...pluginVitest.rules,
			// extend `test/no-only-tests` rule
			...pluginNoOnlyTests.rules,
		},
	};

	return [
		{
			name: 'mheob/test/setup',
			plugins: {
				test: _pluginTest,
			},
		},
		{
			files,
			name: 'mheob/test/rules',
			rules: {
				'node/prefer-global/process': 'off',

				'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
				'test/no-identical-title': 'error',
				'test/no-import-node-test': 'error',
				'test/no-only-tests': isInEditor ? 'warn' : 'error',
				'test/prefer-hooks-in-order': 'error',
				'test/prefer-lowercase-title': 'error',

				...overrides,
			},
		},
	];
}
