import { defineConfig } from 'oxlint';

export const reactConfig = defineConfig({
	plugins: ['react', 'react-perf'],

	overrides: [
		{
			files: ['**/*.tsx'],
			jsPlugins: [
				'eslint-plugin-react-dom',
				'eslint-plugin-react-hooks-extra',
				'eslint-plugin-react-web-api',
				'eslint-plugin-react-x',
			],
			plugins: ['react', 'typescript'],
			rules: {
				'react-dom/no-dangerously-set-innerhtml': 'warn',
				'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
				'react-dom/no-find-dom-node': 'error',
				'react-dom/no-flush-sync': 'error',
				'react-dom/no-hydrate': 'error',
				'react-dom/no-missing-button-type': 'warn',
				'react-dom/no-missing-iframe-sandbox': 'warn',
				'react-dom/no-namespace': 'error',
				'react-dom/no-render': 'error',
				'react-dom/no-render-return-value': 'error',
				'react-dom/no-script-url': 'warn',
				'react-dom/no-unsafe-iframe-sandbox': 'warn',
				'react-dom/no-unsafe-target-blank': 'warn',
				'react-dom/no-use-form-state': 'error',
				'react-dom/no-void-elements-with-children': 'error',
				'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
				'react-hooks/exhaustive-deps': 'warn',
				'react-hooks/rules-of-hooks': 'error',
				'react-web-api/no-leaked-event-listener': 'warn',
				'react-web-api/no-leaked-interval': 'warn',
				'react-web-api/no-leaked-resize-observer': 'warn',
				'react-web-api/no-leaked-timeout': 'warn',
				'react/jsx-no-comment-textnodes': 'warn',
				'react/jsx-no-duplicate-props': 'warn',
				'react/no-array-index-key': 'warn',
				'react/no-direct-mutation-state': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-string-refs': 'error',
				'react/only-export-components': [
					'warn',
					{
						allowConstantExport: true,
						allowExportNames: [],
					},
				],
				'typescript/explicit-function-return-type': 'off',
			},
		},
	],
});
