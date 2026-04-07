import { defineConfig } from 'oxlint';

export const reactConfig = defineConfig({
	plugins: ['react', 'react-perf'],

	overrides: [
		{
			files: ['**/*.tsx'],
			plugins: ['react', 'typescript'],
			rules: {
				'react/button-has-type': 'error',
				'react/exhaustive-deps': 'warn',
				'react/iframe-missing-sandbox': 'warn',
				'react/jsx-no-comment-textnodes': 'warn',
				'react/jsx-no-duplicate-props': 'warn',
				'react/jsx-no-script-url': 'warn',
				'react/no-array-index-key': 'warn',
				'react/no-danger': 'warn',
				'react/no-danger-with-children': 'warn',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-namespace': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-render-return-value': 'error',
				'react/no-string-refs': 'error',
				'react/no-target-blank': 'warn',
				'react/only-export-components': [
					'warn',
					{
						allowConstantExport: true,
						allowExportNames: [],
					},
				],
				'react/rules-of-hooks': 'error',
				'react/void-dom-elements-no-children': 'error',
				'react-perf/jsx-no-jsx-as-prop': 'error',
				'react-perf/jsx-no-new-array-as-prop': 'warn',
				'react-perf/jsx-no-new-function-as-prop': 'warn',
				'react-perf/jsx-no-new-object-as-prop': 'warn',
				'typescript/explicit-function-return-type': 'off',
			},
		},
	],
});
