module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'plugin:flowtype/recommended', 'plugin:ramda/recommended'],
  plugins: ['flowtype', 'jest', 'ramda'],
  rules: {
    'no-debugger': 0,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 0,
    semi: 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': ['error', 'always-multiline'],
    'camelcase': 0
  },
  env: {
    'jest/globals': true,
  },
  globals: {
    artifacts: true,
    contract: true,
    assert: true,
    cy: true,
    context: true,
    Cypress: true,
    document: true,
    window: true,
  },
}
