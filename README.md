# dita-example-editor

> This is an example editor configuration for DITA 1.3 element support in Fonto. The code in this repository is for
  educational purposes. Fonto does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

Fonto's proprietary code in `platform/` is not included with this repository. Please use the [FontoXML
development tools](https://www.npmjs.com/package/@fontoxml/fontoxml-development-tools) to download this code. See also
the install instructions in this README file.

This Fonto configuration uses [bower](https://bower.io) to install element configuration for the different XSD modules
in [the schema](https://github.com/fontoxml/dita-example-schema-bundle) that is used for this editor.


## Installation

- Install [NodeJS](https://nodejs.org).
- Make sure you have a `fonto.lic` license file in your project directory, or a parent directory thereof. Contact
  [team@fontoxml.com](team@fontoxml.com) in order to obtain a license.
- Install FDT:
  ```
  $ npm install --global @fontoxml/fontoxml-development-tools
  ```
- Download Fonto's proprietary code:
  ```
  $ cd dita-example-editor
  $ npm install
  ```
- Remove the line `/platform/` from the `.gitignore` file.
- Commit the proprietary code in `platform/` and additional configuration packages that were downloaded into `packages/`
  to your version control.


## Configuring the editor

Fonto provides a development server that will run on `localhost:8080` by default, and allows you to see changes in your
editor without having to rebuild the application. This is the recommended approach to rapidly iterate on your editor
configuration:

```
$ fdt editor run
```

Please see [documentation.fontoxml.com](https://documentation.fontoxml.com/) for extensive guides, tutorials and API
reference documentation.

See also:
- [Getting started](https://documentation.fontoxml.com/editor/latest/getting-started-30015568.html) with a completely
  new editor configuration.
- [Configure elements](https://documentation.fontoxml.com/editor/latest/configure-elements-30024973.html)
- [Create operations](https://documentation.fontoxml.com/editor/latest/create-operations-30015649.html)
- [Create a masthead](https://documentation.fontoxml.com/editor/latest/create-a-masthead-30015704.html)
- [Create a modal](https://documentation.fontoxml.com/editor/latest/create-a-modal-25591873.html)
- [Create a sidebar](https://documentation.fontoxml.com/editor/latest/create-a-sidebar-25591877.html)
- [Create a popover](https://documentation.fontoxml.com/editor/latest/create-a-popover-30032241.html)


## Deploying the editor

The application can be built using the following command:

```
$ fdt editor build
```

This compiles the various configuration source files into the `dist/` directory. You can deploy the Fonto editor to your
environment by serving those files from your own host.

See also:

- [Integrate with a CMS](https://documentation.fontoxml.com/editor/latest/integrate-with-a-cms-3099086.html)
- [Build the editor](https://documentation.fontoxml.com/editor/latest/build-the-editor-25591923.html)

For additional help for this command, run: `$ fdt editor --help`
