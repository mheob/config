export interface PromptItem<T> {
	hint?: string;
	label: string;
	value: T;
}

export type FrameworkOption = 'astro' | 'react' | 'svelte' | 'vue';

export interface PromptResult {
	frameworks: FrameworkOption[];
	uncommittedConfirmed: boolean;
	updateVscodeSettings: unknown;
}
