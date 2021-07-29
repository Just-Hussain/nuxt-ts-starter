<template>
	<v-app dark>
		<h1 v-if="error.statusCode === 404">
			{{ pageNotFound }}
		</h1>
		<h1 v-else>
			{{ otherError }}
		</h1>
		<NuxtLink to="/"> Home page </NuxtLink>
	</v-app>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types';
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
	name: 'error',
	layout: 'empty',
	head(this: ErrorLayout) {
		const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });

		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title,
			...i18nHead,
		};
	},
})
export default class ErrorLayout extends Vue {
	@Prop({ default: null })
	error!: NuxtError;

	pageNotFound = '404 Not Found';
	otherError = 'An error occurred';
}
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
