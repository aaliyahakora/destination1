module.exports = {
  root: true,

  parser: 'babel-eslint',

  plugins: ['babel', 'react', 'import'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    // Put our rules after the plugins so we can override
    './.eslint-rules.js',
    // Put prettier after our rules so it can override
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaFeatures: {
      globalReturn: true,
      generators: true,
      objectLiteralDuplicateProperties: false,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
};
