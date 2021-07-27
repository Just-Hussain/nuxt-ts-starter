// https://sitemap.nuxtjs.org/usage/sitemap-options

export default {
	// Include dynamic routes here.
	// routes: [],
	// i18n: true,
	hostname:
		process.env.NUXT_ENV_VERCEL_URL ||
		process.env.VERCEL_URL ||
		process.env.BASE_URL,
};
