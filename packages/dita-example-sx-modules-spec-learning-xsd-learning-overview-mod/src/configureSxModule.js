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
	// learningOverview
	//     A Learning Overview topic identifies the learning objectives, includes other information helpful to
	//     the learner, such as prerequisites, duration, intended audience, and can include information and
	//     strategies that seeks to gain attention and stimulate recall of prior learning.
	configureAsSheetFrame(sxModule, xq`self::learningOverview`, t('learning overview'), {
		defaultTextContainer: 'learningOverviewbody',
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

	// learningOverview nested in topic
	configureAsFrame(
		sxModule,
		xq`self::learningOverview and ancestor::*[fonto:dita-class(., "topic/topic")]`,
		undefined,
		{
			defaultTextContainer: 'learningOverviewbody',
			titleQuery:
				xq`./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in learningOverview
	configureAsTitleFrame(sxModule, xq`self::title[parent::learningOverview]`, undefined, {
		fontVariation: 'document-title'
	});

	// learningOverviewbody
	//     The <learningOverviewbody> element is the main body-level element in a learningOverview topic. A
	//     learningOverviewbody has a very specific structure, with the following elements in this order:
	//     <lcIntro>, <lcAudience>, <lcDuration>, <lcPrereqs>, <lcObjectives>, <lcResources>, followed by one
	//     or more <section> elements. Each of the learningOverviewbody sections are optional.
	configureAsStructure(sxModule, xq`self::learningOverviewbody`, t('body'), {
		defaultTextContainer: 'section',
		isIgnoredForNavigation: false,
		isRemovableIfEmpty: false
	});

	// section in learningOverviewbody
	configureContextualOperations(sxModule, xq`self::section[parent::learningOverviewbody]`, [
		{ name: ':section-insert-title' },
		{ name: ':contextual-delete-section' }
	]);
}
