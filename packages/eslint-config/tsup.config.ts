import { defineConfig } from 'tsup';

export default defineConfig(options => ({
	dts: true,
	entry: ['src/index.ts', 'src/cli.ts'],
	format: ['esm'],
	minify: !options.watch,
}));
