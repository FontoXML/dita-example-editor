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
  $ git submodule init
  $ git submodule update
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


## Content quality

Content quality is integrated in this editor with this configuration:
```
<analysis xmlns="http://schemas.fontoxml.com/fcq/1.0/analysis-configuration.xsd">
	<sequential>
		<languageToolAnnotator baseUrl="{$LanguageTool:BaseUrl}">
			<spellingErrorMapping categories="TYPOS"/>
			<grammarErrorMapping categories="CASING COMPOUNDING CONFUSED_WORDS GRAMMAR MISC REDUNDANCY SEMANTICS COLLOQUIALISMS"/>
		</languageToolAnnotator>
	</sequential>
</analysis>
```


### Running content quality

```
$ cd ./content-quality
$ fdt fcq run
```


## Document history

Document history is not yet fully integrated in FDT yet, so you have to "manually" build and run it
using Docker (compose).
The backend and compare docker repositories are included as git submodules in the ./document-history
folder (see Installation).


### Building document history

```
$ cd ./document-history
$ docker-compose build
```

If this fails with an authorization error. Contact Devops for the proper credentials.
If it keeps failing even after running docker login with the proper credentials, you can try
manually pulling the docker image with the authorization warning and then running
`$ docker-compose build` again.


### Running document history

```
$ cd ./document-history
$ docker-compose up
```


## Review

This uses the fontoxml reference configuration which is included as a git submodule in the
./packages folder.


### Running Review

```
$ cd ./review
$ fdt review run
```


## Extra configuration options

### Application specific configuration options
This editor allows you to configure anything that you can configure with a configuration variable in
`config/configuration.js` through the URL as well.

Inside the scope URL search parameter, this editor also accepts a `"configuration"` property. This property should be an
object where you can you set configuration variable.

By default, this editor starts with a  application specific (ie. not a product feature) configuration variable in it:
```
configurationManager.set('app/use-sheet-frame-headers', true)
```

You can modify this to switch between using the traditional sheet frame widgets and the recommended and more recent
sheet frame header React component.

If such overrides are present, there are console info messages to indicate which overrides are applied.


### Different browse modals

This editor has a working example for every kind of browse modal the SDK has.
Images are browsed through the cms browse modals, cross links to other nodes are implemented in
3 different ways:
1. Regular "Cross link": this uses the browse modal provided by the fontoxml-cms-browsers addon
2. "Local project link": this uses the browse modal provided by the fontoxml-project-browser addon
3. "Local node link": this uses the browse modal provided by the fontoxml-nodes-browser addon
All of them use the same linkableElementsQuery (which is set to every node that has an @id, which is
practically every node that is visualized as [editable] content).
You can find insert menu items under the "Link" dropdown in the "Inline" masthead tab.
After insertion, each link can be edited with the same browse modal used to insert it.
(This is done by recording a @type attribute on the created xref to associate the appropriate edit
operation name.)