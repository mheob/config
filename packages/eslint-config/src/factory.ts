/* eslint-disable ts/no-explicit-any */
import fs from 'node:fs';
import process from 'node:process';

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
	markdown,
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
import { interopDefault } from './utils/package';

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

export const defaultPluginRenaming = {
	'@eslint-react': 'react',
	'@eslint-react/dom': 'react-dom',
	'@eslint-react/hooks-extra': 'react-hooks-extra',
	'@eslint-react/naming-convention': 'react-naming-convention',

	'@typescript-eslint': 'ts',
	'import-x': 'import',
	n: 'node',
	vitest: 'test',
	yml: 'yaml',
};

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): ResolvedOptions<OptionsConfig[K]> {
	return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}

export function getOverrides<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
	const sub = resolveSubOptions(options, key);
	return {
		...(options.overrides as any)?.[key],
		...('overrides' in sub ? sub.overrides : {}),
	};
}

function iniConfig(options: OptionsConfig & TypedFlatConfigItem = {}) {
	const {
		gitignore: enableGitignore = true,
		isInEditor = Boolean(
			(process.env.VSCODE_PID ||
				process.env.VSCODE_CWD ||
				process.env.JETBRAINS_IDE ||
				process.env.VIM) &&
				!process.env.CI,
		),
	} = options;

	const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

	if (enableGitignore) {
		if (typeof enableGitignore !== 'boolean') {
			configs.push(
				interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]),
			);
		} else if (fs.existsSync('.gitignore')) {
			configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]));
		}
	}

	// Base configs
	configs.push(
		ignores(options.ignores),
		javascript({ isInEditor, overrides: getOverrides(options, 'javascript') }),
		comments(),
		node(),
		jsdoc(),
		imports(),
		command(),

		// Optional plugins (installed but not enabled by default)
		perfectionist(),
	);

	return configs;
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
		astro: enableAstro = false,
		autoRenamePlugins = true,
		componentExts: componentExtensions = [],
		isInEditor = Boolean(
			(process.env.VSCODE_PID ||
				process.env.VSCODE_CWD ||
				process.env.JETBRAINS_IDE ||
				process.env.VIM) &&
				!process.env.CI,
		),
		react: enableReact = false,
		regexp: enableRegexp = true,
		svelte: enableSvelte = false,
		typescript: enableTypeScript = isPackageExists('typescript'),
		unicorn: enableUnicorn = true,
		vue: enableVue = VuePackages.some(i => isPackageExists(i)),
	} = options;

	const configs = iniConfig(options);

	if (enableTypeScript) {
		configs.push(
			typescript({
				...resolveSubOptions(options, 'typescript'),
				componentExts: componentExtensions,
				overrides: getOverrides(options, 'typescript'),
			}),
		);
	}

	if (enableUnicorn) {
		configs.push(unicorn({ overrides: getOverrides(options, 'unicorn') }));
	}

	if (options.test ?? true) {
		configs.push(
			test({
				isInEditor,
				overrides: getOverrides(options, 'test'),
			}),
		);
	}

	if (enableReact) {
		configs.push(
			react({
				overrides: getOverrides(options, 'react'),
				tsconfigPath: getOverrides(options, 'typescript').tsconfigPath,
			}),
		);
	}

	if (enableRegexp) {
		configs.push(regexp(typeof enableRegexp === 'boolean' ? {} : enableRegexp));
	}

	if (enableSvelte) {
		configs.push(
			svelte({
				overrides: getOverrides(options, 'svelte'),
				typescript: Boolean(enableTypeScript),
			}),
		);
	}

	if (enableVue) {
		componentExtensions.push('vue');
		configs.push(
			vue({
				...resolveSubOptions(options, 'vue'),
				overrides: getOverrides(options, 'vue'),
				typescript: Boolean(enableTypeScript),
			}),
		);
	}

	if (enableAstro) {
		configs.push(astro({ overrides: getOverrides(options, 'astro') }));
	}

	if (options.jsonc ?? true) {
		configs.push(
			jsonc({ overrides: getOverrides(options, 'jsonc') }),
			sortPackageJson(),
			sortTsconfig(),
		);
	}

	if (options.yaml ?? true) {
		configs.push(yaml({ overrides: getOverrides(options, 'yaml') }), sortPnpmWorkspaceYaml());
	}

	if (options.toml ?? true) {
		configs.push(toml({ overrides: getOverrides(options, 'toml') }));
	}

	if (options.markdown ?? true) {
		configs.push(
			markdown({
				componentExts: componentExtensions,
				overrides: getOverrides(options, 'markdown'),
			}),
		);
	}

	configs.push(disables(), prettier({ overrides: getOverrides(options, 'prettier') }));

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

	composer = composer.append(...configs, ...(userConfigs as any));

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
