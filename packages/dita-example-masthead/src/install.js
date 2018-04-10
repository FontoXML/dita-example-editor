define([
	'fontoxml-modular-ui/uiManager',

	'./DitaExampleMasthead.jsx'
], function (
	uiManager,

	DitaExampleMasthead
) {
	'use strict';

	return function install () {
		uiManager.registerReactComponent('Masthead', DitaExampleMasthead);
	};
});
