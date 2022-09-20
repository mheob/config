import { type AvailablePackageManager, availablePackageManagers } from './packageManager';

/**
 * Check if the given package manager is correct and available.
 *
 * @param packageManager The package manager to check for.
 * @returns `true` if the package manager is correct and available, `false` otherwise.
 */
export function isCorrectPackageManager(packageManager: string): boolean {
	const manager = packageManager.toUpperCase() as AvailablePackageManager;
	return availablePackageManagers.includes(manager);
}
