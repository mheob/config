import { describe, expect, it } from 'vite-plus/test';

import { defaultTSDownConfig } from '../src/tsdown.config';

describe(defaultTSDownConfig, () => {
	it('bundles `src/index.ts` as minified ESM with type declarations', () => {
		expect(defaultTSDownConfig()).toStrictEqual({
			dts: true,
			entry: ['src/index.ts'],
			format: ['esm'],
			minify: true,
		});
	});

	it('lets the overrides replace and extend the defaults', () => {
		expect(defaultTSDownConfig({ entry: ['src/cli.ts'], platform: 'node' })).toStrictEqual({
			dts: true,
			entry: ['src/cli.ts'],
			format: ['esm'],
			minify: true,
			platform: 'node',
		});
	});
});
