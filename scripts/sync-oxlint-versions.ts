// Keeps `oxlint` and `oxlint-tsgolint` on the versions that ship with Vite+, because `vp lint` runs
// those. The catalog pins them exactly, so pnpm installs a single copy that the tests share with
// Vite+, and the peer ranges of `@mheob/oxlint-config` start at the same versions.
//
// `node scripts/sync-oxlint-versions.ts` reads the installed Vite+, so run `pnpm install` first.

import { readFile, writeFile } from 'node:fs/promises';

import { versions } from 'vite-plus/versions';

const tools = ['oxlint', 'oxlint-tsgolint'] as const;

const workspaceUrl = new URL('../pnpm-workspace.yaml', import.meta.url);
const packageUrl = new URL('../packages/oxlint-config/package.json', import.meta.url);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Edits the catalog line in place, so comments and formatting of `pnpm-workspace.yaml` survive.
function pinCatalogEntry(workspace: string, name: string, version: string): string {
	const entry = new RegExp(`^(catalog:\\n(?: {2}.*\\n)*? {2}${name}: ).*$`, 'mu');

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

for (const name of tools) {
	workspace = pinCatalogEntry(workspace, name, versions[name]);
	packageJson.peerDependencies[name] = `^${versions[name]}`;
}

await writeFile(workspaceUrl, workspace);
await writeFile(packageUrl, `${JSON.stringify(packageJson, null, '\t')}\n`);
console.log(`Synced ${tools.map((name) => `${name}@${versions[name]}`).join(', ')} from Vite+.`);
