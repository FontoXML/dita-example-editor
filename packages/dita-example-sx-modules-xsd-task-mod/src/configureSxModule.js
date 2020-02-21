import configureAsBlock from 'fontoxml-families/src/configureAsBlock.js';
import configureAsDefinitionsTableRow from 'fontoxml-families/src/configureAsDefinitionsTableRow.js';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsGroup from 'fontoxml-families/src/configureAsGroup.js';
import configureAsLine from 'fontoxml-families/src/configureAsLine.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createLabelWidget from 'fontoxml-families/src/createLabelWidget.js';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createNumberingWidget from 'fontoxml-families/src/createNumberingWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// chdesc
	//     The <chdesc> element is a description of an option that a user chooses while performing a step to
	//     accomplish a task. It explains why the user would choose that option, and might explain the result
	//     of the choice when it is not immediately obvious. Category: Task elements
	configureAsStructure(sxModule, 'self::chdesc', t('description'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the description')
	});

	// p in chdesc
	configureAsBlock(
		sxModule,
		'self::p[parent::chdesc] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('type the description')
		}
	);

	// chdeschd
	//     The <chdeschd> option provides a specific label for the list of descriptions of options that a user
	//     must choose to accomplish a step of a task. The default label overridden by <chdeschd> is
	//     Description. Category: Task elements
	configureAsStructure(sxModule, 'self::chdeschd', t('title'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the title for the descriptions')
	});

	// p in chdeschd
	configureAsBlock(
		sxModule,
		'self::p[parent::chdeschd] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('type the title for the descriptions')
		}
	);

	// chhead
	//     The <chhead> element is a container inside the <choicetable> element that provides specific heading
	//     text to override the default Options and Description headings. The <chhead> element contains both a
	//     <choptionhd> and <chdeschd> element as a pair. Category: Task elements
	configureAsDefinitionsTableRow(sxModule, 'self::chhead', t('header'), {
		columns: [{ query: './choptionhd', width: 1 }, { query: './chdeschd', width: 2 }],
		borders: true,
		backgroundColor: 'black',
		showWhen: 'always',
		contextualOperations: [{ name: ':contextual-delete-chhead' }]
	});

	// choice
	//     Each <choice> element describes one way that the user could accomplish the current step. Category:
	//     Task elements
	configureAsGroup(sxModule, 'self::choice', t('choice'), {
		contextualOperations: [
			{ name: ':contextual-insert-choice--above' },
			{ name: ':contextual-insert-choice--below' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('describe a choice for this step'),
		blockBefore: [createLabelQueryWidget('"\u25cf"')]
	});

	// p in choice
	configureAsLine(sxModule, 'self::p[parent::choice]', t('paragraph'));

	// p(only) in choice
	configureAsLine(
		sxModule,
		'self::p[parent::choice] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('describe a choice for this step')
		}
	);

	// choices
	//     The <choices> element contains a list of <choice> elements. It is used when the user will need to
	//     choose one of several actions while performing the steps of a task. Category: Task elements
	configureAsFrame(sxModule, 'self::choices', t('choice list'), {
		defaultTextContainer: 'choice',
		expression: 'compact',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// choicetable
	//     The <choicetable> element contains a series of optional choices available within a step of a task.
	//     Category: Task elements
	configureAsFrame(sxModule, 'self::choicetable', t('choice table'), {
		contextualOperations: [{ name: ':contextual-delete-choicetable' }],
		tabNavigationItemSelector: 'name() = ("choptionhd", "chdeschd", "choption", "chdesc")',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// choption
	//     The <choption> element describes an option that a user could choose to accomplish a step of a task.
	//     In a user interface, for example, this might be the name of radio button. Category: Task elements
	configureAsStructure(sxModule, 'self::choption', t('option'), {
		emptyElementPlaceholderText: t('type the option'),
		defaultTextContainer: 'p'
	});

	// p in choption
	configureAsBlock(
		sxModule,
		'self::p[parent::choption] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('type the option')
		}
	);

	// choptionhd
	//     The <choptionhd> element provides a specific label for the list of options that a user chooses from
	//     to accomplish a step. The default label for options is Option. Category: Task elements
	configureAsStructure(sxModule, 'self::choptionhd', t('title'), {
		emptyElementPlaceholderText: t('type the title for the options'),
		defaultTextContainer: 'p'
	});

	// p in choptionhd
	configureAsBlock(
		sxModule,
		'self::p[parent::choptionhd] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('type the title for the options')
		}
	);

	// chrow
	//     The <chrow> element is a container inside the <choicetable> element. The <chrow> element contains
	//     both a <choption> and <chdesc> element as a pair. Category: Task elements
	configureAsDefinitionsTableRow(sxModule, 'self::chrow', t('row'), {
		columns: [{ query: './choption', width: 1 }, { query: './chdesc', width: 2 }],
		contextualOperations: [
			{ name: ':contextual-insert-chrow--above' },
			{ name: ':contextual-insert-chrow--below' },
			{ name: ':contextual-delete-chrow' }
		],
		borders: true
	});

	// cmd
	//     The command (<cmd>) element is required as the first element inside a <step>. It provides the active
	//     voice instruction to the user for completing the step, and should not be more than one sentence. If
	//     the step needs additional explanation, this can follow the <cmd> element inside an <info > element.
	//     Category: Task elements
	configureAsLine(sxModule, 'self::cmd', t('command'), {
		emptyElementPlaceholderText: t('type a single sentence instruction')
	});

	// context
	//     The <context> section of a task provides background information for the task. This information helps
	//     the user understand what the purpose of the task is and what they will gain by completing the task.
	//     This section should be brief and does not replace or recreate a concept topic on the same subject,
	//     although the context section may include some conceptual information. Category: Task elements
	configureAsFrame(sxModule, 'self::context', t('context'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type a context for this task'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// info
	//     The information element (<info>) occurs inside a <step> element to provide additional information
	//     about the step. Category: Task elements
	configureAsFrame(sxModule, 'self::info', t('information'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type additional information for this step'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// postreq
	//     The <postreq> element describes steps or tasks that the user should do after the successful
	//     completion of the current task. It is often supported by links to the next task or tasks in the
	//     <related-links> section. Category: Task elements
	configureAsFrame(sxModule, 'self::postreq', t('postrequisites'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the postrequisites for this task'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// prereq
	//     The pre-requisite (<prereq>) section of a task should document things the user needs to know or do
	//     before starting the current task. Prerequisite links will be placed in a list after the
	//     related-links section; on output the <prereq> links from the related-links section are added to the
	//     <prereq> section. Category: Task elements
	configureAsFrame(sxModule, 'self::prereq', t('prerequisites'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the prerequisites for this task'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// result
	//     The <result> element describes the expected outcome for the task as a whole. Category: Task elements
	configureAsFrame(sxModule, 'self::result', t('result'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type a result for this task'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// step
	//     The <step> element represents an action that a user must follow to accomplish a task. Each step in a
	//     task must contain a command <cmd> element which describes the particular action the user must do to
	//     accomplish the overall task. The step element can also contain information <info>, substeps
	//     <substeps>, tutorial information <tutorialinfo>, a step example <stepxmp>, choices <choices> or a
	//     stepresult <stepresult>, although these are optional. Category: Task elements
	configureAsGroup(sxModule, 'self::step', t('step'), {
		contextualOperations: [
			{ name: ':contextual-insert-note', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-info', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-tutorialinfo', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-stepxmp', hideIn: ['breadcrumbs-menu'] },
			{ name: ':step-insert-choices', hideIn: ['breadcrumbs-menu'] },
			{ name: ':step-insert-choicetable', hideIn: ['breadcrumbs-menu'] },
			{ name: ':step-insert-substeps', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-stepresult', hideIn: ['breadcrumbs-menu'] },
			{ name: ':step-insert-steptroubleshooting', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-step--above' },
			{ name: ':contextual-insert-step--below' },
			{ name: ':contextual-insert-stepsection--above' },
			{ name: ':contextual-insert-stepsection--below' },
			{ name: ':contextual-delete-step' }
		],
		defaultTextContainer: 'cmd',
		titleQuery: './cmd',
		blockBefore: [
			createNumberingWidget('self::step', {
				containerSelectorOrNodeSpec: 'self::steps',
				prefix: 'step'
			})
		],
		blockBeforeWidth: 'wide'
	});

	// step in steps-unordered
	configureAsGroup(sxModule, 'self::step[parent::steps-unordered]', t('step'), {
		defaultTextContainer: 'cmd',
		titleQuery: './cmd',
		blockBefore: [createLabelWidget('step')],
		blockBeforeWidth: 'wide'
	});

	// note in step or substep
	var NOTE_CONVERT_OPERATIONS = [
		{ name: ':note-convert-to-@type=null' },
		{ name: ':note-convert-to-@type=attention' },
		{ name: ':note-convert-to-@type=caution' },
		{ name: ':note-convert-to-@type=danger' },
		{ name: ':note-convert-to-@type=fastpath' },
		{ name: ':note-convert-to-@type=important' },
		{ name: ':note-convert-to-@type=notice' },
		{ name: ':note-convert-to-@type=remember' },
		{ name: ':note-convert-to-@type=restriction' },
		{ name: ':note-convert-to-@type=tip' },
		{ name: ':note-convert-to-@type=warning' },
		{ name: ':note-convert-to-@type=other' }
	];
	function getContextualOperationsForNoteType(noteType) {
		return NOTE_CONVERT_OPERATIONS.filter(function(element) {
			return element.name.indexOf(noteType) === -1;
		}).concat([{ name: ':contextual-delete-note' }]);
	}
	configureContextualOperations(
		sxModule,
		'self::note[parent::step or parent::substep]',
		getContextualOperationsForNoteType('@type=null')
	);
	[
		'attention',
		'caution',
		'danger',
		'fastpath',
		'important',
		'notice',
		'remember',
		'restriction',
		'tip',
		'warning',
		'other'
	].forEach(function(noteType) {
		configureContextualOperations(
			sxModule,
			'self::note[@type="' + noteType + '" and (parent::step or parent::substep)]',
			getContextualOperationsForNoteType(noteType)
		);
	});

	// stepresult
	//     The <stepresult> element provides information on the expected outcome of a step. If a user interface
	//     is being documented, the outcome could describe a dialog box opening, or the appearance of a
	//     progress indicator. Step results are useful to assure a user that they are on track, but should not
	//     be used for every step, as this quickly becomes tedious. Category: Task elements
	configureAsFrame(sxModule, 'self::stepresult', t('result'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type a result for this step'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// steps
	//     The <steps> section of a task provides the main content of the task topic. The task is described as
	//     a series of steps that the user must follow to accomplish the task. One or more <steps> elements is
	//     required inside the <steps> section. Category: Task elements
	configureAsGroup(sxModule, 'self::steps', t('ordered steps'), {
		contextualOperations: [
			{ name: ':steps-convert-to-steps-unordered' },
			{ name: ':contextual-replace-with-steps-informal' }
		],
		defaultTextContainer: 'step',
		ignoredForNavigationNextToSelector: 'false()'
	});

	// steps-informal
	configureAsFrame(sxModule, 'self::steps-informal', t('informal steps'), {
		contextualOperations: [
			{ name: ':steps-informal-replace-with-steps' },
			{ name: ':steps-informal-replace-with-steps-unordered' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the informal steps'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// steps-unordered
	//     Like the <steps> element, the <steps-unordered> section of a task provides the main content of the
	//     task topic, but particularly for cases in which the order of steps may vary from one situation to
	//     another. One or more steps is required inside the <steps-unordered> section. Category: Task elements
	configureAsGroup(sxModule, 'self::steps-unordered', t('unordered steps'), {
		contextualOperations: [
			{ name: ':steps-unordered-convert-to-steps' },
			{ name: ':contextual-replace-with-steps-informal' }
		],
		defaultTextContainer: 'step',
		ignoredForNavigationNextToSelector: 'false()'
	});

	// stepsection
	configureAsGroup(sxModule, 'self::stepsection', t('step section'), {
		contextualOperations: [
			{ name: ':contextual-insert-step--above' },
			{ name: ':contextual-insert-step--below' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type information about the following steps'),
		blockBefore: [createLabelWidget('section')],
		blockBeforeWidth: 'wide'
	});

	// steptroubleshooting
	//     Category: Task elements
	configureAsFrame(sxModule, 'self::steptroubleshooting', t('troubleshooting'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type troubleshooting information for this step'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// stepxmp
	//     The step example (<stepxmp>) element is used to illustrate a step of a task. The example can be a
	//     couple of words, or an entire paragraph. Category: Task elements
	configureAsFrame(sxModule, 'self::stepxmp', t('example'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type an example for this step'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// substep
	//     A <substep> element has the same structure as a <step>, except that it does not allow lists of
	//     choices or substeps within it, in order to prevent unlimited nesting of steps. Category: Task
	//     elements
	configureAsGroup(sxModule, 'self::substep', t('substep'), {
		contextualOperations: [
			{ name: ':contextual-insert-note', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-info', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-tutorialinfo', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-stepxmp', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-stepresult', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-substep--above' },
			{ name: ':contextual-insert-substep--below' },
			{ name: ':contextual-delete-substep' }
		],
		defaultTextContainer: 'cmd',
		titleQuery: './cmd',
		blockBefore: [
			createNumberingWidget('self::substep', {
				numberingStyle: 'lowerAlpha',
				containerSelectorOrNodeSpec: 'self::substeps',
				prefix: 'step'
			})
		],
		blockBeforeWidth: 'wide'
	});

	// substep in steps-unordered
	configureAsGroup(
		sxModule,
		'self::substep[parent::substeps[parent::step[parent::steps-unordered]]]',
		t('substep'),
		{
			defaultTextContainer: 'cmd',
			titleQuery: './cmd',
			blockBefore: [createLabelWidget('step')],
			blockBeforeWidth: 'wide'
		}
	);

	// substeps
	//     The <substeps> element allows you to break a step down into a series of separate actions, and should
	//     be used only if necessary. Try to describe the steps of a task in a single level of steps. If you
	//     need to use more than one level of substep nesting, you should probably rewrite the task to simplify
	//     it. Category: Task elements
	configureAsGroup(sxModule, 'self::substeps', t('substeps'), {
		defaultTextContainer: 'substep',
		ignoredForNavigationNextToSelector: 'false()'
	});

	// task
	//     The <task> element is the top-level element for a task topic. Tasks are the main building blocks for
	//     task-oriented user assistance. They generally provide step-by-step instructions that will enable a
	//     user to perform a task. A task answers the question of "how to?" by telling the user precisely what
	//     to do and the order in which to do it. Tasks have the same high-level structure as other topics,
	//     with a title, short description and body. Category: Task elements
	configureAsSheetFrame(sxModule, 'self::task', t('task'), {
		defaultTextContainer: 'taskbody',
		titleQuery:
			'./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockFooter: [
			createRelatedNodesQueryWidget('./related-links'),
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(.)]'
			)
		]
	});

	// task nested in topic
	configureAsFrame(
		sxModule,
		'self::task[parent::*[fonto:dita-class(., "topic/topic")]]',
		undefined,
		{
			defaultTextContainer: 'taskbody',
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in task
	configureAsTitleFrame(sxModule, 'self::title[parent::task]', undefined, {
		fontVariation: 'document-title'
	});

	// taskbody
	//     The <taskbody> element is the main body-level element inside a task topic. A task body has a very
	//     specific structure, with the following elements in this order: <prereq>, <context>, <steps>,
	//     <result>, <example> and <postreq>. Each of the body sections are optional. Category: Task elements
	configureAsStructure(sxModule, 'self::taskbody', t('body'), {
		defaultTextContainer: 'prereq',
		isRemovableIfEmpty: false
	});

	// example in taskbody
	configureContextualOperations(sxModule, 'self::example[parent::taskbody]', [
		{ name: ':example-insert-title' },
		{ name: ':contextual-delete-example' }
	]);

	// tasktroubleshooting
	//     Category: Task elements
	configureAsFrame(sxModule, 'self::tasktroubleshooting', t('troubleshooting'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type troubleshooting information for this task'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// tutorialinfo
	//     The tutorial info (<tutorialinfo>) element contains additional information that is useful when the
	//     task is part of a tutorial. Category: Task elements
	configureAsFrame(sxModule, 'self::tutorialinfo', t('tutorial information'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type additional tutorial information'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});
}
