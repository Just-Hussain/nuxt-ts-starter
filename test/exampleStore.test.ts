import { createLocalVue } from '@vue/test-utils';
import { getModule } from 'nuxt-property-decorator';
import { Store } from 'vuex';
import { AxiosRequestConfig } from 'axios';
import Vuex from 'vuex';
import Example from '~/store/modules/example';
import MockAdapter from 'axios-mock-adapter';
import prepareAxiosMock from './prepareAxiosMock';
const axios = require('axios');

let vm = createLocalVue();
vm.use(Vuex);

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
		store.$axios = axios;

		exampleStore = getModule(Example, store);
	});

	afterAll(() => {
		mock.restore();
	});

	it('test', async () => {
		exampleStore.actionExample();
		console.log(exampleStore.stateExample);
		exampleStore.updateStateExmaple('new');
		expect(exampleStore.stateExample).toBe('new');
	});

	it('Mocks axios.', async () => {
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
