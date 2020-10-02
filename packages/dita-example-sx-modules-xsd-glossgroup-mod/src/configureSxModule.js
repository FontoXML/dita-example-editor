import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// glossgroup
	//     The <glossgroup> element may be used to contain multiple <glossentry> topics within a single
	//     collection.
	configureAsSheetFrame(sxModule, 'self::glossgroup', t('glossary'), {
		titleQuery:
			'./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
		blockFooter: [
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(.)]'
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossgroup nested in topic
	configureAsFrame(
		sxModule,
		'self::glossgroup[parent::*[fonto:dita-class(., "topic/topic")]]',
		undefined,
		{
			blockFooter: []
		}
	);

	// title in glossary
	configureAsTitleFrame(sxModule, 'self::title[parent::glossgroup]', undefined, {
		fontVariation: 'document-title'
	});
}
