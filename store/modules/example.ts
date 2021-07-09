import {
	Module,
	VuexAction,
	VuexModule,
	VuexMutation,
} from 'nuxt-property-decorator'

// Module's namespaced name MUST include the namespace (path).
@Module({
	name: 'modules/example',
	stateFactory: true,
	namespaced: true,
})
export default class Example extends VuexModule {
	private _stateExample = 'Example Store State'

	get stateExample() {
		return this._stateExample
	}

	@VuexMutation
	updateStateExmaple(txt: string) {
		this._stateExample = txt
	}

	@VuexAction
	actionExample() {
		/**
		 * Plugins can be access through:
		 * this.store
		 */
		console.log('Fired Action Example')
	}
}
