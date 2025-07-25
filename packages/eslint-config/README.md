# My personal ESLint config

To make my configurations a bit easier I share my [ESLint](https://eslint.org/) config.

- Auto fix for formatting
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Optional [React](#react), [Svelte](#svelte), [UnoCSS](#unocss), [Astro](#astro), [Solid](#solid) support
- Optional [React](#react), [Next.js](#nextjs), [Svelte](#svelte), [UnoCSS](#unocss), [Astro](#astro), [Solid](#solid) support
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, dangling commas
  - Single quotes, no semi
- Respects `.gitignore` by default
- Requires ESLint v9.5.0+

> [!IMPORTANT]\
> Since v6.0.0, this config is rewritten to the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new).

You can find all used rules in my deployed [ESLint Config Inspector](https://eslint-config.mheob.dev/configs).

## Starter Wizard

I provide a CLI tool to help you set up your project, or migrate from the legacy config to the new flat config with one command.

```sh
pnpm dlx @mheob/eslint-config@latest
```

or

```sh
bunx @mheob/eslint-config@latest
```

or use your package manager of choice.

## Manual Install

```sh
pnpm add -D @mheob/eslint-config
```

or

```sh
bun add -d @mheob/eslint-config
```

or use your package manager of choice.

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

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob();
```

## Overwrite Rules

And that's it! Or you can configure each integration individually, for example:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'**/fixtures',
		// ...globs
	],

	// Disable jsonc support
	jsonc: false,

	// TypeScript is auto-detected, but you can also explicitly enable it:
	typescript: true,
});
```

The `mheob` factory function also accepts any number of arbitrary custom config overrides:

```ts
// eslint.config.ts
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

```ts
// eslint.config.ts
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
| `next/*` | `@next/next/*` | [@next/eslint-plugin-next](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next) |
| `node/*` | `n/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `ts/*` | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |
| `yaml/*` | `yml/*` | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

This preset will automatically rename the plugins also for your custom configs. You can use the original prefix to override the rules directly.

### Rules Overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```ts
// eslint.config.ts
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

```ts
// eslint.config.ts
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

```ts
// eslint.config.ts
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

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	vue: true,
});
```

### Optional Configs

We provide some optional configs for specific use cases, that we don't include their dependencies by default.

#### React

To enable React support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	react: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -d @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

#### Next.js

To enable Next.js support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	nextjs: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
npm i -D @next/eslint-plugin-next
```

#### Svelte

To enable svelte support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	svelte: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -d eslint-plugin-svelte
```

#### Astro

To enable astro support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	astro: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -d eslint-plugin-astro
```

#### Solid

To enable Solid support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	solid: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -d eslint-plugin-solid
```

#### UnoCSS

To enable UnoCSS support, you need to explicitly turn it on:

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	unocss: true,
});
```

Running `pnpm dlx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm add -d @unocss/eslint-plugin
```

### Optional Rules

This config also provides some optional plugins/rules for extended usage.

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

```ts
// eslint.config.ts
import mheob from '@mheob/eslint-config';

export default mheob({
	typescript: {
		tsconfigPath: 'tsconfig.json',
	},
});
```

### Editor Specific Disables

Auto-fixing for the following rules are disabled when ESLint is running in a code editor:

- [`prefer-const`](https://eslint.org/docs/rules/prefer-const)
- [`test/no-only-tests`](https://github.com/levibuzolic/eslint-plugin-no-only-tests)
- [`unused-imports/no-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports)

Since v3.16.0, they are no longer disabled, but made non-fixable using [this helper](https://github.com/antfu/eslint-flat-config-utils#composerdisablerulesfix).

This is to prevent unused imports from getting removed by the editor during refactoring to get a better developer experience. Those rules will be applied when you run ESLint in the terminal or [Lint Staged](#lint-staged). If you don't want this behavior, you can disable them:

```ts
// eslint.config.ts
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
pnpm add -D lint-staged simple-git-hooks

// to active the hooks
pnpm dlx simple-git-hooks
```

## View what rules are enabled

I built a visual tool to help you view what rules are enabled in your project and apply them to what files, [@eslint/config-inspector](https://github.com/eslint/config-inspector)

Go to your project root that contains `eslint.config.ts` and run:

```bash
pnpm dlx @eslint/config-inspector
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
