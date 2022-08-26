const jsDocPlugin = require('prettier-plugin-jsdoc');
const sortImports = require('@trivago/prettier-plugin-sort-imports');

/** @type {import('prettier').Config} */
module.exports = {
  plugins: [jsDocPlugin, sortImports],
  arrowParens: 'always',
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'always',
  importOrder: ['^node:', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,

  overrides: [
    {
      files: '*.{yaml,yml}',
      options: {
        printWidth: 130,
        singleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 130,
      },
    },
  ],
};
