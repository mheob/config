const sortImports = require('@trivago/prettier-plugin-sort-imports');

/** @type {import('prettier').Config} */
module.exports = {
  plugins: [sortImports],
  printWidth: 100,
  proseWrap: 'always',
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  semi: true,
  overrides: [
    {
      files: '*.{yaml,yml}',
      options: {
        printWidth: 130,
        singleQuote: false,
      },
    },
  ],
};
