/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['./base.js'],
  env: { node: true },
  rules: {
    'unicorn/prefer-module': 'off',
  },
};
