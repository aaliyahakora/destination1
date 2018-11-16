module.exports = {
  rules: {
    'array-callback-return': 'error',

    'block-scoped-var': 'error',

    // BB API has many underscores
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],

    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          'render',
          'getInitialState',
          'getDefaultProps',
          'getChildContext',
          'componentWillMount',
          'UNSAFE_componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'UNSAFE_componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'UNSAFE_componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
          'componentDidCatch',
          'getSnapshotBeforeUpdate',
        ],
      },
    ],

    'consistent-return': 'error',

    curly: ['error', 'all'],

    'dot-notation': 'error',

    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'guard-for-in': 'error',

    'no-alert': 'error',

    'no-caller': 'error',

    'no-eval': 'error',

    'no-extend-native': 'error',

    'no-extra-bind': 'error',

    'no-extra-label': 'error',

    'no-implied-eval': 'error',

    'no-iterator': 'error',

    'no-labels': 'error',

    'no-lone-blocks': 'error',

    'no-loop-func': 'error',

    'no-new': 'error',

    'no-new-func': 'error',

    'no-new-wrappers': 'error',

    'no-octal': 'error',

    'no-octal-escape': 'error',

    'no-param-reassign': 'error',

    'no-proto': 'error',

    'no-return-assign': ['error', 'always'],

    'no-return-await': 'error',

    'no-self-compare': 'error',

    'no-sequences': 'error',

    'no-shadow': 'error',

    'no-throw-literal': 'error',

    'no-underscore-dangle': 'error',

    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false,
      },
    ],

    'no-unused-expressions': 'error',

    'no-useless-concat': 'error',

    'no-useless-return': 'error',

    'no-void': 'error',

    'no-with': 'error',

    'object-shorthand': 'error',

    'one-var': ['error', 'never'],

    'prefer-arrow-callback': 'error',

    'prefer-const': 'error',

    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],

    'prefer-rest-params': 'error',

    'prefer-spread': 'error',

    'prefer-template': 'error',

    radix: 'error',

    'require-await': 'error',

    'spaced-comment': 'error',

    'no-await-in-loop': 'error',

    'no-use-before-define': ['error', 'nofunc'],

    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],

    // PLUGINS
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: ['**/*.test.js', '*.js', 'scripts/*.js'],
    //   },
    // ],

    // Require an extension unless it's a JS file
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/dynamic-import-chunkname': 'error',

    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-pascal-case': 'error',
    'react/no-unused-state': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-redundant-should-component-update': 'warn',
    'react/prefer-es6-class': 'error',
    'react/no-typos': 'error',
    'react/void-dom-elements-no-children': 'error',
    'react/no-deprecated': 'error',
    // Flow doesn't need us to mark a prop as optional if we provide a
    // defaultProp, but this rule will error. Let's ignore this since Flow
    // should prevent any errors around this
    'react/default-props-match-prop-types': 'off',
    // we want to allow target="_blank"
    'react/jsx-no-target-blank': 'off',

    // allow for class properties
    'babel/no-invalid-this': 'error',

    // PLUGIN OVERRIDES

    // We just don't do this
    'react/display-name': 'off',
  },
};
