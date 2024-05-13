export interface PromItem<T> {
	hint?: string;
	label: string;
	value: T;
}

export type FrameworkOption = 'astro' | 'react' | 'svelte';

export type ExtraLibrariesOption = 'formatter';

export interface PromptResult {
	extra: ExtraLibrariesOption[];
	frameworks: FrameworkOption[];
	uncommittedConfirmed: boolean;
	updateVscodeSettings: unknown;
}
