import { defineConfig } from 'oxfmt';

export const baseConfig = defineConfig({
	arrowParens: 'avoid',
	proseWrap: 'always',
	singleQuote: true,
	useTabs: true,
	sortImports: {
		groups: [
			'type-import',
			'value-builtin',
			['type-external', 'value-external'],
			['type-internal', 'value-internal'],
			['type-parent', 'value-parent', 'type-sibling', 'value-sibling', 'type-index', 'value-index'],
			'side-effect',
			'style',
			'unknown',
		],
	},
	sortPackageJson: {
		sortScripts: true,
	},
	sortTailwindcss: true,
	overrides: [
		{
			files: ['{.cspell,tsconfig}*.json'],
			options: {
				parser: 'jsonc',
			},
		},
		{
			files: ['*.md'],
			options: {
				printWidth: 130,
			},
		},
		{
			files: ['*.{yaml,yml}'],
			options: {
				printWidth: 130,
				singleQuote: false,
				useTabs: false,
			},
		},
	],
});
