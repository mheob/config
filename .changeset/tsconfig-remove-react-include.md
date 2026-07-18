---
'@mheob/tsconfig': patch
---

Remove the hardcoded `include: ["src"]` from the `react` preset. Every other preset (`base`, `commonjs`, `esm`, `astro`) leaves
`include` unset so consumers control which files are compiled; `react` picked up a stray `src`-only restriction during the
TypeScript 7 update, which would silently exclude any consumer project that doesn't keep its sources under `src`.
