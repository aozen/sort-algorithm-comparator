import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    'rules': {
      'quotes': ['error', 'single'],
      // we want to force semicolons
      'semi': ['error', 'never'],
      // we use 2 spaces to indent our code
      'indent': ['error', 2],
      // we want to avoid extraneous spaces
      'no-multi-spaces': ['error'],
      'prefer-const': ['error', {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }],
      'max-len': ['error', {
        'code': 80,
        'tabWidth': 2,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }],
      // new rules
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-trailing-spaces': 'error'
    }
  }
]
