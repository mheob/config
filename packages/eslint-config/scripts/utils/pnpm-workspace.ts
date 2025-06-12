import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { parseDocument } from 'yaml';

function findWorkspaceRoot(startDirectory: string = process.cwd()): string {
	let currentDirectory = path.resolve(startDirectory);
	const root = path.parse(currentDirectory).root;

	while (currentDirectory !== root) {
		const workspaceFilePath = path.join(currentDirectory, 'pnpm-workspace.yaml');
		if (fs.existsSync(workspaceFilePath)) return currentDirectory;
		currentDirectory = path.dirname(currentDirectory);
	}

	throw new Error(`pnpm-workspace.yaml not found in any parent directory of ${startDirectory}`);
}

function getPnpmWorkspaceYamlContent(): string {
	const workspaceRoot = findWorkspaceRoot();
	const workspacePath = path.join(workspaceRoot, 'pnpm-workspace.yaml');
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
