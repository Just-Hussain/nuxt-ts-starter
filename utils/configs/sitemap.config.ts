// https://sitemap.nuxtjs.org/usage/sitemap-options

export default {
	hostname: `https://${process.env.VERCEL_URL}/sitemap.xml`,

	// Include dynamic routes here.
	routes: [],

	// With i18n enabled, viewing the sitemap.xml in the browser does not render well.
	// View page source to see sitemap.
	i18n: true,
};
