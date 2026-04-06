# OXfmt Config

Opinionated, shared [OXFmt](https://oxc.rs/docs/guide/usage/formatter) configuration for my projects.

## Install

```bash
bun add -D @mheob/oxfmt-config oxfmt
```

## Usage

Create an `oxfmt.config.ts` at the root of your project and spread the provided config:

```ts
// oxfmt.config.ts
import { baseConfig } from '@mheob/oxfmt-config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
	...baseConfig,
});
```

Add project-specific overrides on top:

```ts
// oxfmt.config.ts
import { baseConfig } from '@mheob/oxfmt-config';
import { defineConfig } from 'oxfmt';

export default defineConfig({
	...baseConfig,
	printWidth: 100,
});
```

## Available configs

### `baseConfig`

The foundation for all projects. Applies the following formatting defaults:

| Option            | Value    | Description                                      |
| ----------------- | -------- | ------------------------------------------------ |
| `arrowParens`     | `avoid`  | Omits parentheses around single arrow parameters |
| `proseWrap`       | `always` | Wraps prose in Markdown files                    |
| `singleQuote`     | `true`   | Uses single quotes instead of double quotes      |
| `useTabs`         | `true`   | Indents with tabs instead of spaces              |
| `sortPackageJson` | enabled  | Sorts `package.json` fields, including scripts   |

Also ships with file-specific overrides:

| Files                      | Override                                      |
| -------------------------- | --------------------------------------------- |
| `{.cspell,tsconfig}*.json` | Uses `jsonc` parser to support comments       |
| `*.md`                     | Increases `printWidth` to `130`               |
| `*.{yaml,yml}`             | Sets `printWidth: 130`, double quotes, spaces |

## Editor integration

### VS Code

Install the [OXC VS Code extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) and add to
`.vscode/settings.json`:

```jsonc
{
	"editor.defaultFormatter": "oxc.oxc-vscode",
	"editor.formatOnSave": true,
}
```

### Zed

Add to `.zed/settings.json`:

```jsonc
{
	"formatter": {
		"external": {
			"command": "oxfmt",
			"arguments": ["--stdin-filepath", "{buffer_path}"],
		},
	},
	"format_on_save": "on",
}
```

## Scripts

Add to your `package.json`:

```json
{
	"scripts": {
		"format": "oxfmt",
		"format:check": "oxfmt --check"
	}
}
```
