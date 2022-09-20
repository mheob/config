# Check for correct package manager

A simple check of the usage of the correct package manager.

## Install

The local installation is optional. It is only needed if you want to have the package inside your project. This could improve
performance, for example.

### With NPM

```sh
npm install -D @mheob/check-package-manager
```

### With YARN

```sh
yarn add -D @mheob/check-package-manager
```

### With PNPM

```sh
pnpm add -D @mheob/check-package-manager
```

## Usage

### As script in `package.json`

Use one of the examples.

```json
"scripts": {
	"check-package-manager": "npx check-package-manager npm",        // NPM
	"check-package-manager": "yarn dlx check-package-manager yarn",  // YARN
	"check-package-manager": "yarn exec check-package-manager yarn", // YARN - locally installed
	"check-package-manager": "pnpm dlx check-package-manager",       // PNPM
	"check-package-manager": "pnpm dlx check-package-manager pnpm",  // PNPM - alternative
	"check-package-manager": "pnpm exec check-package-manager",      // PNPM - locally installed
	"check-package-manager": "pnpm exec check-package-manager pnpm", // PNPM - alternative locally installed
},
```

### As shell script

#### Default (same as `PNPM`)

Use `npx` if you use `NPM` as package manager.\
Otherwise use `exec` if you have installed the package in your project, otherwise use `dlx`.

```sh
npx check-package-manager
```

#### `NPM`

```sh
npx check-package-manager npm
```

#### `YARN`

```sh
yarn dlx check-package-manager yarn
```

#### `PNPM`

```sh
pnpm dlx check-package-manager pnpm
```

### As git hook

For example used in combination with [husky](https://typicode.github.io/husky/).

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

[ -n "$CI" ] && exit 0

pnpm exec check-package-manager
```
