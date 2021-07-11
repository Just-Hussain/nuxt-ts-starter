import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'

/**
 * Import, define and export all modules.
 */

import Example from './modules/example'

export let exampleStore: Example

/**
 * A Vuex plugin that sets up the imported modules.
 */
const initializer = (store: Store<any>) => {
	exampleStore = getModule(Example, store)
}
export const plugins = [initializer]

/**
 * All modules can be imported directly from the store.
 */
