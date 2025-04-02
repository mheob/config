import fs from 'node:fs/promises';

import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';

import {
	astro,
	comments,
	imports,
	javascript,
	jsdoc,
	jsonc,
	markdown,
	node,
	perfectionist,
	prettier,
	react,
	regexp,
	sortPackageJson,
	svelte,
	test,
	toml,
	typescript,
	unicorn,
	vue,
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
	imports(),
	javascript(),
	jsdoc(),
	jsonc(),
	markdown(),
	node(),
	perfectionist(),
	prettier(),
	react(),
	regexp(),
	sortPackageJson(),
	svelte(),
	test(),
	toml(),
	typescript(),
	unicorn(),
	vue(),
	yaml(),
);

const configNames = configs.map(i => i.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, { includeAugmentation: false });

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ') || 'never'}
`;

await fs.writeFile('src/typegen.d.ts', dts);
