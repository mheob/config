export const availablePackageManagers = ['NPM', 'PNPM', 'YARN'] as const;
export type AvailablePackageManager = typeof availablePackageManagers[number];

type PackageManagerDetails = { name: AvailablePackageManager; lockFile: string };
type PackageManager = Record<AvailablePackageManager, PackageManagerDetails>;

/** The available package managers with their name and lock file. */
export const packageManagerDetails: PackageManager = {
	NPM: { name: 'NPM', lockFile: 'package-lock.json' },
	PNPM: { name: 'PNPM', lockFile: 'pnpm-lock.yaml' },
	YARN: { name: 'YARN', lockFile: 'yarn.lock' },
};
