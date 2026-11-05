---
'@mheob/oxlint-config': patch
---

Update dependencies across the workspace, including `vite-plus` (1.5.0), `eslint-plugin-regexp` (^3.3.3), `eslint-plugin-storybook` (^10.6.5), `tailwindcss` (^4.3.4), and `@types/node` (^26.6.6). Raise the `oxlint` and `oxlint-tsgolint` peer ranges to `^1.91.0` and `^7.0.2005`, the versions that ship with Vite+ 1.5.0, and the `eslint-plugin-regexp` and `eslint-plugin-storybook` peer ranges to `^3.3.3` and `^10.6.5`. oxlint 1.91.0 adds the type-aware rule `typescript/no-unsafe-enum-assignment` to the `suspicious` category, which this config reports as an error.
