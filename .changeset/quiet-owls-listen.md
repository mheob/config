---
'@mheob/oxlint-config': patch
---

fix(oxlint): pass the `tailwindcssConfig` options to the rules

OXLint does not hand the `settings` of a config in `extends` on to JS plugins, so `options` such as `entryPoint` never reached `eslint-plugin-better-tailwindcss` and the plugin fell back to the default Tailwind CSS classes. The options are now passed to every rule as rule options. Projects that set `options` may see new findings, because the rules now check against the project's own Tailwind CSS setup.
