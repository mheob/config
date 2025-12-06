---
'@mheob/prettier-config': minor
---

Improve Prettier configuration

- Import prettier-plugin-toml directly instead of using a string reference for better type safety and explicit dependency resolution
- Fix markdown files glob pattern from `**/*.md` to `*.md` to match files correctly
