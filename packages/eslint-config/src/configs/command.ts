import createCommand from 'eslint-plugin-command/config';

import type { TypedFlatConfigItem } from '../types';

/**
 * Configures the ESLint rules for command line interface (CLI) projects.
 *
 * This function sets up the necessary ESLint plugin for command line interface projects,
 * including the `eslint-plugin-command`. It also configures the language options for the
 * command line interface files, including the parser, parser options, and source type.
 *
 * @returns Promise that resolves once the command line interface ESLint rules are configured.
 */
export async function command(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			...createCommand(),
			name: 'mheob/command/rules',
		},
	];
}
