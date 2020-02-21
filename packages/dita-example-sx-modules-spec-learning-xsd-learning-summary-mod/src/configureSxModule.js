import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// learningSummary
	//     A Learning Summary recaps and provides context for the achievement or accomplishment of learning
	//     objectives, provides guidance to reinforce learning and long-term memory, and may pose questions to
	//     enhance encoding and verification of the learning content.
	configureAsSheetFrame(sxModule, 'self::learningSummary', t('learning summary'), {
		defaultTextContainer: 'learningSummarybody',
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

	// learningSummary nested in topic
	configureAsFrame(
		sxModule,
		'self::learningSummary and ancestor::*[fonto:dita-class(., "topic/topic")]',
		undefined,
		{
			defaultTextContainer: 'learningSummarybody',
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in learningSummary
	configureAsTitleFrame(sxModule, 'self::title[parent::learningSummary]', undefined, {
		fontVariation: 'document-title'
	});

	// learningSummarybody
	//     The <learningSummarybody> element is the main body-level element in a learningSummary topic.
	configureAsStructure(sxModule, 'self::learningSummarybody', t('body'), {
		defaultTextContainer: 'section',
		ignoredForNavigationNextToSelector: 'false()',
		isRemovableIfEmpty: false
	});

	// section in learningSummarybody
	configureContextualOperations(sxModule, 'self::section[parent::learningSummarybody]', [
		{ name: ':section-insert-title' },
		{ name: ':contextual-delete-section' }
	]);
}
