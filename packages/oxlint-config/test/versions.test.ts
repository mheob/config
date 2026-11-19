import oxlintPackage from 'oxlint/package.json' with { type: 'json' };
import { describe, expect, it } from 'vite-plus/test';
import { versions } from 'vite-plus/versions';

import { peerDependencies } from '../package.json' with { type: 'json' };

// `vp lint` runs the oxlint that ships with Vite+, so the tests and the peer range follow it.
// `oxlint-tsgolint` does not: Vite+ runs type-aware rules through its own `tsrs` since 1.7.0.
describe('oxlint version', () => {
	it('matches Vite+ (fix with `pnpm run vite-plus:sync`)', () => {
		expect({ installed: oxlintPackage.version, peer: peerDependencies.oxlint }).toStrictEqual({
			installed: versions.oxlint,
			peer: `^${versions.oxlint}`,
		});
	});
});
