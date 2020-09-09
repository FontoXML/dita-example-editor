import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

import configureProperties from 'fontoxml-families/src/configureProperties.js';

import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget.js';

import t from 'fontoxml-localization/src/t.js';

import addReducer from 'fontoxml-indices/src/addReducer.js';

import configureAsCalsTableElements from 'fontoxml-table-flow-cals/src/configureAsCalsTableElements.js';

export default function configureSxModule(sxModule) {
	if (configurationManager.get('app/use-default-table-context-menu')) {
		return;
	}

	addReducer(
		'http://www.fontoxml.com/app',
		'calculateTableNumber',
		'self::table',
		'http://www.fontoxml.com/app',
		'onReduceTableToNumber'
	);

	configureAsCalsTableElements(sxModule, {
		// copied this from our dita-example tbl-decl-mod package,
		// nothing needs to change here but we still need this configuration to
		// associate the OVERRIDE below with the correct schema elements
		table: {
			localName: 'table'
		},
		entry: {
			defaultTextContainer: 'p'
		},
		showInsertionWidget: true,
		// OVERRIDE: added this to disable the default (not so flexible) table context menu
		useDefaultContextMenu: true
	});
}
