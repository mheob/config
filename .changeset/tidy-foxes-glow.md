---
'@mheob/oxlint-config': patch
---

fix(oxlint): correct the `TailwindcssConfig` option types

`options.entrypoint` is renamed to `options.entryPoint`, the key `eslint-plugin-better-tailwindcss` actually reads. The previous spelling was silently ignored, so the plugin fell back to the default Tailwind CSS classes instead of the project's entry point. `options.selectors` is now typed as an array of selectors, as the plugin expects.
