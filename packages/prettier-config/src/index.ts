/* eslint-disable perfectionist/sort-objects */
import type { Config } from 'prettier';
import pluginToml from 'prettier-plugin-toml';

const options: Config = {
	plugins: [pluginToml],

	arrowParens: 'avoid',
	endOfLine: 'lf',
	printWidth: 100,
	proseWrap: 'always',
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,

	overrides: [
		{
			files: '{.cspell,tsconfig}*.json',
			options: {
				parser: 'jsonc',
			},
		},
		{
			files: '*.md',
			options: {
				parser: 'markdown',
				printWidth: 130,
			},
		},
		{
			files: '*.{yaml,yml}',
			options: {
				printWidth: 130,
				singleQuote: false,
				useTabs: false,
			},
		},
	],
};

export default options;
