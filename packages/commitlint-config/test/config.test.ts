import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import nodePath from 'node:path';
import process from 'node:process';

import type { UserConfig } from 'czg';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test';

interface Workspace {
	/** The checked out branch that `git rev-parse` reports. */
	readonly branch?: string;
	/** The package directories to create, e.g. `{ packages: ['ui'] }`. */
	readonly directories?: Readonly<Record<string, readonly string[]>>;
}

type IgnoreMatcher = (commit: string) => boolean;

const DEFAULT_SCOPES = ['deps', 'release', 'repo'];

const gitMock = vi.hoisted(() => vi.fn<(command: string) => Buffer>());

// The typed `import()` form rejects the mock, because a mock can't reproduce the overloads of
// `execSync`.
// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock('node:child_process', async (importOriginal) => ({
	...(await importOriginal<object>()),
	execSync: gitMock,
}));

describe('commitlint config', () => {
	let workspaceRoot: string;

	beforeEach(async () => {
		workspaceRoot = await mkdtemp(nodePath.join(tmpdir(), 'commitlint-config-'));
	});

	afterEach(async () => {
		vi.restoreAllMocks();
		await rm(workspaceRoot, { force: true, recursive: true });
	});

	/**
	 * Loads a fresh copy of the config inside a temporary workspace. The config reads the
	 * workspace and the branch at import time, so every call imports the module again.
	 *
	 * @param workspace The workspace to load the config in.
	 * @param workspace.branch The checked out branch.
	 * @param workspace.directories The package directories to create.
	 * @returns The config, as a consumer's `commitlint.config.ts` would see it.
	 */
	async function loadConfig({
		branch = 'main',
		directories = {},
	}: Workspace = {}): Promise<UserConfig> {
		await Promise.all(
			Object.entries(directories).flatMap(([parent, names]: readonly [string, readonly string[]]) =>
				names.map(async (name) =>
					mkdir(nodePath.join(workspaceRoot, parent, name), { recursive: true }),
				),
			),
		);

		gitMock.mockReturnValue(Buffer.from(`${branch}\n`));
		vi.spyOn(process, 'cwd').mockReturnValue(workspaceRoot);
		vi.resetModules();

		const { default: config } = await import('../src/index');
		return config;
	}

	describe('scopes', () => {
		it('offers the default scopes and every package in `apps` and `packages`', async () => {
			const { prompt } = await loadConfig({
				directories: { apps: ['web'], packages: ['ui', 'utils'] },
			});

			expect(prompt?.scopes?.slice(0, DEFAULT_SCOPES.length)).toStrictEqual(DEFAULT_SCOPES);
			// `readdirSync` returns the entries in file system order, which differs between platforms.
			expect(prompt?.scopes).toHaveLength(DEFAULT_SCOPES.length + 3);
			expect(prompt?.scopes).toStrictEqual(expect.arrayContaining(['ui', 'utils', 'web']));
		});

		it('offers only the default scopes without `apps` and `packages`', async () => {
			const { prompt } = await loadConfig();

			expect(prompt?.scopes).toStrictEqual(DEFAULT_SCOPES);
		});
	});

	describe('issue prefix', () => {
		it('reads the branch from git', async () => {
			await loadConfig();

			expect(gitMock).toHaveBeenCalledWith('git rev-parse --abbrev-ref HEAD');
		});

		it('suggests the issue when the branch starts with its number', async () => {
			const { prompt } = await loadConfig({ branch: '123-fix-the-login' });

			expect(prompt).toMatchObject({ customIssuePrefixAlign: 'bottom', defaultIssues: '#123' });
		});

		it.each(['main', 'feature-123', '0-fix-the-login'])(
			'suggests no issue on the branch `%s`',
			async (branch) => {
				const { prompt } = await loadConfig({ branch });

				expect(prompt).toMatchObject({ customIssuePrefixAlign: 'top', defaultIssues: '' });
			},
		);
	});

	describe('ignores', () => {
		it.each([
			{ ignored: true, message: 'wip: save the progress' },
			{ ignored: true, message: 'WIP' },
			{ ignored: false, message: 'feat: add a new scope' },
		] as const)('ignores `$message`: $ignored', async ({ ignored, message }) => {
			const { ignores } = await loadConfig();

			expect(ignores?.some((isIgnored: IgnoreMatcher) => isIgnored(message))).toBe(ignored);
		});
	});

	describe('type-enum', () => {
		it('accepts exactly the types the prompt offers', async () => {
			const { prompt, rules } = await loadConfig();

			expect(rules?.['type-enum']).toStrictEqual([
				2,
				'always',
				prompt?.types?.map(({ value }: { readonly value: string }) => value),
			]);
		});
	});
});
