# Claude AI Context

This is a monorepo containing shareable configuration packages for various development tools.

## Project Structure

- **Monorepo Manager**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm@10.22.0
- **Node Version**: ^22.12.0 || ^24.0.0
- **License**: MIT

## Available Packages

Located in `packages/`:

- `@mheob/commitlint-config` - Commitlint configuration
- `@mheob/eslint-config` - ESLint configuration
- `@mheob/prettier-config` - Prettier configuration
- `@mheob/changeset-changelog` - Custom changelog configuration

## Key Commands

```bash
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm clean            # Clean build artifacts
pnpm cspell           # Run spell checker
pnpm changeset        # Create a changeset
pnpm version-packages # Bump versions
pnpm release          # Publish packages
```

## Development Workflow

1. **Git Hooks**: Husky is configured for pre-commit hooks
2. **Lint Staged**: All files are automatically linted with ESLint on commit
3. **Changesets**: Use changesets for version management and changelogs
4. **Commitizen**: Uses cz-git for interactive commit messages

## Configuration Files

- [eslint.config.ts](eslint.config.ts) - Root ESLint config
- [prettier.config.mjs](prettier.config.mjs) - Root Prettier config
- [commitlint.config.js](commitlint.config.js) - Commitlint config
- [turbo.json](turbo.json) - Turborepo pipeline configuration
- [pnpm-workspace.yaml](pnpm-workspace.yaml) - Workspace configuration

## External Services

- **Kodiak**: Auto-merge bot (config in `.github/.kodiak.toml` or org defaults)
- **Renovate**: Dependency updates (config: `github>mheob/renovate-config`)

## Notes for Claude

- This is a configuration library, not an application
- Changes should maintain backward compatibility where possible
- Follow conventional commits pattern
- Create changesets for user-facing changes
- Each package has its own README with specific documentation
