import { NuxtOptionsHead } from '@nuxt/types/config/head';

// Global page headers: https://go.nuxtjs.dev/config-head

export default {
	titleTemplate: '%s - Nuxt TS Starter',
	title: 'Nuxt TS Starter',
	htmlAttrs: {
		lang: 'en',
	},
	link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			hid: 'description',
			name: 'description',
			content: 'A configured Nuxt-Typescript template.',
		},
		{ name: 'format-detection', content: 'telephone=no' },
		{
			hid: 'og:type',
			name: 'og:type',
			content: 'website',
		},
		{
			hid: 'og:url',
			name: 'og:url',
			content: process.env.BASE_URL,
		},
	],
} as NuxtOptionsHead;
