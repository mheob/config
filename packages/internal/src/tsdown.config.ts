import type { UserConfig, UserConfigFn } from 'tsdown';
import { defineConfig } from 'tsdown';

// `UserConfig` and the `defineConfig` callback options are mutable types owned by
// tsdown, so neither parameter can be made deeply readonly here.
// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export function defaultTSDownConfig(overrides?: UserConfig): UserConfigFn {
	// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
	return defineConfig((options) => ({
		dts: true,
		entry: ['src/index.ts'],
		format: ['esm'],
		// `watch` is `boolean | string | string[]`, so compare explicitly instead of
		// relying on the truthiness of a mixed union.
		minify: options.watch === undefined || options.watch === false,
		...overrides,
	}));
}
