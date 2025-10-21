/* eslint-disable ts/no-explicit-any */
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs';
import { pluginAntfu } from '../plugins';
import type {
	OptionsComponentExtensions,
	OptionsFiles,
	OptionsOverrides,
	OptionsTypeScriptParserOptions,
	OptionsTypeScriptWithTypes,
	TypedFlatConfigItem,
} from '../types';
import { interopDefault, renameRules, toArray } from '../utils';

/**
 * Configures the ESLint rules for TypeScript.
 *
 * This function sets up the necessary ESLint plugins and parsers for TypeScript projects,
 * including the `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser`.
 * It also configures the language options for the TypeScript files, including the parser,
 * parser options, and source type.
 *
 * @param options - The options for configuring the TypeScript ESLint rules.
 * @returns Promise that resolves once the TypeScript ESLint rules are configured.
 */
export async function typescript(
	options: OptionsComponentExtensions &
		OptionsFiles &
		OptionsOverrides &
		OptionsTypeScriptParserOptions &
		OptionsTypeScriptWithTypes = {},
): Promise<TypedFlatConfigItem[]> {
	const { componentExtensions = [], overrides = {}, parserOptions = {} } = options;

	const files = options.files ?? [
		GLOB_SRC,
		...componentExtensions.map(extension => `**/*.${extension}`),
	];

	const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX];
	const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined;
	const isTypeAware = Boolean(tsconfigPath);

	const typeAwareRules: TypedFlatConfigItem['rules'] = {
		'dot-notation': 'off',
		'no-implied-eval': 'off',
		'no-throw-literal': 'off',
		'ts/await-thenable': 'error',
		'ts/dot-notation': ['error', { allowKeywords: true }],
		'ts/no-explicit-any': 'warn',
		'ts/no-floating-promises': 'error',
		'ts/no-for-in-array': 'error',
		'ts/no-implied-eval': 'error',
		'ts/no-misused-promises': 'error',
		'ts/no-throw-literal': 'error',
		'ts/no-unnecessary-type-assertion': 'error',
		'ts/no-unsafe-argument': 'error',
		'ts/no-unsafe-assignment': 'error',
		'ts/no-unsafe-call': 'error',
		'ts/no-unsafe-member-access': 'error',
		'ts/no-unsafe-return': 'error',
		'ts/restrict-plus-operands': 'error',
		'ts/restrict-template-expressions': 'error',
		'ts/unbound-method': 'error',
	};

	const [pluginTs, parserTs] = await Promise.all([
		interopDefault(import('@typescript-eslint/eslint-plugin')),
		interopDefault(import('@typescript-eslint/parser')),
	] as const);

	function makeParser(
		typeAware: boolean,
		files: string[],
		ignores?: string[],
	): TypedFlatConfigItem {
		return {
			files,
			...(ignores ? { ignores } : {}),
			languageOptions: {
				parser: parserTs,
				parserOptions: {
					extraFileExtensions: componentExtensions.map(extension => `.${extension}`),
					sourceType: 'module',
					...(typeAware
						? {
								project: tsconfigPath,
								projectService: true,
								tsconfigRootDir: import.meta.dirname,
							}
						: {}),
					...(parserOptions as any),
				},
			},
			name: `mheob/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
		};
	}

	return [
		{
			// Install the plugins without globs, so they can be configured separately.
			name: 'mheob/typescript/setup',
			plugins: {
				antfu: pluginAntfu,
				ts: pluginTs,
			},
		},
		// assign type-aware parser for type-aware files and type-unaware parser for the rest
		...(isTypeAware
			? [makeParser(true, filesTypeAware), makeParser(false, files, filesTypeAware)]
			: [makeParser(false, files)]),
		{
			files,
			name: 'mheob/typescript/rules',
			rules: {
				...renameRules(pluginTs.configs['eslint-recommended'].overrides?.[0].rules ?? {}, {
					'@typescript-eslint': 'ts',
				}),
				...renameRules(pluginTs.configs.strict.rules ?? {}, {
					'@typescript-eslint': 'ts',
				}),
				'no-dupe-class-members': 'off',
				'no-redeclare': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',
				'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
				'ts/consistent-type-definitions': ['error', 'interface'],
				'ts/consistent-type-imports': [
					'error',
					{ disallowTypeAnnotations: false, prefer: 'type-imports' },
				],
				'ts/explicit-function-return-type': ['error', { allowExpressions: true }],
				'ts/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
				'ts/no-dupe-class-members': 'error',
				'ts/no-dynamic-delete': 'off',
				'ts/no-explicit-any': 'warn',
				'ts/no-extraneous-class': 'off',
				'ts/no-import-type-side-effects': 'error',
				'ts/no-invalid-void-type': 'off',
				'ts/no-non-null-assertion': 'warn',
				'ts/no-redeclare': 'error',
				'ts/no-require-imports': 'error',
				'ts/no-restricted-types': 'error',
				'ts/no-unused-vars': 'off',
				'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
				'ts/no-useless-constructor': 'off',
				'ts/triple-slash-reference': 'off',
				'ts/unified-signatures': 'off',
				...overrides,
			},
		},
		...(isTypeAware
			? [
					{
						files: filesTypeAware,
						name: 'mheob/typescript/rules-type-aware',
						rules: {
							...(tsconfigPath ? typeAwareRules : {}),
							...overrides,
						},
					},
				]
			: []),
	];
}
