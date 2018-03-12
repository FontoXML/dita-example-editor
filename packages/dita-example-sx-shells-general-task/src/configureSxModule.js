define([
	'fontoxml-families/configureMarkupLabel',
	'fontoxml-localization/t'
], function (
	configureMarkupLabel,
	t
) {
	'use strict';

	return function configureSxModule (sxModule) {
		configureMarkupLabel(sxModule, 'self::task', t('general task'));
	};
});
