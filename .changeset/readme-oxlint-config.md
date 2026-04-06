---
'@mheob/oxlint-config': patch
---

docs: rewrite README to accurately reflect the source code

- Document the previously missing `baseJsConfig` export and its JS plugins (`regexp`, `jsonc`, `yml`)
- Fix `baseConfig` plugin table (remove plugins that belong to `baseJsConfig`)
- Remove non-existent `toml` plugin section
- Correct `tailwindcss/` rule prefixes to `better-tailwindcss/`
- Add `react-hooks` to the `reactConfig` plugin table
- Add peer dependency install snippets for optional configs
- Replace all `ni` install commands with `bun add -D`
