import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

import attributesEditorConfigurationJson from './attributesEditorConfiguration.json';

configurationManager.set('attributes-editor-configuration', attributesEditorConfigurationJson);

configurationManager.set('content-quality-configuration', {});

configurationManager.set('conrefs-use-permanent-references', false);
configurationManager.set('map-manager-use-permanent-references', false);

configurationManager.set('enable-experiment/drag-and-drop-in-structure-view-sidebar', true);

configurationManager.set('paragraph-node-name-for-pasting', 'p');

configurationManager.set('preferred-locales', ['en']);

configurationManager.set('spell-checker-configuration', {
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

const scope = configurationManager.get('scope');
if (scope.configuration && typeof scope.configuration === 'object') {
	// eslint-disable-next-line no-console
	console.info('Reading scope.configuration from the current URL…');
	Object.keys(scope.configuration).forEach(configurationKey => {
		const configurationValue = scope.configuration[configurationKey];
		// eslint-disable-next-line no-console
		console.info(`Setting "${configurationKey}" to:`, configurationValue);
		configurationManager.set(configurationKey, configurationValue);
	});
}
