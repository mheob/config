// Package packageManager holds the package manager related functions
package packageManager

import "check-package-manager/utils"

// GetSelectedPackageManager returns the selected package manager; default is PNPM
func GetSelectedPackageManager(args []string) PackageManager {
	if len(args) == 0 {
		return PNPM
	}

	switch args[0] {
	case NPM.Name:
		return NPM
	case YARN.Name:
		return YARN
	default:
		return PNPM
	}
}

// GetCheckLockFilesErrors returns a list of errors if the lock files are not correct
func GetCheckLockFilesErrors(selectedPackageManager PackageManager) []string {
	var errors []string

	for _, packageManager := range []PackageManager{NPM, PNPM, YARN} {
		if packageManager.Name == selectedPackageManager.Name {
			if !utils.FileExists(packageManager.LockFile) {
				errors = append(errors, utils.GetMissingLockFileMessage(packageManager.LockFile))
			}
		} else {
			if utils.FileExists(packageManager.LockFile) {
				errors = append(
					errors,
					utils.GetInvalidFileMessage(packageManager.LockFile, selectedPackageManager.LockFile),
				)
			}
		}
	}

	return errors
}
