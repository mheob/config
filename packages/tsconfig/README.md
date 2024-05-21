# My personal TypeScript configurations

To make my configurations a bit easier I share my `tsconfig.json`s.

## Install

### With NPM

```sh
npm install -D @mheob/tsconfig
```

### With YARN

```sh
yarn add -D @mheob/tsconfig
```

### With PNPM

```sh
pnpm add -D @mheob/tsconfig
```

### With BUN

```sh
bun add -D @mheob/tsconfig
```

## Usage

`tsconfig.json`

### Default (same as `commonjs.json`)

```json
{
	"extends": "@mheob/tsconfig"
}
```

or

```json
{
	"extends": "@mheob/tsconfig/commonjs.json"
}
```

You can of course extend or overwrite all settings.

```json
{
	"extends": "@mheob/tsconfig",
	"compilerOptions": {
		"outDir": "dist"
	}
}
```

### Specified configurations

#### Astro

```json
{
	"extends": "@mheob/tsconfig/astro.json"
}
```

#### ESM

```json
{
	"extends": "@mheob/tsconfig/esm.json"
}
```

#### Next.js

```json
{
	"extends": "@mheob/tsconfig/nextjs.json"
}
```

#### React

```json
{
	"extends": "@mheob/tsconfig/react.json"
}
```
