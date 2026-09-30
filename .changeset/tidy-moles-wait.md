---
'@mheob/oxlint-config': patch
---

fix(oxlint): stop the conflicting top-level `await` rules in `baseConfig`

`node/no-top-level-await` and `unicorn/prefer-top-level-await` were both active for every file, so code got a warning with and without top-level `await`. Importable modules now only get `node/no-top-level-await`, which no longer reports files with a hashbang. CLI, config and script files only get `unicorn/prefer-top-level-await`. No new warnings are reported anywhere.
