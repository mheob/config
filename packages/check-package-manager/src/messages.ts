import { availablePackageManagers } from './packageManager';

/**
 * Creates an error message for incorrect package manager.
 *
 * @param packageManager The package manager to check for.
 * @returns The error message.
 */
export function getInvalidPackageManagerMessage(packageManager: string): string {
	let message = `- Package manager "${packageManager}" is invalid or not supported.`;
	message += ` Please use one of the following: ${availablePackageManagers.join(', ')}`;
	return message;
}

/**
 * Creates an error message for using an incorrect package manager lock file.
 *
 * @param lockFile The lock file of the package manager to check for.
 * @param lockFileSelected The lock file of the package manager selected by the user.
 * @returns The error message.
 */
export function getInvalidFileMessage(lockFile: string, lockFileSelected: string): string {
	let message = `- Invalid occurrence of "${lockFile}" file.`;
	message += ` Please remove it and use only "${lockFileSelected}".`;
	return message;
}

/**
 * Creates an error message for missing package manager lock file.
 *
 * @param lockFile The lock file of the package manager to check for.
 * @returns The error message.
 */
export function getMissingLockFileMessage(lockFile: string): string {
	let message = `- The "${lockFile}" does not exist or cannot be read.`;
	message += ' Please run the installer of your package manager.';
	return message;
}
