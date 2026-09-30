import { defineConfig } from 'oxlint';

import { storybookConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [storybookConfig],
});
