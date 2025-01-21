# My personal ESLint config

To make my configurations a bit easier I share my [ESLint](https://eslint.org/) config.

> [!IMPORTANT]\
> Since v6.0.0, this config is rewritten to the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new).

You can find all used rules in my deployed [ESLint Config Inspector](https://eslint-config.mheob.dev/configs).

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

### With BUN

```sh
bun add -d @mheob/eslint-config
```

## Usage

### Add script for package.json

For example:

```json
{
	"scripts": {
		"lint": "eslint .",
		"lint:fix": "eslint . --fix"
	}
}
```

## VS Code support (auto fix on save)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
	// Enable the ESlint flat config support
	// (remove this if your ESLint extension above v3.0.5)
	"eslint.experimental.useFlatConfig": true,

	// Disable the default formatter, use eslint instead
	"prettier.enable": false,
	"editor.formatOnSave": false,

	// Auto fix
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit",
		"source.organizeImports": "never",
	},

	// Silent the stylistic rules in you IDE, but still auto fix them
	"eslint.rules.customizations": [
		{ "rule": "style/*", "severity": "off" },
		{ "rule": "format/*", "severity": "off" },
		{ "rule": "*-indent", "severity": "off" },
		{ "rule": "*-spacing", "severity": "off" },
		{ "rule": "*-spaces", "severity": "off" },
		{ "rule": "*-order", "severity": "off" },
		{ "rule": "*-dangle", "severity": "off" },
		{ "rule": "*-newline", "severity": "off" },
		{ "rule": "*quotes", "severity": "off" },
		{ "rule": "*semi", "severity": "off" },
	],

	// Enable eslint for all supported languages
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		"typescript",
		"typescriptreact",
		"vue",
		"html",
		"markdown",
		"json",
		"jsonc",
		"yaml",
		"toml",
		"xml",
		"gql",
		"graphql",
		"astro",
		"css",
		"less",
		"scss",
		"pcss",
		"postcss",
	],
}
```

## Customization

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `mheob` preset:

### Basic Rules only

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob();
```

## Overwrite Rules

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	// Enable stylistic formatting rules
	// stylistic: true,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'**/fixtures',
		// ...globs
	],

	// Disable jsonc and yaml support
	jsonc: false,

	// TypeScript and Vue are auto-detected, you can also explicitly enable them:
	typescript: true,
	vue: true,

	yaml: false,
});
```

The `mheob` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob(
	{
		// Configures for mheob's config
	},

	// From the second arguments they are ESLint Flat Configs
	// you can have multiple configs
	{
		files: ['**/*.ts'],
		rules: {},
	},
	{
		rules: {},
	},
);
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced Example</summary>

We wouldn't recommend using this style in general unless you know exactly what they are doing, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
import {
	combine,
	comments,
	ignores,
	imports,
	javascript,
	jsdoc,
	jsonc,
	markdown,
	node,
	prettier,
	sortPackageJson,
	sortTsconfig,
	toml,
	typescript,
	unicorn,
	vue,
	yaml,
} from '@mheob/eslint-config';

export default combine(
	ignores(),
	javascript(/* Options */),
	comments(),
	node(),
	jsdoc(),
	imports(),
	unicorn(),
	typescript(/* Options */),
	vue(),
	jsonc(),
	yaml(),
	toml(),
	markdown(),
	prettier(),
);
```

</details>

Check out the [configs](https://github.com/mheob/config/packages/eslint-config/blob/main/src/configs) and [factory](https://github.com/mheob/config/packages/eslint-config/blob/main/src/factory.ts) for more details.

> Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) for the inspiration, reference and most of the code.

### Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of the mandatory convention from npm package name), we renamed some plugins to make the overall scope more consistent and easier to write.

| New Prefix | Original Prefix | Source Plugin |
| --- | --- | --- |
| `import/*` | `import-x/*` | [eslint-plugin-import-x](https://github.com/un-es/eslint-plugin-import-x) |
| `node/*` | `n/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `yaml/*` | `yml/*` | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) |
| `ts/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

> [!NOTE]\
> About plugin renaming - it is actually rather a dangerous move that might leading to potential naming collisions, pointed out [here](https://github.com/eslint/eslint/discussions/17766) and [here](https://github.com/prettier/eslint-config-prettier#eslintconfigjs-flat-config-plugin-caveat). As this config also very **personal** and **opinionated**, I ambitiously position this config as the only **"top-level"** config per project, that might pivots the taste of how rules are named.
>
> This config cares more about the user-facings DX, and try to ease out the implementation details. For example, users could keep using the semantic `import/order` without ever knowing the underlying plugin has migrated twice to `eslint-plugin-i` and then to `eslint-plugin-import-x`. User are also not forced to migrate to the implicit `i/order` halfway only because we swapped the implementation to a fork.
>
> That said, it's probably still not a good idea. You might not want to doing this if you are maintaining your own eslint config.
>
> Feel free to open issues if you want to combine this config with some other config presets but faced naming collisions. I am happy to figure out a way to make them work. But at this moment I have no plan to revert the renaming.

This preset will automatically rename the plugins also for your custom configs. You can use the original prefix to override the rules directly.

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob(
	{
		typescript: true,
		vue: true,
	},
	{
		// Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
		files: ['**/*.vue'],
		rules: {
			'vue/operator-linebreak': ['error', 'before'],
		},
	},
	{
		// Without `files`, they are general rules for all files
		rules: {
			'style/semi': ['error', 'never'],
		},
	},
);
```

We also provided the `overrides` options in each integration to make it easier:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	typescript: {
		overrides: {
			'ts/consistent-type-definitions': ['error', 'interface'],
		},
	},
	vue: {
		overrides: {
			'vue/operator-linebreak': ['error', 'before'],
		},
	},
	yaml: {
		overrides: {
			// ...
		},
	},
});
```

