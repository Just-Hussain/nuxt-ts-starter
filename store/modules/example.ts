import {
	Module,
	VuexAction,
	VuexModule,
	VuexMutation,
} from 'nuxt-property-decorator';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

// Module's namespaced name MUST include the namespace (path).
@Module({
	name: 'modules/example',
	stateFactory: true,
	namespaced: true,
})
export default class Example extends VuexModule {
	private _stateExample = 'Example Store State';
	private _post!: Post;

	get stateExample() {
		return this._stateExample;
	}

	get post() {
		return this._post;
	}

	@VuexMutation
	updateStateExmaple(txt: string) {
		this._stateExample = txt;
	}

	@VuexMutation
	setPost(post: Post) {
		this._post = post;
	}

	@VuexAction
	actionExample() {
		/**
		 * Plugins can be access through:
		 * this.store
		 */
		console.log('Fired Action Example');
	}

	@VuexAction({ rawError: true })
	async getPost() {
		const data = await this.store.$axios.$get(
			'https://jsonplaceholder.typicode.com/posts/1'
		);
		this.setPost(data);
	}
}
