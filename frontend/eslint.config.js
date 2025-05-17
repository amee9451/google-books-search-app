const js = require('@eslint/js');
const globals = require('globals');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginJest = require('eslint-plugin-jest');
const pluginTypescript = require('@typescript-eslint/eslint-plugin');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      jest: pluginJest,
      '@typescript-eslint': pluginTypescript,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**'
    ]
  },
];