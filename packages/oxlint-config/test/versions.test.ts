import oxlintTsgolintPackage from 'oxlint-tsgolint/package.json' with { type: 'json' };
import oxlintPackage from 'oxlint/package.json' with { type: 'json' };
import { describe, expect, it } from 'vite-plus/test';
import { versions } from 'vite-plus/versions';

import { peerDependencies } from '../package.json' with { type: 'json' };

const installed = {
	oxlint: oxlintPackage.version,
	'oxlint-tsgolint': oxlintTsgolintPackage.version,
};

// `vp lint` runs the oxlint that ships with Vite+, so the tests and the peer ranges follow it.
describe('oxlint versions', () => {
	it.each(['oxlint', 'oxlint-tsgolint'] as const)(
		'%s matches Vite+ (fix with `pnpm run oxlint:sync`)',
		(name) => {
			expect({ installed: installed[name], peer: peerDependencies[name] }).toStrictEqual({
				installed: versions[name],
				peer: `^${versions[name]}`,
			});
		},
	);
});
