# OXLint Config

Shared [OXLint](https://oxc.rs/docs/guide/usage/linter) configuration for NBP projects.

## Install

```bash
ni @mheob/oxlint-config oxlint
```

## Usage

Create an `oxlint.config.ts` at the root of your project and extend one or more of the provided configs:

```ts
// oxlint.config.ts
import { baseConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig],
});
```

Combine multiple configs by spreading them into the `extends` array:

```ts
// oxlint.config.ts
import { baseConfig, reactConfig, storybookConfig, tailwindcssConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, reactConfig, storybookConfig, tailwindcssConfig],
});
```

Add project-specific rule overrides on top:

```ts
// oxlint.config.ts
import { baseConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig],
	rules: {
		'typescript/no-explicit-any': 'off',
	},
});
```

## Available configs

### `baseConfig`

The foundation for all projects. Enables the following OXLint plugins and covers their most important rules:

| Plugin       | Scope                                      |
| ------------ | ------------------------------------------ |
| `eslint`     | General JS/TS best practices               |
| `typescript` | TypeScript-specific rules                  |
| `unicorn`    | Modern JS idioms and consistency           |
| `import`     | Import ordering and correctness            |
| `jsdoc`      | JSDoc comment quality                      |
| `node`       | Node.js safety rules                       |
| `oxc`        | OXC-native rules                           |
| `regexp`     | Regex correctness and optimisation         |
| `jsonc`      | JSON/JSONC/JSON5 key ordering and validity |
| `toml`       | TOML formatting and ordering               |
| `yml`        | YAML structural correctness                |
| `vitest`     | Test file conventions (spec/test files)    |

Also ships with file-specific overrides for CLI files, config files, scripts, and Markdown code blocks.

### `reactConfig`

Extends the base with React-specific rules. Applied to `**/*.tsx` files:

- **`react`** — JSX correctness (no duplicate props, no comment text nodes, etc.)
- **`react-dom`** — DOM safety (no dangerouslySetInnerHTML, deprecated APIs, missing attributes)
- **`react-web-api`** — Leaked event listeners, intervals, timeouts, and resize observers
- **`react-perf`** — (plugin loaded, rules can be enabled per project)

### `storybookConfig`

Enables Storybook-specific rules for story files (`**/*stories.{js,jsx,ts,tsx}`) and `.storybook/main.ts`:

- Story structure and exports (`default-exports`, `story-exports`)
- Interaction best practices (`await-interactions`, `context-in-play-function`)
- Naming conventions (`prefer-pascal-case`, `no-redundant-story-name`)
- Relaxes `no-console`, `no-alert`, and `rules-of-hooks` inside story files

### `tailwindcssConfig`

Enforces consistent Tailwind CSS class usage via `eslint-plugin-better-tailwindcss`:

| Rule                                           | Severity |
| ---------------------------------------------- | -------- |
| `tailwindcss/enforce-consistent-class-order`   | warn     |
| `tailwindcss/enforce-consistent-line-wrapping` | warn     |
| `tailwindcss/enforce-canonical-classes`        | warn     |
| `tailwindcss/no-deprecated-classes`            | warn     |
| `tailwindcss/no-duplicate-classes`             | warn     |
| `tailwindcss/no-unnecessary-whitespace`        | warn     |
| `tailwindcss/no-conflicting-classes`           | error    |
| `tailwindcss/no-unknown-classes`               | error    |

Configure the Tailwind CSS entry point and class whitelist in your own `oxlint.config.ts`:

```ts
// oxlint.config.ts
import { baseConfig, tailwindcssConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
	extends: [baseConfig, tailwindcssConfig],
	settings: {
		tailwindcss: {
			config: './src/styles/index.css',
			whitelist: ['my-prefix-.+'],
		},
	},
});
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
