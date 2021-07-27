<template>
	<v-row>
		<SocialHead title="Test Page" description="A test page." />
		<v-col class="text-center">
			<img src="/v.png" alt="Vuetify.js" class="mb-5" />
			<blockquote class="blockquote">
				Test Page,
				{{ $t('testMsg') }}
			</blockquote>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
	name: 'test',
	nuxtI18n: {
		paths: {
			ar: encodeURI('/تجربة'),
		},
	},
	head: {
		title: 'Test',
	},
})
export default class extends Vue {}
</script>
