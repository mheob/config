/* eslint-disable perfectionist/sort-objects */
import type { Config } from 'prettier';

const options: Config = {
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
			files: '**/*.{yaml,yml}',
			options: {
				printWidth: 130,
				singleQuote: false,
				useTabs: false,
			},
		},
		{
			files: '**/*.md',
			options: {
				parser: 'markdown',
				printWidth: 130,
			},
		},
	],
};

export default options;
