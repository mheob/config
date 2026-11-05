---
'@mheob/commitlint-config': major
---

Tighten the length limits and add the `build` commit type. Headers may now be at most 72 characters (was 100), subjects at most 50 (was 72), and body and footer lines at most 72 (was 100). The prompt wraps body lines at 72 characters (was 80) and offers the `build` type, which `type-enum` now accepts as well. The prompt and `type-enum` now share one list of types, so they cannot drift apart.

To keep the old limits, override `header-max-length`, `subject-max-length`, `body-max-line-length`, and `footer-max-line-length` in your `commitlint.config` file.
