import { Options } from 'nuxt-i18n/types';

// https://i18n.nuxtjs.org/options-reference
export default {
	langDir: '~/utils/locales/',

	defaultLocale: 'en',

	locales: [
		{
			code: 'en',
			iso: 'en-US',
			name: 'English',
			file: 'en-US.js',
		},
		{
			code: 'ar',
			iso: 'ar-SA',
			name: 'عربى',
			file: 'ar-SA.js',
		},
	],

	/**
	 * All options are valid from vuei18n
	 */
	vueI18n: { fallbackLocale: 'en' },

	// it conflicts with vuex-module-decorators, hence disabled.
	vuex: false,
} as Options;
