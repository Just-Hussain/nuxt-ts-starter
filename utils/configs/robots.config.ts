export default [
	{
		Sitemap:
			// `${process.env.NUXT_ENV_VERCEL_URL}/sitemap.xml` ||
			`${process.env.VERCEL_URL}/sitemap.xml` ||
			`${process.env.BASE_URL}/sitemap.xml`,
	},
];
