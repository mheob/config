import type { Config } from 'prettier';

const options: Config = {
	arrowParens: 'always',
	endOfLine: 'lf',
	printWidth: 100,
	proseWrap: 'always',
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	// eslint-disable-next-line perfectionist/sort-objects
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
				printWidth: 130,
			},
		},
	],
};

export default options;
