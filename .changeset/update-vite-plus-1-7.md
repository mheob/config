---
'@mheob/oxlint-config': patch
---

Update dependencies across the workspace, including `vite-plus` (1.7.0), `eslint-plugin-better-tailwindcss` (^4.11.0), `eslint-plugin-storybook` (^10.6.7), `tailwindcss` (^4.3.5), `turbo` (^2.11.12), and `cspell` (^10.5.2). Raise the `oxlint` peer range to `^1.94.0`, the version that ships with Vite+ 1.7.0, and the `oxlint-tsgolint` peer range to `^7.0.2007`, the lowest version that oxlint 1.94.0 accepts. Raise the `eslint-plugin-better-tailwindcss` and `eslint-plugin-storybook` peer ranges to `^4.11.0` and `^10.6.7`. oxlint 1.94.0 adds no rules and moves none to another category.

`oxlint-tsgolint` is now an optional peer dependency. Vite+ 1.7.0 runs the type-aware rules of `vp lint` through its own `tsrs`, so projects that lint with Vite+ no longer need it. Projects that run the standalone `oxlint` still need `oxlint-tsgolint` for the type-aware rules that `baseConfig` enables.
