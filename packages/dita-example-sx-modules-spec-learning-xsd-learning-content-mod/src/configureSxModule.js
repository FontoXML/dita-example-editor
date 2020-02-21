import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// learningContent
	//     A Learning Content topic provides the learning content itself, and enables direct use of content
	//     from DITA task, concept, and reference topics, as well as additional content of any topic type that
	//     supports specific objectives declared in the Learning Overview topic type. A Learning Content topic
	//     comprises a set of self-contained content about a single terminal learning objective supported by
	//     zero or more enabling learning objectives.
	configureAsSheetFrame(sxModule, 'self::learningContent', t('learning content'), {
		defaultTextContainer: 'learningContentbody',
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

	// learningContent nested in topic
	configureAsFrame(
		sxModule,
		'self::learningContent and ancestor::*[fonto:dita-class(., "topic/topic")]',
		undefined,
		{
			defaultTextContainer: 'learningContentbody',
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in learningContent
	configureAsTitleFrame(sxModule, 'self::title[parent::learningContent]', undefined, {
		fontVariation: 'document-title'
	});

	// learningContentbody
	//     The <learningContentbody> element is the main body-level element in a learningContent topic.
	configureAsStructure(sxModule, 'self::learningContentbody', t('body'), {
		defaultTextContainer: 'section',
		ignoredForNavigationNextToSelector: 'false()',
		isRemovableIfEmpty: false
	});

	// section in learningContentbody
	configureContextualOperations(sxModule, 'self::section[parent::learningContentbody]', [
		{ name: ':section-insert-title' },
		{ name: ':contextual-delete-section' }
	]);
}
