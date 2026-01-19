const configFonto = require('@fontoxml/eslint-config');
const globals = require('globals');

module.exports = [
	{
		name: 'fontoxml/global-ignores',
		ignores: ['platform/**', '**/assets/**'],
	},
	...configFonto.default,
	{
		name: 'fontoxml/settings',
		settings: {
			// Explicitly set the React version because this repository has no
			// React dependency. Should be in sync with 'fontoxml-vendors'.
			// See: https://www.npmjs.com/package/eslint-plugin-react
			react: {
				version: '18.2.0',
			},
			// Mark imports starting with 'fontoxml-' as internal for import
			// sorting purposes.
			'import/internal-regex': '^fontoxml-',
		},
	},
	{
		name: 'fontoxml/config-files-commonjs',
		files: [
			'./dev-cms/**/*.js',
			'./config.js',
			'./eslint.config.js',
			'./prettier.config.js',
		],
		languageOptions: {
			globals: {
				...globals.node,
			},
			sourceType: 'commonjs',
		},
	},
];
