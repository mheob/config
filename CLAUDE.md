# Claude AI Context

This is a monorepo containing shareable configuration packages for various development tools.

## Project Structure

- **Monorepo Manager**: Turborepo with Bun workspaces
- **Package Manager**: bun@1.3.11
- **Node Version**: ^24.0.0
- **License**: MIT

## Available Packages

Located in `packages/`:

- `@mheob/commitlint-config` - Commitlint configuration
- `@mheob/oxfmt-config` - OXFmt configuration
- `@mheob/oxlint-config` - OXLint configuration

## Key Commands

```bash
bun run build            # Build all packages
bun run lint             # Lint all packages
bun run clean            # Clean build artifacts
bun run cspell           # Run spell checker
bun run changeset        # Create a changeset
bun run version-packages # Bump versions
bun run release          # Publish packages
```

## Development Workflow

1. **Git Hooks**: Husky is configured for pre-commit hooks
2. **Lint Staged**: All files are automatically linted and formatted with OXLint and OXFmt on commit
3. **Changesets**: Use changesets for version management and changelogs
4. **Commitizen**: Uses cz-git for interactive commit messages

## Configuration Files

- [oxlint.config.ts](oxlint.config.ts) - Root OXLint config
- [oxfmt.config.mjs](oxfmt.config.mjs) - Root OXFmt config
- [commitlint.config.js](commitlint.config.js) - Commitlint config
- [turbo.json](turbo.json) - Turborepo pipeline configuration
- [bunfig.toml](bunfig.toml) - Bun configuration

## External Services

- **Kodiak**: Auto-merge bot (config in `.github/.kodiak.toml` or org defaults)
- **Renovate**: Dependency updates (config: `github>mheob/renovate-config`)

## Notes for Claude

- This is a configuration library, not an application
- Changes should maintain backward compatibility where possible
- Follow conventional commits pattern
- Create changesets for user-facing changes
- Each package has its own README with specific documentation
