---
'@mheob/oxlint-config': major
---

feat(oxlint)!: make `tailwindcssConfig` configurable

`tailwindcssConfig` is now a factory function instead of a static config object. It accepts the `better-tailwindcss` plugin settings via `options` and a list of ignored classes via `ignoredClasses`, which is applied to `enforce-canonical-classes` and `no-unknown-classes`. The argument type is exported as `TailwindcssConfig`.

`enforce-canonical-classes` is raised from `warn` to `error`.

**Breaking change:** update your config from `extends: [tailwindcssConfig]` to `extends: [tailwindcssConfig()]`. Plugin settings that were previously declared under `settings.tailwindcss` in the consuming config now belong in the `options` argument.
