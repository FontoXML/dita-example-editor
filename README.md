# dita-example-editor

> This is an example editor configuration for DITA 1.3 element support in FontoXML. The code in this repository is for
  educational purposes. FontoXML does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

The proprietary code in `platform/` and `tools/` is not included with this repository. Please log in to
[sdk.fontoxml.com](https://sdk.fontoxml.com) and download the latest version of the SDK.

This FontoXML editor uses [bower](https://bower.io) to install element configuration for the different XSD modules in
[the schema](https://github.com/fontoxml/dita-example-schema-bundle) that is used for this editor.

## Installation
- Install [NodeJS](https://nodejs.org).
- Clone of download this repository.
- Go to [sdk.fontoxml.com](https://sdk.fontoxml.com) and upgrade this application to get `platform/` and `tools/`.
- Run the following command to install dependencies:
  ```
  $ npm install
  ```

You can now develop the editor configuration (run `npm run server`) or build is (run `npm run build`).
