import type { Linter } from 'eslint';

const config: Linter.Config = {
	extends: ['./react', 'next/core-web-vitals'],
};

export = config;
