import { defineConfig, type OxlintConfig } from 'oxlint';

import type { TailwindcssConfig } from './tailwindcss.types';

// `TailwindcssConfig` can't be made deeply readonly here.
// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export function tailwindcssConfig({
	options,
	ignoredClasses,
}: Readonly<TailwindcssConfig> = {}): OxlintConfig {
	return defineConfig({
		jsPlugins: ['eslint-plugin-better-tailwindcss'],

		settings: {
			'better-tailwindcss': options,
		},

		rules: {
			'better-tailwindcss/enforce-canonical-classes': ['error', { ignore: ignoredClasses ?? [] }],
			'better-tailwindcss/enforce-consistent-class-order': 'warn',
			'better-tailwindcss/enforce-consistent-line-wrapping': 'warn',
			'better-tailwindcss/no-conflicting-classes': 'error',
			'better-tailwindcss/no-deprecated-classes': 'warn',
			'better-tailwindcss/no-duplicate-classes': 'warn',
			'better-tailwindcss/no-unknown-classes': ['error', { ignore: ignoredClasses ?? [] }],
			'better-tailwindcss/no-unnecessary-whitespace': 'warn',
		},
	});
}
