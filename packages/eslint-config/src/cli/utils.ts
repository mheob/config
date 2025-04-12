import { execSync } from 'node:child_process';

/**
 * Checks if the current working directory is clean according to Git.
 *
 * @returns `true` if the current working directory is clean, `false` otherwise.
 */
export function isGitClean(): boolean {
	try {
		execSync('git diff-index --quiet HEAD --');
		return true;
	} catch {
		return false;
	}
}

/**
 * Generates the content for an ESLint configuration file.
 *
 * @param mainConfig - The main configuration object.
 * @param additionalConfigs - Optional additional configurations to be merged.
 * @returns The generated ESLint configuration content.
 */
export function getEslintConfigContent(mainConfig: string, additionalConfigs?: string[]): string {
	return `
import defaultConfig from '@mheob/eslint-config'

export default defaultConfig({
${mainConfig}
}${additionalConfigs?.map(config => `,{\n${config}\n}`)})
`.trimStart();
}
