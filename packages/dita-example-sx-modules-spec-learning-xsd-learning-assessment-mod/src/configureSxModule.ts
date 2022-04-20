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
	// learningAssessment
	//     A Learning Assessment presents questions or interactions that measure progress, encourage
	//     recollection, and stimulate reinforcement of the learning content, and can be presented before the
	//     content as a pre-assessment or as a post-assessment test. The interactions use a sub-set of the
	//     Question-Test Interoperability (QTI) specification, implemented as a DITA domain specialization.
	configureAsSheetFrame(
		sxModule,
		xq`self::learningAssessment`,
		t('learning assessment'),
		{
			defaultTextContainer: 'learningAssessmentbody',
			titleQuery: xq`./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
			blockFooter: [
				createRelatedNodesQueryWidget(xq`./related-links`),
				createRelatedNodesQueryWidget(
					xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
				),
			],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// learningAssessment nested in topic
	configureAsFrame(
		sxModule,
		xq`self::learningAssessment and ancestor::*[fonto:dita-class(., "topic/topic")]`,
		undefined,
		{
			defaultTextContainer: 'learningAssessmentbody',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// title in learningAssessment
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::learningAssessment]`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);

	// learningAssessmentbody
	//     The <learningAssessmentbody> element is the main body-level element in a learningAssessment topic.
	configureAsStructure(
		sxModule,
		xq`self::learningAssessmentbody`,
		t('body'),
		{
			defaultTextContainer: 'section',
			isIgnoredForNavigation: false,
			isRemovableIfEmpty: false,
		}
	);

	// section in learningAssessmentbody
	configureContextualOperations(
		sxModule,
		xq`self::section[parent::learningAssessmentbody]`,
		[
			{ name: ':section-insert-title' },
			{ name: ':contextual-delete-section' },
		]
	);
}
