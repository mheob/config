import fs from 'node:fs/promises';

import { dependencies, devDependencies } from '../package.json';
import { dependenciesMap } from '../src/cli/constants';

const names = [...new Set(['eslint', ...Object.values(dependenciesMap).flat()])];
const allDependencies = { ...dependencies, ...devDependencies };

const versions = Object.fromEntries(
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

const targetFile = '../src/cli/versions-map.generated.ts';

await fs.writeFile(
	new URL(targetFile, import.meta.url),
	`export const versionsMap = ${JSON.stringify(versions, null, '\t')}`,
);
