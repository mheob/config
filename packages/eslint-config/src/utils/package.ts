/* eslint-disable node/prefer-global/process */
import { win32 } from 'node:path';

import { resolvePathSync } from 'mlly';

import type { Awaitable } from '../types';

interface PackageResolvingOptions {
	paths?: string[];

	/**
	 * Resolve path as posix or win32
	 *
	 * @default 'auto'
	 */
	platform?: 'auto' | 'posix' | 'win32';
}

function resolve(path: string, options: PackageResolvingOptions = {}) {
	if (options.platform === 'auto' || !options.platform)
		options.platform = process.platform === 'win32' ? 'win32' : 'posix';

	const modulePath = resolvePathSync(path, { url: options.paths });

	if (options.platform === 'win32')
		return win32.normalize(modulePath);

	return modulePath;
}

function resolvePackage(name: string, options: PackageResolvingOptions = {}) {
	try {
		return resolve(`${name}/package.json`, options);
	}
	catch {}

	try {
		return resolve(name, options);
	}
	catch (error: any) {
		// compatible with nodejs and mlly error
		if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ERR_MODULE_NOT_FOUND')
			console.error(error);

		return false;
	}
}

export function existsPackage(name: string, options: PackageResolvingOptions = {}) {
	return !!resolvePackage(name, options);
}

export async function interopDefault<T>(
	m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
	const resolved = await m;
	return (resolved as any).default || resolved;
}

export async function ensurePackages(packages: (string | undefined)[]) {
	if (process.env.CI || process.stdout.isTTY === false)
		return;

	const nonExistingPackages = packages.filter(i => i && !existsPackage(i)) as string[];
	if (nonExistingPackages.length === 0)
		return;

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
