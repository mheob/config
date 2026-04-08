# @mheob/oxfmt-config

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
