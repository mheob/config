import fs from 'node:fs/promises';

import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';

import {
	astro,
	comments,
	formatters,
	imports,
	javascript,
	jsdoc,
	jsonc,
	markdown,
	node,
	perfectionist,
	react,
	sortPackageJson,
	stylistic,
	svelte,
	test,
	toml,
	typescript,
	unicorn,
	yaml,
} from '../src';
import { combine } from '../src/utils/array';

const configs = await combine(
	{
		plugins: {
			'': {
				rules: Object.fromEntries(builtinRules.entries()),
			},
		},
	},
	astro(),
	comments(),
	formatters(),
	imports(),
	javascript(),
	jsdoc(),
	jsonc(),
	markdown(),
	node(),
	perfectionist(),
	react(),
	sortPackageJson(),
	stylistic(),
	svelte(),
	test(),
	toml(),
	typescript(),
	unicorn(),
	yaml(),
);

const configNames = configs.map(i => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false });

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ') || 'never'}
`;

await fs.writeFile('src/typegen.d.ts', dts);
