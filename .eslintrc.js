module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:nuxt/recommended',
		'prettier',
	],
	plugins: [],
	// add your custom rules here
	rules: {
		'lines-between-class-members': 'warn',
		'import/no-mutable-exports': 'off',
		'no-unused-vars': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn ',
		'prefer-const': 'warn',
	},
};
