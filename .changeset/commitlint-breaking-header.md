---
'@mheob/commitlint-config': patch
---

Parse commit headers with the Conventional Commits preset, so a breaking-change marker like `feat(api)!: remove the query` passes instead of failing with `type-empty` and `subject-empty`. `conventional-changelog-conventionalcommits` is now a dependency.
