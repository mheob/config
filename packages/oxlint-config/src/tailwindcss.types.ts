interface SelectorStringMatcher {
	type: 'string';
}

interface SelectorObjectKeyMatcher {
	type: 'objectKeys';
	path?: string;
}

interface SelectorObjectValueMatcher {
	type: 'objectValues';
	path?: string;
}

interface SelectorAnonymousFunctionReturnMatcher {
	type: 'anonymousFunctionReturn';
	match: (SelectorObjectKeyMatcher | SelectorObjectValueMatcher | SelectorStringMatcher)[];
}

type SelectorMatcher =
	| SelectorStringMatcher
	| SelectorObjectKeyMatcher
	| SelectorObjectValueMatcher
	| SelectorAnonymousFunctionReturnMatcher;

interface AttributeSelector {
	kind: 'attribute';
	match?: SelectorMatcher[];
	name: string;
}

interface CalleeSelector {
	kind: 'callee';
	match?: SelectorMatcher[];
	name?: string;
	path?: string;
	targetArgument?: 'all' | 'first' | 'last' | number;
	targetCall?: 'all' | 'first' | 'last' | number;
}

interface VariableSelector {
	kind: 'variable';
	name: string;
	match?: SelectorMatcher[];
}

interface TagSelector {
	kind: 'tag';
	name: string;
	match?: SelectorMatcher[];
}

interface BetterTailwindcssOptions {
	entrypoint?: string;
	tailwindConfig?: string;
	tsconfig?: string;
	cwd?: string;
	detectComponentClasses?: boolean;
	rootFontSize?: number;
	messageStyle?: 'visual' | 'compact' | 'raw';
	selectors?: {
		attribute: AttributeSelector | CalleeSelector | VariableSelector | TagSelector;
	};
}

export interface TailwindcssConfig {
	options?: BetterTailwindcssOptions;
	ignoredClasses?: string[];
}
