import { execFile } from 'node:child_process';
import { createRequire } from 'node:module';
import nodePath from 'node:path';
import process from 'node:process';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vite-plus/test';

interface LintResult {
	readonly exitCode: number;
	readonly output: string;
}

// `execFile` returns the child process, which `promisify` ignores in favor of its promise overload.
// oxlint-disable-next-line typescript/strict-void-return
const execFileAsync = promisify(execFile);
const commitlintBin = nodePath.join(
	nodePath.dirname(createRequire(import.meta.url).resolve('@commitlint/cli/package.json')),
	'cli.js',
);
const configPath = nodePath.join(import.meta.dirname, '../dist/index.mjs');

/**
 * Lints a commit message with the commitlint CLI and the built config, the way a `commit-msg`
 * hook does.
 *
 * @param message The commit message to lint.
 * @returns The exit code and the printed problems.
 */
async function lintMessage(message: string): Promise<LintResult> {
	const pending = execFileAsync(process.execPath, [commitlintBin, '--config', configPath]);
	pending.child.stdin?.end(message);

	try {
		const { stdout } = await pending;
		return { exitCode: 0, output: stdout };
	} catch (error) {
		// commitlint exits with code 1 as soon as it reports a problem.
		if (
			error instanceof Error &&
			'code' in error &&
			error.code === 1 &&
			'stdout' in error &&
			typeof error.stdout === 'string'
		) {
			return { exitCode: error.code, output: error.stdout };
		}
		throw error;
	}
}

describe('commitlint config', () => {
	it.each([
		'feat(api): remove the GetMe query',
		'feat(api)!: remove the GetMe query',
		'feat!: remove the GetMe query',
		'fix(deps,repo)!: drop the support for Node.js 22',
	])('accepts `%s`', async (message) => {
		await expect(lintMessage(message)).resolves.toStrictEqual({ exitCode: 0, output: '' });
	});

	it.each([
		{ message: 'feet(api)!: remove the GetMe query', rule: 'type-enum' },
		{ message: 'feat(api)!: Remove the query', rule: 'subject-case' },
		{ message: 'feat(api)!: remove the GetMe query.', rule: 'subject-full-stop' },
	] as const)('rejects `$message` with $rule', async ({ message, rule }) => {
		const result = await lintMessage(message);

		expect(result.exitCode).toBe(1);
		expect(result.output).toContain(`[${rule}]`);
	});
});
