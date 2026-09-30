import { defaultTSDownConfig } from '@mheob/internal/tsdown-config';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	pack: defaultTSDownConfig(),
	test: {
		// Every test starts oxlint with type-aware linting and JS plugins, which takes seconds when cold.
		hookTimeout: 30_000,
		testTimeout: 30_000,
	},
});
