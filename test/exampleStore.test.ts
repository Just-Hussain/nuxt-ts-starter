import { createLocalVue } from '@vue/test-utils'
import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import Vuex from 'vuex'
import Example from '~/store/modules/example'

let vm = createLocalVue()
vm.use(Vuex)

// TODO: figure out running actions that call axios or plugins.

describe('Example Store.', () => {
	let store: Store<any>
	let exampleStore: Example

	beforeEach(() => {
		/**
		 * The module name MUST be the same name as defined in the module itself.
		 */
		store = new Vuex.Store({
			modules: {
				'modules/example': Example,
			},
		})

		exampleStore = getModule(Example, store)
	})

	it('test', async () => {
		exampleStore.actionExample()
		console.log(exampleStore.stateExample)
		exampleStore.updateStateExmaple('new')
		expect(exampleStore.stateExample).toBe('new')
	})
})
