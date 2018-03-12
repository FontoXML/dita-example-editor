# FontoXML Editor DITA Example

## Installation
- Install [NodeJS](https://nodejs.org).
- Install local dependencies
  ```
  $ npm install
  ```

## Building the application

```
$ npm run build
```

For additional help for this command, run: `$ npm run build -- --help`

## Serving the application

There are two ways of serving the application. Both methods stub the CMS connector endpoints.

### Development server

Serving the application while building the files from source on each load.

```
$ npm run server
```

### Build server

Serving the application directly from the `dist` directory.

```
$ npm run build-server
```

For additional help for this command, run: `$ npm run server -- --help`
