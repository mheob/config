# Claude AI Context

This is a monorepo containing shareable configuration packages for various development tools.

## Project Structure

- **Monorepo Manager**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm
- **Toolchain**: Vite+ (`vp lint`, `vp fmt`, `vp pack`, `vp test`); Turborepo runs the package tasks, the tests run in one Vitest run over all packages
- **Node Version**: ^24.0.0
- **License**: MIT

## Available Packages

Located in `packages/`:

- `@mheob/commitlint-config` - Commitlint configuration
- `@mheob/oxfmt-config` - OXFmt configuration
- `@mheob/oxlint-config` - OXLint configuration

## Key Commands

```bash
pnpm run build            # Build all packages
pnpm run lint             # Lint all packages
pnpm run test             # Build, then run the tests of all packages with coverage
pnpm run clean            # Clean build artifacts
pnpm run cspell           # Run spell checker (fails if .cspell.json and codebook.toml words differ)
pnpm run cspell:sync      # Merge the word lists of .cspell.json and codebook.toml
pnpm run vite-plus:sync   # Pin oxfmt, oxlint, oxlint-tsgolint, and @vitest/coverage-v8 to the versions that ship with Vite+
pnpm run changeset        # Create a changeset
pnpm run version-packages # Bump versions
pnpm run release          # Publish packages
```

## Development Workflow

1. **Git Hooks**: Lefthook is configured for pre-commit, commit-msg, and pre-push hooks
2. **Staged Linting**: All staged files are automatically linted and formatted with OXLint and OXFmt on commit (config: [lefthook.yml](lefthook.yml))
3. **Changesets**: Use changesets for version management and changelogs
4. **Commitizen**: Uses cz-git for interactive commit messages

## Tests

Every package with code has tests in `test/`. The root `vite.config.ts` lists `packages/*` as Vitest projects and measures the coverage of `packages/*/src/**` in one report (`coverage/lcov.info`).

- `*.test.ts` - Unit tests that import from `src/`. Only these count for the coverage.
- `*.e2e.test.ts` - Run the real tool (commitlint, oxlint, oxfmt) against the built `dist/`, the way a consumer uses the package. The tool runs in a child process, so these tests add no coverage.
- `test/fixtures/` - Input files for the e2e tests. Linting and SonarQube Cloud skip them.

Run one package with `vp test --project @mheob/<package>`. The e2e tests need `pnpm run build` first.

## Configuration Files

- [vite.config.ts](vite.config.ts) - Root Vite+ config (`lint` block for OXLint, `fmt` block for OXFmt, `test` block for the Vitest projects and the coverage)
- `packages/*/vite.config.ts` - Library builds (`pack` block, run with `vp pack`) and package test settings (`test` block)
- [commitlint.config.ts](commitlint.config.ts) - Commitlint config
- [turbo.json](turbo.json) - Turborepo pipeline configuration
- [sonar-project.properties](sonar-project.properties) - SonarQube Cloud analysis scope and coverage report
- [pnpm-workspace.yaml](pnpm-workspace.yaml) - pnpm workspace definition, dependency catalog, and install settings

## External Services

- **Kodiak**: Auto-merge bot (config in `.github/.kodiak.toml` or org defaults)
- **Renovate**: Dependency updates (config: `github>mheob/renovate-config`)
- **SonarQube Cloud**: CI-based analysis with coverage in [check.yml](.github/workflows/check.yml) for pull requests and `main`. Needs the `SONAR_TOKEN` secret, and Automatic Analysis has to stay off in the project settings

## Notes for Claude

- This is a configuration library, not an application
- Changes should maintain backward compatibility where possible
- Follow conventional commits pattern
- Create changesets for user-facing changes
- Each package has its own README with specific documentation
