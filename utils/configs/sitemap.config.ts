// https://sitemap.nuxtjs.org/usage/sitemap-options

export default {
	hostname:
		process.env.NUXT_ENV_VERCEL_URL ||
		process.env.VERCEL_URL ||
		process.env.BASE_URL,

	// Include dynamic routes here.
	routes: ['/test'],
	// i18n: true,
};
