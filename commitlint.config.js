import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

import defaultConfig from '@mheob/commitlint-config';

const currentPath = import.meta.dirname;

function getScopes() {
	const defaultScopes = ['deps', 'release', 'repo'];
	const packagesPath = path.resolve(currentPath, 'packages');
	const packages = existsSync(packagesPath)
		? readdirSync(packagesPath).map(packageName => packageName.replace('-config', ''))
		: [];
	return [...defaultScopes, ...packages];
}

/** @type {import('@mheob/commitlint-config').UserConfig} */
const config = {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: getScopes(),
	},
};

export default config;
