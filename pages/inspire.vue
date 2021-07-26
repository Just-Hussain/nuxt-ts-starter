<template>
	<v-row>
		<v-col class="text-center">
			<img src="/v.png" alt="Vuetify.js" class="mb-5" />
			<blockquote class="blockquote">
				&#8220;First, solve the problem. Then, write the code.&#8221;
				<footer>
					<small>
						<em>&mdash;John Johnson</em>
					</small>
				</footer>
			</blockquote>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
	name: 'inspire',
	middleware: ['auth'],
	nuxtI18n: {
		paths: {
			ar: encodeURI('/الهام'),
		},
	},
})
export default class extends Vue {}
</script>
