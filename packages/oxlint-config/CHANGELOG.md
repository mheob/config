# @mheob/oxlint-config

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
