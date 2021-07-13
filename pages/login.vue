<template>
	<div>
		<h3>Login</h3>
		<v-container>
			<v-row dense>
				<v-col cols="12">
					<v-btn @click="login()"> Login via Keycloak </v-btn>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({ name: 'login', auth: 'guest' })
export default class extends Vue {
	async login() {
		try {
			await this.$auth.loginWith('keycloak')
		} catch (err) {
			console.log(err)
		}
	}
}
</script>
