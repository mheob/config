import { defineConfig } from 'oxlint';

import { baseConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [baseConfig],
});
