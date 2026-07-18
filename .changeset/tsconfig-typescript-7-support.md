---
'@mheob/tsconfig': major
---

Update all tsconfig presets to work with TypeScript 7. TS7 hard-removes the classic `node`/`Node` module resolution and the
`esModuleInterop: false` override, which broke every preset except `base` and `astro`. Replace the legacy Node resolution with
`bundler` in `commonjs`, `esm`, `nextjs`, and `react`, drop the disallowed `esModuleInterop: false` from `react`, and align enum
casing, target/lib levels, and display names across all presets for consistency.
