import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import defaultConfig, { type UserConfig } from '@mheob/commitlint-config';

const currentPath = dirname(fileURLToPath(import.meta.url));

function getScopes() {
	const defaultScopes = ['deps', 'release', 'repo'];
	const packagesPath = resolve(currentPath, 'packages');
	const packages = existsSync(packagesPath)
		? readdirSync(packagesPath).map(packageName => packageName.replace('-config', ''))
		: [];
	return [...defaultScopes, ...packages];
}

const config = {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: getScopes(),
	},
} satisfies UserConfig;

export default config;
