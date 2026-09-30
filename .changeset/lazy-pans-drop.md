---
'@mheob/oxlint-config': patch
---

fix(oxlint): remove the JSON and YAML overrides from `baseJsConfig`

OXLint only lints JavaScript and TypeScript files, and JS plugins cannot bring their own parser yet. The overrides for `*.json`, `*.json5`, `*.jsonc`, `tsconfig*.json`, `*.yaml` and `*.yml` never applied, so removing them does not change any lint results. `eslint-plugin-jsonc` and `eslint-plugin-yml` are no longer optional peer dependencies and can be uninstalled.
