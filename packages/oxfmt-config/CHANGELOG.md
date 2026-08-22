# @mheob/oxfmt-config

## 1.3.2

### Patch Changes

- [#404](https://github.com/mheob/config/pull/404) ([@mheob](https://github.com/mheob)): Switch the repository's package manager from Bun to pnpm. The published package contents are unchanged; only the install instructions in the READMEs now use `pnpm add -D`.

## 1.3.1

### Patch Changes

- [#402](https://github.com/mheob/config/pull/402) ([@mheob](https://github.com/mheob)): Fix documentation drift in the package READMEs and ship a `LICENSE` file with `@mheob/oxfmt-config` and `@mheob/oxlint-config`.

  - `@mheob/commitlint-config`: the README showed CommonJS `require` and Commitizen with `cz-git`; the package is ESM-only and uses `czg`.
  - `@mheob/oxfmt-config`: the `baseConfig` table listed `arrowParens`, which is no longer set, and claimed the Markdown override raises `printWidth`, when it sets `proseWrap: 'never'`. `sortImports` and `sortTailwindcss` were missing.
  - `@mheob/oxlint-config`: the `reactConfig` section listed `react-hooks`, `react-dom`, and `react-web-api` plus three peer dependencies that are not used — the config loads the built-in `react`, `react-perf`, and `typescript` plugins. The `nextJsConfig` export is now documented.

## 1.3.0

### Minor Changes

- [#398](https://github.com/mheob/config/pull/398) ([@mheob](https://github.com/mheob)): Format Markdown with `proseWrap: 'never'` instead of a `printWidth` of `130`. Prose is now kept on a single line per paragraph, which keeps diffs on documentation changes minimal. Widen the `oxfmt` peer range to `>=0.62.0 <1.0.0`.

### Patch Changes

- [#398](https://github.com/mheob/config/pull/398) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `oxfmt` (^0.62.0), `oxlint` (^1.77.0), `tsdown` (^0.22.14), `@types/node` (^26.1.2), `turbo` (^2.10.8), `eslint-plugin-better-tailwindcss` (^4.7.0), `eslint-plugin-storybook` (^10.5.6), and `eslint-plugin-yml` (^3.7.0). Bump the `oxlint` peer range in `oxlint-config` to `^1.77.0`.

## 1.2.2

### Patch Changes

- [#389](https://github.com/mheob/config/pull/389) ([@mheob](https://github.com/mheob)): Update all non-major dependencies including `@commitlint/cli`, `oxfmt`, `oxlint`, `turbo`, `tsdown`, and `lint-staged`. Adjust
  peer dependency ranges for `@commitlint/cli` (^21.1.0), `oxfmt` (>=0.56.0 <1.0.0), and `oxlint` (^1.71.0).

- [#392](https://github.com/mheob/config/pull/392) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `@commitlint/cli` (^21.2.1), `oxfmt` (^0.59.0), `oxlint` (^1.74.0), `tsdown`
  (^0.22.9), `typescript` (^7.0.2), and `@types/node` (^26.1.1). Widen the `oxfmt` peer range to `>=0.59.0` and bump the
  `eslint-plugin-*` peer ranges in `oxlint-config`. Raise the supported Node engine range to `^24.0.0 || >=26.0.0` and update
  `.nvmrc` to `26.5.0`.

## 1.2.1

### Patch Changes

- [#384](https://github.com/mheob/config/pull/384) ([@mheob](https://github.com/mheob)): Update dependencies: oxfmt ^0.53.0, oxlint ^1.68.0, tsdown ^0.21.10, czg ^1.13.1

## 1.2.0

### Minor Changes

- [#381](https://github.com/mheob/config/pull/381) ([@mheob](https://github.com/mheob)): Remove the explicit `arrowParens: 'avoid'` option from the base config, deferring to oxfmt's built-in default instead. This may
  affect formatting output for arrow functions if the upstream default differs.

## 1.1.0

### Minor Changes

- [#379](https://github.com/mheob/config/pull/379) ([@mheob](https://github.com/mheob)): feat(oxfmt-config): add import sorting and Tailwind CSS class sorting

  Added `sortImports` with a structured group order (type imports, builtins, externals, internals, relatives, side-effects, styles,
  unknown) and enabled `sortTailwindcss` to automatically sort Tailwind CSS utility classes.

## 1.0.2

### Patch Changes

- [#375](https://github.com/mheob/config/pull/375) ([@mheob](https://github.com/mheob)): Migrate react lint rules from eslint plugins to native oxlint plugins, dropping the optional peer dependencies on
  `eslint-plugin-react-dom`, `eslint-plugin-react-web-api`, and `eslint-plugin-react-x`. Add `react-perf` rules and align with the
  built-in oxlint react plugin.

  Upgrade oxfmt to `^0.44.0` and oxlint to `^1.59.0` across all packages.

  Add tsdown build configuration to `@mheob/commitlint-config` using the shared internal preset.

## 1.0.1

### Patch Changes

- [`3634cda`](https://github.com/mheob/config/commit/3634cdaae47800497e0cc6912535628703634c53) ([@mheob](https://github.com/mheob)): add README content

## 1.0.0

### Major Changes

- [#365](https://github.com/mheob/config/pull/365) ([@mheob](https://github.com/mheob)): Add `@mheob/oxfmt-config` package.
  - `@mheob/oxfmt-config` provides a shared OXFmt formatter configuration
