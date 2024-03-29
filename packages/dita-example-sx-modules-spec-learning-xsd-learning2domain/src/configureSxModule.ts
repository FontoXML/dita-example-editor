import configureAsDefinitionsTableRow from 'fontoxml-families/src/configureAsDefinitionsTableRow';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureProperties from 'fontoxml-families/src/configureProperties';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget';
import createIconWidget from 'fontoxml-families/src/createIconWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createOrderingByAttributeWidget from 'fontoxml-families/src/createOrderingByAttributeWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// lcAnswerContent2
	//     The <lcAnswerContent2> element in a learning assessment interaction provides the content for an
	//     answer option, which the learner can select as correct or incorrect.
	configureAsStructure(
		sxModule,
		xq`self::lcAnswerContent2`,
		t('answer option content'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the incorrect answer option'),
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerContent2[following-sibling::lcCorrectResponse2]`,
		{
			emptyElementPlaceholderText: t('Type the correct answer option'),
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerContent2[parent::lcSequenceOption2]`,
		{
			emptyElementPlaceholderText: t('Type the answer option'),
		}
	);

	// lcAnswerOption2
	//     The <lcAnswerOption2> element in an assessment interaction provides the content and feedback for a
	//     question option, and can indicate the correct option.
	configureAsFrame(sxModule, xq`self::lcAnswerOption2`, t('answer option'), {
		defaultTextContainer: 'lcAnswerContent2',
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	configureProperties(
		sxModule,
		xq`self::lcAnswerOption2[parent::*/parent::*[self::lcSingleSelect2 or self::lcTrueFalse2]]`,
		{
			markupLabel: t('incorrect answer option'),
			blockBefore: [
				createIconWidget('circle-o', {
					clickOperation: ':lcAnswerOption2-move-lcCorrectResponse2',
				}),
			],
			backgroundColor: 'red',
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerOption2[parent::*/parent::*[self::lcSingleSelect2]]`,
		{
			priority: 2,
			contextualOperations: [
				{ name: ':contextual-move-up-answer-option' },
				{ name: ':contextual-move-down-answer-option' },
				{ name: ':contextual-insert-lcAnswerOption2--above' },
				{ name: ':contextual-insert-lcAnswerOption2--below' },
			],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerOption2[parent::*/parent::*[self::lcSingleSelect2 or self::lcTrueFalse2] and child::lcCorrectResponse2]`,
		{
			markupLabel: t('correct answer option'),
			blockBefore: [
				createIconWidget('dot-circle-o', {
					clickOperation: 'do-nothing',
				}),
			],
			backgroundColor: 'green',
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerOption2[parent::*/parent::lcMultipleSelect2]`,
		{
			contextualOperations: [
				{ name: ':contextual-move-up-answer-option' },
				{ name: ':contextual-move-down-answer-option' },
				{ name: ':contextual-insert-lcAnswerOption2--above' },
				{ name: ':contextual-insert-lcAnswerOption2--below' },
			],
			markupLabel: t('incorrect answer option'),
			blockBefore: [
				createIconWidget('square-o', {
					clickOperation:
						':lcAnswerOption2-insert-lcCorrectResponse2',
				}),
			],
			blockOutsideAfter: [createElementMenuButtonWidget()],
			backgroundColor: 'red',
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcAnswerOption2[parent::*/parent::lcMultipleSelect2 and child::lcCorrectResponse2]`,
		{
			markupLabel: t('correct answer option'),
			blockBefore: [
				createIconWidget('check-square-o', {
					clickOperation:
						':lcAnswerOption2-delete-lcCorrectResponse2',
				}),
			],
			backgroundColor: 'green',
		}
	);

	// lcAnswerOptionGroup2
	configureAsStructure(
		sxModule,
		xq`self::lcAnswerOptionGroup2`,
		t('answer option group'),
		{
			defaultTextContainer: 'lcAnswerOption2',
			isIgnoredForNavigation: false,
		}
	);

	// lcArea2
	//     A lcArea2 defines an area of a hotspot image that contains a correct or incorrect choice in a
	//     hotspot assessment interaction.
	//
	// This configuration is intentionally neutral, lcArea will be further configured (for occurrences in different
	// interaction types) in the dita-example-sx-adapter-fontoshop package.
	configureAsFrame(sxModule, xq`self::lcArea2`, t('area'), {
		defaultTextContainer: 'lcFeedback2',
		contextualOperations: [
			{ name: ':lcArea2-edit' },
			{ name: ':lcArea2-insert-lcFeedback2' },
			{ name: ':contextual-delete-lcArea2' },
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideBefore: [
			// By leaving this empty, the same amount of space is reserved that (for other lcAreas) might contain
			// an icon widget.
		],
	});

	// lcAreaCoords2
	configureAsRemoved(sxModule, xq`self::lcAreaCoords2`);

	// lcAreaShape2
	configureAsRemoved(sxModule, xq`self::lcAreaShape2`);

	// lcAsset2
	//     The <lcAsset2> element in an assessment interaction provides the images or other graphic assets to
	//     support the interaction.
	configureAsStructure(sxModule, xq`self::lcAsset2`, t('asset'), {
		isAutoremovableIfEmpty: true,
	});

	// lcCorrectResponse2
	//     The <lcCorrectResponse2> element in an assessment interaction indicates a correct response.
	configureAsRemoved(sxModule, xq`self::lcCorrectResponse2`);

	// lcFeedback2
	//     The <lcFeedback2> element in an assessment interaction provides information to the learner about a
	//     correct or incorrect response.
	configureAsFrame(
		sxModule,
		xq`self::lcFeedback2`,
		t('answer option feedback'),
		{
			defaultTextContainer: 'p',
			blockBefore: [createIconWidget('thumbs-down')],
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcFeedback2 or self::p[parent::lcFeedback2 and not(preceding-sibling::*)]`,
		{
			emptyElementPlaceholderText: t('Type the feedback'),
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcFeedback2[preceding-sibling::lcCorrectResponse2]`,
		{
			blockBefore: [createIconWidget('thumbs-up')],
		}
	);

	configureProperties(
		sxModule,
		xq`self::lcFeedback2[parent::lcMatchingItemFeedback2]`,
		{
			markupLabel: t('neutral feedback'),
			emptyElementPlaceholderText: t('Type the feedback'),
			blockBefore: [],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcFeedbackCorrect2
	//     The <lcFeedbackCorrect2> element in an assessment interaction provides feedback to the learner about
	//     a correct response.
	configureAsFrame(
		sxModule,
		xq`self::lcFeedbackCorrect2`,
		t('feedback correct'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t(
				'Type the feedback for a correct response'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockBefore: [createIconWidget('thumbs-up')],
			backgroundColor: 'green',
		}
	);

	// lcFeedbackIncorrect2
	//     The <lcFeedbackIncorrect2> element in an assessment interaction provides feedback about incorrect
	//     response.
	configureAsFrame(
		sxModule,
		xq`self::lcFeedbackIncorrect2`,
		t('feedback incorrect'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t(
				'Type the feedback for a incorrect response'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockBefore: [createIconWidget('thumbs-down')],
			backgroundColor: 'red',
		}
	);

	// lcHotspot2
	//     In a lcHotspot2 interaction, the learner clicks on a region of the screen to indicate a choice.
	configureAsFrame(sxModule, xq`self::lcHotspot2`, t('hot spot'), {
		contextualOperations: [
			{ name: ':contextual-move-up' },
			{ name: ':contextual-move-down' },
			{ name: ':contextual-delete-question' },
		],
		titleQuery: xq`./lcInteractionLabel2`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcHotspotMap2
	//     A lcHotspotMap2 interaction lets you designate an action area or region over an image, allowing a
	//     click in that region to get scored as correct or incorrect in respoinse to an interaction question.
	configureAsStructure(sxModule, xq`self::lcHotspotMap2`, t('mapping'));

	// lcInstructornote2
	//     Use the <lcInstructornote2> element to provide information or notes you want to provide to the
	//     course instructor. These notes can be conditionnalized out of content you intend to deliver to the
	//     learner.
	configureAsFrame(
		sxModule,
		xq`self::lcInstructornote2`,
		t('instructor note'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t(
				'Type a note for the course instructor'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcItem2
	//     The <lcItem2> element in an assessment interaction provides the content for an item that matches the
	//     match item in a match table.
	configureAsStructure(sxModule, xq`self::lcItem2`, t('item'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the item'),
	});

	// lcMatching2
	//     In an lcMatching2 interaction, the learner identifies the correct choice that matches another
	//     choice.
	configureAsFrame(sxModule, xq`self::lcMatching2`, t('matching question'), {
		contextualOperations: [
			{ name: ':contextual-move-up' },
			{ name: ':contextual-move-down' },
			{ name: ':contextual-delete-question' },
		],
		titleQuery: xq`./lcInteractionLabel2`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcMatchingHeader2
	//     The <lcMatchingHeader2> element in an assessment interaction provides column headings for items to
	//     present in a matching table.
	configureAsDefinitionsTableRow(
		sxModule,
		xq`self::lcMatchingHeader2`,
		t('header'),
		{
			columns: [
				{ query: xq`./lcItem2`, width: 1 },
				{ query: xq`./lcMatchingItem2`, width: 1 },
				{
					query: xq`./lcMatchingItemFeedback2`,
					width: 2,
					hideColumnIfQueryIsTrue: xq`parent::lcMatchTable2[not(child::lcMatchingPair2/lcMatchingItemFeedback2)]`,
				},
			],
			contextualOperations: [
				{ name: ':contextual-delete-lcMatchingHeader2' },
			],
			borders: true,
			backgroundColor: 'black',
			showWhen: 'always',
		}
	);

	// lcMatchingItem2
	//     The <lcMatchingItem2> element in an assessment interaction provides the content for the matching
	//     side of a matching pair of items in a match table interaction.
	configureAsStructure(
		sxModule,
		xq`self::lcMatchingItem2`,
		t('matching item'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the matching item'),
		}
	);

	// lcMatchingItemFeedback2
	//     ???
	configureAsStructure(
		sxModule,
		xq`self::lcMatchingItemFeedback2`,
		t('feedback container'),
		{
			isAutoremovableIfEmpty: true,
		}
	);

	// lcMatchingPair2
	//     The <lcMatchingPair2> element in an assessment interaction provides a table row with the pair of
	//     items that comprise a correct match in a matching interaction.
	configureAsDefinitionsTableRow(
		sxModule,
		xq`self::lcMatchingPair2`,
		t('matching pair'),
		{
			columns: [
				{ query: xq`./lcItem2`, width: 1 },
				{ query: xq`./lcMatchingItem2`, width: 1 },
				{
					query: xq`./lcMatchingItemFeedback2`,
					width: 2,
					hideColumnIfQueryIsTrue: xq`parent::lcMatchTable2[not(child::lcMatchingPair2/lcMatchingItemFeedback2)]`,
				},
			],
			contextualOperations: [
				{ name: ':contextual-insert-lcMatchingPair2--above' },
				{ name: ':contextual-insert-lcMatchingPair2--below' },
				{ name: ':contextual-delete-lcMatchingPair2' },
			],
			borders: true,
		}
	);

	// lcMatchTable2
	//     The <lcMatchTable2> element in an assessment interaction provides a format for matching items.
	configureAsStructure(sxModule, xq`self::lcMatchTable2`, t('match table'), {
		tabNavigationItemSelector: xq`name() = ("lcItem2", "lcMatchingItem2", "lcMatchingItemFeedback2")`,
	});

	// lcMultipleSelect2
	//     In an lcMultipleSelect2 interaction, the learner must indicate two or more correct answers from a
	//     list of choices.
	configureAsFrame(
		sxModule,
		xq`self::lcMultipleSelect2`,
		t('multiple choice'),
		{
			contextualOperations: [
				{ name: ':contextual-move-up' },
				{ name: ':contextual-move-down' },
				{ name: ':contextual-delete-question' },
			],
			titleQuery: xq`./lcInteractionLabel2`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcOpenAnswer2
	//     Use <lcOpenAnswer2> to provide a suggested answer for an <lcOpenQuestion2> interaction.
	configureAsFrame(sxModule, xq`self::lcOpenAnswer2`, t('answer'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the answer'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcOpenQuestion2
	//     Use <lcOpenQuestion2> to pose an open-ended question in an assessment interaction.
	configureAsFrame(sxModule, xq`self::lcOpenQuestion2`, t('open question'), {
		contextualOperations: [{ name: ':contextual-delete-question' }],
		titleQuery: xq`./lcInteractionLabel2`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcQuestion2
	//     Use the <lcQuestion2> element in an interaction to ask the question.
	configureAsFrame(sxModule, xq`self::lcQuestion2`, t('question'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the question'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcSequence2
	//     The <lcSequence2> element in an assessment interaction provides the position of a sequence option in
	//     a sequence.
	configureAsRemoved(sxModule, xq`self::lcSequence2`);

	// lcSequenceOption2
	//     The <lcSequenceOption2> element in an assessment interaction provides the contents of an item in a
	//     sequence interaction.
	configureAsFrame(
		sxModule,
		xq`self::lcSequenceOption2`,
		t('answer option'),
		{
			contextualOperations: [
				{ name: ':contextual-move-up-answer-option' },
				{ name: ':contextual-move-down-answer-option' },
				{ name: ':contextual-insert-lcSequenceOption2--above' },
				{ name: ':contextual-insert-lcSequenceOption2--below' },
			],
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockBefore: [
				createOrderingByAttributeWidget({
					allItemsQuery: xq`parent::lcSequenceOptionGroup2/lcSequenceOption2/lcSequence2`,
					attributeLocalName: 'value',
					currentItemQuery: xq`child::lcSequence2`,
					icon: 'chevron-down',
					popoverTitle: t('Correct position'),
					tooltipContent: t(
						'Use this number to set the correct position of this option in the sequence.'
					),
				}),
			],
			blockOutsideAfter: [createElementMenuButtonWidget()],
			backgroundColor: 'green',
		}
	);

	// The value is higher then the number of options
	configureProperties(
		sxModule,
		xq`self::lcSequenceOption2[number(string(child::lcSequence2/@value)) gt count(parent::lcSequenceOptionGroup2/lcSequenceOption2)]`,
		{
			blockAfter: [
				createIconWidget('exclamation-triangle', {
					tooltipContent: t(
						'The ordering value can not be higher then the number of options'
					),
				}),
			],
			backgroundColor: 'orange',
		}
	);

	// The value is not unique in the sequence
	configureProperties(
		sxModule,
		xq`self::lcSequenceOption2[child::lcSequence2/@value = preceding-sibling::lcSequenceOption2/lcSequence2/@value or child::lcSequence2/@value = following-sibling::lcSequenceOption2/lcSequence2/@value]`,
		{
			blockAfter: [
				createIconWidget('exclamation-triangle', {
					tooltipContent: t('The ordering value must be unique'),
				}),
			],
			backgroundColor: 'orange',
		}
	);

	// lcSequenceOptionGroup2
	//     The <lcSequenceOptionGroup2> element provides the options for an assessment sequence interaction.
	configureAsStructure(
		sxModule,
		xq`self::lcSequenceOptionGroup2`,
		t('sequence option group')
	);

	// lcSequencing2
	//     An lcSequencing2 interaction asks the learner to arrange a list of choices into a predefined order,
	//     such as small to large.
	configureAsFrame(
		sxModule,
		xq`self::lcSequencing2`,
		t('sequencing question'),
		{
			contextualOperations: [
				{ name: ':contextual-move-up' },
				{ name: ':contextual-move-down' },
				{ name: ':contextual-delete-question' },
			],
			titleQuery: xq`./lcInteractionLabel2`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcSingleSelect2
	//     An lcSingleSelect2 interaction presents three or more choices, only one of which is correct.
	configureAsFrame(sxModule, xq`self::lcSingleSelect2`, t('single choice'), {
		contextualOperations: [
			{ name: ':contextual-move-up' },
			{ name: ':contextual-move-down' },
			{ name: ':contextual-delete-question' },
		],
		titleQuery: xq`./lcInteractionLabel2`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcTrueFalse2
	//     A lcTrueFalse2 interaction presents the learner with two choices, one correct, the other incorrect,
	//     often presented as true/false or yes/no responses.
	configureAsFrame(sxModule, xq`self::lcTrueFalse2`, t('true/false choice'), {
		contextualOperations: [
			{ name: ':contextual-move-up' },
			{ name: ':contextual-move-down' },
			{ name: ':contextual-delete-question' },
		],
		titleQuery: xq`./lcInteractionLabel2`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});
}
