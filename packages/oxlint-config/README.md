# OXLint Config

Opinionated, shared [OXLint](https://oxc.rs/docs/guide/usage/linter) configuration for my projects.

## Install

```bash
bun add -D @mheob/oxlint-config oxlint
```

## Usage

Create an `oxlint.config.ts` at the root of your project and extend one or more of the provided configs:

```ts
// oxlint.config.ts
import { baseConfig, baseJsConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, baseJsConfig],
});
```

Combine multiple configs by spreading them into the `extends` array:

```ts
// oxlint.config.ts
import { baseConfig, baseJsConfig, reactConfig, storybookConfig, tailwindcssConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, baseJsConfig, reactConfig, storybookConfig, tailwindcssConfig],
});
```

Add project-specific rule overrides on top:

```ts
// oxlint.config.ts
import { baseConfig, baseJsConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, baseJsConfig],
	rules: {
		'typescript/no-explicit-any': 'off',
	},
});
```

## Available configs

### `baseConfig`

The foundation for all projects. Enables the following OXLint plugins and covers their most important rules:

| Plugin       | Scope                            |
| ------------ | -------------------------------- |
| `eslint`     | General JS/TS best practices     |
| `typescript` | TypeScript-specific rules        |
| `unicorn`    | Modern JS idioms and consistency |
| `import`     | Import ordering and correctness  |
| `jsdoc`      | JSDoc comment quality            |
| `node`       | Node.js safety rules             |
| `oxc`        | OXC-native rules                 |

Also ships with file-specific overrides for CLI files, config files, scripts, Markdown code blocks, and Vitest test files
(enabling the `vitest` plugin for spec/test/bench files).

### `baseJsConfig`

Extends `baseConfig` with additional rules provided via JS plugins. Should be used alongside `baseConfig` in most projects:

| JS Plugin              | Scope                                      |
| ---------------------- | ------------------------------------------ |
| `eslint-plugin-regexp` | Regex correctness and optimisation         |
| `eslint-plugin-jsonc`  | JSON/JSONC/JSON5 key ordering and validity |
| `eslint-plugin-yml`    | YAML structural correctness                |

Includes file-specific overrides:

- **JSON files** (`*.json`, `*.json5`, `*.jsonc`) — key sorting, value validation, and structural rules
- **tsconfig.json** — enforces canonical `compilerOptions` key order
- **YAML files** (`*.yaml`, `*.yml`) — block mapping, sequence, and whitespace rules

### `reactConfig`

Extends the base with React-specific rules. Applied to `**/*.tsx` files:

| Plugin / Scope  | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `react`         | JSX correctness (no duplicate props, no comment text nodes, etc.) |
| `react-hooks`   | Rules of hooks enforcement and exhaustive dependency checks       |
| `react-dom`     | DOM safety (no dangerouslySetInnerHTML, deprecated APIs, etc.)    |
| `react-web-api` | Leaked event listeners, intervals, timeouts, and resize observers |
| `react-perf`    | Plugin loaded; rules can be enabled per project                   |

Also turns off `typescript/explicit-function-return-type` inside `.tsx` files.

**Required peer dependencies:**

```bash
bun add -D eslint-plugin-react-dom eslint-plugin-react-web-api eslint-plugin-react-x
```

### `storybookConfig`

Enables Storybook-specific rules for story files (`**/*stories.{js,jsx,ts,tsx}`) and `.storybook/main.ts`:

- Story structure and exports (`default-exports`, `story-exports`)
- Interaction best practices (`await-interactions`, `context-in-play-function`)
- Naming conventions (`prefer-pascal-case`, `no-redundant-story-name`)
- Relaxes `no-console`, `no-alert`, and `rules-of-hooks` inside story files

**Required peer dependency:**

```bash
bun add -D eslint-plugin-storybook
```

### `tailwindcssConfig`

Enforces consistent Tailwind CSS class usage via `eslint-plugin-better-tailwindcss`:

| Rule                                                  | Severity |
| ----------------------------------------------------- | -------- |
| `better-tailwindcss/enforce-consistent-class-order`   | warn     |
| `better-tailwindcss/enforce-consistent-line-wrapping` | warn     |
| `better-tailwindcss/enforce-canonical-classes`        | warn     |
| `better-tailwindcss/no-deprecated-classes`            | warn     |
| `better-tailwindcss/no-duplicate-classes`             | warn     |
| `better-tailwindcss/no-unnecessary-whitespace`        | warn     |
| `better-tailwindcss/no-conflicting-classes`           | error    |
| `better-tailwindcss/no-unknown-classes`               | error    |

Configure the Tailwind CSS entry point and class whitelist in your own `oxlint.config.ts`:

```ts
// oxlint.config.ts
import { baseConfig, baseJsConfig, tailwindcssConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, baseJsConfig, tailwindcssConfig],
	settings: {
		tailwindcss: {
			config: './src/styles/index.css',
			whitelist: ['my-prefix-.+'],
		},
	},
});
```

**Required peer dependency:**

```bash
bun add -D eslint-plugin-better-tailwindcss
```

## Editor integration

### VS Code

Install the [OXC VS Code extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) and add to
`.vscode/settings.json`:

```jsonc
{
	"editor.defaultFormatter": "oxc.oxc-vscode",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.oxc": "explicit",
	},
}
```

### Zed

Add to `.zed/settings.json`:

```jsonc
{
	"lsp": {
		"oxc": {
			"initialization_options": {
				"settings": {
					"run": "onSave",
					"configPath": "./oxlint.config.ts",
				},
			},
		},
	},
}
```

## Scripts

Add to your `package.json`:

```json
{
	"scripts": {
		"format": "oxfmt",
		"format:check": "oxfmt --check",
		"lint": "oxlint",
		"lint:fix": "oxlint --fix"
	}
}
```
