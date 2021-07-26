# nuxt-ts-starter

A configured Nuxt.js template that is ready for development.
The configuration includes:

- TypeScript.
- Docker.
- Vuetify.
- Axios.
- Auth.
- I18n.
- Jest.
- Vuex.
- Nuxt Property Decorator:
  - Vue Class Component.
  - Vue Property Decorator.
  - Vuex Module Decorators.

All of the above have been configured so it is ready for development. Thier behaviour can be customized in thier respective `/plugins` and `/configs` directories under `/utils`.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

---

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

---

## Understanding The Template

It is a good idea to take a look at the used plugins docs for a better understanding of how it all works together, but here are some notes on how to work with this starter.

### Vuex Store

The template is using Typescript stores that are written with `vuex-module-decorators`. All modules should be created under the `/store/modules` directory, with the following important notes:

- Store modules should always have the path to them written exactly in the `name` property.
- Store modules should always be namespaced, and using `stateFactory`.
- Store modules should alwayd be exported default with a name for the class.

See example:

```ts
import { Module, VuexModule } from 'nuxt-property-decorator'

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
import { Store } from 'vuex'
import { getModule } from 'nuxt-property-decorator'

import Example from './modules/example'

export let exampleStore: Example

const initializer = (store: Store<any>) => {
	exampleStore = getModule(Example, store)
}
export const plugins = [initializer]
```

Now, all modules can be accessed directly from the store, anywhere:

```ts
import { exampleStore } from '~/store'
```

#### Caveats

The usage of `vuex-module-decorators` causes conflicts with two other plugins in the project that uses Vuex. The Vuex feature in both `nuxt/auth` and `nuxt/i18n` should be disabled.

In `i18n.config.ts` and `auth.config.ts`:

```ts
export default {
	vuex: false,
}
```

### Configurations

All plugin's configurations files are founde under `/utils/configs`, in there the plugins can be configured as wished and already include basic configuration.
The config files are usually imported into `nuxt.config.ts` to be included in there, but can be used elsewhere.

### Plugins

All plugins can be customized under the `/utils/plugins` directory and imported into `nuxt.config.tsz` to be included as such:

```ts
export default {
	plugins: [
		{ src: '~/utils/plugins/i18n.plugin.ts' },
		{ src: '~/utils/plugins/axios.plugin.ts' },
	],
}
```

The object syntax should always be used to stay consistent.

### Jest

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

Moreover, for testing actions that include axios calls, axios should be mocked in the following way:

- Import the mocking package `axios-mock-adapter`.
- Require axios. The reason behind requiring it is that the mocker can mock vanilla axios and not nuxt/axios. Importing it would cause Typescript issues and using nuxt/axios would also cause issues.
- Call `prepareAxoisMock`, it includes $ helpers from nuxt/axios into vanilla axoios.
- set the store's axios to the just created and mocked axios instance.
- Create the dummy responses for the tests.

```ts
import MockAdapter from 'axios-mock-adapter'
import prepareAxiosMock from './prepareAxiosMock'
const axios = require('axios')

const mock = new MockAdapter(axios)
prepareAxiosMock(axios)

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
		// setting the store's axios instance
		store.$axios = axios

		exampleStore = getModule(Example, store)
	})

	afterAll(() => {
		mock.restore()
	})

	it('Mocks axios.', async () => {
		// Defines what to returns on a method.
		mock.onGet('https://jsonplaceholder.typicode.com/posts/1').reply(200, {
			userId: 1,
			id: 1,
			title:
				'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
			body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
		})

		await exampleStore.getPost()
		expect(exampleStore.post.id).toBe(1)
	})
})
```

### Auth

Authorization in the project is achived by using `@nuxt/auth` and Keycloak. Everything related to authrization is handled by nuxt's auth module.

It can be configured in `auth.config.ts`. It uses env vars that are indicated in `.example.env`.
Note that Vuex in the plugin's options should be disabled.

#### Note

The projcet is currently using `@nuxt/auth-next` which is still under heavy development but stable to an extent.
The used versoin is fixed to avoid breadkin changes, and with the current simple usage it works fine.

### I18n

I18n's usage is simple, its configuration is in `i18n.cinfig.ts` and it has a plugin in `i18n.plugin.ts`.
To keep consistent locale between routes, **localePath()** should be used.
Note that Vuex in the plugin's options should be disabled.

#### Localized Route Paths

If you want to localize route paths, localize each page through its `nuxtI18n`. Encode the path using `encodeURI` for vue-router to be able to handle the Arabic characters in the url:

```ts
@Component({
	name: 'test',

	nuxtI18n: {
		paths: {
			ar: encodeURI('/تجربة'),
		},
	},
})
export default class extends Vue {}
```

Note that for these changes to reflect, the project must be re-built (hot-reload cannot detect it).

Check out nuxt-i18n docs on the matter: [Custom Paths](https://i18n.nuxtjs.org/routing#custom-paths)

---

## Current Issues

- Auth does not play well with localization, redirects after auth might often break.

## Links

- [Nuxt](https://nuxtjs.org/)
- [Nuxt Propery Decorator](https://github.com/nuxt-community/nuxt-property-decorator)
- [Vuetify](https://vuetifyjs.com/en/)
- [Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter)
