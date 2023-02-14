import type { Linter } from 'eslint';

const config: Linter.Config = {
	extends: ['./base', 'plugin:eslint-plugin-react/recommended'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['*.jsx', '*.tsx'],
			settings: { react: { version: 'detect' } },
			rules: {
				'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
				'react/jsx-no-useless-fragment': 'warn',
				'react/react-in-jsx-scope': 'off',
				'unicorn/filename-case': ['error', { case: 'pascalCase' }],
			},
		},
	],
};

export = config;
