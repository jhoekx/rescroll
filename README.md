# Rescroll

A WebExtension to repeatedly scroll a page.

## Development

Install [web-ext](https://github.com/mozilla/web-ext):

```bash
$ npm install web-ext
```

Start a development instance of Firefox using:

```bash
$ npx web-ext run
```

## Release

Increase the version number in [manifest.json](manifest.json).

Then run:

```bash
$ npx web-ext build
```
