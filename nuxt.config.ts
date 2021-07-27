import authConfig from './utils/configs/auth.config';
import axiosConfig from './utils/configs/axios.config';
import firebaseConfig from './utils/configs/firebase.config';
import i18nConfig from './utils/configs/i18n.config';

export default {
	// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server
	server: {
		port: process.env.NUXT_PORT || 3000, // default: 3000
		host: process.env.NUXT_HOST || 'localhost', // default: localhost
		timing: false,
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - Nuxt TS Starter',
		title: 'Nuxt TS Starter',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'A configured Nuxt-Typescript template.',
			},
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	// !!! Always use object syntax for adding in plugins !!!
	plugins: [
		{ src: '~/utils/plugins/i18n.plugin.ts' },
		{ src: '~/utils/plugins/axios.plugin.ts' },
		{ src: '~/utils/plugins/auth.plugin.ts' },
	],

	extendPlugins(plugins: { src: string }[]) {
		/**
		 * The auth module's plugin is loaded as the last plugin,
		 * even after the custom plugin.
		 * Hence, Load the custom auth plugin at the end so that $auth can be accessable.
		 */
		const pluginIndex = plugins.findIndex(
			({ src }) => src === '~/utils/plugins/auth.plugin.ts'
		);
		const shouldBeLastPlugin = plugins[pluginIndex];

		plugins.splice(pluginIndex, 1);
		plugins.push(shouldBeLastPlugin);

		return plugins;
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://i18n.nuxtjs.org/
		'nuxt-i18n',
		// https://auth.nuxtjs.org/
		'@nuxtjs/auth-next',
		// https://firebase.nuxtjs.org/
		'@nuxtjs/firebase',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: axiosConfig,

	// https://i18n.nuxtjs.org/options-reference
	i18n: i18nConfig,

	// https://auth.nuxtjs.org/api/options
	auth: authConfig,

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		optionsPath: '~/utils/configs/vuetify.config.ts',
	},

	firebase: firebaseConfig,

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
