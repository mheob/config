import type { PackUserConfig } from 'vite-plus/pack';

// `PackUserConfig` is a mutable type owned by tsdown, so the parameter can't be made
// deeply readonly here.
// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export function defaultTSDownConfig(overrides?: PackUserConfig): PackUserConfig {
	return {
		dts: true,
		entry: ['src/index.ts'],
		format: ['esm'],
		minify: true,
		...overrides,
	};
}
