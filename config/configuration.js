import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

configurationManager.set('paragraph-node-name-for-pasting', 'p');

configurationManager.set('conrefs-use-permanent-references', false);
configurationManager.set('map-manager-use-permanent-references', false);

configurationManager.set('preferred-locales', ['en']);

configurationManager.set('spell-checker-configuration', {
	authorization: {
		url: '//enterprise.fontoxml.com/auth/api/authbyapikey',
		apiKey: 'c082c49c97f57e2b6a47db27134b2168'
	},
	isEnabledOnLoad: false,
	language: 'en_US',
	url: '//enterprise.fontoxml.com/spellcheck/api/spellcheck'
});

configurationManager.set('unique-id-configurations', [
	{
		selector: 'self::*',
		namespaceURI: null,
		localName: 'id'
	}
]);
