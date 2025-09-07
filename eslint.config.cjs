const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...tsPlugin.configs['recommended'].rules,
		},
	},
	{
		ignores: [
			"**/dist/",
			"eslint.config.cjs",
			"jest.config.js",
			"**/cdk.out/",
			"**/*.test.ts",
		],
	},
];