/* eslint-disable ts/no-explicit-any */
import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

import type { ConfigNames, RuleOptions } from './typegen';

export type Awaitable<T> = Promise<T> | T;

export type Rules = RuleOptions;

export type { ConfigNames };

export type TypedFlatConfigItem = {
	// Relax plugins type limitation, as most of the plugins did not have correct type info yet.
	/**
	 * An object containing a name-value mapping of plugin names to plugin objects. When `files` is
	 * specified, these plugins are only available to the matching files.
	 *
	 * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
	 */
	plugins?: Record<string, any>;
} & Omit<Linter.FlatConfig<Linter.RulesRecord & Rules>, 'plugins'>;

export interface OptionsFiles {
	/** Override the `files` option to provide custom globs. */
	files?: string[];
}

export interface OptionsTypeScriptWithTypes {
	/**
	 * When this options is provided, type aware rules will be enabled.
	 * @see https://typescript-eslint.io/linting/typed-linting/
	 */
	tsconfigPath?: string | string[];
}

export interface OptionsHasTypeScript {
	typescript?: boolean;
}

export interface OptionsTypeScriptParserOptions {
	/**
	 * Glob patterns for files that should be type aware.
	 * @default ['**\/*.{ts,tsx}']
	 */
	filesTypeAware?: string[];

	/** Additional parser options for TypeScript. */
	parserOptions?: Partial<ParserOptions>;
}

export interface OptionsOverrides {
	overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsIsInEditor {
	isInEditor?: boolean;
}

export type OptionsTypescript =
	| (OptionsOverrides & OptionsTypeScriptParserOptions)
	| (OptionsOverrides & OptionsTypeScriptWithTypes);

export interface OptionsComponentExts {
	/**
	 * Additional extensions for components.
	 *
	 * @example ['vue']
	 * @default []
	 */
	componentExts?: string[];
}

export interface OptionsConfig extends OptionsComponentExts {
	/**
	 * Enable ASTRO support.
	 *
	 * Requires installing:
	 * - `eslint-plugin-astro`
	 *
	 * Requires installing for formatting .astro:
	 * - `prettier-plugin-astro`
	 *
	 * @default false
	 */
	astro?: OptionsOverrides | boolean;

	/**
	 * Automatically rename plugins in the config.
	 *
	 * @default true
	 */
	autoRenamePlugins?: boolean;

	/**
	 * Enable gitignore support.
	 *
	 * Passing an object to configure the options.
	 *
	 * @see https://github.com/antfu/eslint-config-flat-gitignore
	 * @default true
	 */
	gitignore?: FlatGitignoreOptions | boolean;

	/**
	 * Control to disable some rules in editors.
	 * @default auto-detect based on the process.env
	 */
	isInEditor?: boolean;

	/**
	 * Core rules. Can't be disabled.
	 */
	javascript?: OptionsOverrides;

	/**
	 * Enable JSONC support.
	 *
	 * @default true
	 */
	jsonc?: OptionsOverrides | boolean;

	/**
	 * Enable linting for **code snippets** in Markdown.
	 *
	 * For formatting Markdown content, enable also `formatters.markdown`.
	 *
	 * @default true
	 */
	markdown?: OptionsOverrides | boolean;

	/**
	 * Provide overrides for rules for each integration.
	 *
	 * @deprecated use `overrides` option in each integration key instead
	 */
	overrides?: {
		javascript?: TypedFlatConfigItem['rules'];
		jsonc?: TypedFlatConfigItem['rules'];
		markdown?: TypedFlatConfigItem['rules'];
		react?: TypedFlatConfigItem['rules'];
		stylistic?: TypedFlatConfigItem['rules'];
		svelte?: TypedFlatConfigItem['rules'];
		test?: TypedFlatConfigItem['rules'];
		toml?: TypedFlatConfigItem['rules'];
		typescript?: TypedFlatConfigItem['rules'];
		yaml?: TypedFlatConfigItem['rules'];
	};

	/**
	 * Enable react rules.
	 *
	 * Requires installing:
	 * - `@eslint-react/eslint-plugin`
	 * - `eslint-plugin-react-hooks`
	 * - `eslint-plugin-react-refresh`
	 *
	 * @default false
	 */
	react?: OptionsOverrides | boolean;

	/**
	 * Enable solid rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-solid`
	 *
	 * @default false
	 */
	solid?: OptionsOverrides | boolean;

	/**
	 * Enable svelte rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-svelte`
	 *
	 * @default false
	 */
	svelte?: boolean;

	/**
	 * Enable test support.
	 *
	 * @default true
	 */
	test?: OptionsOverrides | boolean;

	/**
	 * Enable TOML support.
	 *
	 * @default true
	 */
	toml?: OptionsOverrides | boolean;

	/**
	 * Enable TypeScript support.
	 *
	 * Passing an object to enable TypeScript Language Server support.
	 *
	 * @default auto-detect based on the dependencies
	 */
	typescript?: OptionsTypescript | boolean;

	/**
	 * Enable YAML support.
	 *
	 * @default true
	 */
	yaml?: OptionsOverrides | boolean;
}
