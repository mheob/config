//

import { defineConfig } from 'oxlint';

export const baseConfig = defineConfig({
	categories: {
		correctness: 'error',
		nursery: 'warn',
		pedantic: 'warn',
		perf: 'warn',
		restriction: 'warn',
		style: 'warn',
		suspicious: 'error',
	},

	env: {
		browser: true,
		builtin: true,
		es2026: true,
		node: true,
	},

	globals: {
		AudioWorkletGlobalScope: 'readonly',
		AudioWorkletProcessor: 'readonly',
		WorkletGlobalScope: 'readonly',
		currentFrame: 'readonly',
		currentTime: 'readonly',
		registerProcessor: 'readonly',
		sampleRate: 'readonly',
	},

	overrides: [
		// CLI
		{
			files: ['**/cli.ts', '**/cli/**/*.ts'],
			rules: {
				'eslint/no-console': 'off',
				'unicorn/no-process-exit': 'off',
			},
		},

		// Config
		{
			files: ['**/*.config.ts', '**/*.config.*.ts'],
			rules: {
				'eslint/no-console': 'off',
				'typescript/explicit-function-return-type': 'off',
			},
		},

		// Markdown
		{
			files: [
				'**/*.md/**/*.ts',
				'**/*.md/**/*.js',
				'**/*.md/**/*.json',
				'**/*.md/**/*.json5',
				'**/*.md/**/*.jsonc',
			],
			rules: {
				'eslint/no-alert': 'off',
				'eslint/no-console': 'off',
				'eslint/no-labels': 'off',
				'eslint/no-lone-blocks': 'off',
				'eslint/no-redeclare': 'off',
				'eslint/no-unused-expressions': 'off',
				'eslint/no-unused-labels': 'off',
				'eslint/no-unused-vars': 'off',
				'eslint/unicode-bom': 'off',
				'typescript/await-thenable': 'off',
				'typescript/consistent-type-imports': 'off',
				'typescript/no-floating-promises': 'off',
				'typescript/no-for-in-array': 'off',
				'typescript/no-implied-eval': 'off',
				'typescript/no-misused-promises': 'off',
				'typescript/no-namespace': 'off',
				'typescript/no-require-imports': 'off',
				'typescript/no-unnecessary-type-assertion': 'off',
				'typescript/no-unsafe-argument': 'off',
				'typescript/no-unsafe-assignment': 'off',
				'typescript/no-unsafe-call': 'off',
				'typescript/no-unsafe-member-access': 'off',
				'typescript/no-unsafe-return': 'off',
				'typescript/no-var-requires': 'off',
				'typescript/restrict-plus-operands': 'off',
				'typescript/restrict-template-expressions': 'off',
				'typescript/unbound-method': 'off',
			},
		},

		// Scripts
		{
			files: ['**/scripts/**/*.ts'],
			rules: {
				'eslint/no-console': 'off',
				'typescript/explicit-function-return-type': 'off',
				'unicorn/no-process-exit': 'off',
			},
		},

		// Vitest rules
		{
			files: [
				'**/__tests__/**/*.ts',
				'**/__tests__/**/*.tsx',
				'**/*.spec.ts',
				'**/*.spec.tsx',
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.bench.ts',
				'**/*.bench.tsx',
				'**/*.benchmark.ts',
				'**/*.benchmark.tsx',
			],
			plugins: ['vitest'],
			rules: {
				'vitest/consistent-test-it': ['warn', { fn: 'it', withinDescribe: 'it' }],
			},
		},
	],

	plugins: ['eslint', 'node', 'jsdoc', 'import', 'oxc', 'typescript', 'unicorn'],

	rules: {
		// ESLint rules
		'eslint/capitalized-comments': 'off',
		'eslint/eqeqeq': ['error', 'smart'],
		'eslint/func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
		'eslint/id-length': 'off',
		'eslint/max-lines-per-function': 'off',
		'eslint/new-cap': ['error', { capIsNew: false }],
		'eslint/no-console': ['warn', { allow: ['error', 'info', 'warn'] }],
		'eslint/no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
		'eslint/no-implicit-coercion': ['error', { allow: ['+', '~'] }],
		'eslint/no-magic-numbers': [
			'warn',
			{
				ignore: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
				ignoreArrayIndexes: true,
				ignoreDefaultValues: true,
				ignoreEnums: true,
				ignoreTypeIndexes: true,
			},
		],
		'eslint/no-plusplus': 'off',
		'eslint/no-redeclare': ['error', { builtinGlobals: false }],
		'eslint/no-restricted-globals': [
			'error',
			{ message: 'Use `globalThis` instead.', name: 'global' },
			{ message: 'Use `globalThis` instead.', name: 'self' },
		],
		'eslint/no-ternary': 'off',
		'eslint/no-undef': 'off',
		'eslint/no-undefined': 'off',
		'eslint/no-unneeded-ternary': ['error', { defaultAssignment: false }],
		'eslint/prefer-destructuring': 'off',
		'eslint/sort-imports': 'off',

		// Import rules
		'import/max-dependencies': ['warn', { max: 20 }],
		'import/no-default-export': 'off',
		'import/no-named-default': 'off',
		'import/no-named-export': 'off',
		'import/no-nodejs-modules': 'off',
		'import/no-relative-parent-imports': 'off',
		'import/prefer-default-export': 'off',
		'import/unambiguous': 'off',

		// JSDoc rules
		'jsdoc/check-property-names': 'warn',
		'jsdoc/check-tag-names': 'warn',
		'jsdoc/implements-on-classes': 'warn',
		'jsdoc/no-defaults': 'warn',
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-property': 'warn',
		'jsdoc/require-property-description': 'warn',
		'jsdoc/require-property-name': 'warn',
		'jsdoc/require-returns-type': 'off',
		'jsdoc/require-yields': 'warn',

		// Node rules
		'node/no-exports-assign': 'error',
		'node/no-new-require': 'error',

		// OXC rules
		'oxc/no-async-await': 'off',
		'oxc/no-optional-chaining': 'off',
		'oxc/no-rest-spread-properties': 'off',

		// TypeScript rules
		'typescript/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
		'typescript/consistent-type-definitions': ['error', 'interface'],
		'typescript/explicit-function-return-type': ['error', { allowExpressions: true }],

		// Unicorn rules
		'unicorn/no-null': 'off',
	},
});
