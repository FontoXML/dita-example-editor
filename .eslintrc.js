module.exports = {
	env: {
		browser: true,
	},
	extends: ['@fontoxml', '@fontoxml/eslint-config/typeinfo'],
	ignorePatterns: [
		'.eslintrc.js',
		'config.json',
		'dev-cms/**',
		'packages/*/assets/**',
		'platform/**',
	],
	parserOptions: {
		// Required for running TypeScript/type-aware rules.
		// See: https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
		project: './tsconfig.json',
	},
	root: true,
	rules: {
		'react/prop-types': 'off',

		// @TODO: Consider re-enabling these rules once typing coverage has
		// increased and strict mode can be (partially) enabled.
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
		'@typescript-eslint/no-unnecessary-condition': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		// @TODO: Consider re-enabling this rule once the Firefox issue
		// https://bugzilla.mozilla.org/show_bug.cgi?id=1521435 is fixed
		'@typescript-eslint/promise-function-async': 'off',

		// Custom sorting to group imports starting with 'fontoxml-'.
		// See: https://github.com/lydell/eslint-plugin-simple-import-sort/#custom-grouping
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^\\u0000'],
					['^@?\\w'],
					['^fontoxml-'],
					['^'],
					['^\\.'],
				],
			},
		],
	},
	settings: {
		'import/resolver': {
			// Resolve imports using the tsconfig.json file.
			// See: https://www.npmjs.com/package/eslint-import-resolver-typescript
			typescript: {
				alwaysTryTypes: true,
			},
		},
		// Explicitly set the React version because this repository has no
		// React dependency. Should be in sync with fontoxml-vendors.
		// See: https://www.npmjs.com/package/eslint-plugin-react
		react: {
			version: '16.12.0',
		},
	},
};
