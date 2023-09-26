import configurationManager from 'fontoxml-configuration/src/configurationManager';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager';
import xq from 'fontoxml-selectors/src/xq';

namespaceManager.addNamespace('bookmap', 'urn:fonto:dita:bookmap');
namespaceManager.addNamespace('mathml', 'http://www.w3.org/1998/Math/MathML');

configurationManager.set('paragraph-node-name-for-pasting', 'p');

configurationManager.set('conrefs-use-permanent-references', false);

configurationManager.set('preferred-locales', ['en']);

configurationManager.set('spell-checker-configuration', {
	isEnabledOnLoad: false,
	language: 'en_US',
});

configurationManager.set('unique-id-configurations', [
	{
		selector: xq`self::*`,
		namespaceURI: null,
		localName: 'id',
		strategy: 'unique-for-document',
	},
]);
