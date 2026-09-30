import { defineConfig } from 'oxlint';

import { reactConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [reactConfig],
});
