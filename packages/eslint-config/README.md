# My personal ESLint config

To make my configurations a bit easier I share my [ESLint](https://eslint.org/) config.

## Usage

### Install

```sh
# with npm
npm install -D @mheob/eslint-config

# with yarn
yarn add -D @mheob/eslint-config

# with pnpm
pnpm add -D @mheob/eslint-config
```

### Include in your project

#### Simple: Edit `package.json`

```jsonc
{
  // ...
  "eslint": {
    "extends": "@mheob/eslint-config"
  }
}
```

#### Or with override settings

If you need to override some settings you can do it this way:

```js
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: ['@mheob/eslint-config'],
  rules: {
    'prettier/prettier': 'off',
    'no-console': 'warn',
  },
};
```

## Ruleset

This configuration uses these external ESLint packages:

- [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)
- [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)
- [`eslint-config-next`](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next)
- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)
- [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)
- [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn)
