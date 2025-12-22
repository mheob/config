import type { OptionsConfig } from './types';

export const CONFIG_PRESET_FULL_ON: OptionsConfig = {
	astro: true,
	gitignore: true,
	jsdoc: true,
	jsonc: true,
	jsx: true,
	markdown: true,
	nextjs: true,
	node: true,
	react: {
		reactCompiler: true,
	},
	regexp: true,
	solid: true,
	svelte: true,
	test: true,
	toml: true,
	typescript: {
		tsconfigPath: 'tsconfig.json',
	},
	unicorn: true,
	vue: true,
	yaml: true,
};

export const CONFIG_PRESET_FULL_OFF: OptionsConfig = {
	astro: false,
	gitignore: false,
	jsdoc: false,
	jsonc: false,
	jsx: false,
	markdown: false,
	nextjs: false,
	node: false,
	react: false,
	regexp: false,
	solid: false,
	stylistic: false,
	svelte: false,
	test: false,
	toml: false,
	typescript: false,
	unicorn: false,
	vue: false,
	yaml: false,
};
