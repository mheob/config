import { defineConfig, type OxlintConfig } from 'oxlint';

import type { TailwindcssConfig } from './tailwindcss.types';

// `TailwindcssConfig` can't be made deeply readonly here.
// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export function tailwindcssConfig({
	options,
	ignoredClasses,
}: Readonly<TailwindcssConfig> = {}): OxlintConfig {
	// oxlint drops `settings` from configs used in `extends`, so the options go to every rule
	// instead. Each rule of the plugin accepts all of its common options.
	const ruleOptions = { ...options };
	const ignoreOptions = { ...options, ignore: ignoredClasses ?? [] };

	return defineConfig({
		jsPlugins: ['eslint-plugin-better-tailwindcss'],

		rules: {
			'better-tailwindcss/enforce-canonical-classes': ['error', ignoreOptions],
			'better-tailwindcss/enforce-consistent-class-order': ['warn', ruleOptions],
			'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', ruleOptions],
			'better-tailwindcss/no-concatenated-classes': ['error', ruleOptions],
			'better-tailwindcss/no-conflicting-classes': ['error', ruleOptions],
			'better-tailwindcss/no-deprecated-classes': ['warn', ruleOptions],
			'better-tailwindcss/no-duplicate-classes': ['warn', ruleOptions],
			'better-tailwindcss/no-unknown-classes': ['error', ignoreOptions],
			'better-tailwindcss/no-unnecessary-whitespace': ['warn', ruleOptions],
		},
	});
}
