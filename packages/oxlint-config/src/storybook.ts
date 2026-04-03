import { defineConfig } from 'oxlint';

export const storybookConfig = defineConfig({
	overrides: [
		// Storybook
		{
			files: ['**/*stories.js', '**/*stories.jsx', '**/*stories.ts', '**/*stories.tsx'],
			jsPlugins: ['eslint-plugin-storybook'],
			plugins: ['eslint', 'import', 'react', 'react-perf'],
			rules: {
				'eslint/no-alert': 'off',
				'eslint/no-console': 'off',
				'import/no-anonymous-default-export': 'off',
				'react-hooks/rules-of-hooks': 'off',
				'storybook/await-interactions': 'error',
				'storybook/context-in-play-function': 'error',
				'storybook/default-exports': 'error',
				'storybook/hierarchy-separator': 'warn',
				'storybook/no-redundant-story-name': 'warn',
				'storybook/no-renderer-packages': 'error',
				'storybook/prefer-pascal-case': 'warn',
				'storybook/story-exports': 'error',
				'storybook/use-storybook-expect': 'error',
				'storybook/use-storybook-testing-library': 'error',
			},
		},

		// Storybook main file
		{
			files: ['.storybook/main.ts'],
			jsPlugins: ['eslint-plugin-storybook'],
			rules: {
				'storybook/no-uninstalled-addons': 'error',
			},
		},
	],
});
