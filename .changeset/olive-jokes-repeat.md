---
'@mheob/oxlint-config': minor
---

feat(oxlint): lint JSX files and enable the `jsx-a11y` and `promise` plugins

`reactConfig` and `nextJsConfig` now also apply to `**/*.jsx` files, `reactConfig` enables the `jsx-a11y` plugin, and `baseConfig` enables the `promise` plugin. `nextJsConfig` extends `reactConfig`, so listing both is no longer necessary.
