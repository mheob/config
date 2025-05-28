import process from 'node:process';

/**
 * Checks if the current environment is an editor environment.
 *
 * The following conditions are considered to be an editor environment:
 *
 * - The `CI` environment variable is not set.
 * - The `GIT_PARAMS` environment variable is not set.
 * - The `VSCODE_PID` or `VSCODE_CWD` environment variable is set.
 * - The `JETBRAINS_IDE` environment variable is set.
 * - The `VIM` or `NVIM` environment variable is set.
 *
 * @returns `true` if the current environment is an editor environment, `false` otherwise.
 */
export function isInEditorEnv(): boolean {
	if (process.env.CI) return false;
	if (isInGitHooksOrLintStaged()) return false;
	return Boolean(
		process.env.VSCODE_PID ||
			process.env.VSCODE_CWD ||
			process.env.JETBRAINS_IDE ||
			process.env.VIM ||
			process.env.NVIM,
	);
}

/**
 * Checks if the current environment is a Git hooks or lint-staged environment.
 *
 * The following conditions are considered to be a Git hooks or lint-staged environment:
 *
 * - The `GIT_PARAMS` environment variable is set.
 * - The `VSCODE_GIT_COMMAND` environment variable is set.
 * - The `npm_lifecycle_script` environment variable starts with `lint-staged`.
 *
 * @returns `true` if the current environment is a Git hooks or lint-staged environment, `false` otherwise.
 */
export function isInGitHooksOrLintStaged(): boolean {
	return Boolean(
		process.env.GIT_PARAMS ||
			process.env.VSCODE_GIT_COMMAND ||
			process.env.npm_lifecycle_script?.startsWith('lint-staged'),
	);
}
