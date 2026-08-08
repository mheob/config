# My personal Commitlint config

To make my configurations a bit easier I share my [Commitlint](https://commitlint.js.org/) config.

The interactive prompt is powered by [czg](https://cz-git.qbb.sh/), the standalone CLI of `cz-git`. The package is ESM-only.

## Install

### With NPM

```sh
npm install -D @mheob/commitlint-config
```

### With YARN

```sh
yarn add -D @mheob/commitlint-config
```

### With PNPM

```sh
pnpm add -D @mheob/commitlint-config
```

### With BUN

```sh
bun add -D @mheob/commitlint-config
```

## Usage

Install `czg` alongside this config and add a script to your root `package.json`.

```json
{
	"scripts": {
		"commit": "czg"
	}
}
```

Now create a `commitlint.config.js` file in the root of your project with this content:

```js
export { default } from '@mheob/commitlint-config';
```

If you want to use your own scopes or if you need to override some settings you can do it in the `commitlint.config.js` this way:

```js
import { readdirSync } from 'node:fs';
import path from 'node:path';

import defaultConfig from '@mheob/commitlint-config';

// dynamically define the scopes
const apps = readdirSync(path.resolve(import.meta.dirname, 'apps'));
const packages = readdirSync(path.resolve(import.meta.dirname, 'packages'));

/** @type {import('@mheob/commitlint-config').UserConfig} */
export default {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: ['deps', 'release', 'repo', ...apps, ...packages],
		useEmoji: false,
	},
};
```
