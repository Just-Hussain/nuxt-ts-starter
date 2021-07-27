import { Plugin } from '@nuxt/types';

const i18n: Plugin = (ctx) => {
	const { app, $vuetify } = ctx;
	/**
	 *  onBeforeLanguageSwitch called right before setting a new locale
	 * @param oldLocale
	 * @param newLocale
	 */
	app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
		/**
		 * It is possible to access vuetify's plugin here because it is loaded before i18n's plugin.
		 * This is the reason for why i18n is inaccessable in vuetify's options.
		 */
		$vuetify.rtl = newLocale === 'ar';
	};
};

export default i18n;
