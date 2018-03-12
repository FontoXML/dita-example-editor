define([
	'fontoxml-modular-ui/uiManager',

	'./FruxMasthead.jsx'
], function (
	uiManager,

	FruxMasthead
) {
	'use strict';

	return function install () {
		uiManager.registerReactComponent('Masthead', FruxMasthead);
	};
});
