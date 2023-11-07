import type { Config } from 'prettier';

const options: Config = {
	arrowParens: 'always',
	endOfLine: 'lf',
	printWidth: 100,
	proseWrap: 'always',
	singleQuote: true,
	semi: true,
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
				printWidth: 130,
			},
		},
	],
};

export = options;
