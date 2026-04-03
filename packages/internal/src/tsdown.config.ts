import { defineConfig, type UserConfig, type UserConfigFn } from 'tsdown';

export const defaultTSDownConfig = (overrides?: UserConfig): UserConfigFn =>
	defineConfig(options => ({
		dts: true,
		entry: ['src/index.ts'],
		format: ['esm'],
		minify: !options.watch,
		...overrides,
	}));
