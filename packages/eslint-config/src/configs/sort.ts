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
							'catalog',
							'catalogs',

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
						],
						pathPattern: '^$',
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
							/* Projects */
							'incremental',
							'composite',
							'tsBuildInfoFile',
							'disableSourceOfProjectReferenceRedirect',
							'disableSolutionSearching',
							'disableReferencedProjectLoad',
							/* Language and Environment */
							'target',
							'jsx',
							'jsxFactory',
							'jsxFragmentFactory',
							'jsxImportSource',
							'lib',
							'moduleDetection',
							'noLib',
							'reactNamespace',
							'useDefineForClassFields',
							'emitDecoratorMetadata',
							'experimentalDecorators',
							/* Modules */
							'baseUrl',
							'rootDir',
							'rootDirs',
							'customConditions',
							'module',
							'moduleResolution',
							'moduleSuffixes',
							'noResolve',
							'paths',
							'resolveJsonModule',
							'resolvePackageJsonExports',
							'resolvePackageJsonImports',
							'typeRoots',
							'types',
							'allowArbitraryExtensions',
							'allowImportingTsExtensions',
							'allowUmdGlobalAccess',
							/* JavaScript Support */
							'allowJs',
							'checkJs',
							'maxNodeModuleJsDepth',
							/* Type Checking */
							'strict',
							'strictBindCallApply',
							'strictFunctionTypes',
							'strictNullChecks',
							'strictPropertyInitialization',
							'allowUnreachableCode',
							'allowUnusedLabels',
							'alwaysStrict',
							'exactOptionalPropertyTypes',
							'noFallthroughCasesInSwitch',
							'noImplicitAny',
							'noImplicitOverride',
							'noImplicitReturns',
							'noImplicitThis',
							'noPropertyAccessFromIndexSignature',
							'noUncheckedIndexedAccess',
							'noUnusedLocals',
							'noUnusedParameters',
							'useUnknownInCatchVariables',
							/* Emit */
							'declaration',
							'declarationDir',
							'declarationMap',
							'downlevelIteration',
							'emitBOM',
							'emitDeclarationOnly',
							'importHelpers',
							'importsNotUsedAsValues',
							'inlineSourceMap',
							'inlineSources',
							'mapRoot',
							'newLine',
							'noEmit',
							'noEmitHelpers',
							'noEmitOnError',
							'outDir',
							'outFile',
							'preserveConstEnums',
							'preserveValueImports',
							'removeComments',
							'sourceMap',
							'sourceRoot',
							'stripInternal',
							/* Interop Constraints */
							'allowSyntheticDefaultImports',
							'esModuleInterop',
							'forceConsistentCasingInFileNames',
							'isolatedModules',
							'preserveSymlinks',
							'verbatimModuleSyntax',
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
