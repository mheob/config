---
'@mheob/eslint-config': patch
---

Refactor stylistic padding rules to reduce empty lines

- Remove padding rules for variable declarations (const, let, var)
- Remove padding rules for block-like statements and return statements
- Add padding rules for export statements (blank lines between exports)
- Add padding rules for function declarations (blank lines around functions)
- Add `@stylistic/lines-between-class-members` rule requiring blank lines between class members
