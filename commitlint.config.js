const { existsSync, readdirSync } = require('node:fs');
const { resolve } = require('node:path');

const defaultConfig = require('@mheob/commitlint-config');

function getScopes() {
	const defaultScopes = ['deps', 'release', 'repo'];
	const packagesPath = resolve(__dirname, 'packages');
	const packages = existsSync(packagesPath)
		? readdirSync(packagesPath).map(packageName => packageName.replace('-config', ''))
		: [];
	return [...defaultScopes, ...packages];
}

/** @type {import('cz-git').UserConfig} */
module.exports = {
	...defaultConfig,
	prompt: {
		...defaultConfig.prompt,
		scopes: getScopes(),
	},
};
