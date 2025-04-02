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

### With BUN

```sh
bun add -D @mheob/prettier-config
```

## Usage

Add the following to your `prettier.config.js`:

```js
// prettier.config.mjs
import defaultConfig from '@mheob/prettier-config';

/** @type {import('prettier').Config} */
const config = { ...defaultConfig };

export default config;
```

You can override any of the default configuration options in the `config` object.

```js
// prettier.config.mjs
import defaultConfig from '@mheob/prettier-config';

/** @type {import('prettier').Config} */
const config = {
	...defaultConfig,
	printWidth: 130,
	semi: false,
};

export default config;
```

## Ruleset

This configuration uses these styles:

```js
/** @type {import('prettier').Config} */
/* eslint-disable perfectionist/sort-objects */
export default {
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
```
