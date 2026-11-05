// Keeps the tools that Vite+ ships on the versions it bundles. `vp lint` and `vp fmt` run the
// bundled oxlint and oxfmt, and `vp test --coverage` refuses a coverage provider that doesn't match
// the bundled Vitest. The catalog pins them exactly, so pnpm installs a single copy that the tests
// share with Vite+, and the peer ranges of `@mheob/oxlint-config` start at the same versions.
//
// `node scripts/sync-vite-plus-versions.ts` reads the installed Vite+, so run `pnpm install` first.

import { readFile, writeFile } from 'node:fs/promises';

import { versions } from 'vite-plus/versions';

/** The catalog entries that follow Vite+, with the bundled version each one has to match. */
const catalogEntries = {
	'@vitest/coverage-v8': versions.vitest,
	oxfmt: versions.oxfmt,
	oxlint: versions.oxlint,
	'oxlint-tsgolint': versions['oxlint-tsgolint'],
};

/** The peer dependencies of `@mheob/oxlint-config` that start at the bundled versions. */
const oxlintPeers = ['oxlint', 'oxlint-tsgolint'] as const;

const workspaceUrl = new URL('../pnpm-workspace.yaml', import.meta.url);
const packageUrl = new URL('../packages/oxlint-config/package.json', import.meta.url);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Edits the catalog line in place, so comments and formatting of `pnpm-workspace.yaml` survive.
// Scoped names are quoted in the catalog, unscoped ones are not.
function pinCatalogEntry(workspace: string, name: string, version: string): string {
	const escapedName = name.replaceAll(/[$()*+.?[\\\]^{|}]/gu, String.raw`\$&`);
	const entry = new RegExp(
		String.raw`^(catalog:\n(?: {2}.*\n)*? {2}"?${escapedName}"?: ).*$`,
		'mu',
	);

	if (!entry.test(workspace)) {
		throw new Error(`pnpm-workspace.yaml: the catalog has no \`${name}\` entry.`);
	}

	return workspace.replace(entry, `$1${version}`);
}

const packageJson: unknown = JSON.parse(await readFile(packageUrl, 'utf8'));

if (!isRecord(packageJson) || !isRecord(packageJson.peerDependencies)) {
	throw new TypeError('packages/oxlint-config/package.json: `peerDependencies` is missing.');
}

let workspace = await readFile(workspaceUrl, 'utf8');

for (const [name, version] of Object.entries(catalogEntries)) {
	workspace = pinCatalogEntry(workspace, name, version);
}

for (const name of oxlintPeers) {
	packageJson.peerDependencies[name] = `^${versions[name]}`;
}

await writeFile(workspaceUrl, workspace);
await writeFile(packageUrl, `${JSON.stringify(packageJson, null, '\t')}\n`);
console.log(
	`Synced ${Object.entries(catalogEntries)
		.map(([name, version]: readonly [string, string]) => `${name}@${version}`)
		.join(', ')} from Vite+.`,
);
