# dita-example-sx-modules-xsd-bookmap-mod

> This is an example configuration for DITA 1.3 element support in FontoXML. The code in this repository is for
  educational purposes. FontoXML does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

The elements configured in this package correlate to definitions in [the example schema bundle](
https://github.com/fontoxml/dita-example-schema-bundle):

> /schema/bookmap/xsd/bookmapMod.xsd

## To use

- Copy or clone this repository into your editor's `packages` directory.

- Create a dependency on the package from the `fonto-manifest.json` file in your schema shell package.

### Showing the ref node in the sheet frame and outline
Because the bookmap uses "special" ref elements, this should be shown in the outline and sheet frame of the topic. See an example of this code in [dita-example-sx-integration/src/configureSxModule.js](https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-sx-integration/src/configureSxModule.js)

### Insert topic menu
To insert the different bookmap ref elements from the toolbar, you can create a dynamic drop down menu. See an example of this code in [InsertTopicMenu.jsx](https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-masthead/src/menus/InsertTopicMenu.jsx)

## Configure add-on functionality

This package needs additional operations to be fully effective. Please make sure the following operations are defined
in your own code. In those operations you can use any add-on or additional operation steps that you need. For an example
of these supplemental operations, please see the [dita-example-sx-integration](https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-sx-integration) package
and the [dita-example-structure-view](https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-structure-view) package of the example editor.

### :_open-template-browser-for-insert
Should use the ":_disable-when-selected-documented-is-a-map" in the insertOperationName property of the browse modal.

No import operation data needed

Exports operation data

- `{string}` reference, a path or identifier that points to the new topic.

### :_open-document-browser-for-insert
Should use the ":_disable-when-selected-documented-is-a-map" in the insertOperationName property of the browse modal.

No import operation data needed

Exports operation data

- `{string}` reference, a path or identifier that points to the existing topic.

### :contextual-insert-topicref--from-template
### :contextual-insert-topicref--to-existing-document
These operations should be the same as the operations used to insert new/existing topics in a regular map. Using these operations for regular maps still needs to be part of your own code.

