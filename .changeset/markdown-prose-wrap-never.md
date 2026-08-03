---
'@mheob/oxfmt-config': minor
---

Format Markdown with `proseWrap: 'never'` instead of a `printWidth` of `130`. Prose is now kept on a single line per paragraph, which keeps diffs on documentation changes minimal. Widen the `oxfmt` peer range to `>=0.62.0 <1.0.0`.
