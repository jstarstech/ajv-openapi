const tseslint = require('@typescript-eslint/eslint-plugin');

const [baseConfig, recommendedConfig, strictTypeRulesConfig] = tseslint.configs['flat/recommended'];

module.exports = [
  {
    ...baseConfig,
    languageOptions: {
      ...baseConfig.languageOptions,
      parserOptions: {
        project: ['./tsconfig.json', './tests/tsconfig.json'],
      },
    },
  },
  recommendedConfig,
  strictTypeRulesConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          typedefs: false,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
          readonly: 'array-simple',
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-inner-declarations': 'off',
    },
  },
];
