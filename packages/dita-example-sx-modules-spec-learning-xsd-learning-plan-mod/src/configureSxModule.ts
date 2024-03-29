import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// lcAge
	//     The <lcAge> provides the age range of the intended learner audience, for use by curriculum
	//     developers and course planners.
	configureAsFrameWithBlock(sxModule, xq`self::lcAge`, t('age'), {
		emptyElementPlaceholderText: t('Type the age'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcAssessment
	//     The <lcAssessment> describes assessment plans.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcAssessment`,
		t('assessment'),
		{
			emptyElementPlaceholderText: t('Type the assessment plans'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcAttitude
	//     The <lcAttitude> describes mental state that influences the choices of personal actions.
	configureAsFrameWithBlock(sxModule, xq`self::lcAttitude`, t('attitude'), {
		emptyElementPlaceholderText: t('Type the attitude'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcBackground
	//     The <lcBackground> provides the learners' professional background and the relevancy to the learning
	//     plan.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcBackground`,
		t('background'),
		{
			emptyElementPlaceholderText: t('Type the background'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcCIN
	//     The <lcCIN> provides an alternate identifier for the project title.
	configureAsFrame(sxModule, xq`self::lcCIN`, t('CIN'), {
		contextualOperations: [
			{ name: ':lcCIN-insert-title' },
			{ name: ':contextual-delete-lcCIN' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the alternate identifier'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcClassroom
	//     The <lcClassroom> describes the classroom environment.
	configureAsFrame(sxModule, xq`self::lcClassroom`, t('classroom'), {
		contextualOperations: [
			{ name: ':lcClassroom-insert-title' },
			{ name: ':contextual-delete-lcClassroom' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the classroom environment'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcClient
	//     The <lcClient> provides the person or organization sponsoring or requiring the learning event development.
	configureAsFrame(sxModule, xq`self::lcClient`, t('client'), {
		contextualOperations: [
			{ name: ':lcClient-insert-title' },
			{ name: ':contextual-delete-lcClient' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the clients name'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcConstraints
	//     The <lcConstraints> describes the organizational or technical aspects that may limit the
	//     organization's ability to effectively use the instruction to meet its goals.
	configureAsFrame(sxModule, xq`self::lcConstraints`, t('constraints'), {
		contextualOperations: [
			{ name: ':lcConstraints-insert-title' },
			{ name: ':contextual-delete-lcConstraints' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the constraints'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcDelivDate
	//     The <lcDelivDate> provides the project delivery date.
	configureAsFrame(sxModule, xq`self::lcDelivDate`, t('delivery date'), {
		contextualOperations: [
			{ name: ':lcDelivDate-insert-title' },
			{ name: ':contextual-delete-lcDelivDate' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the delivery date'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcDelivery
	//     The <lcDelivery> describes the delivery method for this learning content.
	configureAsFrameWithBlock(sxModule, xq`self::lcDelivery`, t('delivery'), {
		emptyElementPlaceholderText: t('Type the delivery method'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcDownloadTime
	//     The <lcDownloadTime> describes the maximum time allowed for download time in the client's delivery
	//     environment.
	configureAsFrame(sxModule, xq`self::lcDownloadTime`, t('download time'), {
		contextualOperations: [
			{ name: ':lcDownloadTime-insert-title' },
			{ name: ':contextual-delete-lcDownloadTime' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the download time'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcEdLevel
	//     The <lcEdLevel> provides the range of learners' education level and the relevancy to the learning
	//     plan.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcEdLevel`,
		t('education level'),
		{
			emptyElementPlaceholderText: t('Type the education level'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcFileSizeLimitations
	//     The <lcFileSizeLimitations> describes any file size limitation in the download environment.
	configureAsFrame(
		sxModule,
		xq`self::lcFileSizeLimitations`,
		t('file size limitations'),
		{
			contextualOperations: [
				{ name: ':lcFileSizeLimitations-insert-title' },
				{ name: ':contextual-delete-lcFileSizeLimitations' },
			],
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the file size limitations'),
			titleQuery: xq`./title`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcGapAnalysis
	//     The <lcGapAnalysis> compares existing learning objectives to current job task analysis.
	configureAsFrame(sxModule, xq`self::lcGapAnalysis`, t('gap analysis'), {
		contextualOperations: [
			{ name: ':lcGapAnalysis-insert-title' },
			{ name: ':contextual-delete-lcGapAnalysis' },
		],
		defaultTextContainer: 'lcGapItem',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcGapItem
	//     The <lcGapItem> describes gaps between existing training objectives and related job-task-analysis
	//     content.
	configureAsFrame(sxModule, xq`self::lcGapItem`, t('gap item'), {
		contextualOperations: [
			{ name: ':lcGapItem-insert-title' },
			{ name: ':contextual-insert-lcPlanObjective' },
			{ name: ':lcGapItem-insert-lcJtaItem' },
			{ name: ':lcGapItem-insert-lcGapItemDelta' },
			{ name: ':contextual-insert-lcGapItem--above' },
			{ name: ':contextual-insert-lcGapItem--below' },
			{ name: ':contextual-delete-lcGapItem' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideBefore: [createLabelQueryWidget(xq`"\u25cf"`)],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcGapItemDelta
	//     The <lcGapItemDelta> describes the gap between the learning objective and the task analysis.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcGapItemDelta`,
		t('gap item delta'),
		{
			emptyElementPlaceholderText: t(
				'describe the gap between the learning objective and the task analysis'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcGeneralDescription
	//     The <lcGeneralDescription> provides a space to develop a general description about the
	//     organization's training needs.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcGeneralDescription`,
		t('general description'),
		{
			emptyElementPlaceholderText: t('Type the general description'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcGoals
	//     The <lcGoals> provides the outcomes desired by the organization to be addressed by the training
	//     effort. These goals may require concurrent efforts outside of training such as technology
	//     acquisition, reorganization, and so forth.
	configureAsFrameWithBlock(sxModule, xq`self::lcGoals`, t('goals'), {
		emptyElementPlaceholderText: t('Type the goals'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcGraphics
	//     The <lcGraphics> describes standards and system requirements for displaying graphics and other
	//     related content types.
	configureAsFrame(sxModule, xq`self::lcGraphics`, t('graphics'), {
		contextualOperations: [
			{ name: ':lcGraphics-insert-title' },
			{ name: ':contextual-delete-lcGraphics' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the graphic requirements'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcHandouts
	//     The <lcHandouts> provides aspects of the course that are provided by the instructor in support of
	//     the course learning objectives.
	configureAsFrame(sxModule, xq`self::lcHandouts`, t('handouts'), {
		contextualOperations: [
			{ name: ':lcHandouts-insert-title' },
			{ name: ':contextual-delete-lcHandouts' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the handouts'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcIntervention
	//     The <lcIntervention> describes the approach and strategies to building the learning materials, based
	//     on the needs analysis.
	configureAsFrame(sxModule, xq`self::lcIntervention`, t('intervention'), {
		contextualOperations: [
			{ name: ':lcIntervention-insert-title' },
			{ name: ':contextual-delete-lcIntervention' },
		],
		defaultTextContainer: 'lcInterventionItem',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcInterventionItem
	//     The <lcInterventionItem> describes how learning content is built, based on a systems approach to
	//     analyzing, designing, developing, implementing, and evaluating any instructional experience.
	configureAsFrame(
		sxModule,
		xq`self::lcInterventionItem`,
		t('intervention item'),
		{
			contextualOperations: [
				{ name: ':lcInterventionItem-insert-title' },
				{ name: ':lcInterventionItem-insert-lcLearnStrat' },
				{ name: ':contextual-insert-lcPlanObjective' },
				{ name: ':lcInterventionItem-insert-lcAssessment' },
				{ name: ':lcInterventionItem-insert-lcDelivery' },
				{ name: ':contextual-insert-lcInterventionItem--above' },
				{ name: ':contextual-insert-lcInterventionItem--below' },
				{ name: ':contextual-delete-lcInterventionItem' },
			],
			defaultTextContainer: 'title',
			isIgnoredForNavigation: false,
			titleQuery: xq`./title`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideBefore: [createLabelQueryWidget(xq`"\u25cf"`)],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcJtaItem
	//     The <lcJtaItem> provides description of job task analysis (JTA) as related to a particular learning
	//     objective.
	configureAsFrameWithBlock(sxModule, xq`self::lcJtaItem`, t('JTA'), {
		emptyElementPlaceholderText: t('Type the job task analysis'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcKnowledge
	//     <lcKnowledge> provides the learners' current knowledge of the learning topics.
	configureAsFrameWithBlock(sxModule, xq`self::lcKnowledge`, t('knowledge'), {
		emptyElementPlaceholderText: t('Type the knowledge'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcLearnStrat
	//     The <lcLearnStrat> describes the manner in which the learning content will be instructed. This
	//     should be a high level design that applies instructional-design theories and models.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcLearnStrat`,
		t('learning strategy'),
		{
			emptyElementPlaceholderText: t('Type the learning strategy'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcLMS
	//     The <lcLMS> provides the LMS name and version number used in the learning event.
	configureAsFrame(sxModule, xq`self::lcLMS`, t('LMS'), {
		contextualOperations: [
			{ name: ':lcLMS-insert-title' },
			{ name: ':contextual-delete-lcLMS' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the LMS name'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcModDate
	//     The <lcModDate> provides the project modification date.
	configureAsFrame(sxModule, xq`self::lcModDate`, t('modification date'), {
		contextualOperations: [
			{ name: ':lcModDate-insert-title' },
			{ name: ':contextual-delete-lcModDate' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the modification date'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcMotivation
	//     The <lcMotivation> provides the reasons why the learners want and/or need to take the instruction.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcMotivation`,
		t('motivation'),
		{
			emptyElementPlaceholderText: t('Type the motivation'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcNeeds
	//     The <lcNeeds> provides the needs behind the outcomes described by the <lcGoals>.
	configureAsFrameWithBlock(sxModule, xq`self::lcNeeds`, t('needs'), {
		emptyElementPlaceholderText: t('Type the needs'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcNeedsAnalysis
	//     The <lcNeedsAnalysis> describes the training requirement and identifies the need to develop or
	//     revise content. These include periodic training gap analyses, changes to operational or maintenance
	//     requirements, and changes to equipment or systems.
	configureAsFrame(sxModule, xq`self::lcNeedsAnalysis`, t('needs analysis'), {
		contextualOperations: [
			{ name: ':lcNeedsAnalysis-insert-title' },
			{ name: ':lcNeedsAnalysis-insert-lcOrganizational' },
			{ name: ':lcNeedsAnalysis-insert-lcPlanAudience' },
			{ name: ':lcNeedsAnalysis-insert-lcWorkEnv' },
			{
				name: ':lcNeedsAnalysis-append-lcTask',
				hideIn: ['context-menu'],
			},
			{
				name: ':lcNeedsAnalysis-insert-lcTask',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
			{ name: ':contextual-delete-lcNeedsAnalysis' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcNoLMS
	//     Use <lcNoLMS> when you plan to deliver the content as a standalone package, without a learning
	//     management system (LMS).
	configureAsFrame(sxModule, xq`self::lcNoLMS`, t('no LMS'), {
		contextualOperations: [
			{ name: ':lcNoLMS-insert-title' },
			{ name: ':contextual-delete-lcNoLMS' },
		],
		defaultTextContainer: 'p',
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcOJT
	//     The <lcOJT> is &#34;the job training&#34; and describes aspects of the course taking place in the
	//     work environment.
	configureAsFrame(sxModule, xq`self::lcOJT`, t('on-the-job-training'), {
		contextualOperations: [
			{ name: ':lcOJT-insert-title' },
			{ name: ':contextual-delete-lcOJT' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the on-the-job-training aspects'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcOrganizational
	//     The <lcOrganizational> describes an organization's learning requirements.
	configureAsFrame(
		sxModule,
		xq`self::lcOrganizational`,
		t('organizational'),
		{
			contextualOperations: [
				{ name: ':lcOrganizational-insert-title' },
				{ name: ':contextual-insert-lcGeneralDescription' },
				{ name: ':lcOrganizational-insert-lcGoals' },
				{ name: ':lcOrganizational-insert-lcNeeds' },
				{ name: ':lcOrganizational-insert-lcValues' },
				{ name: ':lcOrganizational-insert-lcOrgConstraints' },
				{ name: ':contextual-delete-lcOrganizational' },
			],
			defaultTextContainer: 'title',
			isIgnoredForNavigation: false,
			titleQuery: xq`./title`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcOrgConstraints
	//     The <lcOrgConstraints> provides organizational aspects that may limit the organization's ability to
	//     effectively use the instruction to meet its goals.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcOrgConstraints`,
		t('organizational constraints'),
		{
			emptyElementPlaceholderText: t(
				'Type the organizational constraints'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcPlanAudience
	//     The <lcPlanAudience> describes characteristics of the learners who take the instruction.
	configureAsFrame(sxModule, xq`self::lcPlanAudience`, t('plan audience'), {
		contextualOperations: [
			{ name: ':lcPlanAudience-insert-title' },
			{ name: ':contextual-insert-lcGeneralDescription' },
			{ name: ':lcPlanAudience-insert-lcEdLevel' },
			{ name: ':lcPlanAudience-insert-lcAge' },
			{ name: ':lcPlanAudience-insert-lcBackground' },
			{ name: ':contextual-insert-lcSkills' },
			{ name: ':contextual-insert-lcKnowledge' },
			{ name: ':lcPlanAudience-insert-lcMotivation' },
			{ name: ':lcPlanAudience-insert-lcSpecChars' },
			{ name: ':contextual-delete-lcPlanAudience' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcPlanDescrip
	//     The <lcPlanDescrip> provides a plan description.
	configureAsFrame(sxModule, xq`self::lcPlanDescrip`, t('plan description'), {
		contextualOperations: [
			{ name: ':lcPlanDescrip-insert-title' },
			{ name: ':contextual-delete-lcPlanDescrip' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the plan description'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcPlanObjective
	//     The <lcPlanObjective> describes the objective to be addressed by a gap analysis or intervention.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcPlanObjective`,
		t('plan objective'),
		{
			emptyElementPlaceholderText: t('Type the plan objective'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcPlanPrereqs
	//     <lcPlanPrereqs> provides the knowledge, skills, abilities, courses and other activities learners
	//     must have satisfied to take the instruction.
	configureAsFrame(
		sxModule,
		xq`self::lcPlanPrereqs`,
		t('plan prerequisites'),
		{
			contextualOperations: [
				{ name: ':lcPlanPrereqs-insert-title' },
				{ name: ':contextual-delete-lcPlanPrereqs' },
			],
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the plan prerequisites'),
			titleQuery: xq`./title`,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	// lcPlanResources
	//     The <lcPlanResources> describes resource needs.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcPlanResources`,
		t('plan resources'),
		{
			emptyElementPlaceholderText: t('Type the plan resources'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcPlanSubject
	//     The <lcPlanSubject> provides a complete description of the subject of the planned learning.
	configureAsFrame(sxModule, xq`self::lcPlanSubject`, t('plan subject'), {
		contextualOperations: [
			{ name: ':lcPlanSubject-insert-title' },
			{ name: ':contextual-delete-lcPlanSubject' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the plan subject'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcPlanTitle
	//     The <lcPlanTitle> provides a title for this plan.
	configureAsFrame(sxModule, xq`self::lcPlanTitle`, t('plan title'), {
		contextualOperations: [
			{ name: ':lcPlanTitle-insert-title' },
			{ name: ':contextual-delete-lcPlanTitle' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the plan title'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcPlayers
	//     The <lcPlayers> describes tools and plugins used for time-sequenced display at runtime.
	configureAsFrame(sxModule, xq`self::lcPlayers`, t('players'), {
		contextualOperations: [
			{ name: ':lcPlayers-insert-title' },
			{ name: ':contextual-delete-lcPlayers' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the players'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcProcesses
	//     The <lcProcesses> describes processes learners routinely follow.
	configureAsFrameWithBlock(sxModule, xq`self::lcProcesses`, t('processes'), {
		emptyElementPlaceholderText: t('Type the processes'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcProject
	//     The <lcProject> provides learning content project plan description information.
	configureAsFrame(sxModule, xq`self::lcProject`, t('project'), {
		contextualOperations: [
			{ name: ':lcProject-insert-title' },
			{ name: ':lcProject-insert-lcClient' },
			{ name: ':lcProject-insert-lcPlanTitle' },
			{ name: ':lcProject-insert-lcCIN' },
			{ name: ':lcProject-insert-lcModDate' },
			{ name: ':lcProject-insert-lcDelivDate' },
			{ name: ':lcProject-insert-lcPlanSubject' },
			{ name: ':lcProject-insert-lcPlanDescrip' },
			{ name: ':lcProject-insert-lcPlanPrereqs' },
			{ name: ':contextual-delete-lcProject' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcResolution
	//     The <lcResolution> describes the required computer screen resolution for the online instruction.
	configureAsFrame(sxModule, xq`self::lcResolution`, t('resolution'), {
		contextualOperations: [
			{ name: ':lcResolution-insert-title' },
			{ name: ':contextual-delete-lcResolution' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the resolution'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcSecurity
	//     The <lcSecurity> describes the security requirements in the delivered instruction.
	configureAsFrame(sxModule, xq`self::lcSecurity`, t('security'), {
		contextualOperations: [
			{ name: ':lcSecurity-insert-title' },
			{ name: ':contextual-delete-lcSecurity' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the security'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcSkills
	//     The <lcSkills> describes the learners' current skill set and the relevancy to the learning plan.
	configureAsFrameWithBlock(sxModule, xq`self::lcSkills`, t('skills'), {
		emptyElementPlaceholderText: t('Type the skills'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcSpecChars
	//     The <lcSpecChars> provides learner characteristics specific to the population that will influence
	//     the design, including learning disabilities, physical handicaps, and so forth.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcSpecChars`,
		t('specific characteristics'),
		{
			emptyElementPlaceholderText: t('Type the specific characteristics'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// lcTask
	//     The <lcTask> captures a work item to be performed, as part of the learning plan.
	configureAsFrame(sxModule, xq`self::lcTask`, t('task'), {
		contextualOperations: [
			{ name: ':lcTask-insert-title' },
			{ name: ':lcTask-append-lcTaskItem', hideIn: ['context-menu'] },
			{
				name: ':lcTask-insert-lcTaskItem',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
			{ name: ':contextual-insert-lcKnowledge' },
			{ name: ':contextual-insert-lcSkills' },
			{ name: ':lcTask-insert-lcAttitude' },
			{ name: ':contextual-delete-lcTask' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcTaskItem
	//     The <lcTaskItem> describes a discreet task to be taught.
	configureAsFrameWithBlock(sxModule, xq`self::lcTaskItem`, t('task item'), {
		emptyElementPlaceholderText: t('Type the task item'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcTechnical
	//     The <lcTechnical> describes the technical requirements to the learning content and how those
	//     requirements are supported by the instructional design.
	configureAsFrame(sxModule, xq`self::lcTechnical`, t('technical'), {
		contextualOperations: [
			{ name: ':lcTechnical-insert-title' },
			{ name: ':lcTechnical-insert-lcLMS' },
			{ name: ':lcTechnical-insert-lcNoLMS' },
			{ name: ':lcTechnical-insert-lcHandouts' },
			{ name: ':lcTechnical-insert-lcClassroom' },
			{ name: ':lcTechnical-insert-lcOJT' },
			{ name: ':lcTechnical-insert-lcConstraints' },
			{ name: ':lcTechnical-insert-lcW3C' },
			{ name: ':lcTechnical-insert-lcPlayers' },
			{ name: ':lcTechnical-insert-lcGraphics' },
			{ name: ':lcTechnical-insert-lcViewers' },
			{ name: ':lcTechnical-insert-lcResolution' },
			{ name: ':lcTechnical-insert-lcFileSizeLimitations' },
			{ name: ':lcTechnical-insert-lcDownloadTime' },
			{ name: ':lcTechnical-insert-lcSecurity' },
			{ name: ':contextual-delete-lcTechnical' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcValues
	//     The <lcValues> describes affective components of desired instructional outcomes.
	configureAsFrameWithBlock(sxModule, xq`self::lcValues`, t('values'), {
		emptyElementPlaceholderText: t('Type the values'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// lcViewers
	//     The <lcViewers> describes viewers used for time-sequenced display at runtime.
	configureAsFrame(sxModule, xq`self::lcViewers`, t('viewers'), {
		contextualOperations: [
			{ name: ':lcViewers-insert-title' },
			{ name: ':contextual-delete-lcViewers' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the viewers'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcW3C
	//     The <lcW3C> provides requirements for use of world wide web consortium standards.
	configureAsFrame(sxModule, xq`self::lcW3C`, t('W3C'), {
		contextualOperations: [
			{ name: ':lcW3C-insert-title' },
			{ name: ':contextual-delete-lcW3C' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the W3C requirements'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcWorkEnv
	//     The <lcWorkEnv> describes the working conditions and contexts in which the training will be applied.
	configureAsFrame(sxModule, xq`self::lcWorkEnv`, t('work environment'), {
		contextualOperations: [
			{ name: ':lcWorkEnv-insert-title' },
			{ name: ':lcWorkEnv-insert-lcWorkEnvDescription' },
			{ name: ':lcWorkEnv-insert-lcPlanResources' },
			{ name: ':lcWorkEnv-insert-lcProcesses' },
			{ name: ':contextual-delete-lcWorkEnv' },
		],
		defaultTextContainer: 'title',
		isIgnoredForNavigation: false,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// lcWorkEnvDescription
	//     The <lcWorkEnvDescription> provides the general working environment in which the training will be
	//     applied.
	configureAsFrameWithBlock(
		sxModule,
		xq`self::lcWorkEnvDescription`,
		t('work environment description'),
		{
			emptyElementPlaceholderText: t(
				'Type the work environment description'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// learningPlan
	//     A Learning Plan topic describes learning needs and goals, instructional design models, task
	//     analyses, learning taxonomies, and other information necessary to the lesson planning process.
	configureAsSheetFrame(
		sxModule,
		xq`self::learningPlan`,
		t('learning plan'),
		{
			defaultTextContainer: 'learningPlanbody',
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

	// learningPlan nested in topic
	configureAsFrame(
		sxModule,
		xq`self::learningPlan and ancestor::*[fonto:dita-class(., "topic/topic")]`,
		undefined,
		{
			defaultTextContainer: 'learningPlanbody',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// title in learningPlan
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::learningPlan]`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);

	// learningPlanbody
	//     The <learningPlanbody> element is the main body-level element in a learningPlan topic.
	configureAsStructure(sxModule, xq`self::learningPlanbody`, t('body'), {
		defaultTextContainer: 'section',
		isIgnoredForNavigation: false,
		isRemovableIfEmpty: false,
	});

	// section in learningPlanbody
	configureContextualOperations(
		sxModule,
		xq`self::section[parent::learningPlanbody]`,
		[
			{ name: ':section-insert-title' },
			{ name: ':contextual-delete-section' },
		]
	);
}
