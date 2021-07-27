<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6">
			<v-card class="logo py-4 d-flex justify-center">
				<NuxtLogo />
				<VuetifyLogo />
			</v-card>
			<v-card>
				<v-card-title class="headline">
					Welcome {{ name }} to the Vuetify + Nuxt.js + Typescript template
				</v-card-title>
				<v-card-subtitle>
					{{ $t('testMsg') }}
				</v-card-subtitle>
				<v-card-text>
					<p>
						Vuetify is a progressive Material Design component framework for
						Vue.js. It was designed to empower developers to create amazing
						applications.
					</p>
					<p>
						For more information on Vuetify, check out the
						<a
							href="https://vuetifyjs.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							documentation </a
						>.
					</p>

					<hr class="my-3" />
					<a
						href="https://nuxtjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt Documentation
					</a>
					<br />
					<a
						href="https://github.com/nuxt-community/nuxt-property-decorator"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt Property Decorator
					</a>
					<br />
					<a
						href="https://typescript.nuxtjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt/ TypeScript
					</a>
					<br />
					<a
						href="https://axios.nuxtjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt/ Axios
					</a>
					<br />
					<a
						href="https://i18n.nuxtjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt/ I18n
					</a>
					<br />
				</v-card-text>
				<v-card-actions>
					<v-btn color="accent" @click="setLang('ar')"> AR </v-btn>
					<v-btn color="accent" @click="setLang('en')"> EN </v-btn>
					<v-spacer />
					<v-btn color="secondary" nuxt :to="localePath('/login')">
						Login
					</v-btn>
					<v-btn v-if="$auth.loggedIn" @click="logout" color="secondary">
						Logout
					</v-btn>
					<v-spacer />
					<v-btn color="primary" nuxt :to="localePath('/inspire')">
						Continue
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { exampleStore } from '~/store'

@Component({ name: 'index' })
export default class extends Vue {
	setLang(lang: 'ar' | 'en') {
		this.$i18n.setLocale(lang)

		// logs an event in analytics, can be seen in the console
		this.$fire.analytics.logEvent('select_content', {
			content_type: 'changeing locale',
		})
	}

	get name() {
		return (this.$auth.user?.preferred_username as string)?.toUpperCase()
	}

	btnHandler() {
		console.log(exampleStore.stateExample)
		exampleStore.updateStateExmaple('Text Changed By Mutation')
		console.log(exampleStore.stateExample)
		exampleStore.actionExample()
	}

	async logout() {
		if (this.$auth.loggedIn) {
			const res = await this.$auth.logout()
		}
	}
}
</script>
