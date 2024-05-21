/* eslint-disable node/prefer-global/process, ts/no-explicit-any */
import fs from 'node:fs';

import type { Linter } from 'eslint';
import { FlatConfigComposer } from 'eslint-flat-config-utils';

import {
	astro,
	command,
	comments,
	formatters,
	ignores,
	imports,
	javascript,
	jsdoc,
	jsonc,
	markdown,
	node,
	perfectionist,
	react,
	sortPackageJson,
	sortTsconfig,
	stylistic,
	svelte,
	test,
	toml,
	typescript,
	yaml,
} from './configs';
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types';
import { existsPackage, interopDefault } from './utils/package';

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

export const defaultPluginRenaming = {
	'@eslint-react': 'react',
	'@eslint-react/dom': 'react-dom',
	'@eslint-react/hooks-extra': 'react-hooks-extra',
	'@eslint-react/naming-convention': 'react-naming-convention',

	'@stylistic': 'style',
	'@typescript-eslint': 'ts',
	'import-x': 'import',
	'n': 'node',
	'vitest': 'test',
	'yml': 'yaml',
};

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): ResolvedOptions<OptionsConfig[K]> {
	return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}

export function getOverrides<K extends keyof OptionsConfig>(options: OptionsConfig, key: K) {
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
		FlatConfigComposer<any, any> | Linter.FlatConfig[] | TypedFlatConfigItem | TypedFlatConfigItem[]
	>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
	const {
		astro: enableAstro = false,
		autoRenamePlugins = true,
		componentExts = [],
		gitignore: enableGitignore = true,
		isInEditor = !!(
			(process.env.VSCODE_PID
			|| process.env.VSCODE_CWD
			|| process.env.JETBRAINS_IDE
			|| process.env.VIM)
			&& !process.env.CI
		),
		react: enableReact = false,
		svelte: enableSvelte = false,
		typescript: enableTypeScript = existsPackage('typescript'),
	} = options;

	const stylisticOptions
		= options.stylistic === false
			? false
			: typeof options.stylistic === 'object'
				? options.stylistic
				: {};

	if (stylisticOptions && !('jsx' in stylisticOptions)) {
		stylisticOptions.jsx = options.jsx ?? true;
	}

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
		ignores(),
		javascript({ isInEditor, overrides: getOverrides(options, 'javascript') }),
		comments(),
		node(),
		jsdoc({ stylistic: stylisticOptions }),
		imports({ stylistic: stylisticOptions }),
		command(),

		// Optional plugins (installed but not enabled by default)
		perfectionist(),
	);

	if (enableTypeScript) {
		configs.push(
			typescript({
				...resolveSubOptions(options, 'typescript'),
				componentExts,
				overrides: getOverrides(options, 'typescript'),
			}),
		);
	}

	if (stylisticOptions) {
		configs.push(
			stylistic({
				...stylisticOptions,
				overrides: getOverrides(options, 'stylistic'),
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

	if (enableReact) {
		configs.push(
			react({
				overrides: getOverrides(options, 'react'),
				tsconfigPath: getOverrides(options, 'typescript').tsconfigPath,
			}),
		);
	}

	if (enableSvelte) {
		configs.push(
			svelte({
				overrides: getOverrides(options, 'svelte'),
				stylistic: stylisticOptions,
				typescript: !!enableTypeScript,
			}),
		);
	}

	if (enableAstro) {
		configs.push(
			astro({
				overrides: getOverrides(options, 'astro'),
				stylistic: stylisticOptions,
			}),
		);
	}

	if (options.jsonc ?? true) {
		configs.push(
			jsonc({
				overrides: getOverrides(options, 'jsonc'),
				stylistic: stylisticOptions,
			}),
			sortPackageJson(),
			sortTsconfig(),
		);
	}

	if (options.yaml ?? true) {
		configs.push(
			yaml({
				overrides: getOverrides(options, 'yaml'),
				stylistic: stylisticOptions,
			}),
		);
	}

	if (options.toml ?? true) {
		configs.push(
			toml({
				overrides: getOverrides(options, 'toml'),
				stylistic: stylisticOptions,
			}),
		);
	}

	if (options.markdown ?? true) {
		configs.push(
			markdown({
				componentExts,
				overrides: getOverrides(options, 'markdown'),
			}),
		);
	}

	if (options.formatters) {
		configs.push(
			formatters(options.formatters, typeof stylisticOptions === 'boolean' ? {} : stylisticOptions),
		);
	}

	// User can optionally pass a flat config item to the first argument
	// We pick the known keys as ESLint would do schema validation
	const fusedConfig = flatConfigProps.reduce((acc, key) => {
		if (key in options) {
			acc[key] = options[key] as any;
		}
		return acc;
	}, {} as TypedFlatConfigItem);

	if (Object.keys(fusedConfig).length) {
		configs.push([fusedConfig]);
	}

	let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

	composer = composer.append(...configs, ...(userConfigs as any));

	if (autoRenamePlugins) {
		composer = composer.renamePlugins(defaultPluginRenaming);
	}

	return composer;
}
