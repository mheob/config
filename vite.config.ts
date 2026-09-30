import { baseConfig as fmtBaseConfig } from '@mheob/oxfmt-config';
import { baseConfig as lintBaseConfig } from '@mheob/oxlint-config';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	fmt: {
		...fmtBaseConfig,
		ignorePatterns: ['CHANGELOG.md'],
	},
	lint: {
		extends: [lintBaseConfig],
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		options: { typeAware: true, typeCheck: true },
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
	},
});
