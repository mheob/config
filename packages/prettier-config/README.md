# My personal Prettier config

To make my configurations a bit easier I share my [Prettier](https://prettier.io) config.

## Install

### With NPM

```sh
npm install -D @mheob/prettier-config
```

### With YARN

```sh
yarn add -D @mheob/prettier-config
```

### With PNPM

```sh
pnpm add -D @mheob/prettier-config
```

## Usage

If you need to override some settings you can do it this way:

```js
// .prettierrc.cjs
module.exports = {
	...require('@mheob/prettier-config'),
	semi: false,
	importOrder: ['^@company/(.*)$', '^[./]'],
};
```

## Ruleset

This configuration uses the [`@trivago/prettier-plugin-sort-imports`](https://github.com/trivago/prettier-plugin-sort-imports)
plugin and set these styles:

```js
const jsDocPlugin = require('prettier-plugin-jsdoc');
const sortImports = require('@trivago/prettier-plugin-sort-imports');

/** @type {import('prettier').Config} */
module.exports = {
	plugins: [jsDocPlugin, sortImports],
	arrowParens: 'always',
	endOfLine: 'lf',
	printWidth: 100,
	proseWrap: 'always',
	importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	singleQuote: true,
	semi: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: false,

	overrides: [
		{
			files: '*.{yaml,yml}',
			options: {
				printWidth: 130,
				singleQuote: false,
			},
		},
	],
};
```
