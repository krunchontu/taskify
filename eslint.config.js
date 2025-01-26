import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    }
  },
  {
    ignores: ['**/build/', '**/node_modules/', '**/dist/']
  },
  {
    files: ['src/service-worker.ts'],
    languageOptions: {
      globals: {
        ServiceWorkerGlobalScope: 'readonly',
        self: 'readonly',
      }
    },
    env: {
      serviceworker: true
    }
  }
];
