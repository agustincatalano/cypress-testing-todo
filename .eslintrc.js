module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['cypress', 'chai-friendly'],
  rules: {
    'comma-spacing': ['error', { before: false, after: true }],
    'space-infix-ops': 'error',
    'key-spacing': ['error', { afterColon: true }],
    'arrow-spacing': ['error', { before: true, after: true }],
    indent: ['warn', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: [2, 'never'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: 'multiline-block-like'
      }
    ],
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2
  }
}
