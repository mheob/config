---
'@mheob/commitlint-config': major
---

Replace `commitizen` and `cz-git` peer dependencies with `czg`.

`czg` is the standalone CLI for cz-git that bundles its own commitizen runtime, removing the need to install `commitizen`
separately. The exported `UserConfig` type is now re-exported from `czg` instead of `cz-git`.

**Migration:** Remove `commitizen` and `cz-git` from your dependencies and install `czg` instead. Update any `czg` script
references accordingly.
