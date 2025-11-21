---
'@mheob/eslint-config': patch
---

Remove redundant padding line rules for exports and between consecutive functions. The existing rules for padding before/after functions already ensure proper spacing, making the removed rules unnecessary and potentially conflicting.
