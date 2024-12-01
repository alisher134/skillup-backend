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
			'@typescript-eslint/ban-ts-comment': 'error',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
