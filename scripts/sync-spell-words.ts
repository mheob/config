// Keeps the word lists of cspell (`.cspell.json`) and Codebook (`codebook.toml`) in sync.
// Both editor integrations add words to their own file, so the lists are merged into each file,
// never replaced. To remove a word, delete it from both files.
//
// `node scripts/sync-spell-words.ts` writes the merged lists, `--check` only reports drift.

import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';

import { parse, stringify } from 'smol-toml';

interface SpellConfig {
	readonly config: Readonly<Record<string, unknown>>;
	readonly file: string;
	readonly words: readonly string[];
}

const cspellUrl = new URL('../.cspell.json', import.meta.url);
const codebookUrl = new URL('../codebook.toml', import.meta.url);

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toSpellConfig(config: unknown, file: string): SpellConfig {
	const words: unknown = isRecord(config) ? (config.words ?? []) : undefined;

	if (
		!isRecord(config) ||
		!Array.isArray(words) ||
		!words.every((word): word is string => typeof word === 'string')
	) {
		throw new TypeError(`${file}: \`words\` must be a list of strings.`);
	}

	return { config, file, words };
}

// Both tools match words case-insensitively, so the first spelling of a word wins.
function mergeWords(...lists: readonly (readonly string[])[]): string[] {
	const words = new Map<string, string>();

	for (const word of lists.flat()) {
		if (!words.has(word.toLowerCase())) {
			words.set(word.toLowerCase(), word);
		}
	}

	return [...words.values()].toSorted((first, second) => first.localeCompare(second, 'en'));
}

function findMissingWords({ words }: SpellConfig, merged: readonly string[]): string[] {
	const known = new Set(words.map((word) => word.toLowerCase()));
	return merged.filter((word) => !known.has(word.toLowerCase()));
}

const cspell = toSpellConfig(JSON.parse(await readFile(cspellUrl, 'utf8')), '.cspell.json');
const codebook = toSpellConfig(parse(await readFile(codebookUrl, 'utf8')), 'codebook.toml');
const words = mergeWords(cspell.words, codebook.words);

if (process.argv.includes('--check')) {
	for (const spellConfig of [cspell, codebook]) {
		const missingWords = findMissingWords(spellConfig, words);

		if (missingWords.length > 0) {
			console.error(`${spellConfig.file} is missing: ${missingWords.join(', ')}`);
			process.exitCode = 1;
		}
	}

	if (process.exitCode === 1) {
		console.error('Run `pnpm run cspell:sync` to merge the word lists.');
	}
} else {
	await writeFile(cspellUrl, `${JSON.stringify({ ...cspell.config, words }, null, '\t')}\n`);
	await writeFile(codebookUrl, `${stringify({ ...codebook.config, words })}\n`);
	console.log(`Synced ${words.length} words to .cspell.json and codebook.toml.`);
}
