# @mheob/tsconfig

## 3.0.0

### Major Changes

- [#394](https://github.com/mheob/config/pull/394) ([@mheob](https://github.com/mheob)): Update all tsconfig presets to work with TypeScript 7. TS7 hard-removes the classic `node`/`Node` module resolution and the
  `esModuleInterop: false` override, which broke every preset except `base` and `astro`. Replace the legacy Node resolution with
  `bundler` in `commonjs`, `esm`, `nextjs`, and `react`, drop the disallowed `esModuleInterop: false` from `react`, and align enum
  casing, target/lib levels, and display names across all presets for consistency.

## 2.1.1

### Patch Changes

- [#198](https://github.com/mheob/config/pull/198) ([@mheob](https://github.com/mheob)): Fix the path to the `tsconfig.json` files.

## 2.2.0

### Minor Changes

- [#195](https://github.com/mheob/config/pull/195) ([@mheob](https://github.com/mheob)): Sync astro with the latest official docs.

## 2.0.0

### Major Changes

- remove deprecated `importsNotUsedAsValues` config --> ([#121](https://github.com/mheob/config/pull/121)) by [@mheob](https://github.com/mheob)

## 1.0.1

### Patch Changes

- [#55](https://github.com/mheob/config/pull/55) [`27aa074`](https://github.com/mheob/config/commit/27aa07445d4ca381070ce9c0549fcc4fb079ce97) Thanks [@mheob](https://github.com/mheob)! - Simplify and fix calling sub configurations

## 1.0.0

### Major Changes

- [#43](https://github.com/mheob/config/pull/43) [`c4e3768`](https://github.com/mheob/config/commit/c4e3768035f4b37d3e5f88115c66de25b41d335a) Thanks [@mheob](https://github.com/mheob)! - Initial Release
