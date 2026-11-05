import { format } from 'oxfmt';
import { describe, expect, it } from 'vite-plus/test';

import { baseConfig } from '../src/index';

const { overrides, ...topLevelOptions } = baseConfig;

/**
 * Formats a file with the preset. `format()` doesn't match `overrides` against the file name, so
 * the test names the override to apply. `index.e2e.test.ts` covers the patterns themselves.
 *
 * @param fileName The file name, which picks the parser.
 * @param source The source text.
 * @param overridePattern The `files` pattern of the override that applies to the file.
 * @returns The formatted source text.
 */
async function formatFile(
	fileName: string,
	source: string,
	overridePattern?: string,
): Promise<string> {
	const override = overrides.find(({ files }: { readonly files: readonly string[] }) =>
		files.includes(overridePattern ?? ''),
	);

	if (overridePattern !== undefined && override === undefined) {
		throw new Error(`The preset has no override for \`${overridePattern}\`.`);
	}

	const { code, errors } = await format(fileName, source, {
		...topLevelOptions,
		...override?.options,
	});

	expect(errors).toStrictEqual([]);
	return code;
}

describe('the base preset', () => {
	it('indents with tabs and prefers single quotes', async () => {
		await expect(
			formatFile('index.ts', 'const name = "oxfmt";\nif (name) {\n  console.log(name);\n}\n'),
		).resolves.toBe("const name = 'oxfmt';\nif (name) {\n\tconsole.log(name);\n}\n");
	});

	it('sorts imports into built-in, external, and relative groups', async () => {
		const source = [
			"import { b } from './b';",
			"import { z } from 'zod';",
			"import type { Options } from 'pkg';",
			"import nodePath from 'node:path';",
			'',
		].join('\n');

		await expect(formatFile('index.ts', source)).resolves.toBe(
			[
				"import nodePath from 'node:path';",
				'',
				"import type { Options } from 'pkg';",
				"import { z } from 'zod';",
				'',
				"import { b } from './b';",
				'',
			].join('\n'),
		);
	});

	it('sorts Tailwind CSS classes', async () => {
		await expect(
			formatFile('card.tsx', 'export const Card = () => <div className="p-4 flex m-2" />;\n'),
		).resolves.toBe('export const Card = () => <div className="m-2 flex p-4" />;\n');
	});

	it('sorts `package.json`, including the scripts', async () => {
		await expect(
			formatFile('package.json', '{"scripts":{"test":"vp test","build":"vp pack"},"name":"pkg"}'),
		).resolves.toBe(
			'{\n\t"name": "pkg",\n\t"scripts": {\n\t\t"build": "vp pack",\n\t\t"test": "vp test"\n\t}\n}\n',
		);
	});

	it('keeps comments in `tsconfig.json` and `.cspell.json`', async () => {
		await expect(
			formatFile('tsconfig.json', '{\n// strict\n"strict": true}', '{.cspell,tsconfig}*.json'),
		).resolves.toBe('{\n\t// strict\n\t"strict": true\n}\n');
	});

	it('indents YAML with spaces and keeps double quotes', async () => {
		await expect(
			formatFile('ci.yml', "name: 'Check'\non:\n    push:\n", '*.{yaml,yml}'),
		).resolves.toBe('name: "Check"\non:\n  push:\n');
	});

	it('never wraps Markdown prose', async () => {
		const paragraph = Array.from({ length: 40 }, () => 'word').join(' ');

		await expect(formatFile('README.md', `# Title\n\n${paragraph}\n`, '*.md')).resolves.toBe(
			`# Title\n\n${paragraph}\n`,
		);
	});
});
