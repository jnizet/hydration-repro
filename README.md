# HydrationRepro

This project reproduces what I think is a bug with resources combined with incremental hydration.

The home component uses an `httpResource` to load some data (`foo.json`).  
Its template uses the traditional if block testing if the resource has a value, or is loading, or has an error.

If it has a value, then it shows an additional component (`Bar`) deferred component using

```
@defer (hydrate never) {
  <app-bar />
}
```

The Bar component itself loads some other data (`bar.json`) using another `httpResource`.

This project uses SSR, so loading the page should not do any http request to load `foo.json` or `bar.json`:

- both are already loaded and displayed by the server
- the transfer state is being used
- the `@defer (hydrate never)` should even prevent the Bar component from being displayed.
- since `foo.json` is directly available, `isLoading()` should never be true and the loader should never be displayed.

But that only works partially:

- `foo.json` is not reloaded from the server (which is expected)
- `Bar` is being constructed (not expected)
- `bar.json` is reloaded from the server (not expected)
- the loading block is being displayed temporarily (not expected)

If the `@else if (foo.isLoading())` block is removed from the template, then everything starts working as expected:

- `Bar` is not being constructed
- `bar.json` is not reloaded from the server

And if the defer block is instead defined with `@defer (on immediate; hydrate never) {`, then 

- `Bar` is being constructed (unexpected)
- `bar.json` is not reloaded from the server (expected)
