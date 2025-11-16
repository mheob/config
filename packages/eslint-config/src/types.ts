/* eslint-disable ts/no-explicit-any */
import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

import type { RuleOptions } from './typegen';

export type { ConfigNames } from './typegen';

export type Awaitable<T> = Promise<T> | T;

export type Rules = Record<string, Linter.RuleEntry<any> | undefined> & RuleOptions;

/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedFlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
	/**
	 * An object containing a name-value mapping of plugin names to plugin objects.
	 * When `files` is specified, these plugins are only available to the matching files.
	 *
	 * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
	 */
	plugins?: Record<string, any>;

	/**
	 * An object containing the configured rules. When `files` or `ignores` are
	 * specified, these rule configurations are only available to the matching files.
	 */
	rules?: Rules;
};

export interface OptionsFiles {
	/** Override the `files` option to provide custom globs. */
	files?: string[];
}

export interface OptionsTypeScriptWithTypes {
	/**
	 * When this options is provided, type aware rules will be enabled.
	 *
	 * @see https://typescript-eslint.io/linting/typed-linting/
	 */
	tsconfigPath?: 0 | 1 | 2 | string | string[];
}

export interface OptionsHasTypeScript {
	typescript?: boolean;
}

export interface OptionsTypeScriptParserOptions {
	/**
	 * Glob patterns for files that should be type aware.
	 *
	 * @default ['**\/*.{ts,tsx}']
	 */
	filesTypeAware?: string[];

	/** Additional parser options for TypeScript. */
	parserOptions?: Partial<ParserOptions>;
}

export interface OptionsOverrides {
	overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsRegExp {
	/**
	 * Override rulelevels
	 */
	level?: 'error' | 'warn';
}

export interface OptionsIsInEditor {
	isInEditor?: boolean;
}

export type OptionsTypescript =
	| (OptionsOverrides & OptionsTypeScriptParserOptions)
	| (OptionsOverrides & OptionsTypeScriptWithTypes);

export interface OptionsComponentExtensions {
	/**
	 * Additional extensions for components.
	 *
	 * @example ['vue']
	 * @default []
	 */
	componentExtensions?: string[];
}

export interface OptionsConfig extends OptionsComponentExtensions {
	/**
	 * Provide overrides for rules for each integration.
	 *
	 * @deprecated use `overrides` option in each integration key instead
	 */
	overrides?: {
		javascript?: TypedFlatConfigItem['rules'];
		jsonc?: TypedFlatConfigItem['rules'];
		markdown?: TypedFlatConfigItem['rules'];
		prettier?: TypedFlatConfigItem['rules'];
		react?: TypedFlatConfigItem['rules'];
		svelte?: TypedFlatConfigItem['rules'];
		test?: TypedFlatConfigItem['rules'];
		toml?: TypedFlatConfigItem['rules'];
		typescript?: TypedFlatConfigItem['rules'];
		yaml?: TypedFlatConfigItem['rules'];
	};

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
	astro?: boolean | OptionsOverrides;

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
	gitignore?: boolean | FlatGitignoreOptions;

	/**
	 * Control to disable some rules in editors.
	 *
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
	jsonc?: boolean | OptionsOverrides;

	/**
	 * Enable JSX related rules.
	 *
	 * Currently only stylistic rules are included.
	 *
	 * @default false
	 */
	jsx?: boolean;

	/**
	 * Enable linting for **code snippets** in Markdown.
	 *
	 * For formatting Markdown content, enable also `formatters.markdown`.
	 *
	 * @default true
	 */
	markdown?: boolean | OptionsOverrides;

	/**
	 * Enable nextjs rules.
	 *
	 * Requires installing:
	 * - `@next/eslint-plugin-next`
	 *
	 * @default false
	 */
	nextjs?: boolean | OptionsOverrides;

	/**
	 * Core rules for styling. Can't be disabled.
	 */
	prettier?: OptionsOverrides;

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
	react?: boolean | OptionsOverrides;

	/**
	 * Enable regexp rules.
	 *
	 * @see https://ota-meshi.github.io/eslint-plugin-regexp/
	 * @default true
	 */
	regexp?: boolean | (OptionsOverrides & OptionsRegExp);

	/**
	 * Enable solid rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-solid`
	 *
	 * @default false
	 */
	solid?: boolean | OptionsOverrides;

	/**
	 * Enable stylistic rules.
	 *
	 * @default true
	 */
	stylistic?: boolean | OptionsOverrides;

	/**
	 * Enable svelte rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-svelte`
	 *
	 * @default false
	 */
	svelte?: boolean | OptionsOverrides;

	/**
	 * Enable test support.
	 *
	 * @default true
	 */
	test?: boolean | OptionsOverrides;

	/**
	 * Enable TOML support.
	 *
	 * @default true
	 */
	toml?: boolean | OptionsOverrides;

	/**
	 * Enable TypeScript support.
	 *
	 * Passing an object to enable TypeScript Language Server support.
	 *
	 * @default auto-detect based on the dependencies
	 */
	typescript?: boolean | OptionsTypescript;

	/**
	 * Enable unicorn support.
	 *
	 * Requires installing:
	 * - `eslint-plugin-unicorn`
	 *
	 * @default true
	 */
	unicorn?: boolean | OptionsTypescript;

	/**
	 * Enable Vue support.
	 *
	 * @default auto-detect based on the dependencies
	 */
	vue?: boolean | OptionsOverrides;

	/**
	 * Enable YAML support.
	 *
	 * @default true
	 */
	yaml?: boolean | OptionsOverrides;
}
