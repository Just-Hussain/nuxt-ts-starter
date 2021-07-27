import { Store } from 'vuex';

declare module 'vuex-module-decorators/dist/types' {
	interface VuexModule {
		store: Store<any>;
	}
}
