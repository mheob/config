import { getCheckLockFilesErrors } from './check';

const packageManagerArgument = process.argv[2];
const invalidLockFileErrors = getCheckLockFilesErrors(packageManagerArgument);
const hasErrors = invalidLockFileErrors.length > 0;

if (hasErrors) {
	console.info('Invalid package manager or lock files found:');
	for (const error of invalidLockFileErrors) {
		console.warn(error);
	}
	process.exit(1);
}
