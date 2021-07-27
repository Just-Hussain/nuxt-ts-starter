import { Plugin } from '@nuxt/types';

const auth: Plugin = (ctx) => {
	const { $auth, localePath } = ctx.app;
	/**
	 * Localise the path on redirecting
	 */
	$auth.onRedirect((to: string, from: string): string => {
		return localePath(to);
	});
};

export default auth;
