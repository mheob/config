---
'@mheob/oxlint-config': minor
---

Streamline the base and React configs by removing explicit rule declarations that are already enforced through category-level
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
