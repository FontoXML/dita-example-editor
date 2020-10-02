# dita-example-sx-modules-xsd-equation-domain

> This is an example configuration for DITA 1.3 element support in FontoXML. The code in this repository is for
  educational purposes. FontoXML does not provide any warranty with regards to feature-completeness or stability of this
  package. Please see the license file for more information.

The elements configured in this package correlate to definitions in [the example schema bundle](
https://github.com/fontoxml/dita-example-schema-bundle):

> /schema/technicalContent/xsd/equationDomain.xsd

## To use

- Copy or clone this repository into your editor's `packages` directory.

- Create a dependency on the package from the `fonto-manifest.json` file in your schema shell package.

## Configure add-on functionality

This package has a dependency on the `fontoxml-mathml` add-on, which you can select from our SDK.

This package needs additional namespace configuration to be fully effective. Please make sure the MathML namespace URL
(`http://www.w3.org/1998/Math/MathML`) is added to the [namespaceManager](
https://documentation.fontoxml.com/api/latest/namespacemanager-16319152.html) with a prefix of your choice. For an
example of the namespace declaration, please see the [dita-example-sx-integration package of the example editor](
https://github.com/fontoxml/dita-example-editor/tree/develop/packages/dita-example-sx-integration).
