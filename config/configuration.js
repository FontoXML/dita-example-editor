import configurationManager from 'fontoxml-configuration/src/configurationManager.js';
import xq from 'fontoxml-selectors/src/xq';

configurationManager.set('paragraph-node-name-for-pasting', 'p');

configurationManager.set('conrefs-use-permanent-references', false);
configurationManager.set('map-manager-use-permanent-references', false);

configurationManager.set('preferred-locales', ['en']);

configurationManager.set('spell-checker-configuration', {
	isEnabledOnLoad: false,
	language: 'en_US',
	url: '//enterprise.fontoxml.com/spellcheck/api/spellcheck'
});

configurationManager.set('unique-id-configurations', [
	{
		selector: xq`self::*`,
		namespaceURI: null,
		localName: 'id'
	}
]);

configurationManager.set('splash-screen-ids', ['new-in-fonto-8.0']);
