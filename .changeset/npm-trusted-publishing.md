---
---

Switch npm publishing to use OIDC Trusted Publishing instead of a stored NPM_TOKEN secret. The release workflow now relies on
GitHub Actions' built-in id-token permission to authenticate with the npm registry, removing the need for a long-lived automation
token and eliminating the EOTP error that occurred when npm required 2FA for publish operations.
