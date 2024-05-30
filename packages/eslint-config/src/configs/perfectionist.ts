import { perfectionistNatural, pluginPerfectionist } from '../plugins';
import type { TypedFlatConfigItem } from '../types';

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 *
 * @returns Perfectionist plugin
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
	return [
		perfectionistNatural,
		{
			name: 'mheob/perfectionist/setup',
			plugins: {
				perfectionist: pluginPerfectionist,
			},
			rules: {
				'perfectionist/sort-array-includes': ['error', { 'spread-last': true, type: 'natural' }],
				'perfectionist/sort-astro-attributes': [
					'error',
					{
						groups: ['multiline', 'unknown', ['shorthand', 'astro-shorthand']],
						type: 'natural',
					},
				],
				'perfectionist/sort-classes': ['error', { type: 'natural' }],
				'perfectionist/sort-enums': ['error', { type: 'natural' }],
				'perfectionist/sort-exports': ['error', { type: 'natural' }],
				'perfectionist/sort-imports': [
					'error',
					{
						groups: [
							'type',
							['builtin-type', 'builtin'],
							['external-type', 'external'],
							['internal-type', 'internal'],
							['parent-type', 'parent', 'sibling-type', 'sibling', 'index-type', 'index'],
							'side-effect',
							'style',
							'object',
							'unknown',
						],
						'internal-pattern': ['@/**'],
						type: 'natural',
					},
				],
				'perfectionist/sort-interfaces': ['error', { type: 'natural' }],
				'perfectionist/sort-intersection-types': ['error', { type: 'natural' }],
				'perfectionist/sort-jsx-props': [
					'error',
					{ groups: ['multiline', 'unknown', 'shorthand'], type: 'natural' },
				],
				'perfectionist/sort-maps': ['error', { type: 'natural' }],
				'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
				'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
				'perfectionist/sort-object-types': ['error', { type: 'natural' }],
				'perfectionist/sort-objects': ['error', { type: 'natural' }],
				'perfectionist/sort-svelte-attributes': [
					'error',
					{
						groups: ['multiline', 'unknown', ['shorthand', 'svelte-shorthand']],
						type: 'natural',
					},
				],
				'perfectionist/sort-union-types': ['error', { type: 'natural' }],
				'perfectionist/sort-vue-attributes': [
					'error',
					{ groups: ['multiline', 'unknown', 'shorthand'], type: 'natural' },
				],
			},
		},
	];
}
