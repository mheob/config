/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:unicorn/recommended', 'plugin:prettier/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-implicit-coercion': ['error', { allow: ['!!', '+', '~'] }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'unicorn/import-index': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          args: false,
          doc: false,
          env: false,
          props: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.cjs'],
      env: { node: true },
    },
    {
      files: ['*.js', '*.ts'],
      rules: { 'unicorn/filename-case': ['error', { case: 'camelCase' }] },
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      extends: ['plugin:eslint-plugin-react/recommended', 'next/core-web-vitals'],
      settings: { react: { version: 'detect' } },
      rules: {
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
        'react/jsx-no-useless-fragment': 'warn',
        'react/react-in-jsx-scope': 'off',
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
  ],
};
