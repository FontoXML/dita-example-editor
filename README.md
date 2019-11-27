# dita-example-editor

> This is an example editor configuration for DITA 1.3 element support in Fonto. The code in this repository is for
  educational purposes. Fonto does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

Fonto's proprietary code in `platform/` is not included with this repository. Please use the [FontoXML
development tools](https://www.npmjs.com/package/@fontoxml/fontoxml-development-tools) to download this code. See also
the install instructions in this README file.

This Fonto configuration uses [bower](https://bower.io) to install element configuration for the different XSD modules
in [the schema](https://github.com/fontoxml/dita-example-schema-bundle) that is used for this editor.

> This is an example editor for (internal) test and development purposes.
  It integrates as much of the optional functionality we have available via (legacy) addons.
  Also refer to the test matrix: https://docs.google.com/spreadsheets/d/1eWk6fIQnvTTi0FbT4ihwGQ9OdlDQgGzaeFDUG2tG0sw/edit#gid=0
  Please read this README carefully to get everything up-and-running locally.
  Make sure to init/update the git submodules!

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
<analysis xmlns="http://schemas.fontoxml.com/fcq/1.0/analysis-configuration.xsd" xmlns:words="urn:fontoxml:fcq:annotations:words:1.0.0">
	<sequential>
		<languageToolAnnotator baseUrl="{$LanguageTool:BaseUrl}">
			<spellingErrorMapping categories="TYPOS"/>
			<grammarErrorMapping categories="CASING COMPOUNDING CONFUSED_WORDS GRAMMAR MISC REDUNDANCY SEMANTICS COLLOQUIALISMS"/>
		</languageToolAnnotator>

		<!-- Custom white list words -->
		<!-- We do not have a white list configured in LanguageTool -->
		<regexAnnotator pattern="XPath|Fonto" ignoreCase="true" annotationTypeId="words:whitelisted" />
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