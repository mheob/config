import type { Linter } from 'eslint';

const config: Linter.Config = {
	plugins: ['@typescript-eslint'],
	extends: ['eslint:recommended', 'plugin:unicorn/recommended', 'plugin:prettier/recommended'],
	rules: {
		'prettier/prettier': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'no-implicit-coercion': ['error', { allow: ['!!', '+', '~'] }],
		'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'unicorn/import-index': 'error',
		'unicorn/no-array-for-each': 'off',
		'unicorn/prevent-abbreviations': [
			'error',
			{
				replacements: {
					args: false,
					doc: false,
					env: false,
					props: false,
				},
			},
		],
	},
	overrides: [
		{
			files: ['*.cjs'],
			env: { node: true },
		},
		{
			files: ['*.js', '*.ts'],
			rules: { 'unicorn/filename-case': ['error', { case: 'camelCase' }] },
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: ['plugin:@typescript-eslint/recommended'],
			rules: {
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/explicit-function-return-type': [
					'warn',
					{ allowExpressions: true, allowTypedFunctionExpressions: true },
				],
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
				],
				'@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
			},
		},
	],
};

export = config;
