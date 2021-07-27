# Middleware Directory

[Middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware)

The middleware directory contains your application middleware. Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layout).

Shared middleware should be placed in the middleware/ directory. The filename will be the name of the middleware (middleware/auth.js will be the auth middleware). You can also define page-specific middleware by using a function directly, see anonymous middleware.

A middleware receives the context as the first argument.

```ts
export default function (context) {
	// Add the userAgent property to the context
	context.userAgent = process.server
		? context.req.headers['user-agent']
		: navigator.userAgent;
}
```
