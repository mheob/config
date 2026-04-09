import { defineConfig } from 'oxlint';

export const reactConfig = defineConfig({
	overrides: [
		{
			files: ['**/*.tsx'],
			plugins: ['react', 'react-perf', 'typescript'],
			rules: {
				'eslint/max-lines-per-function': 'off',
				'eslint/max-statements': 'off',
				'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
				'react/jsx-max-depth': ['warn', { max: 10 }],
				'react/jsx-props-no-spreading': 'off',
				'react/no-multi-comp': 'off',
				'react/only-export-components': [
					'warn',
					{
						allowConstantExport: true,
						allowExportNames: [],
					},
				],
				'react/react-in-jsx-scope': 'off',
				'typescript/explicit-function-return-type': 'off',
				'typescript/explicit-module-boundary-types': 'off',
			},
		},
	],
});
