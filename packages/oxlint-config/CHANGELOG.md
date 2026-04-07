# @mheob/oxlint-config

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
