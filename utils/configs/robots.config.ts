export default [
	{
		Sitemap:
			// `${process.env.NUXT_ENV_VERCEL_URL}/sitemap.xml` ||
			`https://${process.env.VERCEL_URL}/sitemap.xml` ||
			`https://${process.env.BASE_URL}/sitemap.xml`,
	},
];
