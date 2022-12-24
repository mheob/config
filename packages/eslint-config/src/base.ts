import type { Linter } from 'eslint';

const config: Linter.Config = {
	plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
	extends: [
		'eslint:recommended',
		'plugin:unicorn/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
	],
	settings: {
		'import/resolver': {
			typescript: true,
			node: true,
		},
	},
	rules: {
		'prettier/prettier': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'no-implicit-coercion': ['error', { allow: ['!!', '+', '~'] }],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// Side effect imports
					['^\\u0000'],
					// Node.js builtins
					['^node:'],
					// Packages
					['^@?\\w'],
					// Internal packages
					['^@/?\\w'],
					// Absolute imports
					['^'],
					// Relative imports
					['^\\.'],
					// Style imports
					['^.+\\.s?css$'],
				],
			},
		],
		'simple-import-sort/exports': 'error',
		'unicorn/import-index': 'error',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-negated-condition': 'off',
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
		// Disable the default rule so that `unused-imports` can auto-fix
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
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
				// Disable the default rule so that `unused-imports` can auto-fix
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/quotes': ['warn', 'single', { avoidEscape: true }],
			},
		},
	],
};

export = config;
