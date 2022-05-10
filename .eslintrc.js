module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
  },
  plugins: [
    'eslint-plugin-jest',
  ],
};
