---
'@mheob/commitlint-config': patch
'@mheob/oxfmt-config': patch
'@mheob/oxlint-config': major
---

Migrate react lint rules from eslint plugins to native oxlint plugins, dropping the optional peer dependencies on
`eslint-plugin-react-dom`, `eslint-plugin-react-web-api`, and `eslint-plugin-react-x`. Add `react-perf` rules and align with the
built-in oxlint react plugin.

Upgrade oxfmt to `^0.44.0` and oxlint to `^1.59.0` across all packages.

Add tsdown build configuration to `@mheob/commitlint-config` using the shared internal preset.
