import { existsSync } from 'node:fs';

import {
	getInvalidFileMessage,
	getInvalidPackageManagerMessage,
	getMissingLockFileMessage,
} from './messages';
import type { AvailablePackageManager } from './packageManager';
import { availablePackageManagers, packageManagerDetails } from './packageManager';
import { isCorrectPackageManager } from './utils';

/**
 * Check if the lock file is the correct one for the package manager.
 *
 * @param selectedPackageManager The package manager to check for. Defaults to `PNPM`.
 * @returns An array of error messages. If the array is empty, there are no errors.
 */
export function getCheckLockFilesErrors(
	selectedPackageManager: string = packageManagerDetails.PNPM.name,
): string[] {
	if (!isCorrectPackageManager(selectedPackageManager)) {
		return [getInvalidPackageManagerMessage(selectedPackageManager)];
	}

	const selectedManager = selectedPackageManager.toUpperCase() as AvailablePackageManager;
	const errors: string[] = [];

	for (const manager of availablePackageManagers) {
		const lockFile = packageManagerDetails[manager].lockFile;
		if (manager === selectedManager) {
			!existsSync(lockFile) && errors.push(getMissingLockFileMessage(lockFile));
		} else {
			const selectedLockFile = packageManagerDetails[selectedManager].lockFile;
			existsSync(lockFile) && errors.push(getInvalidFileMessage(lockFile, selectedLockFile));
		}
	}

	return errors;
}
