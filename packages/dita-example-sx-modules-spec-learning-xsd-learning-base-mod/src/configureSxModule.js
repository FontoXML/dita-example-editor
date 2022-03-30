import configureAsBlock from 'fontoxml-families/src/configureAsBlock.js';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock.js';
import configureAsGroup from 'fontoxml-families/src/configureAsGroup.js';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createIconWidget from 'fontoxml-families/src/createIconWidget.js';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import t from 'fontoxml-localization/src/t.js';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
	// lcAudience
	//     The <lcAudience> describes characteristics of the learners who take the instruction.
	configureAsFrame(sxModule, xq`self::lcAudience`, t('audience'), {
		contextualOperations: [
			{ name: ':lcAudience-insert-title' },
			{ name: ':contextual-delete-lcAudience' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the audience'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcChallenge
	//     The <lcChallenge> refers to what it is that you want the student to practice. For example, if you're
	//     studying network diagrams, and challenge might be "see if you can put this network into its proper
	//     sequence" or "see if you understand this network flow".
	configureAsFrame(sxModule, xq`self::lcChallenge`, t('challenge'), {
		contextualOperations: [
			{ name: ':lcChallenge-insert-title' },
			{ name: ':contextual-delete-lcChallenge' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the challenge'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcDuration
	//     The <lcDuration> provides an estimated duration for the learning activity.
	configureAsFrame(sxModule, xq`self::lcDuration`, t('duration'), {
		contextualOperations: [
			{ name: ':lcDuration-insert-title' },
			{ name: ':lcDuration-insert-lcTime' },
			{ name: ':contextual-delete-lcDuration' }
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcInstruction
	//     The <lcInstruction> describes the specifics of a learning activity.
	configureAsFrame(sxModule, xq`self::lcInstruction`, t('instruction'), {
		contextualOperations: [
			{ name: ':lcInstruction-insert-title' },
			{ name: ':contextual-delete-lcInstruction' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the instruction'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcInteraction
	//     The <lcInteraction> is a wrapper element for all the interactions of the assessment. The
	//     interactions themselves are based on a basic set of assessment types implemented as a DITA domain
	//     specialization.
	configureAsStructure(sxModule, xq`self::lcInteraction`, t('interaction'), {
		isAutoremovableIfEmpty: true
	});

	// lcIntro
	//     The <lcIntro> provides a detailed introduction and description of the content to be delivered, in
	//     cases where the <shortdesc> is not adequate to fully describe the content. It may also include
	//     instructor notes.
	configureAsFrame(sxModule, xq`self::lcIntro`, t('intro'), {
		contextualOperations: [
			{ name: ':lcIntro-insert-title' },
			{ name: ':contextual-delete-lcIntro' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the intro'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcNextSteps
	//     The <lcNextSteps> suggests next steps to reinforce the knowledge learned.
	configureAsFrame(sxModule, xq`self::lcNextSteps`, t('next steps'), {
		contextualOperations: [
			{ name: ':lcNextSteps-insert-title' },
			{ name: ':contextual-delete-lcNextSteps' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the next steps'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcObjective
	//     The <lcObjective> describes a single learning objective.
	configureAsBlock(sxModule, xq`self::lcObjective`, t('objective'), {
		contextualOperations: [
			{ name: ':contextual-insert-lcObjective--above' },
			{ name: ':contextual-insert-lcObjective--below' }
		],
		emptyElementPlaceholderText: t('type the objective'),
		blockBefore: [createLabelQueryWidget(xq`"\u25cf"`)]
	});

	// lcObjectives
	//     The <lcObjectives> lists or describes the learning goals.
	configureAsFrame(sxModule, xq`self::lcObjectives`, t('objectives'), {
		contextualOperations: [
			{ name: ':lcObjectives-insert-title' },
			{ name: ':lcObjectives-insert-lcObjectivesStem' },
			{ name: ':lcObjectives-append-lcObjectivesGroup', hideIn: ['context-menu'] },
			{
				name: ':lcObjectives-insert-lcObjectivesGroup',
				hideIn: ['element-menu', 'breadcrumbs-menu']
			},
			{ name: ':contextual-delete-lcObjectives' }
		],
		defaultTextContainer: 'lcObjectivesStem',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcObjectivesGroup
	//     The <lcObjectivesGroup> contains a list of one or more learning objectives.
	configureAsGroup(sxModule, xq`self::lcObjectivesGroup`, t('group'), {
		defaultTextContainer: 'objective',
		expression: 'compact'
	});

	// lcObjectivesStem
	//     The <lcObjectivesStem> provides a leading sentence to introduce a list of learning objectives.
	configureAsFrameWithBlock(sxModule, xq`self::lcObjectivesStem`, t('stem'), {
		emptyElementPlaceholderText: t('type the objectives stem'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcPrereqs
	//     The <lcPrereqs> describes the knowledge, experience, or other prerequisites needed to complete the
	//     content.
	configureAsFrame(sxModule, xq`self::lcPrereqs`, t('prerequisites'), {
		contextualOperations: [
			{ name: ':lcPrereqs-insert-title' },
			{ name: ':contextual-delete-lcPrereqs' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the prerequisites'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcResources
	//     The <lcResources> provides a list of related resources and information about them, such as related
	//     articles or samples on the web.
	configureAsFrame(sxModule, xq`self::lcResources`, t('resources'), {
		contextualOperations: [
			{ name: ':lcResources-insert-title' },
			{ name: ':contextual-delete-lcResources' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the resources'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcReview
	//     The <lcReview> provides a review of the main points.
	configureAsFrame(sxModule, xq`self::lcReview`, t('review'), {
		contextualOperations: [
			{ name: ':lcReview-insert-title' },
			{ name: ':contextual-delete-lcReview' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the review'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcSummary
	//     The <lcSummary> provides a textual summary that describes the main learning goals and lessons
	//     learned.
	configureAsFrame(sxModule, xq`self::lcSummary`, t('summary'), {
		contextualOperations: [
			{ name: ':lcSummary-insert-title' },
			{ name: ':contextual-delete-lcSummary' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the summary'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcTime
	//     The <lcTime> specifies the time expected to complete an activity.
	configureAsFrameWithBlock(sxModule, xq`self::lcTime`, t('time'), {
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockHeaderRight: [
			createLabelQueryWidget(xq`./@value`, {
				inline: true
			}),
			createIconWidget('clock-o', {
				clickOperation: ':lcTime-edit-@value',
				tooltipContent: t('Click here to edit the duration')
			})
		]
	});

	// learningBase
	//     The learningBase topic type is not used to deliver any actual learning content, but instead provides
	//     a set of common elements for use in the other more specific learning content types:
	//     learningOverview,learningContent, learningSummary, learningAssessment, and learningPlan.
	configureAsRemoved(sxModule, xq`self::learningBase`, t('learning base'));

	// learningBasebody
	//     The <learningBasebody> element is the main body-level element in a learningBase topic. The
	//     learningBase topic provides a set of base elements for use in the other specialized learning types.
	//     It is not generally intended for creating actual content. As such, each of the body sections in
	//     learningBase are optional.
	configureAsRemoved(sxModule, xq`self::learningBasebody`, t('learningBasebody'));
}
