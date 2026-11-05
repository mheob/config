import { describe, expect, it } from 'vite-plus/test';

import * as presets from '../src/index';

// What the presets report is covered by `presets.e2e.test.ts`, which runs oxlint on fixtures.
describe('public API', () => {
	it('exports every preset', () => {
		expect(Object.keys(presets).toSorted()).toStrictEqual([
			'baseConfig',
			'baseJsConfig',
			'nextJsConfig',
			'reactConfig',
			'storybookConfig',
			'tailwindcssConfig',
		]);
	});

	it('builds the Next.js preset on top of the React preset', () => {
		expect(presets.nextJsConfig.extends).toStrictEqual([presets.reactConfig]);
	});
});
