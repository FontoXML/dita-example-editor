import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';

import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';

import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	sxModule.markAsAddon();

	// topic
	//     The <topic> element is the top-level DITA element for a single-subject topic or article. Other
	//     top-level DITA elements that are more content-specific are <concept>, <task>, <reference>, and
	//     <glossary>. Category: Topic elements
	configureAsSheetFrame(sxModule, 'self::topic', t('topic'), {
		sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
			? 'DefaultSheetFrameHeader'
			: null,
		defaultTextContainer: 'body',
		titleQuery:
			'./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
		blockFooter: [
			createRelatedNodesQueryWidget('./related-links'),
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(.)]'
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});
}
