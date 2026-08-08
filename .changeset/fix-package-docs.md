---
'@mheob/commitlint-config': patch
'@mheob/oxfmt-config': patch
'@mheob/oxlint-config': patch
---

Fix documentation drift in the package READMEs and ship a `LICENSE` file with `@mheob/oxfmt-config` and `@mheob/oxlint-config`.

- `@mheob/commitlint-config`: the README showed CommonJS `require` and Commitizen with `cz-git`; the package is ESM-only and uses `czg`.
- `@mheob/oxfmt-config`: the `baseConfig` table listed `arrowParens`, which is no longer set, and claimed the Markdown override raises `printWidth`, when it sets `proseWrap: 'never'`. `sortImports` and `sortTailwindcss` were missing.
- `@mheob/oxlint-config`: the `reactConfig` section listed `react-hooks`, `react-dom`, and `react-web-api` plus three peer dependencies that are not used — the config loads the built-in `react`, `react-perf`, and `typescript` plugins. The `nextJsConfig` export is now documented.
