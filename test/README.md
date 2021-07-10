# TEST

The template is configured to test Vuex's store modules, not Vue's components.
Here are some notes on writing unit tests for the store:

- A local Vue instance should always be created to inject Vuex into it.
- The modules should be defined in a new store instance.
- the module name in the store shoule **exactly match** its name in the module itself.

```ts
import Example from '~/store/modules/example'

let vm = createLocalVue()
vm.use(Vuex)

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

	it('test', async () => {})
})
```

#### Important Note on Testing

Currently, there is not working setup for mocking axios. Hence, actions including axios would fail.
An axios mock should be manually created, but I'll create a ready working setup for it to ease this process.
