import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
	// learningContent
	//     A Learning Content topic provides the learning content itself, and enables direct use of content
	//     from DITA task, concept, and reference topics, as well as additional content of any topic type that
	//     supports specific objectives declared in the Learning Overview topic type. A Learning Content topic
	//     comprises a set of self-contained content about a single terminal learning objective supported by
	//     zero or more enabling learning objectives.
	configureAsSheetFrame(sxModule, xq`self::learningContent`, t('learning content'), {
		defaultTextContainer: 'learningContentbody',
		titleQuery:
			xq`./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
		blockFooter: [
			createRelatedNodesQueryWidget(xq`./related-links`),
			createRelatedNodesQueryWidget(
				xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// learningContent nested in topic
	configureAsFrame(
		sxModule,
		xq`self::learningContent and ancestor::*[fonto:dita-class(., "topic/topic")]`,
		undefined,
		{
			defaultTextContainer: 'learningContentbody',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in learningContent
	configureAsTitleFrame(sxModule, xq`self::title[parent::learningContent]`, undefined, {
		fontVariation: 'document-title'
	});

	// learningContentbody
	//     The <learningContentbody> element is the main body-level element in a learningContent topic.
	configureAsStructure(sxModule, xq`self::learningContentbody`, t('body'), {
		defaultTextContainer: 'section',
		isIgnoredForNavigation: false,
		isRemovableIfEmpty: false
	});

	// section in learningContentbody
	configureContextualOperations(sxModule, xq`self::section[parent::learningContentbody]`, [
		{ name: ':section-insert-title' },
		{ name: ':contextual-delete-section' }
	]);
}
