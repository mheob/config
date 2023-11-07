/** @type {import('prettier').Config} */
module.exports = {
	...require('@mheob/prettier-config'),

	overrides: [
		...require('@mheob/prettier-config').overrides,
		{
			files: '**/*.md',
			options: {
				proseWrap: 'never',
			},
		},
	],
};
