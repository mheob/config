import fs from 'node:fs/promises';
import path from 'node:path';

import { dependencies, devDependencies } from '../package.json';
import { dependenciesMap } from '../src/cli/constants';
import { getPackageVersionFromPnpmWorkspaceYaml } from './utils/pnpm-workspace';

const names = [...new Set(['eslint', ...Object.values(dependenciesMap).flat()])];
const allDependencies = { ...dependencies, ...devDependencies };

const versions: Record<string, string> = Object.fromEntries(
	names
		.map(name => {
			const version = allDependencies[name];
			if (!version) {
				throw new Error(`Dependency "${name}" not found in package.json dependencies`);
			}
			return [name, version];
		})
		.sort((a, b) => a[0].localeCompare(b[0])),
);

for (const [key, value] of Object.entries(versions)) {
	if (value === 'catalog:' || value.startsWith('catalog:')) {
		const catalogName = value.split(':')[1] || undefined;
		versions[key] = getPackageVersionFromPnpmWorkspaceYaml(key, catalogName);
	}
}

const targetFile = path.join(import.meta.dirname, '..', 'src', 'cli', 'versions-map.generated.ts');

await fs.writeFile(
	new URL(targetFile, import.meta.url),
	`export const versionsMap = ${JSON.stringify(versions, null, '\t')}`,
);