### Config Composer

The factory function `mheob()` returns a [`FlatConfigComposer` object from `eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils#composer) where you can chain the methods to compose the config even more flexibly.

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob()
	.prepend
	// some configs before the main config
	()
	// overrides any named configs
	.override('mheob/imports', {
		rules: {
			'import/order': ['error', { 'newlines-between': 'always' }],
		},
	})
	// rename plugin prefixes
	.renamePlugins({
		'old-prefix': 'new-prefix',
		// ...
	});
// ...
```

### Vue

Vue support is detected automatically by checking if `vue` is installed in your project. You can also explicitly enable/disable it:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	vue: true,
});
```

#### Vue 2

We have limited support for Vue 2 (as it's already [reached EOL](https://v2.vuejs.org/eol/)). If you are still using Vue 2, you can configure it manually by setting `vueVersion` to `2`:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	vue: {
		vueVersion: 2,
	},
});
```

As it's in maintenance mode, we only accept bug fixes for Vue 2. It might also be removed in the future when `eslint-plugin-vue` drops support for Vue 2. We recommend upgrading to Vue 3 if possible.

### Optional Configs

We provide some optional configs for specific use cases, that we don't include their dependencies by default.

#### React

To enable React support, you need to explicitly turn it on:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	react: true,
});
```

Running `bunx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
bun add -d @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

#### Svelte

To enable svelte support, you need to explicitly turn it on:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	svelte: true,
});
```

Running `bunx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
bun add -d eslint-plugin-svelte
```

#### Astro

To enable astro support, you need to explicitly turn it on:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	astro: true,
});
```

Running `bunx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
bun add -d eslint-plugin-astro
```

#### Solid

To enable Solid support, you need to explicitly turn it on:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	solid: true,
});
```

Running `bunx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
bun add -d eslint-plugin-solid
```

#### UnoCSS

To enable UnoCSS support, you need to explicitly turn it on:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	unocss: true,
});
```

Running `bunx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
bun add -d @unocss/eslint-plugin
```

### Optional Rules

This config also provides some optional plugins/rules for extended usage.

#### `command`

Powered by [`eslint-plugin-command`](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.

For a few triggers, for example:

- `/// to-function` - converts an arrow function to a normal function
- `/// to-arrow` - converts a normal function to an arrow function
- `/// to-for-each` - converts a for-in/for-of loop to `.forEach()`
- `/// to-for-of` - converts a `.forEach()` to a for-of loop
- `/// keep-sorted` - sorts an object/array/interface
- ... etc. - refer to the [documentation](https://github.com/antfu/eslint-plugin-command#built-in-commands)

You can add the trigger comment one line above the code you want to transform, for example (note the triple slash):

<!-- eslint-skip -->

```ts
/// to-function
const foo = async (message: string): void => {
	console.log(message);
};
```

Will be transformed to this when you hit save with your editor or run `eslint . --fix`:

```ts
async function foo(message: string): void {
	console.log(message);
}
```

The command comments are usually one-off and will be removed along with the transformation.

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	typescript: {
		tsconfigPath: 'tsconfig.json',
	},
});
```

### Editor Specific Disables

Some rules are disabled when inside ESLint IDE integrations, namely:

- [`prefer-const`](https://eslint.org/docs/rules/prefer-const)
- [`unused-imports/no-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [`test/no-only-tests`](https://github.com/levibuzolic/eslint-plugin-no-only-tests)

This is to prevent unused imports from getting removed by the IDE during refactoring to get a better developer experience. Those rules will be applied when you run ESLint in the terminal or [Lint Staged](#lint-staged). If you don't want this behavior, you can disable them:

```js
// eslint.config.js
import mheob from '@mheob/eslint-config';

export default mheob({
	isInEditor: false,
});
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
	"simple-git-hooks": {
		"pre-commit": "pnpm lint-staged"
	},
	"lint-staged": {
		"*": "eslint --fix"
	}
}
```

and then

```bash
bun add -d lint-staged simple-git-hooks

// to active the hooks
npx simple-git-hooks
```

## View what rules are enabled

I built a visual tool to help you view what rules are enabled in your project and apply them to what files, [@eslint/config-inspector](https://github.com/eslint/config-inspector)

Go to your project root that contains `eslint.config.js` and run:

```bash
npx @eslint/config-inspector
```

## Versioning Policy

This project follows [Semantic Versioning](https://semver.org/) for releases. However, since this is just a config and involves opinions and many moving parts, we don't treat rules changes as breaking changes.

### Changes Considered as Breaking Changes

- Node.js version requirement changes
- Huge refactors that might break the config
- Plugins made major changes that might break the config
- Changes that might affect most of the codebases

### Changes Considered as Non-breaking Changes

- Enable/disable rules and plugins (that might become stricter)
- Rules options changes
- Version bumps of dependencies

## FAQ

### I prefer XXX

Sure, you can configure and override rules locally in your project to fit your needs. If that still does not work for you, you can always fork this repo and maintain your own.
