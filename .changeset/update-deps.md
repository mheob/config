---
'@mheob/eslint-config': patch
---

Update dependencies and improve configuration

- Update pnpm to 10.22.0
- Add Node.js 24 support (^22.12.0 || ^24.0.0)
- Change package exports to use .mjs extension for better ESM compatibility
- Update dependency versions (eslint-plugin-astro, @eslint-react, @next/eslint-plugin-next, etc.)
- Fix JSDoc comments by removing empty comment blocks
- Improve unicorn/filename-case rule to ignore markdown files
- Update type definitions for latest plugin versions
