import js from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import eslintPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,ts,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPrettier,
      import: eslintImport,
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal', 'sibling', 'parent'], ['index']],
          'newlines-between': 'always',
        },
      ],
    },
  },
);
