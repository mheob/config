import sortImports from '@trivago/prettier-plugin-sort-imports';
import type { Config as DefaultConfig } from 'prettier';

interface Config extends DefaultConfig {
	importOrder?: string[];
	importOrderCaseInsensitive?: boolean;
	importOrderParserPlugins?: string[];
	importOrderSeparation?: boolean;
	importOrderGroupNamespaceSpecifiers?: boolean;
	importOrderSortSpecifiers?: boolean;
}

const options: Config = {
	plugins: [sortImports],
	arrowParens: 'always',
	endOfLine: 'lf',
	printWidth: 100,
	proseWrap: 'always',
	importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	singleQuote: true,
	semi: true,
	trailingComma: 'all',
	useTabs: true,

	overrides: [
		{
			files: '*.{yaml,yml}',
			options: {
				printWidth: 130,
				singleQuote: false,
				useTabs: false,
			},
		},
		{
			files: '*.md',
			options: {
				printWidth: 130,
			},
		},
	],
};

export = options;
