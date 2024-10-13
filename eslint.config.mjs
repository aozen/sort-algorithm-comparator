import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'

const compat = new FlatCompat({
  // Parsing error: Unexpected token import - But its a syntax error
  // import is a keyword in ES6, but it is not supported in Node.js (?)
  // Leave it like that for now
  baseDirectory: import.meta.url,
  recommendedConfig: js.configs.recommended,
})

export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        es2021: true,
        node: true,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'no-multi-spaces': ['error'],
      'prefer-const': ['error', {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false,
      }],
      'max-len': ['error', {
        'code': 80,
        'tabWidth': 2,
        'ignoreComments': true,
      }],
    },
  },
  ...compat.extends('plugin:import/recommended'),
  ...compat.extends('plugin:promise/recommended'),
]