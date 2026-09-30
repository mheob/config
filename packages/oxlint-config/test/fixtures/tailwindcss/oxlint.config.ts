import { defineConfig } from 'oxlint';

import { tailwindcssConfig } from '../../../dist/index.mjs';

export default defineConfig({
	extends: [tailwindcssConfig({ options: { entryPoint: 'app.css' } })],
});
