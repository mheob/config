# @mheob/eslint-config

## 8.1.0

### Minor Changes

- [#229](https://github.com/mheob/config/pull/229) ([@mheob](https://github.com/mheob)): disable `import/order` and `sort-imports` rules because they conflicts with `perfectionist/sort-imports`

### Patch Changes

- [#229](https://github.com/mheob/config/pull/229) ([@mheob](https://github.com/mheob)): update dependencies

## 8.0.0

### Major Changes

- [#226](https://github.com/mheob/config/pull/226) ([@mheob](https://github.com/mheob)): drop CJS build

  BREAKING CHANGE: use `eslint.config.mjs` instead of `eslint.config.cjs`

### Patch Changes

- [#227](https://github.com/mheob/config/pull/227) ([@mheob](https://github.com/mheob)): update dependencies

## 7.2.0

### Minor Changes

- [#224](https://github.com/mheob/config/pull/224) ([@mheob](https://github.com/mheob)): change editor rules from disable to non-fixable

## 7.1.0

### Minor Changes

- [#223](https://github.com/mheob/config/pull/223) ([@mheob](https://github.com/mheob)): turn off `prefer-const` rule in editor

### Patch Changes

- [#219](https://github.com/mheob/config/pull/219) ([@renovate](https://github.com/apps/renovate)): fix(deps): update all non-major dependencies

## 7.0.0

### Major Changes

- [#217](https://github.com/mheob/config/pull/217) ([@mheob](https://github.com/mheob)): add the newest rules, espacially a new sorting system which has breaking changes

### Patch Changes

- [#206](https://github.com/mheob/config/pull/206) ([@renovate](https://github.com/apps/renovate)): switch from `eslint-plugin-vitest` to `@vitest/eslint-plugin`

- [#217](https://github.com/mheob/config/pull/217) ([@mheob](https://github.com/mheob)): update dependencies and use the newest ESLint rules

## 6.2.0

### Minor Changes

- [#210](https://github.com/mheob/config/pull/210) ([@mheob](https://github.com/mheob)): update dependencies

### Patch Changes

- [#205](https://github.com/mheob/config/pull/205) ([@renovate](https://github.com/apps/renovate)): update all non-major dependencies

- [#202](https://github.com/mheob/config/pull/202) ([@renovate](https://github.com/apps/renovate)): update all non-major dependencies

## 6.1.3

### Patch Changes

- [#200](https://github.com/mheob/config/pull/200) ([@mheob](https://github.com/mheob)): Ensure all needed packages are installed at using Astro.

## 6.1.2

### Patch Changes

- [#197](https://github.com/mheob/config/pull/197) ([@mheob](https://github.com/mheob)): Update all dependencies

## 6.1.1

### Patch Changes

- [#182](https://github.com/mheob/config/pull/182) ([@mheob](https://github.com/mheob)): Improve `README.md` file and add spell checker.

## 6.1.0

### Minor Changes

- [#179](https://github.com/mheob/config/pull/179) ([@mheob](https://github.com/mheob)): Add prettier and all the needed roles.

- [#179](https://github.com/mheob/config/pull/179) ([@mheob](https://github.com/mheob)): Remove stylistic and all other formatter rules.

### Patch Changes

- [#179](https://github.com/mheob/config/pull/179) ([@mheob](https://github.com/mheob)): Remove not needed ESLint CLI binary.

## 5.2.0

### Minor Changes

- [#147](https://github.com/mheob/config/pull/147) ([@mheob](https://github.com/mheob)): set `unicorn/no-null` rule to `off`

## 5.1.1

### Patch Changes

- [#145](https://github.com/mheob/config/pull/145) ([@mheob](https://github.com/mheob)): update dependencies

- [#135](https://github.com/mheob/config/pull/135) ([@mheob](https://github.com/mheob)): update dependencies

## 5.1.0

### Minor Changes

- [#131](https://github.com/mheob/config/pull/131) ([@mheob](https://github.com/mheob)): add `cts` and `mts` file extensions to the eslint config

### Patch Changes

- [#133](https://github.com/mheob/config/pull/133) ([@mheob](https://github.com/mheob)): update dependencies

- [#129](https://github.com/mheob/config/pull/129) ([@renovate](https://github.com/apps/renovate)): chore(deps): update all non-major dependencies

## 5.0.1

### Patch Changes

- [#125](https://github.com/mheob/config/pull/125) ([@renovate](https://github.com/apps/renovate)): chore(deps): update all non-major dependencies

## 5.0.0

### Major Changes

- [#124](https://github.com/mheob/config/pull/124) ([@mheob](https://github.com/mheob)): Bump `eslint-plugin-unicorn` to v47. BREAKING CHANGE: Enable `prefer-at`, `prefer-event-target`, and `prefer-string-replace-all` in recommended config (see [#2073](https://github.com/sindresorhus/eslint-plugin-unicorn/pull/2073))

### Patch Changes

- [#122](https://github.com/mheob/config/pull/122) ([@renovate](https://github.com/apps/renovate)): chore(deps): update all non-major dependencies

## 4.2.1

### Patch Changes

- update dependencies --> ([#121](https://github.com/mheob/config/pull/121)) by [@mheob](https://github.com/mheob)

## 4.2.0

### Minor Changes

- remove explicit return rule --> ([#113](https://github.com/mheob/config/pull/113)) by [@mheob](https://github.com/mheob)

- move `explicit-function-return-type` rule to base config --> ([#116](https://github.com/mheob/config/pull/116)) by [@mheob](https://github.com/mheob)

### Patch Changes

- update dependencies --> ([#112](https://github.com/mheob/config/pull/112)) by [@mheob](https://github.com/mheob)

- fix the README files after the change of using ESLint to fix the imports --> ([#109](https://github.com/mheob/config/pull/109)) by [@mheob](https://github.com/mheob)

## 4.1.0

### Minor Changes

- add auto-fix for unused imports and vars --> ([#106](https://github.com/mheob/config/pull/106)) by [@mheob](https://github.com/mheob)

### Patch Changes

- bump `eslint-config-next` to `13.1.0` --> ([#106](https://github.com/mheob/config/pull/106)) by [@mheob](https://github.com/mheob)

## 4.0.0

### Major Changes

- add `eslint-plugin-simple-import-sort` and `eslint-plugin-import` ESLint plugins --> ([#103](https://github.com/mheob/config/pull/103)) by [@mheob](https://github.com/mheob)

### Minor Changes

- add newest rules from `eslint-plugin-unicorn` --> ([#101](https://github.com/mheob/config/pull/101)) by [@mheob](https://github.com/mheob)

### Patch Changes

- chore(deps): update all non-major dependencies --> ([#99](https://github.com/mheob/config/pull/99)) by [@renovate](https://github.com/apps/renovate)

- chore(deps): update all non-major dependencies --> ([#95](https://github.com/mheob/config/pull/95)) by [@renovate](https://github.com/apps/renovate)

## 3.1.0

### Minor Changes

- disable `unicorn/no-array-reduce` ESLint rule --> ([#93](https://github.com/mheob/config/pull/93)) by [@mheob](https://github.com/mheob)

### Patch Changes

- bump eslint to ^8.27.0 --> ([#91](https://github.com/mheob/config/pull/91)) by [@renovate](https://github.com/apps/renovate)
- bump `@typescript-eslint` monorepo --> ([#89](https://github.com/mheob/config/pull/89)) by [@mheob](https://github.com/mheob)

## 3.0.1

### Patch Changes

- Update dependencies --> ([#77](https://github.com/mheob/config/pull/77)) by [@mheob](https://github.com/mheob)

- update dependencies --> ([#81](https://github.com/mheob/config/pull/81)) by [@mheob](https://github.com/mheob)

- update dependencies --> ([#86](https://github.com/mheob/config/pull/86)) by [@mheob](https://github.com/mheob)

- update dependencies --> ([#84](https://github.com/mheob/config/pull/84)) by [@renovate](https://github.com/apps/renovate)

## 3.0.0

### Major Changes

- [#72](https://github.com/mheob/config/pull/72) [`6c13a4f`](https://github.com/mheob/config/commit/6c13a4fdabf14e2e4f0aa3495a328e45356ee6ff) Thanks [@mheob](https://github.com/mheob)! - Update dependencies and use the new rules from `eslint-plugin-unicorn`, especially [switch-case-braces](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md)

## 2.2.0

### Minor Changes

- [#59](https://github.com/mheob/config/pull/59) [`ec5e9e3`](https://github.com/mheob/config/commit/ec5e9e3a75aec80591c23aaa55b28932d6db7036) Thanks [@mheob](https://github.com/mheob)! - Disable `unicorn/no-array-for-each` rule as default

### Patch Changes

- [#60](https://github.com/mheob/config/pull/60) [`12b3867`](https://github.com/mheob/config/commit/12b38679f9fa123e20e634932ae1c8e277421464) Thanks [@mheob](https://github.com/mheob)! - Update dependencies

## 2.1.2

### Patch Changes

- [#53](https://github.com/mheob/config/pull/53) [`f7b87f4`](https://github.com/mheob/config/commit/f7b87f470129ee795855484b7ca394f2980ba8b1) Thanks [@mheob](https://github.com/mheob)! - Simplify and fix calling sub configurations

## 2.1.1

### Patch Changes

- [#49](https://github.com/mheob/config/pull/49) [`348d277`](https://github.com/mheob/config/commit/348d27713aab3a4927447f9870075cb2ace4275e) Thanks [@mheob](https://github.com/mheob)! - Update dependencies

- [#46](https://github.com/mheob/config/pull/46) [`6f731ee`](https://github.com/mheob/config/commit/6f731eeba2c6cf3f8e8ce896e19069bc88d45557) Thanks [@mheob](https://github.com/mheob)! - Switch to typescript as source files

- [#42](https://github.com/mheob/config/pull/42) [`cf8ba94`](https://github.com/mheob/config/commit/cf8ba94f23489673593eb101dcab47af445054a0) Thanks [@mheob](https://github.com/mheob)! - Format all files to the new tabs instead of spaces behavior

- [#36](https://github.com/mheob/config/pull/36) [`fd1474e`](https://github.com/mheob/config/commit/fd1474e0bcb9d6495a53358b4da62ec7d4754994) Thanks [@mheob](https://github.com/mheob)! - Update dependencies

## 2.1.0

### Minor Changes

- 718c5e2: Deactivate `@typescript-eslint/explicit-function-return-type` rule for jsx files.
- 70cbb2c: Add typescript definitions

### Patch Changes

- 8a868bf: Update dependencies

## 2.0.2

### Patch Changes

- 87fb7e0: Update all dependencies
- a211713: Add more typescript specific rules.

## 2.0.1

### Patch Changes

- 7c1d265: Change old and wrong `main` file name in `package.json` from `index.cjs` to `index.js`.

## 2.0.0

### Major Changes

- 6e97fe2: Split ESLint configuration into specified files (base/react/next for now).

### Patch Changes

- 6e97fe2: Improve README to get a better copy/paste experience.

## 1.0.1

### Patch Changes

- 7d96f86: Update all dependencies

## 1.0.0

### Major Changes

- 723ce7d: Initial configuration
