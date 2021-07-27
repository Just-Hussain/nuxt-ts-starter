// https://auth.nuxtjs.org/api/options
export default {
	strategies: {
		local: false,
		keycloak: {
			scheme: 'oauth2',
			endpoints: {
				authorization: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
				token: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
				userInfo: `${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
				logout:
					`${process.env.KEYCLOAK_HOST}/auth/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout?redirect_uri=` +
					encodeURIComponent(`${process.env.KEYCLOAK_REDIRECT_URI}`),
			},
			clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
			token: {
				property: 'access_token',
				type: 'Bearer',
				name: 'Authorization',
				maxAge: 300,
			},
			refreshToken: {
				property: 'refresh_token',
				maxAge: 60 * 60 * 24 * 30,
			},
			responseType: 'code',
			grantType: 'authorization_code',
			scope: ['openid', 'profile', 'email'],
			codeChallengeMethod: 'S256',
		},
	},

	// Conflicts with vuex-module-decorators, hence disabled.
	vuex: false,

	redirect: {
		login: '/login',
		logout: '/',
		home: '/',
	},
};
