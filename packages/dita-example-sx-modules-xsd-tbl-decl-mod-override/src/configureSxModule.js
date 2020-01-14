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
		useDefaultContextMenu: false
	});

	configureProperties(sxModule, 'self::table', {
		blockHeaderRight: [
			createLabelQueryWidget(
				`import module namespace app = "http://www.fontoxml.com/app";
				"Table " || app:calculateTableNumber(fonto:current-hierarchy-node-id(), .)`
			)
		],
		// OVERRIDE: added hideIn
		contextualOperations: [
			{ name: ':cals-table-insert-title', hideIn: ['context-menu'] },
			{ name: ':cals-table-insert-desc', hideIn: ['context-menu'] },
			{ name: 'cals-table-delete', hideIn: ['context-menu'] }
		]
	});

	configureProperties(sxModule, 'self::entry', {
		// OVERRIDE: new nested/grouped contextual operations that mimic the structure of the
		// default context menu for CALS tables
		contextualOperations: [
			{
				heading: 'Table',
				contents: [
					{
						contents: [
							{ name: 'contextual-row-insert' },
							{ name: 'contextual-row-after-insert' },
							{ name: 'contextual-column-insert' },
							{ name: 'contextual-column-after-insert' }
						]
					},
					{
						contents: [
							{ name: 'contextual-row-delete' },
							{ name: 'contextual-column-delete' },
							// defined in the operations.json in the same package as this file
							{ name: 'contextual-cals-table-delete' }
						]
					},
					{
						contents: [
							{
								subMenuLabel: 'Merge cells',
								contents: [
									{ name: 'contextual-merge-cell-left' },
									{ name: 'contextual-merge-cell-right' },
									{ name: 'contextual-merge-cell-above' },
									{ name: 'contextual-merge-cell-below' }
								]
							}
						]
					},
					{
						contents: [
							{ name: 'contextual-split-cell-into-rows' },
							{ name: 'contextual-split-cell-into-columns' }
						]
					},
					{
						contents: [
							{
								subMenuLabel: 'Alignment',
								contents: [
									{
										contents: [
											{ name: 'set-cell-horizontal-alignment-left' },
											{ name: 'set-cell-horizontal-alignment-center' },
											{ name: 'set-cell-horizontal-alignment-right' },
											{ name: 'set-cell-horizontal-alignment-justify' }
										]
									},
									{
										contents: [
											{ name: 'set-cell-vertical-alignment-top' },
											{ name: 'set-cell-vertical-alignment-middle' },
											{ name: 'set-cell-vertical-alignment-bottom' }
										]
									}
								]
							},
							{
								subMenuLabel: t('More'),
								contents: [
									{
										menuGroupHeading: t('Table'),
										contents: [
											// these are all defined in the operations.json in the same package as this file
											{
												name: 'contextual-cals-table-title-insert'
											},
											{
												name: 'contextual-cals-table-desc-insert'
											},
											{
												name:
													'contextual-cals-open-table-column-sizing-popover'
											},
											{ name: 'contextual-cals-table-delete' }
										]
									},
									{
										subMenuLabel: t('Cell'),
										// original unchanged contextual operations for entry
										contents: [
											{ name: 'contextual-column-insert' },
											{ name: 'contextual-column-after-insert' },
											{ name: 'contextual-column-delete' },
											{ name: 'contextual-row-insert' },
											{ name: 'contextual-row-after-insert' },
											{ name: 'contextual-row-delete' }
										]
									}
								]
							}
						]
					},
					{
						contents: [
							{ name: 'toggle-table-overflow-expanded' },
							{ name: 'toggle-table-overflow-mode' }
						]
					}
				]
			}
		]
	});
}
