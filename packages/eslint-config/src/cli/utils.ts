import { execSync } from 'node:child_process';

export function isGitClean() {
	try {
		execSync('git diff-index --quiet HEAD --');
		return true;
	} catch {
		return false;
	}
}

export function getEslintConfigContent(mainConfig: string, additionalConfigs?: string[]) {
	return `
import mheob from '@mheob/eslint-config'

export default mheob({
${mainConfig}
}${additionalConfigs?.map(config => `,{\n${config}\n}`)})
`.trimStart();
}
