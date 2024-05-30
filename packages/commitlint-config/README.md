# My personal Commitlint config

To make my configurations a bit easier I share my [Commitlint](https://commitlint.js.org/) config.

Another notable tool for using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is [cz-git](https://cz-git.qbb.sh/).

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

Add this config to your root `package.json`.

```json
{
	"config": {
		"commitizen": {
			"path": "node_modules/cz-git"
		}
	}
}
```

Now create a `.commitlint.config.js` file in the root of your project with this content:

```js
/** @type {import('cz-git').UserConfig} */
module.exports = {
	...require('@mheob/commitlint-config'),
};
```

If you want to use your own scopes or if you need to override some settings you can do it in the `commitlint.config.js` this way:

```js
const fs = require('node:fs');
const path = require('node:path');

const defaultConfig = require('@mheob/commitlint-config');

// dynamically define the scopes
const apps = fs.readdirSync(path.resolve(__dirname, 'apps'));
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));

/** @type {import('cz-git').UserConfig} */
module.exports = {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: ['deps', 'release', 'repo', ...apps, ...packages],
		useEmoji: false,
	},
};
```
