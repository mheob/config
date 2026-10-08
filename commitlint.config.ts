// oxlint-disable node/no-sync

import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

import defaultConfig, { type UserConfig } from '@mheob/commitlint-config';

const currentPath = import.meta.dirname;

function getScopes(): string[] {
	const defaultScopes = ['deps', 'release', 'repo'];
	const packagesPath = path.resolve(currentPath, 'packages');
	const packages = existsSync(packagesPath)
		? readdirSync(packagesPath).map((packageName) => packageName.replace('-config', ''))
		: [];
	return [...defaultScopes, ...packages];
}

const config: UserConfig = {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: getScopes(),
	},
};

export default config;
