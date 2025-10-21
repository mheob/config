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
 * Configures the ESLint rules for perfectionist.
 *
 * This function sets up the necessary ESLint plugin for perfectionist,
 * including the `eslint-plugin-perfectionist`. It also configures the rules for perfectionist,
 * including the sort-array-includes, sort-classes, sort-enums, sort-exports, sort-imports,
 * sort-interfaces, sort-intersection-types, sort-jsx-props, sort-maps, sort-named-exports,
 * sort-named-imports, sort-object-types, sort-objects, and sort-union-types rules.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 *
 * @returns Promise that resolves once the perfectionist ESLint rules are configured.
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
