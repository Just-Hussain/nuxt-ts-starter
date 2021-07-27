# TEST

The template is configured to test Vuex's store modules, not Vue's components.
Here are some notes on writing unit tests for the store:

- A local Vue instance should always be created to inject Vuex into it.
- The modules should be defined in a new store instance.
- the module name in the store shoule **exactly match** its name in the module itself.

```ts
import Example from '~/store/modules/example';

let vm = createLocalVue();
vm.use(Vuex);

describe('Example Store.', () => {
	let store: Store<any>;
	let exampleStore: Example;

	beforeEach(() => {
		/**
		 * The module name MUST be the same name as defined in the module itself.
		 */
		store = new Vuex.Store({
			modules: {
				'modules/example': Example,
			},
		});

		exampleStore = getModule(Example, store);
	});

	it('test', async () => {});
});
```

Moreover, for testing actions that include axios calls, axios should be mocked in the following way:

- Import the mocking package `axios-mock-adapter`.
- Require axios. The reason behind requiring it is that the mocker can mock vanilla axios and not nuxt/axios. Importing it would cause Typescript issues and using nuxt/axios would also cause issues.
- Call `prepareAxoisMock`, it includes $ helpers from nuxt/axios into vanilla axoios.
- set the store's axios to the just created and mocked axios instance.
- Create the dummy responses for the tests.

```ts
import MockAdapter from 'axios-mock-adapter';
import prepareAxiosMock from './prepareAxiosMock';
const axios = require('axios');

const mock = new MockAdapter(axios);
prepareAxiosMock(axios);

describe('Example Store.', () => {
	let store: Store<any>;
	let exampleStore: Example;

	beforeEach(() => {
		/**
		 * The module name MUST be the same name as defined in the module itself.
		 */
		store = new Vuex.Store({
			modules: {
				'modules/example': Example,
			},
		});
		// setting the store's axios instance
		store.$axios = axios;

		exampleStore = getModule(Example, store);
	});

	afterAll(() => {
		mock.restore();
	});

	it('Mocks axios.', async () => {
		// Defines what to returns on a method.
		mock.onGet('https://jsonplaceholder.typicode.com/posts/1').reply(200, {
			userId: 1,
			id: 1,
			title:
				'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
			body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
		});

		await exampleStore.getPost();
		expect(exampleStore.post.id).toBe(1);
	});
});
```
