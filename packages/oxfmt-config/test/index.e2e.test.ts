import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import nodePath from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vite-plus/test';

interface CheckResult {
	readonly exitCode: number;
	readonly output: string;
}

// `execFile` returns the child process, which `promisify` ignores in favor of its promise overload.
// oxlint-disable-next-line typescript/strict-void-return
const execFileAsync = promisify(execFile);
const oxfmtBin = nodePath.join(
	nodePath.dirname(createRequire(import.meta.url).resolve('oxfmt/package.json')),
	'bin/oxfmt',
);
const fixturesDir = nodePath.join(import.meta.dirname, 'fixtures');

// Under `vp`, oxfmt sees `VP_*` variables and reads the `fmt` block of the nearest
// `vite.config.ts` instead of the fixture's `oxfmt.config.ts`. Consumers run plain oxfmt.
const oxfmtEnv = Object.fromEntries(
	// oxlint-disable-next-line node/no-process-env
	Object.entries(process.env).filter(([key]: readonly [string, unknown]) => !key.startsWith('VP_')),
);

/**
 * Checks a fixture with oxfmt the way a consumer would: with an `oxfmt.config.ts` that uses the
 * preset from the built package.
 *
 * @param file The file inside `test/fixtures`.
 * @returns The exit code and the printed output.
 */
async function checkFixture(file: string): Promise<CheckResult> {
	try {
		const { stdout } = await execFileAsync(
			oxfmtBin,
			['--check', '--config', 'oxfmt.config.ts', file],
			{ cwd: fixturesDir, env: oxfmtEnv },
		);
		return { exitCode: 0, output: stdout };
	} catch (error) {
		// oxfmt exits with code 1 when a file is not formatted.
		if (
			error instanceof Error &&
			'code' in error &&
			typeof error.code === 'number' &&
			'stdout' in error &&
			typeof error.stdout === 'string'
		) {
			return { exitCode: error.code, output: error.stdout };
		}
		throw error;
	}
}

// The fixtures are formatted with the preset. `index.ts` fails the check with oxfmt's defaults, and
// `README.md` and `workflow.yml` fail when the pattern of their override doesn't match.
describe('oxfmt with the built preset', () => {
	it.each([
		{ file: 'index.ts', title: 'single quotes and tabs' },
		{ file: 'README.md', title: 'unwrapped Markdown prose' },
		{ file: 'workflow.yml', title: 'YAML with spaces and double quotes' },
		{ file: 'tsconfig.json', title: '`tsconfig.json` with comments' },
	] as const)('accepts $file ($title)', async ({ file }) => {
		// The whole result, so a failure shows the output of oxfmt.
		await expect(checkFixture(file)).resolves.toMatchObject({ exitCode: 0 });
	});
});
