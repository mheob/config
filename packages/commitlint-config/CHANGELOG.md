# @mheob/commitlint-config

## 2.0.7

### Patch Changes

- [#413](https://github.com/mheob/config/pull/413) ([@mheob](https://github.com/mheob)): chore(deps): update all non-major dependencies
  
  Raises the catalog ranges of the peer dependencies: `oxlint` to `^1.81.0`, `@commitlint/cli` to `^21.2.2`, and `czg` to `^1.14.0`. The remaining updates (`@changesets/cli`, `@types/node`, `cspell`, `cve-lite-cli`, `lefthook`, `oxfmt`, `turbo`) affect development only.

## 2.0.6

### Patch Changes

- [#404](https://github.com/mheob/config/pull/404) ([@mheob](https://github.com/mheob)): Switch the repository's package manager from Bun to pnpm. The published package contents are unchanged; only the install instructions in the READMEs now use `pnpm add -D`.

## 2.0.5

### Patch Changes

- [#402](https://github.com/mheob/config/pull/402) ([@mheob](https://github.com/mheob)): Fix documentation drift in the package READMEs and ship a `LICENSE` file with `@mheob/oxfmt-config` and `@mheob/oxlint-config`.

  - `@mheob/commitlint-config`: the README showed CommonJS `require` and Commitizen with `cz-git`; the package is ESM-only and uses `czg`.
  - `@mheob/oxfmt-config`: the `baseConfig` table listed `arrowParens`, which is no longer set, and claimed the Markdown override raises `printWidth`, when it sets `proseWrap: 'never'`. `sortImports` and `sortTailwindcss` were missing.
  - `@mheob/oxlint-config`: the `reactConfig` section listed `react-hooks`, `react-dom`, and `react-web-api` plus three peer dependencies that are not used — the config loads the built-in `react`, `react-perf`, and `typescript` plugins. The `nextJsConfig` export is now documented.

## 2.0.4

### Patch Changes

- [#398](https://github.com/mheob/config/pull/398) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `oxfmt` (^0.62.0), `oxlint` (^1.77.0), `tsdown` (^0.22.14), `@types/node` (^26.1.2), `turbo` (^2.10.8), `eslint-plugin-better-tailwindcss` (^4.7.0), `eslint-plugin-storybook` (^10.5.6), and `eslint-plugin-yml` (^3.7.0). Bump the `oxlint` peer range in `oxlint-config` to `^1.77.0`.

## 2.0.3

### Patch Changes

- [#389](https://github.com/mheob/config/pull/389) ([@mheob](https://github.com/mheob)): Fix oxlint rule violations: replace `parseInt` with `Math.trunc(Number())`, add unicode flag to regex, and suppress `node/no-sync`
  lint rule.

- [#389](https://github.com/mheob/config/pull/389) ([@mheob](https://github.com/mheob)): Update all non-major dependencies including `@commitlint/cli`, `oxfmt`, `oxlint`, `turbo`, `tsdown`, and `lint-staged`. Adjust
  peer dependency ranges for `@commitlint/cli` (^21.1.0), `oxfmt` (>=0.56.0 <1.0.0), and `oxlint` (^1.71.0).

- [#392](https://github.com/mheob/config/pull/392) ([@mheob](https://github.com/mheob)): Update dependencies across the workspace, including `@commitlint/cli` (^21.2.1), `oxfmt` (^0.59.0), `oxlint` (^1.74.0), `tsdown`
  (^0.22.9), `typescript` (^7.0.2), and `@types/node` (^26.1.1). Widen the `oxfmt` peer range to `>=0.59.0` and bump the
  `eslint-plugin-*` peer ranges in `oxlint-config`. Raise the supported Node engine range to `^24.0.0 || >=26.0.0` and update
  `.nvmrc` to `26.5.0`.

## 2.0.2

### Patch Changes

- [#384](https://github.com/mheob/config/pull/384) ([@mheob](https://github.com/mheob)): Update dependencies: oxfmt ^0.53.0, oxlint ^1.68.0, tsdown ^0.21.10, czg ^1.13.1

## 2.0.1

### Patch Changes

- [#375](https://github.com/mheob/config/pull/375) ([@mheob](https://github.com/mheob)): Migrate react lint rules from eslint plugins to native oxlint plugins, dropping the optional peer dependencies on
  `eslint-plugin-react-dom`, `eslint-plugin-react-web-api`, and `eslint-plugin-react-x`. Add `react-perf` rules and align with the
  built-in oxlint react plugin.

  Upgrade oxfmt to `^0.44.0` and oxlint to `^1.59.0` across all packages.

  Add tsdown build configuration to `@mheob/commitlint-config` using the shared internal preset.

## 2.0.0

### Major Changes

- [#372](https://github.com/mheob/config/pull/372) ([@mheob](https://github.com/mheob)): Replace `commitizen` and `cz-git` peer dependencies with `czg`.

  `czg` is the standalone CLI for cz-git that bundles its own commitizen runtime, removing the need to install `commitizen`
  separately. The exported `UserConfig` type is now re-exported from `czg` instead of `cz-git`.

  **Migration:** Remove `commitizen` and `cz-git` from your dependencies and install `czg` instead. Update any `czg` script
  references accordingly.

## 1.2.5

### Patch Changes

- [#313](https://github.com/mheob/config/pull/313) ([@mheob](https://github.com/mheob)): fix issues after upgrade

## 1.2.4

### Patch Changes

- [#287](https://github.com/mheob/config/pull/287) ([@renovate](https://github.com/apps/renovate)): update all non-major
  dependencies

## 1.2.3

### Patch Changes

- [#280](https://github.com/mheob/config/pull/280) ([@mheob](https://github.com/mheob)): update all non-major dependencies

## 1.2.2

### Patch Changes

- [#270](https://github.com/mheob/config/pull/270) ([@mheob](https://github.com/mheob)): update all non-major dependencies

## 1.2.1

### Patch Changes

- [#217](https://github.com/mheob/config/pull/217) ([@mheob](https://github.com/mheob)): update dependencies and use the newest
  ESLint rules

## 1.2.0

### Minor Changes

- [#209](https://github.com/mheob/config/pull/209) ([@mheob](https://github.com/mheob)): ignore "wip" messages in commitlint

### Patch Changes

- [#210](https://github.com/mheob/config/pull/210) ([@mheob](https://github.com/mheob)): update dependencies

## 1.1.2

### Patch Changes

- [#182](https://github.com/mheob/config/pull/182) ([@mheob](https://github.com/mheob)): Improve `README.md` file and add spell
  checker.

## 1.1.1

### Patch Changes

- [#145](https://github.com/mheob/config/pull/145) ([@mheob](https://github.com/mheob)): update dependencies

## 1.1.0

### Minor Changes

- [#128](https://github.com/mheob/config/pull/128) ([@mheob](https://github.com/mheob)): add `@commitlint/cli` to
  `peerDependencies`

## 1.0.1

### Patch Changes

- chore(deps): update dependencies --> ([#118](https://github.com/mheob/config/pull/118)) by
  [@renovate](https://github.com/apps/renovate)

## 1.0.0

### Major Changes

- initial release --> ([#115](https://github.com/mheob/config/pull/115)) by [@mheob](https://github.com/mheob)
