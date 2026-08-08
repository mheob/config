---
'@mheob/oxlint-config': major
---

Enable type-aware linting in `baseConfig` via `oxlint-tsgolint`.

`baseConfig` now sets `options.typeAware` and `options.typeCheck`, which activates the rules that need type information (`no-unsafe-*`, `no-floating-promises`, `strict-boolean-expressions`, `prefer-readonly-parameter-types`, …) and surfaces TypeScript compiler diagnostics through OXLint.

**This is a breaking change.** To upgrade:

- Install the new required peer dependency: `bun add -D oxlint-tsgolint`
- Make sure every linted file belongs to a `tsconfig.json`. Files outside a TypeScript project resolve to the `error` type and produce false `no-unsafe-*` warnings — root-level `*.config.js` files are the usual offender, so either include them in a tsconfig or exclude them from linting.
- Expect new warnings in existing code, and slower lint runs, since a TypeScript program is built for the linted files.

To stay on the previous behaviour, set `options.typeAware: false` in your own config. Note that `typeCheck` is still marked experimental by OXLint.
