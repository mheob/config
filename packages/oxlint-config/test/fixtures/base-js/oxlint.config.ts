import { defineConfig } from 'oxlint';

import { baseJsConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [baseJsConfig],
});
