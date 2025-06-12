import type { TypedFlatConfigItem } from '../types';

/**
 * Sort package.json
 * Requires `jsonc` config
 *
 * @returns Configs.
 */
export async function sortPackageJson(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			files: ['**/package.json'],
			name: 'mheob/sort/package-json',
			rules: {
				'jsonc/sort-array-values': [
					'error',
					{
						order: { type: 'asc' },
						pathPattern: '^files$',
					},
				],
				'jsonc/sort-keys': [
					'error',
					{
						order: [
							'$schema',
							'publisher',
							'name',
							'displayName',
							'version',
							'private',
							'description',
							'categories',
							'keywords',
							'icon',
							'homepage',
							'bugs',
							'repository',
							'funding',
							'license',
							'author',
							'maintainers',
							'contributors',
							'sideEffects',
							'type',
							'imports',
							'exports',
							'main',
							'unpkg',
							'jsdelivr',
							'module',
							'types',
							'typesVersions',
							'typings',
							'bin',
							'files',
							'workspaces',
							'scripts',
							'contributes',
							'activationEvents',
							'husky',
							'simple-git-hooks',
							'commitlint',
							'lint-staged',
							'prettier',
							'eslintConfig',
							'eslintIgnore',
							'release',
							'stylelint',
							'ava',
							'jest',
							'jest-junit',
							'jest-stare',
							'mocha',
							'nyc',
							'c8',
							'resolutions',
							'dependencies',
							'devDependencies',
							'peerDependencies',
							'peerDependenciesMeta',
							'optionalDependencies',
							'bundledDependencies',
							'bundleDependencies',
							'packageManager',
							'engines',
							'pnpm',
						],
						pathPattern: '^$',
					},
					{
						order: { type: 'asc' },
						pathPattern: '^scripts$',
					},
					{
						order: { type: 'asc' },
						pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$',
					},
					{
						order: { type: 'asc' },
						pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$',
					},
					{
						order: ['types', 'import', 'require', 'default'],
						pathPattern: '^exports.*$',
					},
					{
						order: [
							// client hooks only
							'pre-commit',
							'prepare-commit-msg',
							'commit-msg',
							'post-commit',
							'pre-rebase',
							'post-rewrite',
							'post-checkout',
							'post-merge',
							'pre-push',
							'pre-auto-gc',
						],
						pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
					},
				],
			},
		},
	];
}

/**
 * Sort package.json
 * Requires `yaml` config
 *
 * @returns Configs.
 */
export async function sortPnpmWorkspaceYaml(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			files: ['pnpm-workspace.yaml'],
			name: 'mheob/sort/pnpm-workspace',
			rules: {
				'yaml/sort-keys': [
					'error',
					{
						order: [
							'packages',
							'overrides',
							'patchedDependencies',
							'hoistPattern',

							'allowedDeprecatedVersions',
							'allowNonAppliedPatches',
							'configDependencies',
							'ignoredBuiltDependencies',
							'ignoredOptionalDependencies',
							'neverBuiltDependencies',
							'onlyBuiltDependencies',
							'onlyBuiltDependenciesFile',
							'packageExtensions',
							'peerDependencyRules',
							'supportedArchitectures',

							'catalogMode',
							'catalog',
							'catalogs',
						],
						pathPattern: '^$',
					},
					{
						order: { type: 'asc' },
						pathPattern: '.*',
					},
				],
			},
		},
	];
}

/**
 * Sort tsconfig.json
 * Requires `jsonc` config
 *
 * @returns Configs.
 */
export function sortTsconfig(): TypedFlatConfigItem[] {
	return [
		{
			files: ['**/tsconfig.json', '**/tsconfig.*.json'],
			name: 'mheob/sort/tsconfig-json',
			rules: {
				'jsonc/sort-keys': [
					'error',
					{
						order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
						pathPattern: '^$',
					},
					{
						order: [
							/* Visit https://aka.ms/tsconfig to read more about this file */

							/* Projects */
							'incremental',
							'composite',
							'tsBuildInfoFile',
							'disableSourceOfProjectReferenceRedirect',
							'disableSolutionSearching',
							'disableReferencedProjectLoad',

							/* Language and Environment */
							'target',
							'lib',
							'jsx',
							'libReplacement',
							'experimentalDecorators',
							'emitDecoratorMetadata',
							'jsxFactory',
							'jsxFragmentFactory',
							'jsxImportSource',
							'reactNamespace',
							'noLib',
							'useDefineForClassFields',
							'moduleDetection',

							/* Modules */
							'module',
							'rootDir',
							'moduleResolution',
							'baseUrl',
							'paths',
							'rootDirs',
							'typeRoots',
							'types',
							'allowUmdGlobalAccess',
							'moduleSuffixes',
							'allowImportingTsExtensions',
							'rewriteRelativeImportExtensions',
							'resolvePackageJsonExports',
							'resolvePackageJsonImports',
							'customConditions',
							'noUncheckedSideEffectImports',
							'resolveJsonModule',
							'allowArbitraryExtensions',
							'noResolve',

							/* JavaScript Support */
							'allowJs',
							'checkJs',
							'maxNodeModuleJsDepth',

							/* Emit */
							'declaration',
							'declarationMap',
							'emitDeclarationOnly',
							'sourceMap',
							'inlineSourceMap',
							'noEmit',
							'outFile',
							'outDir',
							'removeComments',
							'importHelpers',
							'downlevelIteration',
							'sourceRoot',
							'mapRoot',
							'inlineSources',
							'emitBOM',
							'newLine',
							'stripInternal',
							'noEmitHelpers',
							'noEmitOnError',
							'preserveConstEnums',
							'declarationDir',

							/* Interop Constraints */
							'isolatedModules',
							'verbatimModuleSyntax',
							'isolatedDeclarations',
							'erasableSyntaxOnly',
							'allowSyntheticDefaultImports',
							'esModuleInterop',
							'preserveSymlinks',
							'forceConsistentCasingInFileNames',

							/* Type Checking */
							'strict',
							'noImplicitAny',
							'strictNullChecks',
							'strictFunctionTypes',
							'strictBindCallApply',
							'strictPropertyInitialization',
							'strictBuiltinIteratorReturn',
							'noImplicitThis',
							'useUnknownInCatchVariables',
							'alwaysStrict',
							'noUnusedLocals',
							'noUnusedParameters',
							'exactOptionalPropertyTypes',
							'noImplicitReturns',
							'noFallthroughCasesInSwitch',
							'noUncheckedIndexedAccess',
							'noImplicitOverride',
							'noPropertyAccessFromIndexSignature',
							'allowUnusedLabels',
							'allowUnreachableCode',

							/* Completeness */
							'skipDefaultLibCheck',
							'skipLibCheck',
						],
						pathPattern: '^compilerOptions$',
					},
				],
			},
		},
	];
}
