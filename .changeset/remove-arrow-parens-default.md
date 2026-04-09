---
'@mheob/oxfmt-config': minor
---

Remove the explicit `arrowParens: 'avoid'` option from the base config, deferring to oxfmt's built-in default instead. This may
affect formatting output for arrow functions if the upstream default differs.
