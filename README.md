# dita-example-editor

> This is an example editor configuration for DITA 1.3 element support in FontoXML. The code in this repository is for
  educational purposes. FontoXML does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

The proprietary code in `platform/` and `tools/` is not included with this repository. Please use the [FontoXML
development tools](https://www.npmjs.com/package/@fontoxml/fontoxml-development-tools) to perform an SDK upgrade in
order to download this code. See also the install instructions.

This FontoXML editor uses [bower](https://bower.io) to install element configuration for the different XSD modules in
[the schema](https://github.com/fontoxml/dita-example-schema-bundle) that is used for this editor.


## Installation
- Install [NodeJS](https://nodejs.org).
- Install FDT
  ```
  $ npm install --global @fontoxml/fontoxml-development-tools
  ```
- Upgrade the platform code
  ```
  $ cd dita-example-editor
  $ fdt editor upgrade
  ```


## Building the application

```
$ fdt editor build
```

For additional help for this command, run: `$ fdt editor build --help`


## Serving the application

There are two ways of serving the application. Both methods stub the CMS connector endpoints.


### Development server

Serving the application while building the files from source on each load.

```
$ fdt editor run
```


### Build server

Serving the application directly from the `dist` directory.

```
$ npm editor run --dist
```

For additional help for this command, run: `$ fdt editor --help`
