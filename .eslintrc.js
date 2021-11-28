module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'import/extensions': 'off',
    'no-restricted-globals': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
  },
};
