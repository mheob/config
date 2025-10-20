# Contributing to @mheob/config

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js >= 22.20.0
- pnpm 10.18.1

### Setup

1. Fork and clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build all packages:

   ```bash
   pnpm build
   ```

## Development Workflow

### Making Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes in the relevant package(s) under `packages/`

3. Test your changes:

   ```bash
   pnpm build
   pnpm lint
   pnpm test
   ```

### Commit Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with the following types:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Revert previous commits

**Commit message format:**

```text
<type>(<scope>): <subject>

<body>

<footer>
```

**Example:**

```text
feat(eslint): add new rule for import sorting

Added eslint-plugin-import-x configuration to enforce
consistent import ordering across all projects.

Closes #123
```

**Important:**

- Keep the subject line under 50 characters
- Use imperative mood ("add" not "added")
- No period at the end of the subject
- Reference issues in the footer

### Creating Changesets

For any user-facing changes, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to:

1. Select which packages are affected
2. Choose the bump type (major, minor, patch)
3. Write a clear summary of the changes

**When to create changesets:**

- New features (minor)
- Bug fixes (patch)
- Breaking changes (major)
- Documentation updates that affect package usage (patch)

**Skip changesets for:**

- Internal refactoring
- Test updates
- CI/CD changes
- Repository maintenance

## Code Quality

### Linting

All code must pass ESLint checks:

```bash
pnpm lint
```

The pre-commit hook will automatically lint staged files.

### Spell Checking

Run cspell to check for typos:

```bash
pnpm cspell
```

Add project-specific terms to `.cspell.json` if needed.

## Package Structure

Each package should have:

```text
packages/your-package/
├── src/
│   └── index.ts          # Main entry point
├── package.json          # Package manifest
├── README.md             # Package documentation
├── tsconfig.json         # TypeScript config
└── LICENSE               # MIT license
```

### Package.json Requirements

- `name`: Must follow `@mheob/<package-name>` pattern
- `version`: Managed by changesets
- `exports`: Define proper entry points
- `files`: Include only necessary files in npm package
- `repository`: Link to monorepo
- `license`: MIT

## Testing

Before submitting a PR:

1. Build all packages: `pnpm build`
2. Run linting: `pnpm lint`
3. Run spell check: `pnpm cspell`
4. Test in a local project if possible

## Pull Request Process

1. Ensure all tests pass and code is linted
2. Create a changeset if needed
3. Update documentation if required
4. Push your branch and create a pull request
5. Fill out the PR template completely
6. Link any related issues
7. Wait for review and address feedback

### PR Title Format

Use conventional commit format:

```text
feat(package-name): add new feature
```

### Review Process

- At least one maintainer approval is required
- CI checks must pass
- Kodiak bot may auto-merge approved PRs

## Release Process

Releases are handled by maintainers:

1. Merge changesets to main
2. CI creates a "Version Packages" PR
3. Maintainer merges the version PR
4. CI automatically publishes to npm

## Project-Specific Guidelines

### ESLint Config

- Follow the existing rule structure
- Group related rules together
- Add comments for non-obvious configurations
- Test with various project types

### Prettier Config

- Maintain consistency with existing style
- Document any opinionated choices
- Consider impact on existing users

### Commitlint Config

- Keep rules aligned with conventional commits spec
- Document custom scopes and types

## Getting Help

- Check existing issues and discussions
- Review documentation in package READMEs
- Ask questions in issue comments
- Reach out to maintainers if needed

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
