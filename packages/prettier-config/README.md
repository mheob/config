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
/** @type {import('prettier').Config} */
module.exports = {
	...require('@mheob/prettier-config'),
	semi: false,
	useTabs: false,
};
```

## Ruleset

This configuration uses these styles:

```js
/** @type {import('prettier').Config} */
module.exports = {
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
```
