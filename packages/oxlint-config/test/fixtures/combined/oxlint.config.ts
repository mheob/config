import { defineConfig } from 'oxlint';

import {
	baseConfig,
	baseJsConfig,
	reactConfig,
	storybookConfig,
	tailwindcssConfig,
} from '../../../dist/index.mjs';

export default defineConfig({
	extends: [baseConfig, baseJsConfig, reactConfig, storybookConfig, tailwindcssConfig()],
});
