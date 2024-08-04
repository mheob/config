/* eslint-disable node/prefer-global/process, ts/no-explicit-any */
import nodePath from 'node:path';

import { resolvePathSync } from 'mlly';

import type { Awaitable } from '../types';

interface PackageResolvingOptions {
	/**
	 * An optional array of paths to search for the package.
	 */
	paths?: string[];

	/**
	 * Resolve path as posix or win32
	 *
	 * @default 'auto'
	 */
	platform?: 'auto' | 'posix' | 'win32';
}

function resolve(path: string, options: PackageResolvingOptions = {}) {
	if (options.platform === 'auto' || !options.platform) {
		options.platform = process.platform === 'win32' ? 'win32' : 'posix';
	}

	const modulePath = resolvePathSync(path, { url: options.paths });

	if (options.platform === 'win32') {
		return nodePath.win32.normalize(modulePath);
	}

	return modulePath;
}

function resolvePackage(name: string, options: PackageResolvingOptions = {}) {
	try {
		return resolve(`${name}/package.json`, options);
	} catch {}

	try {
		return resolve(name, options);
	} catch (error: any) {
		// compatible with nodejs and mlly error
		if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ERR_MODULE_NOT_FOUND') {
			console.error(error);
		}

		return false;
	}
}

/**
 * Checks if a package with the given name exists.
 *
 * @param name - The name of the package to check.
 * @param options - Optional options for resolving the package.
 * @returns `true` if the package exists, `false` otherwise.
 */
export function existsPackage(name: string, options: PackageResolvingOptions = {}) {
	return Boolean(resolvePackage(name, options));
}

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
	return (resolved as any).default || resolved;
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
export async function ensurePackages(packages: (string | undefined)[]) {
	if (process.env.CI || process.stdout.isTTY === false) {
		return;
	}

	const nonExistingPackages = packages.filter(i => i && !existsPackage(i)) as string[];
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
