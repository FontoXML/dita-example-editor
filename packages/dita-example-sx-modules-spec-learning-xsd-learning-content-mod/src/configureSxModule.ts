import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule) {
	// learningContent
	//     A Learning Content topic provides the learning content itself, and enables direct use of content
	//     from DITA task, concept, and reference topics, as well as additional content of any topic type that
	//     supports specific objectives declared in the Learning Overview topic type. A Learning Content topic
	//     comprises a set of self-contained content about a single terminal learning objective supported by
	//     zero or more enabling learning objectives.
	configureAsSheetFrame(
		sxModule,
		xq`self::learningContent`,
		t('learning content'),
		{
			defaultTextContainer: 'learningContentbody',
			titleQuery: xq`fonto:curated-text-in-node(./title)`,
			blockFooter: [
				createRelatedNodesQueryWidget(xq`./related-links`),
				createRelatedNodesQueryWidget(
					xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
				),
			],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// learningContent nested in topic
	configureAsFrame(
		sxModule,
		xq`self::learningContent and ancestor::*[fonto:dita-class(., "topic/topic")]`,
		undefined,
		{
			defaultTextContainer: 'learningContentbody',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// title in learningContent
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::learningContent]`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);

	// learningContentbody
	//     The <learningContentbody> element is the main body-level element in a learningContent topic.
	configureAsStructure(sxModule, xq`self::learningContentbody`, t('body'), {
		defaultTextContainer: 'section',
		isIgnoredForNavigation: false,
		isRemovableIfEmpty: false,
	});

	// section in learningContentbody
	configureContextualOperations(
		sxModule,
		xq`self::section[parent::learningContentbody]`,
		[
			{ name: ':section-insert-title' },
			{ name: ':contextual-delete-section' },
		]
	);
}
