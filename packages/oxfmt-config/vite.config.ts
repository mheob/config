import { defaultTSDownConfig } from '@mheob/internal/tsdown-config';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	pack: defaultTSDownConfig(),
});
