import { defineConfig } from 'oxlint';

import { nextJsConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [nextJsConfig],
});
