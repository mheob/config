import { pluginPerfectionist } from '../plugins';
import type {
	PerfectionistSortInterfaces,
	PerfectionistSortObjects,
	PerfectionistSortObjectTypes,
} from '../typegen';
import type { TypedFlatConfigItem } from '../types';

type PerfectionistSortCustom =
	| PerfectionistSortInterfaces[number]
	| PerfectionistSortObjects[number]
	| PerfectionistSortObjectTypes[number];

const customSort = {
	customGroups: [
		{
			elementNamePattern: '^id$',
			groupName: 'top',
			selector: 'property',
			type: 'natural',
		},
	],
	groups: [
		'top',
		['multiline-optional-method', 'optional-multiline-method'],
		'method',
		['multiline-optional-member', 'optional-multiline-member'],
		'member',
		'unknown',
	],
	type: 'natural',
} satisfies PerfectionistSortCustom;

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 *
 * @returns Perfectionist plugin
 */
export async function perfectionist(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			name: 'mheob/perfectionist/setup',
			plugins: {
				perfectionist: pluginPerfectionist,
			},
		},
		{
			name: 'mheob/perfectionist/rules',
			rules: {
				'perfectionist/sort-array-includes': ['error', { groups: ['literal'], type: 'natural' }],
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
						internalPattern: ['^@/.*', '^~/.*'],
						type: 'natural',
					},
				],
				'perfectionist/sort-interfaces': ['error', customSort],
				'perfectionist/sort-intersection-types': ['error', { type: 'natural' }],
				'perfectionist/sort-jsx-props': [
					'error',
					{ groups: ['multiline', 'unknown', 'shorthand'], type: 'natural' },
				],
				'perfectionist/sort-maps': ['error', { type: 'natural' }],
				'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
				'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
				'perfectionist/sort-object-types': ['error', customSort],
				'perfectionist/sort-objects': [
					'error',
					{
						customGroups: customSort.customGroups,
						groups: [
							'top',
							['multiline-method', 'method', 'multiline-member', 'member', 'unknown'],
						],
						type: customSort.type,
					},
				],
				'perfectionist/sort-union-types': ['error', { type: 'natural' }],
			},
		},
	];
}
