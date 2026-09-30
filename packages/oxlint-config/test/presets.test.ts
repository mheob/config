import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import nodePath from 'node:path';
import { promisify } from 'node:util';

import { beforeAll, describe, expect, it } from 'vite-plus/test';

interface Diagnostic {
	/** The rule code, e.g. `typescript(no-floating-promises)`. */
	readonly code: string;
	readonly message: string;
}

interface LintResult {
	/** The oxlint output when the config could not be loaded, e.g. because of an unknown rule. */
	readonly configError?: string;
	readonly diagnostics: readonly Diagnostic[];
}

// `execFile` returns the child process, which `promisify` ignores in favor of its promise overload.
// oxlint-disable-next-line typescript/strict-void-return
const execFileAsync = promisify(execFile);
const oxlintBin = nodePath.join(
	nodePath.dirname(createRequire(import.meta.url).resolve('oxlint/package.json')),
	'bin/oxlint',
);
const fixturesDir = nodePath.join(import.meta.dirname, 'fixtures');

// Under `vp`, oxlint sees `VP_*` variables and reads the `lint` block of the nearest
// `vite.config.ts` instead of the fixture's `oxlint.config.ts`. Consumers run plain oxlint.
const oxlintEnv = Object.fromEntries(
	// oxlint-disable-next-line node/no-process-env
	Object.entries(process.env).filter(([key]: readonly [string, unknown]) => !key.startsWith('VP_')),
);

async function runOxlint(cwd: string, file: string): Promise<string> {
	try {
		const { stdout } = await execFileAsync(oxlintBin, ['--format=json', file], {
			cwd,
			env: oxlintEnv,
		});
		return stdout;
	} catch (error) {
		// oxlint exits with code 1 as soon as it reports an error, or when the config is invalid.
		if (
			error instanceof Error &&
			'code' in error &&
			error.code === 1 &&
			'stdout' in error &&
			typeof error.stdout === 'string'
		) {
			return error.stdout;
		}
		throw error;
	}
}

/**
 * Runs oxlint the way a consumer would: from the fixture directory, which holds an
 * `oxlint.config.ts` that extends a preset from the built package.
 *
 * @param fixture The fixture directory inside `test/fixtures`.
 * @param file The file inside the fixture directory to lint.
 * @returns The reported diagnostics, or the config error.
 */
async function lintFixture(fixture: string, file: string): Promise<LintResult> {
	const stdout = await runOxlint(nodePath.join(fixturesDir, fixture), file);

	try {
		// The shape of oxlint's JSON output is not validated at runtime.
		// oxlint-disable-next-line typescript/no-unsafe-type-assertion
		return JSON.parse(stdout) as LintResult;
	} catch {
		// oxlint prints config errors as plain text, even with `--format=json`.
		return { configError: stdout.trim(), diagnostics: [] };
	}
}

describe.each([
	{
		file: 'floating-promise.ts',
		fixture: 'base',
		preset: 'baseConfig',
		rule: 'typescript(no-floating-promises)',
	},
	{
		file: 'duplicate-character.ts',
		fixture: 'base-js',
		preset: 'baseJsConfig',
		rule: 'regexp(no-dupe-characters-character-class)',
	},
	{
		file: 'deep-nesting.tsx',
		fixture: 'react',
		preset: 'reactConfig',
		rule: 'react(jsx-max-depth)',
	},
	{
		file: 'plain-image.tsx',
		fixture: 'nextjs',
		preset: 'nextJsConfig',
		rule: 'next(no-img-element)',
	},
	{
		file: 'Button.stories.tsx',
		fixture: 'storybook',
		preset: 'storybookConfig',
		rule: 'storybook(default-exports)',
	},
	{
		file: 'unknown-class.tsx',
		fixture: 'tailwindcss',
		preset: 'tailwindcssConfig',
		rule: 'better-tailwindcss(no-unknown-classes)',
	},
] as const)('$preset', ({ file, fixture, rule }) => {
	let result: LintResult;

	beforeAll(async () => {
		result = await lintFixture(fixture, file);
	});

	it('loads without a config error', () => {
		expect(result.configError).toBeUndefined();
	});

	it(`reports ${rule}`, () => {
		expect(result.diagnostics.map(({ code }) => code)).toContain(rule);
	});
});

describe('baseConfig top-level await', () => {
	it('reports top-level await in importable modules', async () => {
		const { diagnostics } = await lintFixture('base', 'top-level-await.ts');

		expect(diagnostics.map(({ code }) => code)).toContain('node(no-top-level-await)');
	});

	it('does not ask importable modules for top-level await', async () => {
		const { diagnostics } = await lintFixture('base', 'floating-promise.ts');

		expect(diagnostics.map(({ code }) => code)).not.toContain('unicorn(prefer-top-level-await)');
	});

	it('allows top-level await in files with a hashbang', async () => {
		const { diagnostics } = await lintFixture('base', 'bin.ts');

		expect(diagnostics.map(({ code }) => code)).not.toContain('node(no-top-level-await)');
	});

	it('allows top-level await in scripts', async () => {
		const { diagnostics } = await lintFixture('base', 'scripts/top-level-await.ts');

		expect(diagnostics.map(({ code }) => code)).not.toContain('node(no-top-level-await)');
	});

	it('asks scripts for top-level await', async () => {
		const { diagnostics } = await lintFixture('base', 'scripts/floating-promise.ts');

		expect(diagnostics.map(({ code }) => code)).toContain('unicorn(prefer-top-level-await)');
	});
});

describe('preset combination from the README', () => {
	it('loads without a config error', async () => {
		const { configError } = await lintFixture('combined', 'index.tsx');

		expect(configError).toBeUndefined();
	});
});

describe('tailwindcssConfig options', () => {
	it('passes `entryPoint` on, so utilities from the entry point CSS are known', async () => {
		const { diagnostics } = await lintFixture('tailwindcss', 'unknown-class.tsx');
		const unknownClassMessages = diagnostics
			.filter(({ code }) => code === 'better-tailwindcss(no-unknown-classes)')
			.map(({ message }) => message);

		// Without Tailwind CSS the plugin disables its rules, so first make sure the rule ran at all.
		expect(unknownClassMessages).toContainEqual(expect.stringContaining('not-a-tailwind-class'));
		expect(unknownClassMessages).not.toContainEqual(expect.stringContaining('brand-card'));
	});
});
