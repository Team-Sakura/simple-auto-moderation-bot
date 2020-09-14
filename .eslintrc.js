module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['off'],
    'no-console': ['off'],
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'import/no-dynamic-require': ['off'],
    'global-require': ['off'],
  },
};
