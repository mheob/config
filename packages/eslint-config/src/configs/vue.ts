import { GLOB_VUE } from '../globs';
import type {
	OptionsFiles,
	OptionsHasTypeScript,
	OptionsOverrides,
	TypedFlatConfigItem,
} from '../types';
import { interopDefault } from '../utils';

export async function vue(
	options: OptionsFiles & OptionsHasTypeScript & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { files = [GLOB_VUE], overrides = {} } = options;

	const [pluginVue, parserVue] = await Promise.all([
		interopDefault(import('eslint-plugin-vue')),
		interopDefault(import('vue-eslint-parser')),
	] as const);

	return [
		{
			// This allows Vue plugin to work with auto imports
			// https://github.com/vuejs/eslint-plugin-vue/pull/2422
			languageOptions: {
				globals: {
					computed: 'readonly',
					defineEmits: 'readonly',
					defineExpose: 'readonly',
					defineProps: 'readonly',
					onMounted: 'readonly',
					onUnmounted: 'readonly',
					reactive: 'readonly',
					ref: 'readonly',
					shallowReactive: 'readonly',
					shallowRef: 'readonly',
					toRef: 'readonly',
					toRefs: 'readonly',
					watch: 'readonly',
					watchEffect: 'readonly',
				},
			},
			name: 'mheob/vue/setup',
			plugins: {
				vue: pluginVue,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserVue,
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
					extraFileExtensions: ['.vue'],
					parser: options.typescript
						? ((await interopDefault(import('@typescript-eslint/parser'))) as any)
						: null,
					sourceType: 'module',
				},
			},
			name: 'mheob/vue/rules',
			processor: pluginVue.processors['.vue'],
			rules: {
				...(pluginVue.configs.base.rules as any),

				...(pluginVue.configs['flat/essential']
					.map(c => c.rules)
					.reduce((accumulator, c) => ({ ...accumulator, ...c }), {}) as any),
				...(pluginVue.configs['flat/strongly-recommended']
					.map(c => c.rules)
					.reduce((accumulator, c) => ({ ...accumulator, ...c }), {}) as any),
				...(pluginVue.configs['flat/recommended']
					.map(c => c.rules)
					.reduce((accumulator, c) => ({ ...accumulator, ...c }), {}) as any),
				'antfu/no-top-level-await': 'off',
				'node/prefer-global/process': 'off',
				'ts/explicit-function-return-type': 'off',

				'vue/block-order': [
					'error',
					{
						order: ['script', 'template', 'style'],
					},
				],
				'vue/component-name-in-template-casing': ['error', 'PascalCase'],
				'vue/component-options-name-casing': ['error', 'PascalCase'],
				// this is deprecated
				'vue/component-tags-order': 'off',
				'vue/custom-event-name-casing': ['error', 'camelCase'],
				'vue/define-macros-order': [
					'error',
					{
						order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
					},
				],
				'vue/dot-location': ['error', 'property'],
				'vue/dot-notation': ['error', { allowKeywords: true }],
				'vue/eqeqeq': ['error', 'smart'],
				'vue/max-attributes-per-line': 'off',
				'vue/multi-word-component-names': 'off',
				'vue/no-dupe-keys': 'off',
				'vue/no-empty-pattern': 'error',
				'vue/no-irregular-whitespace': 'error',
				'vue/no-loss-of-precision': 'error',
				'vue/no-restricted-syntax': [
					'error',
					'DebuggerStatement',
					'LabeledStatement',
					'WithStatement',
				],
				'vue/no-restricted-v-bind': ['error', '/^v-/'],
				'vue/no-setup-props-reactivity-loss': 'off',
				'vue/no-sparse-arrays': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-v-bind': 'error',
				'vue/no-v-html': 'off',
				'vue/object-shorthand': [
					'error',
					'always',
					{
						avoidQuotes: true,
						ignoreConstructors: false,
					},
				],
				'vue/prefer-separate-static-class': 'error',
				'vue/prefer-template': 'error',
				'vue/prop-name-casing': ['error', 'camelCase'],
				'vue/require-default-prop': 'off',
				'vue/require-prop-types': 'off',
				'vue/space-infix-ops': 'error',
				'vue/space-unary-ops': ['error', { nonwords: false, words: true }],

				...overrides,
			},
		},
	];
}
