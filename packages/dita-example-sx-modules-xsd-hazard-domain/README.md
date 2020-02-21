# dita-example-sx-modules-xsd-hazard-domain

> This is an example configuration for DITA 1.3 element support in FontoXML. The code in this repository is for
  educational purposes. FontoXML does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

The elements configured in this package correlate to definitions in [the example schema bundle](
https://github.com/fontoxml/dita-example-schema-bundle):

> /schema/base/xsd/hazardstatementDomain.xsd

## To use

- Copy or clone this repository into your editor's `packages` directory.

- Create a dependency on the package from the `fonto-manifest.json` file in your schema shell package.

## Configure add-on functionality

This package needs additional operations to be fully effective. Please make sure the following operations are defined
in your own code. In those operations you can use any add-on or additional operation steps that you need. For an example
of these supplemental operations, please see the [dita-example-sx-integration package of the example editor](
https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-sx-integration).

### :_open-image-browser-for-insert
### :_open-image-browser-for-edit

Could import operation data

- `{NodeId}` contextNodeId, points to the image node that is being edited. 

Exports operation data

- `{string}` reference, a path or identifier that points to an image.
