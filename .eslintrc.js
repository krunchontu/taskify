module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint:recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // Add this rule configuration
    '@typescript-eslint/no-unused-vars': [
      'warn', // or 'error' if you want it to fail builds
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    // Keep your existing rules:
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ]
  },
  overrides: [
    {
      files: ['src/service-worker.ts'],
      env: {
        browser: true,
        serviceworker: true,
        es6: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'no-restricted-globals': 'off'
      },
    },
  ],
};
