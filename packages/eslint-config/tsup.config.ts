import { defineConfig } from 'tsup';

export default defineConfig(options => ({
	dts: true,
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	minify: !options.watch,
}));
