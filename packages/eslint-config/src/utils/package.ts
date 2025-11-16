import process from 'node:process';

import { isPackageExists } from 'local-pkg';

import type { Awaitable } from '../types';

/**
 * Interop default export from a module.
 *
 * This function takes a module that may have a default export, and returns the default export if
 * it exists, or the module itself if there is no default export.
 *
 * @param m - The module to interop the default export from.
 * @returns The default export of the module, or the module itself if there is no default export.
 */
export async function interopDefault<T>(
	m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
	const resolved = await m;

	// eslint-disable-next-line ts/no-explicit-any
	return (resolved as any).default ?? resolved;
}

/**
 * Ensures that the specified packages are installed. If any of the packages are not installed,
 * it prompts the user to install them.
 *
 * This function is only executed if the process is not running in a CI environment or if the
 * stdout is not a TTY.
 *
 * @param packages - An array of package names. Undefined values in the array will be ignored.
 * @returns A Promise that resolves when the packages have been installed (if necessary).
 */
export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
	if (process.env.CI || process.stdout.isTTY === false) {
		return;
	}

	const nonExistingPackages = packages.filter(i => i && !isPackageExists(i)) as string[];

	if (nonExistingPackages.length === 0) {
		return;
	}

	const p = await import('@clack/prompts');
	const result = await p.confirm({
		message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
	});

	if (result) {
		await import('@antfu/install-pkg').then(i =>
			i.installPackage(nonExistingPackages, { dev: true }),
		);
	}
}
