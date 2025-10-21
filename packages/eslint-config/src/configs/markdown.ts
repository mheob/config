import { mergeProcessors, processorPassThrough } from 'eslint-merge-processors';

import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MARKDOWN_IN_MARKDOWN } from '../globs';
import type {
	OptionsComponentExtensions,
	OptionsFiles,
	OptionsOverrides,
	TypedFlatConfigItem,
} from '../types';
import { interopDefault, parserPlain } from '../utils';

/**
 * Configures the ESLint rules for Markdown.
 *
 * This function sets up the necessary ESLint plugin for Markdown,
 * including the `eslint-plugin-markdown`. It also configures the rules for Markdown,
 * including the no-alert, no-console, no-labels, no-lone-blocks, no-restricted-syntax,
 * no-undef, no-unused-expressions, no-unused-labels, no-unused-vars, node/prefer-global/process,
 * ts/await-thenable, ts/consistent-type-imports, ts/dot-notation, ts/no-floating-promises,
 * ts/no-for-in-array, ts/no-implied-eval, ts/no-misused-promises, ts/no-namespace,
 * ts/no-redeclare, ts/no-require-imports, ts/no-throw-literal, ts/no-unnecessary-type-assertion,
 * ts/no-unsafe-argument, ts/no-unsafe-assignment, ts/no-unsafe-call, ts/no-unsafe-member-access,
 * ts/no-unsafe-return, ts/no-unused-vars, ts/no-use-before-define, ts/no-var-requires,
 * ts/restrict-plus-operands, ts/restrict-template-expressions, ts/unbound-method, unicode-bom,
 * unused-imports/no-unused-imports, and unused-imports/no-unused-vars rules.
 *
 * @param options - The options for configuring the Markdown ESLint rules.
 * @returns Promise that resolves once the Markdown ESLint rules are configured.
 */
export async function markdown(
	options: OptionsComponentExtensions & OptionsFiles & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { componentExtensions = [], files = [GLOB_MARKDOWN], overrides = {} } = options;

	// @ts-expect-error missing types
	const markdown = await interopDefault(import('eslint-plugin-markdown'));

	return [
		{
			name: 'mheob/markdown/setup',
			plugins: {
				markdown,
			},
		},
		{
			files,
			ignores: [GLOB_MARKDOWN_IN_MARKDOWN],
			name: 'mheob/markdown/processor',
			// `eslint-plugin-markdown` only creates virtual files for code blocks,
			// but not the markdown file itself. We use `eslint-merge-processors` to
			// add a pass-through processor for the markdown file itself.
			processor: mergeProcessors([markdown.processors.markdown, processorPassThrough]),
		},
		{
			files,
			languageOptions: {
				parser: parserPlain,
			},
			name: 'mheob/markdown/parser',
		},
		{
			files: [
				GLOB_MARKDOWN_CODE,
				...componentExtensions.map(extension => `${GLOB_MARKDOWN}/**/*.${extension}`),
			],
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						impliedStrict: true,
					},
				},
			},
			name: 'mheob/markdown/disables',
			rules: {
				'no-alert': 'off',
				'no-console': 'off',
				'no-labels': 'off',
				'no-lone-blocks': 'off',
				'no-restricted-syntax': 'off',
				'no-undef': 'off',
				'no-unused-expressions': 'off',
				'no-unused-labels': 'off',
				'no-unused-vars': 'off',

				'node/prefer-global/process': 'off',

				'ts/await-thenable': 'off',
				'ts/consistent-type-imports': 'off',
				'ts/dot-notation': 'off',
				'ts/no-floating-promises': 'off',
				'ts/no-for-in-array': 'off',
				'ts/no-implied-eval': 'off',
				'ts/no-misused-promises': 'off',

				'ts/no-namespace': 'off',
				'ts/no-redeclare': 'off',
				'ts/no-require-imports': 'off',

				// Type aware rules
				'ts/no-throw-literal': 'off',
				'ts/no-unnecessary-type-assertion': 'off',
				'ts/no-unsafe-argument': 'off',
				'ts/no-unsafe-assignment': 'off',
				'ts/no-unsafe-call': 'off',
				'ts/no-unsafe-member-access': 'off',
				'ts/no-unsafe-return': 'off',
				'ts/no-unused-vars': 'off',
				'ts/no-use-before-define': 'off',
				'ts/no-var-requires': 'off',
				'ts/restrict-plus-operands': 'off',
				'ts/restrict-template-expressions': 'off',
				'ts/unbound-method': 'off',
				'unicode-bom': 'off',
				'unused-imports/no-unused-imports': 'off',
				'unused-imports/no-unused-vars': 'off',

				...overrides,
			},
		},
	];
}
