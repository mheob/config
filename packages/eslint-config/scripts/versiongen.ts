import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

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

for (const [key, value] of Object.entries(versions)) {
	if (value === 'catalog:') {
		versions[key] = 'latest';
	}
}

const targetFile = path.join(import.meta.dirname, '..', 'src', 'cli', 'versions-map.generated.ts');

await fs.writeFile(
	new URL(targetFile, import.meta.url),
	`export const versionsMap = ${JSON.stringify(versions, null, '\t')}`,
);

exec(`pnpm exec eslint ${targetFile} --fix`, (error, stdout, stderr) => {
	if (error) {
		console.error('ESLint execution failed:', error);
		process.exit(1);
	}

	if (stderr) {
		console.error('ESLint stderr:', stderr);
	}

	if (stdout.trim()) {
		console.log('ESLint output:', stdout);
	}

	console.log('✅ Generated versions map and applied ESLint fixes');
});
