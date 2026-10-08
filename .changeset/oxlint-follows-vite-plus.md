---
'@mheob/oxlint-config': patch
---

Align the `oxlint` and `oxlint-tsgolint` peer ranges with the versions that ship with Vite+. The `oxlint` peer range drops from `^1.86.0` to `^1.85.0`, so projects that lint with `vp lint` no longer need a second, newer oxlint.
