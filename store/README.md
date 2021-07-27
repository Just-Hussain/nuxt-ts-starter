# STORE

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

The template is using Typescript stores that are written with `vuex-module-decorators`. All modules should be created under the `/store/modules` directory, with the following important notes:

- Store modules should always have the path to them written exactly in the `name` property.
- Store modules should always be namespaced, and using `stateFactory`.
- Store modules should alwayd be exported default with a name for the class.

See example:

```ts
import { Module, VuexModule } from 'nuxt-property-decorator';

@Module({
	name: 'modules/example',
	stateFactory: true,
	namespaced: true,
})
export default class Exmaple extends VuexModule {}
```

All modules should be defined, initialized and exported in the store's index file.
See example:

```ts
import { Store } from 'vuex';
import { getModule } from 'nuxt-property-decorator';

import Example from './modules/example';

export let exampleStore: Example;

const initializer = (store: Store<any>) => {
	exampleStore = getModule(Example, store);
};
export const plugins = [initializer];
```

Now, all modules can be accessed directly from the store, anywhere:

```ts
import { exampleStore } from '~/store';
```
