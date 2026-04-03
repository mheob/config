import { defineConfig } from 'oxfmt';

export const baseConfig = defineConfig({
	arrowParens: 'avoid',
	proseWrap: 'always',
	singleQuote: true,
	useTabs: true,
	sortPackageJson: {
		sortScripts: true,
	},
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
