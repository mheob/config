---
'@mheob/commitlint-config': patch
---

Skip only real work-in-progress commits. The header now has to start with the word `wip`, optionally in brackets, as in `wip`, `WIP: save the progress`, `wip(api): draft`, or `[WIP] draft`. Before, every message that contained the letters `wip` anywhere was skipped without being linted, such as `feat: wipe the cache` or `fix: handle swipe gestures`. Those commits are now linted like any other, and so are commits that mention `WIP` only later in the header or in the body. A header like `feat: WIP login form` now fails `subject-case`; write `wip: login form` to skip it.
