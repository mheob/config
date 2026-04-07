# @mheob/commitlint-config

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
