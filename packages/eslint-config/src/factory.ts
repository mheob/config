/* eslint-disable ts/no-explicit-any */
import type { Linter } from 'eslint';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import {
	astro,
	command,
	comments,
	disables,
	ignores,
	imports,
	javascript,
	jsdoc,
	jsonc,
	jsx,
	markdown,
	nextjs,
	node,
	perfectionist,
	prettier,
	react,
	regexp,
	sortPackageJson,
	sortPnpmWorkspaceYaml,
	sortTsconfig,
	svelte,
	test,
	toml,
	typescript,
	unicorn,
	vue,
	yaml,
} from './configs';
import type { RuleOptions } from './typegen';
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types';
import { interopDefault, isInEditorEnv } from './utils';

const flatConfigProps: (keyof TypedFlatConfigItem)[] = [
	'name',
	'files',
	'ignores',
	'languageOptions',
	'linterOptions',
	'processor',
	'plugins',
	'rules',
	'settings',
];

const VuePackages = ['vue', 'nuxt', 'vitepress'];

const defaultPluginRenaming = {
	'@eslint-react': 'react',
	'@eslint-react/dom': 'react-dom',
	'@eslint-react/hooks-extra': 'react-hooks-extra',
	'@eslint-react/naming-convention': 'react-naming-convention',

	'@next/next': 'next',
	'@typescript-eslint': 'ts',
	n: 'node',
	vitest: 'test',
	yml: 'yaml',
};

type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

function resolveSubOptions<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): ResolvedOptions<OptionsConfig[K]> {
	return typeof options[key] === 'boolean' ? ({} as any) : options[key] || ({} as any);
}

function getOverrides<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
	const sub = resolveSubOptions(options, key);
	return {
		...(options.overrides as any)?.[key],
		...('overrides' in sub ? sub.overrides : {}),
	};
}

/**
 * Construct an array of ESLint flat config items.
 *
 * @param options The options for generating the ESLint configurations.
 * @param userConfigs The user configurations to be merged with the generated configurations.
 * @returns The merged ESLint configurations.
 */
export function mheob(
	options: OptionsConfig & TypedFlatConfigItem = {},
	...userConfigs: Awaitable<
		FlatConfigComposer<any, any> | Linter.Config[] | TypedFlatConfigItem | TypedFlatConfigItem[]
	>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
	const {
		autoRenamePlugins = true,
		componentExtensions = [],
		gitignore: enableGitignore = true,
		regexp: enableRegexp = true,
		typescript: enableTypeScript = isPackageExists('typescript'),
	} = options;

	let isInEditor = options.isInEditor;
	if (isInEditor == null) {
		isInEditor = isInEditorEnv();
		if (isInEditor)
			console.info('[@mheob/eslint-config] Detected running in editor, some rules are disabled.');
	}

	const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

	if (options.gitignore ?? Boolean(enableGitignore)) {
		configs.push(
			interopDefault(import('eslint-config-flat-gitignore')).then(rule => [
				rule({
					name: 'mheob/gitignore',
					...(typeof enableGitignore !== 'boolean' ? enableGitignore : { strict: false }),
				}),
			]),
		);
	}

	const typescriptOptions = resolveSubOptions(options, 'typescript');
	const tsconfigPath =
		'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined;

	// Base configs
	configs.push(
		ignores(options.ignores),
		javascript({
			isInEditor,
			overrides: getOverrides(options, 'javascript'),
		}),
		comments(),
		node(),
		jsdoc(),
		imports(),
		command(),
		perfectionist(),
	);

	if (options.astro ?? false) {
		configs.push(astro({ overrides: getOverrides(options, 'astro') }));
	}

	if (options.jsonc ?? true) {
		configs.push(
			jsonc({ overrides: getOverrides(options, 'jsonc') }),
			sortPackageJson(),
			sortTsconfig(),
		);
	}

	if ((options.jsx || Boolean(enableTypeScript)) ?? false) {
		configs.push(jsx());
	}

	if (options.nextjs ?? false) {
		configs.push(
			nextjs({
				overrides: getOverrides(options, 'nextjs'),
			}),
		);
	}

	if (options.react ?? false) {
		configs.push(
			react({
				...typescriptOptions,
				overrides: getOverrides(options, 'react'),
				tsconfigPath,
			}),
		);
	}

	if (options.regexp ?? Boolean(enableRegexp)) {
		configs.push(regexp(typeof enableRegexp === 'boolean' ? {} : enableRegexp));
	}

	if (options.svelte ?? false) {
		configs.push(
			svelte({
				overrides: getOverrides(options, 'svelte'),
				typescript: Boolean(enableTypeScript),
			}),
		);
	}

	if (options.test ?? true) {
		configs.push(
			test({
				isInEditor,
				overrides: getOverrides(options, 'test'),
			}),
		);
	}

	if (options.toml ?? true) {
		configs.push(toml({ overrides: getOverrides(options, 'toml') }));
	}

	if (options.typescript ?? Boolean(enableTypeScript)) {
		configs.push(
			typescript({
				...typescriptOptions,
				componentExtensions,
				overrides: getOverrides(options, 'typescript'),
			}),
		);
	}

	if (options.unicorn ?? true) {
		configs.push(unicorn({ overrides: getOverrides(options, 'unicorn') }));
	}

	if (options.vue ?? VuePackages.some(i => isPackageExists(i))) {
		componentExtensions.push('vue');
		configs.push(
			vue({
				...resolveSubOptions(options, 'vue'),
				overrides: getOverrides(options, 'vue'),
				typescript: Boolean(enableTypeScript),
			}),
		);
	}

	if (options.yaml ?? true) {
		configs.push(yaml({ overrides: getOverrides(options, 'yaml') }), sortPnpmWorkspaceYaml());
	}

	// Markdown should be last to avoid conflicts with other configs
	if (options.markdown ?? true) {
		configs.push(
			markdown({
				componentExtensions,
				overrides: getOverrides(options, 'markdown'),
			}),
		);
	}

	configs.push(prettier({ overrides: getOverrides(options, 'prettier') }), disables());

	// User can optionally pass a flat config item to the first argument
	// We pick the known keys as ESLint would do schema validation
	const fusedConfig = flatConfigProps.reduce((accumulator, key) => {
		if (key in options) {
			accumulator[key] = options[key] as any;
		}
		return accumulator;
	}, {} as TypedFlatConfigItem);

	if (Object.keys(fusedConfig).length > 0) {
		configs.push([fusedConfig]);
	}

	let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

	composer = composer.append(...configs, ...(userConfigs as TypedFlatConfigItem[]));

	if (autoRenamePlugins) {
		composer = composer.renamePlugins(defaultPluginRenaming);
	}

	if (isInEditor) {
		composer = composer.disableRulesFix(
			['unused-imports/no-unused-imports', 'test/no-only-tests', 'prefer-const'],
			{
				builtinRules: () =>
					import(['eslint', 'use-at-your-own-risk'].join('/')).then(r => r.builtinRules),
			},
		);
	}

	return composer;
}
