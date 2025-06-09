import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { parseDocument } from 'yaml';

function getPnpmWorkspaceYamlContent(): string {
	const workspacePath = path.join(process.cwd(), '..', '..', 'pnpm-workspace.yaml');
	const content = fs.readFileSync(workspacePath, 'utf8');
	return content;
}

function parsePnpmWorkspaceYamlToJSON(): {
	catalog?: Record<string, string>;
	catalogs?: Record<string, Record<string, string>>;
} {
	return parseDocument(getPnpmWorkspaceYamlContent()).toJSON();
}

function getPackageVersionFromCatalog(packageName: string): string {
	const pnpmWorkspace = parsePnpmWorkspaceYamlToJSON();
	return pnpmWorkspace.catalog?.[packageName] ?? 'latest';
}

function getPackageVersionFromNamedCatalog(catalogName: string, packageName: string): string {
	const pnpmWorkspace = parsePnpmWorkspaceYamlToJSON();
	return pnpmWorkspace.catalogs?.[catalogName]?.[packageName] ?? 'latest';
}

export function getPackageVersionFromPnpmWorkspaceYaml(
	packageName: string,
	catalogName?: string,
): string {
	return catalogName
		? getPackageVersionFromNamedCatalog(catalogName, packageName)
		: getPackageVersionFromCatalog(packageName);
}
