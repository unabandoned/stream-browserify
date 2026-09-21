# @unabandoned/stream-browserify

the stream module from node core, for browsers!

This module uses [`@unabandoned/readable-stream`](https://github.com/unabandoned/readable-stream), with additions for compatibility with npm packages that use old Node.js stream APIs.

> A maintained fork of [browserify/stream-browserify](https://github.com/browserify/stream-browserify),
> which has had no release since April 2020. Published as
> [`@unabandoned/stream-browserify`](https://www.npmjs.com/package/@unabandoned/stream-browserify);
> the API is unchanged from upstream — it consumes readable-stream 4 through the
> package root instead of the `lib/_stream_*.js` paths 3.x exposed.

## Install

You usually do not have to install `stream-browserify` yourself! If your code runs in Node.js, `stream` is built in, or `readable-stream` can be used. If your code runs in the browser, bundlers like [browserify](https://github.com/browserify/browserify) also include the `stream-browserify` module.

But if none of those apply, with [npm](https://npmjs.org) do:

```bash
npm install @unabandoned/stream-browserify
```

## API

Consult the node core
[documentation on streams](http://nodejs.org/docs/latest/api/stream.html).

## Testing

`npm test` runs the suite on Node's built-in test runner. The upstream
Sauce Labs browser matrix (driven by airtap) is gone: the runner was unmaintained,
needed credentials CI doesn't have, and was never wired into a pipeline — the
badge it left behind reported nothing.

## License

[MIT](./LICENSE)
