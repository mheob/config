# @mheob/oxlint-config

## 3.0.1

### Patch Changes

- [#404](https://github.com/mheob/config/pull/404) ([@mheob](https://github.com/mheob)): Switch the repository's package manager from Bun to pnpm. The published package contents are unchanged; only the install instructions in the READMEs now use `pnpm add -D`.

## 3.0.0

### Major Changes

- [#403](https://github.com/mheob/config/pull/403) ([@mheob](https://github.com/mheob)): Enable type-aware linting in `baseConfig` via `oxlint-tsgolint`.

  `baseConfig` now sets `options.typeAware` and `options.typeCheck`, which activates the rules that need type information (`no-unsafe-*`, `no-floating-promises`, `strict-boolean-expressions`, `prefer-readonly-parameter-types`, …) and surfaces TypeScript compiler diagnostics through OXLint.

  **This is a breaking change.** To upgrade:

  - Install the new required peer dependency: `bun add -D oxlint-tsgolint`
  - Make sure every linted file belongs to a `tsconfig.json`. Files outside a TypeScript project resolve to the `error` type and produce false `no-unsafe-*` warnings — root-level `*.config.js` files are the usual offender, so either include them in a tsconfig or exclude them from linting.
  - Expect new warnings in existing code, and slower lint runs, since a TypeScript program is built for the linted files.

  To stay on the previous behaviour, set `options.typeAware: false` in your own config. Note that `typeCheck` is still marked experimental by OXLint.

### Patch Changes

- [#402](https://github.com/mheob/config/pull/402) ([@mheob](https://github.com/mheob)): Fix documentation drift in the package READMEs and ship a `LICENSE` file with `@mheob/oxfmt-config` and `@mheob/oxlint-config`.

  - `@mheob/commitlint-config`: the README showed CommonJS `require` and Commitizen with `cz-git`; the package is ESM-only and uses `czg`.
  - `@mheob/oxfmt-config`: the `baseConfig` table listed `arrowParens`, which is no longer set, and claimed the Markdown override raises `printWidth`, when it sets `proseWrap: 'never'`. `sortImports` and `sortTailwindcss` were missing.
  - `@mheob/oxlint-config`: the `reactConfig` section listed `react-hooks`, `react-dom`, and `react-web-api` plus three peer dependencies that are not used — the config loads the built-in `react`, `react-perf`, and `typescript` plugins. The `nextJsConfig` export is now documented.

- [#400](https://github.com/mheob/config/pull/400) ([@mheob](https://github.com/mheob)): Update the bundled JS plugins and raise their peer dependency floors: `eslint-plugin-jsonc` to `^3.4.1`, `eslint-plugin-storybook` to `^10.5.7`, and `eslint-plugin-yml` to `^3.8.1`.

## 2.4.0

### Minor Changes

- [#398](https://github.com/mheob/config/pull/398) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `oxfmt` (^0.62.0), `oxlint` (^1.77.0), `tsdown` (^0.22.14), `@types/node` (^26.1.2), `turbo` (^2.10.8), `eslint-plugin-better-tailwindcss` (^4.7.0), `eslint-plugin-storybook` (^10.5.6), and `eslint-plugin-yml` (^3.7.0). Bump the `oxlint` peer range in `oxlint-config` to `^1.77.0`.

## 2.3.1

### Patch Changes

- [#389](https://github.com/mheob/config/pull/389) ([@mheob](https://github.com/mheob)): Update all non-major dependencies including `@commitlint/cli`, `oxfmt`, `oxlint`, `turbo`, `tsdown`, and `lint-staged`. Adjust
  peer dependency ranges for `@commitlint/cli` (^21.1.0), `oxfmt` (>=0.56.0 <1.0.0), and `oxlint` (^1.71.0).

- [#392](https://github.com/mheob/config/pull/392) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `@commitlint/cli` (^21.2.1), `oxfmt` (^0.59.0), `oxlint` (^1.74.0), `tsdown`
  (^0.22.9), `typescript` (^7.0.2), and `@types/node` (^26.1.1). Widen the `oxfmt` peer range to `>=0.59.0` and bump the
  `eslint-plugin-*` peer ranges in `oxlint-config`. Raise the supported Node engine range to `^24.0.0 || >=26.0.0` and update
  `.nvmrc` to `26.5.0`.

## 2.3.0

### Minor Changes

- [#384](https://github.com/mheob/config/pull/384) ([@mheob](https://github.com/mheob)): Add new lint rules for vitest overrides, import, TypeScript, and unicorn plugins. Move eslint-plugin-jsonc, eslint-plugin-regexp,
  and eslint-plugin-yml to optional peer dependencies.

### Patch Changes

- [#384](https://github.com/mheob/config/pull/384) ([@mheob](https://github.com/mheob)): Update dependencies: oxfmt ^0.53.0, oxlint ^1.68.0, tsdown ^0.21.10, czg ^1.13.1

## 2.2.0

### Minor Changes

- [#381](https://github.com/mheob/config/pull/381) ([@mheob](https://github.com/mheob)): Streamline the base and React configs by removing explicit rule declarations that are already enforced through category-level
  severity settings. This reduces noise in the config and makes the intent clearer.

  Notable behavioral changes:

  - Downgrade `vitest/consistent-test-it` from `error` to `warn` and remove the other vitest rules that are covered by categories
  - Add `eslint/no-magic-numbers` (warn) with sensible ignore list for common numeric literals
  - Add `import/max-dependencies` (warn, max 20) to discourage overly large import lists
  - Explicitly disable `unicorn/no-null`, `eslint/capitalized-comments`, `eslint/id-length`, `eslint/no-plusplus`,
    `eslint/no-undef`, `eslint/no-undefined`, `oxc/no-async-await`, and `oxc/no-optional-chaining` which would otherwise be enabled
    by category defaults
  - In the React config: replace removed rule overrides with `jsx-filename-extension`, `jsx-max-depth` (max 10), and explicit `off`
    entries for `react/no-multi-comp`, `react/jsx-props-no-spreading`, `react/react-in-jsx-scope`, and
    `typescript/explicit-module-boundary-types`

## 2.1.0

### Minor Changes

- [#379](https://github.com/mheob/config/pull/379) ([@mheob](https://github.com/mheob)): feat(oxlint-config): add rule categories with default severity levels to `baseConfig`

- [#379](https://github.com/mheob/config/pull/379) ([@mheob](https://github.com/mheob)): feat(oxlint-config): add `nextjsConfig` with all supported Next.js oxlint rules

## 2.0.1

### Patch Changes

- [#377](https://github.com/mheob/config/pull/377) ([@mheob](https://github.com/mheob)): fix(react): replace `react/no-target-blank` with the correct rule name `react/jsx-no-target-blank`

## 2.0.0

### Major Changes

- [#375](https://github.com/mheob/config/pull/375) ([@mheob](https://github.com/mheob)): Migrate react lint rules from eslint plugins to native oxlint plugins, dropping the optional peer dependencies on
  `eslint-plugin-react-dom`, `eslint-plugin-react-web-api`, and `eslint-plugin-react-x`. Add `react-perf` rules and align with the
  built-in oxlint react plugin.

  Upgrade oxfmt to `^0.44.0` and oxlint to `^1.59.0` across all packages.

  Add tsdown build configuration to `@mheob/commitlint-config` using the shared internal preset.

## 1.0.1

### Patch Changes

- [#369](https://github.com/mheob/config/pull/369) ([@mheob](https://github.com/mheob)): docs: rewrite README to accurately reflect the source code

  - Document the previously missing `baseJsConfig` export and its JS plugins (`regexp`, `jsonc`, `yml`)
  - Fix `baseConfig` plugin table (remove plugins that belong to `baseJsConfig`)
  - Remove non-existent `toml` plugin section
  - Correct `tailwindcss/` rule prefixes to `better-tailwindcss/`
  - Add `react-hooks` to the `reactConfig` plugin table
  - Add peer dependency install snippets for optional configs
  - Replace all `ni` install commands with `bun add -D`

## 1.0.0

### Major Changes

- [#365](https://github.com/mheob/config/pull/365) ([@mheob](https://github.com/mheob)): Add `@mheob/oxlint-config` package.
  - `@mheob/oxlint-config` provides a shared OXLint configuration with presets for base, React, Storybook, and Tailwind CSS
