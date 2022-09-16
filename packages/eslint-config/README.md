# My personal ESLint config

To make my configurations a bit easier I share my [ESLint](https://eslint.org/) config.

## Install

### With NPM

```sh
npm install -D @mheob/eslint-config
```

### With YARN

```sh
yarn add -D @mheob/eslint-config
```

### With PNPM

```sh
pnpm add -D @mheob/eslint-config
```

## Usage

### Basic Rules only

```js
// .eslintrc.cjs
module.exports = {
	root: true, // optional
	extends: ['@mheob/eslint-config'],
};
```

### React and Basic Rules (`@mheob/eslint-config/react`)

```js
// .eslintrc.cjs
module.exports = {
	root: true, // optional
	extends: ['@mheob/eslint-config/react'],
};
```

### NextJS and Basic Rules (`@mheob/eslint-config/next`)

```js
// .eslintrc.cjs
module.exports = {
	root: true, // optional
	extends: ['@mheob/eslint-config/next'],
};
```

If you need to override some rules you can do it this way:

```js
// .eslintrc.cjs
module.exports = {
	root: true, // optional
	extends: ['@mheob/eslint-config'],
	rules: {
		'prettier/prettier': 'off',
		'no-console': 'warn',
	},
};
```

Or override rules specified for some files:

```js
// .eslintrc.cjs
module.exports = {
	root: true, // optional
	extends: ['@mheob/eslint-config'],
	overrides: [
		{
			files: ['*.jsx', '*.tsx'],
			settings: { react: { version: 'detect' } },
			rules: {
				'react/jsx-no-useless-fragment': 'warn',
				'react/react-in-jsx-scope': 'off',
			},
		},
	],
};
```
