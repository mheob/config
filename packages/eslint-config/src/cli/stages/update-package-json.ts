import fsp from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import * as p from '@clack/prompts';
import c from 'ansis';

import { version } from '../../../package.json';
import { dependenciesMap } from '../constants';
import type { PromptResult } from '../types';
import { versionsMap } from '../versions-map.generated';

export async function updatePackageJson(result: PromptResult): Promise<void> {
	const cwd = process.cwd();

	const pathPackageJSON = path.join(cwd, 'package.json');

	p.log.step(c.cyan`Bumping @mheob/eslint-config to v${version}`);

	const pkgContent = await fsp.readFile(pathPackageJSON, 'utf8');
	// eslint-disable-next-line ts/no-explicit-any
	const pkg: Record<string, any> = JSON.parse(pkgContent);

	pkg.devDependencies ??= {};
	pkg.devDependencies['@mheob/eslint-config'] = `^${version}`;
	pkg.devDependencies.eslint ??= versionsMap.eslint;

	const addedPackages: string[] = [];

	for (const framework of result.frameworks) {
		const deps = dependenciesMap[framework];
		if (deps) {
			for (const f of deps) {
				pkg.devDependencies[f] = versionsMap[f as keyof typeof versionsMap];
				addedPackages.push(f);
			}
		}
	}

	if (addedPackages.length > 0) p.note(c.dim(addedPackages.join(', ')), 'Added packages');

	await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2));
	p.log.success(c.green`Changes wrote to package.json`);
}
