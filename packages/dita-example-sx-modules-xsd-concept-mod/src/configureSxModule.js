import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// conbody
	//     The <conbody> element is the main body-level element for a concept. Like the <body> element of a
	//     general <topic>, <conbody> allows paragraphs, lists, and other elements as well as sections and
	//     examples. But <conbody> has a constraint that a section or an example can be followed only by other
	//     sections or examples. Category: Concept elements
	configureAsStructure(sxModule, 'self::conbody', t('body'), {
		defaultTextContainer: 'p',
		isRemovableIfEmpty: false
	});

	// section in conbody/conbodydiv
	configureContextualOperations(
		sxModule,
		'self::section[parent::conbodydiv or (parent::conbody and preceding-sibling::*[1][self::section or self::example or self::conbodydiv])]',
		[{ name: ':section-insert-title' }, { name: ':contextual-delete-section' }]
	);

	// example in conbody/conbodydiv
	configureContextualOperations(
		sxModule,
		'self::example[parent::conbodydiv or (parent::conbody and preceding-sibling::*[1][self::section or self::example or self::conbodydiv])]',
		[{ name: ':example-insert-title' }, { name: ':contextual-delete-example' }]
	);

	// conbodydiv
	//     The <conbodydiv> element is similar to the <bodydiv> element in that it provides an informal
	//     container for content that may be grouped within a concept. There are no additional semantics
	//     attached to the conbodydiv element; it is purely a grouping element provided to help organize
	//     content.
	configureAsFrame(sxModule, 'self::conbodydiv', t('body division'), {
		contextualOperations: [{ name: ':contextual-unwrap-conbodydiv' }],
		defaultTextContainer: 'section',
		emptyElementPlaceholderText: t('type the content'),
		ignoredForNavigationNextToSelector: 'false()',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// concept
	//     The <concept> element is the top-level element for a topic that answers the question what is?
	//     Concepts provide background information that users must know before they can successfully work with
	//     a product or interface. Often, a concept is an extended definition of a major abstraction such as a
	//     process or function. It might also have an example or a graphic, but generally the structure of a
	//     concept is fairly simple. Category: Concept elements
	configureAsSheetFrame(sxModule, 'self::concept', t('concept'), {
		defaultTextContainer: 'conbody',
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

	// concept nested in topic
	configureAsFrame(
		sxModule,
		'self::concept[parent::*[fonto:dita-class(., "topic/topic")]]',
		undefined,
		{
			defaultTextContainer: 'conbody',
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in concept
	configureAsTitleFrame(sxModule, 'self::title[parent::concept]', undefined, {
		fontVariation: 'document-title'
	});
}
