import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import createBulletingWidget from 'fontoxml-families/src/createBulletingWidget.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// lcAge
	//     The <lcAge> provides the age range of the intended learner audience, for use by curriculum
	//     developers and course planners.
	configureAsFrameWithBlock(sxModule, 'self::lcAge', t('age'), {
		emptyElementPlaceholderText: t('type the age'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcAssessment
	//     The <lcAssessment> describes assessment plans.
	configureAsFrameWithBlock(sxModule, 'self::lcAssessment', t('assessment'), {
		emptyElementPlaceholderText: t('type the assessment plans'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcAttitude
	//     The <lcAttitude> describes mental state that influences the choices of personal actions.
	configureAsFrameWithBlock(sxModule, 'self::lcAttitude', t('attitude'), {
		emptyElementPlaceholderText: t('type the attitude'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcBackground
	//     The <lcBackground> provides the learners' professional background and the relevancy to the learning
	//     plan.
	configureAsFrameWithBlock(sxModule, 'self::lcBackground', t('background'), {
		emptyElementPlaceholderText: t('type the background'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcCIN
	//     The <lcCIN> provides an alternate identifier for the project title.
	configureAsFrame(sxModule, 'self::lcCIN', t('CIN'), {
		contextualOperations: [
			{ name: ':lcCIN-insert-title' },
			{ name: ':contextual-delete-lcCIN' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the alternate identifier'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcClassroom
	//     The <lcClassroom> describes the classroom environment.
	configureAsFrame(sxModule, 'self::lcClassroom', t('classroom'), {
		contextualOperations: [
			{ name: ':lcClassroom-insert-title' },
			{ name: ':contextual-delete-lcClassroom' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the classroom environment'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcClient
	//     The <lcClient> provides the person or organization sponsoring or requiring the learning event development.
	configureAsFrame(sxModule, 'self::lcClient', t('client'), {
		contextualOperations: [
			{ name: ':lcClient-insert-title' },
			{ name: ':contextual-delete-lcClient' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the clients name'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcConstraints
	//     The <lcConstraints> describes the organizational or technical aspects that may limit the
	//     organization's ability to effectively use the instruction to meet its goals.
	configureAsFrame(sxModule, 'self::lcConstraints', t('constraints'), {
		contextualOperations: [
			{ name: ':lcConstraints-insert-title' },
			{ name: ':contextual-delete-lcConstraints' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the constraints'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcDelivDate
	//     The <lcDelivDate> provides the project delivery date.
	configureAsFrame(sxModule, 'self::lcDelivDate', t('delivery date'), {
		contextualOperations: [
			{ name: ':lcDelivDate-insert-title' },
			{ name: ':contextual-delete-lcDelivDate' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the delivery date'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcDelivery
	//     The <lcDelivery> describes the delivery method for this learning content.
	configureAsFrameWithBlock(sxModule, 'self::lcDelivery', t('delivery'), {
		emptyElementPlaceholderText: t('type the delivery method'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcDownloadTime
	//     The <lcDownloadTime> describes the maximum time allowed for download time in the client's delivery
	//     environment.
	configureAsFrame(sxModule, 'self::lcDownloadTime', t('download time'), {
		contextualOperations: [
			{ name: ':lcDownloadTime-insert-title' },
			{ name: ':contextual-delete-lcDownloadTime' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the download time'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcEdLevel
	//     The <lcEdLevel> provides the range of learners' education level and the relevancy to the learning
	//     plan.
	configureAsFrameWithBlock(sxModule, 'self::lcEdLevel', t('education level'), {
		emptyElementPlaceholderText: t('type the education level'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcFileSizeLimitations
	//     The <lcFileSizeLimitations> describes any file size limitation in the download environment.
	configureAsFrame(sxModule, 'self::lcFileSizeLimitations', t('file size limitations'), {
		contextualOperations: [
			{ name: ':lcFileSizeLimitations-insert-title' },
			{ name: ':contextual-delete-lcFileSizeLimitations' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the file size limitations'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcGapAnalysis
	//     The <lcGapAnalysis> compares existing learning objectives to current job task analysis.
	configureAsFrame(sxModule, 'self::lcGapAnalysis', t('gap analysis'), {
		contextualOperations: [
			{ name: ':lcGapAnalysis-insert-title' },
			{ name: ':contextual-delete-lcGapAnalysis' }
		],
		defaultTextContainer: 'lcGapItem',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcGapItem
	//     The <lcGapItem> describes gaps between existing training objectives and related job-task-analysis
	//     content.
	configureAsFrame(sxModule, 'self::lcGapItem', t('gap item'), {
		contextualOperations: [
			{ name: ':lcGapItem-insert-title' },
			{ name: ':contextual-insert-lcPlanObjective' },
			{ name: ':lcGapItem-insert-lcJtaItem' },
			{ name: ':lcGapItem-insert-lcGapItemDelta' },
			{ name: ':contextual-insert-lcGapItem--above' },
			{ name: ':contextual-insert-lcGapItem--below' },
			{ name: ':contextual-delete-lcGapItem' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideBefore: [createBulletingWidget('\u25cf')],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcGapItemDelta
	//     The <lcGapItemDelta> describes the gap between the learning objective and the task analysis.
	configureAsFrameWithBlock(sxModule, 'self::lcGapItemDelta', t('gap item delta'), {
		emptyElementPlaceholderText: t(
			'describe the gap between the learning objective and the task analysis'
		),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcGeneralDescription
	//     The <lcGeneralDescription> provides a space to develop a general description about the
	//     organization's training needs.
	configureAsFrameWithBlock(sxModule, 'self::lcGeneralDescription', t('general description'), {
		emptyElementPlaceholderText: t('type the general description'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcGoals
	//     The <lcGoals> provides the outcomes desired by the organization to be addressed by the training
	//     effort. These goals may require concurrent efforts outside of training such as technology
	//     acquisition, reorganization, and so forth.
	configureAsFrameWithBlock(sxModule, 'self::lcGoals', t('goals'), {
		emptyElementPlaceholderText: t('type the goals'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcGraphics
	//     The <lcGraphics> describes standards and system requirements for displaying graphics and other
	//     related content types.
	configureAsFrame(sxModule, 'self::lcGraphics', t('graphics'), {
		contextualOperations: [
			{ name: ':lcGraphics-insert-title' },
			{ name: ':contextual-delete-lcGraphics' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the graphic requirements'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcHandouts
	//     The <lcHandouts> provides aspects of the course that are provided by the instructor in support of
	//     the course learning objectives.
	configureAsFrame(sxModule, 'self::lcHandouts', t('handouts'), {
		contextualOperations: [
			{ name: ':lcHandouts-insert-title' },
			{ name: ':contextual-delete-lcHandouts' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the handouts'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcIntervention
	//     The <lcIntervention> describes the approach and strategies to building the learning materials, based
	//     on the needs analysis.
	configureAsFrame(sxModule, 'self::lcIntervention', t('intervention'), {
		contextualOperations: [
			{ name: ':lcIntervention-insert-title' },
			{ name: ':contextual-delete-lcIntervention' }
		],
		defaultTextContainer: 'lcInterventionItem',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcInterventionItem
	//     The <lcInterventionItem> describes how learning content is built, based on a systems approach to
	//     analyzing, designing, developing, implementing, and evaluating any instructional experience.
	configureAsFrame(sxModule, 'self::lcInterventionItem', t('intervention item'), {
		contextualOperations: [
			{ name: ':lcInterventionItem-insert-title' },
			{ name: ':lcInterventionItem-insert-lcLearnStrat' },
			{ name: ':contextual-insert-lcPlanObjective' },
			{ name: ':lcInterventionItem-insert-lcAssessment' },
			{ name: ':lcInterventionItem-insert-lcDelivery' },
			{ name: ':contextual-insert-lcInterventionItem--above' },
			{ name: ':contextual-insert-lcInterventionItem--below' },
			{ name: ':contextual-delete-lcInterventionItem' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideBefore: [createBulletingWidget('\u25cf')],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcJtaItem
	//     The <lcJtaItem> provides description of job task analysis (JTA) as related to a particular learning
	//     objective.
	configureAsFrameWithBlock(sxModule, 'self::lcJtaItem', t('JTA'), {
		emptyElementPlaceholderText: t('type the job task analysis'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcKnowledge
	//     <lcKnowledge> provides the learners' current knowledge of the learning topics.
	configureAsFrameWithBlock(sxModule, 'self::lcKnowledge', t('knowledge'), {
		emptyElementPlaceholderText: t('type the knowledge'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcLearnStrat
	//     The <lcLearnStrat> describes the manner in which the learning content will be instructed. This
	//     should be a high level design that applies instructional-design theories and models.
	configureAsFrameWithBlock(sxModule, 'self::lcLearnStrat', t('learning strategy'), {
		emptyElementPlaceholderText: t('type the learning strategy'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcLMS
	//     The <lcLMS> provides the LMS name and version number used in the learning event.
	configureAsFrame(sxModule, 'self::lcLMS', t('LMS'), {
		contextualOperations: [
			{ name: ':lcLMS-insert-title' },
			{ name: ':contextual-delete-lcLMS' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the LMS name'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcModDate
	//     The <lcModDate> provides the project modification date.
	configureAsFrame(sxModule, 'self::lcModDate', t('modification date'), {
		contextualOperations: [
			{ name: ':lcModDate-insert-title' },
			{ name: ':contextual-delete-lcModDate' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the modification date'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcMotivation
	//     The <lcMotivation> provides the reasons why the learners want and/or need to take the instruction.
	configureAsFrameWithBlock(sxModule, 'self::lcMotivation', t('motivation'), {
		emptyElementPlaceholderText: t('type the motivation'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcNeeds
	//     The <lcNeeds> provides the needs behind the outcomes described by the <lcGoals>.
	configureAsFrameWithBlock(sxModule, 'self::lcNeeds', t('needs'), {
		emptyElementPlaceholderText: t('type the needs'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcNeedsAnalysis
	//     The <lcNeedsAnalysis> describes the training requirement and identifies the need to develop or
	//     revise content. These include periodic training gap analyses, changes to operational or maintenance
	//     requirements, and changes to equipment or systems.
	configureAsFrame(sxModule, 'self::lcNeedsAnalysis', t('needs analysis'), {
		contextualOperations: [
			{ name: ':lcNeedsAnalysis-insert-title' },
			{ name: ':lcNeedsAnalysis-insert-lcOrganizational' },
			{ name: ':lcNeedsAnalysis-insert-lcPlanAudience' },
			{ name: ':lcNeedsAnalysis-insert-lcWorkEnv' },
			{ name: ':lcNeedsAnalysis-append-lcTask', hideIn: ['context-menu'] },
			{
				name: ':lcNeedsAnalysis-insert-lcTask',
				hideIn: ['element-menu', 'breadcrumbs-menu']
			},
			{ name: ':contextual-delete-lcNeedsAnalysis' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcNoLMS
	//     Use <lcNoLMS> when you plan to deliver the content as a standalone package, without a learning
	//     management system (LMS).
	configureAsFrame(sxModule, 'self::lcNoLMS', t('no LMS'), {
		contextualOperations: [
			{ name: ':lcNoLMS-insert-title' },
			{ name: ':contextual-delete-lcNoLMS' }
		],
		defaultTextContainer: 'p',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcOJT
	//     The <lcOJT> is &#34;the job training&#34; and describes aspects of the course taking place in the
	//     work environment.
	configureAsFrame(sxModule, 'self::lcOJT', t('on-the-job-training'), {
		contextualOperations: [
			{ name: ':lcOJT-insert-title' },
			{ name: ':contextual-delete-lcOJT' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the on-the-job-training aspects'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcOrganizational
	//     The <lcOrganizational> describes an organization's learning requirements.
	configureAsFrame(sxModule, 'self::lcOrganizational', t('organizational'), {
		contextualOperations: [
			{ name: ':lcOrganizational-insert-title' },
			{ name: ':contextual-insert-lcGeneralDescription' },
			{ name: ':lcOrganizational-insert-lcGoals' },
			{ name: ':lcOrganizational-insert-lcNeeds' },
			{ name: ':lcOrganizational-insert-lcValues' },
			{ name: ':lcOrganizational-insert-lcOrgConstraints' },
			{ name: ':contextual-delete-lcOrganizational' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcOrgConstraints
	//     The <lcOrgConstraints> provides organizational aspects that may limit the organization's ability to
	//     effectively use the instruction to meet its goals.
	configureAsFrameWithBlock(sxModule, 'self::lcOrgConstraints', t('organizational constraints'), {
		emptyElementPlaceholderText: t('type the organizational constraints'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcPlanAudience
	//     The <lcPlanAudience> describes characteristics of the learners who take the instruction.
	configureAsFrame(sxModule, 'self::lcPlanAudience', t('plan audience'), {
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
			{ name: ':contextual-delete-lcPlanAudience' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcPlanDescrip
	//     The <lcPlanDescrip> provides a plan description.
	configureAsFrame(sxModule, 'self::lcPlanDescrip', t('plan description'), {
		contextualOperations: [
			{ name: ':lcPlanDescrip-insert-title' },
			{ name: ':contextual-delete-lcPlanDescrip' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the plan description'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcPlanObjective
	//     The <lcPlanObjective> describes the objective to be addressed by a gap analysis or intervention.
	configureAsFrameWithBlock(sxModule, 'self::lcPlanObjective', t('plan objective'), {
		emptyElementPlaceholderText: t('type the plan objective'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcPlanPrereqs
	//     <lcPlanPrereqs> provides the knowledge, skills, abilities, courses and other activities learners
	//     must have satisfied to take the instruction.
	configureAsFrame(sxModule, 'self::lcPlanPrereqs', t('plan prerequisites'), {
		contextualOperations: [
			{ name: ':lcPlanPrereqs-insert-title' },
			{ name: ':contextual-delete-lcPlanPrereqs' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the plan prerequisites'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcPlanResources
	//     The <lcPlanResources> describes resource needs.
	configureAsFrameWithBlock(sxModule, 'self::lcPlanResources', t('plan resources'), {
		emptyElementPlaceholderText: t('type the plan resources'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcPlanSubject
	//     The <lcPlanSubject> provides a complete description of the subject of the planned learning.
	configureAsFrame(sxModule, 'self::lcPlanSubject', t('plan subject'), {
		contextualOperations: [
			{ name: ':lcPlanSubject-insert-title' },
			{ name: ':contextual-delete-lcPlanSubject' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the plan subject'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcPlanTitle
	//     The <lcPlanTitle> provides a title for this plan.
	configureAsFrame(sxModule, 'self::lcPlanTitle', t('plan title'), {
		contextualOperations: [
			{ name: ':lcPlanTitle-insert-title' },
			{ name: ':contextual-delete-lcPlanTitle' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the plan title'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcPlayers
	//     The <lcPlayers> describes tools and plugins used for time-sequenced display at runtime.
	configureAsFrame(sxModule, 'self::lcPlayers', t('players'), {
		contextualOperations: [
			{ name: ':lcPlayers-insert-title' },
			{ name: ':contextual-delete-lcPlayers' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the players'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcProcesses
	//     The <lcProcesses> describes processes learners routinely follow.
	configureAsFrameWithBlock(sxModule, 'self::lcProcesses', t('processes'), {
		emptyElementPlaceholderText: t('type the processes'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcProject
	//     The <lcProject> provides learning content project plan description information.
	configureAsFrame(sxModule, 'self::lcProject', t('project'), {
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
			{ name: ':contextual-delete-lcProject' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcResolution
	//     The <lcResolution> describes the required computer screen resolution for the online instruction.
	configureAsFrame(sxModule, 'self::lcResolution', t('resolution'), {
		contextualOperations: [
			{ name: ':lcResolution-insert-title' },
			{ name: ':contextual-delete-lcResolution' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the resolution'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcSecurity
	//     The <lcSecurity> describes the security requirements in the delivered instruction.
	configureAsFrame(sxModule, 'self::lcSecurity', t('security'), {
		contextualOperations: [
			{ name: ':lcSecurity-insert-title' },
			{ name: ':contextual-delete-lcSecurity' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the security'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcSkills
	//     The <lcSkills> describes the learners' current skill set and the relevancy to the learning plan.
	configureAsFrameWithBlock(sxModule, 'self::lcSkills', t('skills'), {
		emptyElementPlaceholderText: t('type the skills'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcSpecChars
	//     The <lcSpecChars> provides learner characteristics specific to the population that will influence
	//     the design, including learning disabilities, physical handicaps, and so forth.
	configureAsFrameWithBlock(sxModule, 'self::lcSpecChars', t('specific characteristics'), {
		emptyElementPlaceholderText: t('type the specific characteristics'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcTask
	//     The <lcTask> captures a work item to be performed, as part of the learning plan.
	configureAsFrame(sxModule, 'self::lcTask', t('task'), {
		contextualOperations: [
			{ name: ':lcTask-insert-title' },
			{ name: ':lcTask-append-lcTaskItem', hideIn: ['context-menu'] },
			{ name: ':lcTask-insert-lcTaskItem', hideIn: ['element-menu', 'breadcrumbs-menu'] },
			{ name: ':contextual-insert-lcKnowledge' },
			{ name: ':contextual-insert-lcSkills' },
			{ name: ':lcTask-insert-lcAttitude' },
			{ name: ':contextual-delete-lcTask' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcTaskItem
	//     The <lcTaskItem> describes a discreet task to be taught.
	configureAsFrameWithBlock(sxModule, 'self::lcTaskItem', t('task item'), {
		emptyElementPlaceholderText: t('type the task item'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcTechnical
	//     The <lcTechnical> describes the technical requirements to the learning content and how those
	//     requirements are supported by the instructional design.
	configureAsFrame(sxModule, 'self::lcTechnical', t('technical'), {
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
			{ name: ':contextual-delete-lcTechnical' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcValues
	//     The <lcValues> describes affective components of desired instructional outcomes.
	configureAsFrameWithBlock(sxModule, 'self::lcValues', t('values'), {
		emptyElementPlaceholderText: t('type the values'),
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// lcViewers
	//     The <lcViewers> describes viewers used for time-sequenced display at runtime.
	configureAsFrame(sxModule, 'self::lcViewers', t('viewers'), {
		contextualOperations: [
			{ name: ':lcViewers-insert-title' },
			{ name: ':contextual-delete-lcViewers' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the viewers'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcW3C
	//     The <lcW3C> provides requirements for use of world wide web consortium standards.
	configureAsFrame(sxModule, 'self::lcW3C', t('W3C'), {
		contextualOperations: [
			{ name: ':lcW3C-insert-title' },
			{ name: ':contextual-delete-lcW3C' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the W3C requirements'),
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcWorkEnv
	//     The <lcWorkEnv> describes the working conditions and contexts in which the training will be applied.
	configureAsFrame(sxModule, 'self::lcWorkEnv', t('work environment'), {
		contextualOperations: [
			{ name: ':lcWorkEnv-insert-title' },
			{ name: ':lcWorkEnv-insert-lcWorkEnvDescription' },
			{ name: ':lcWorkEnv-insert-lcPlanResources' },
			{ name: ':lcWorkEnv-insert-lcProcesses' },
			{ name: ':contextual-delete-lcWorkEnv' }
		],
		defaultTextContainer: 'title',
		ignoredForNavigationNextToSelector: 'false()',
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// lcWorkEnvDescription
	//     The <lcWorkEnvDescription> provides the general working environment in which the training will be
	//     applied.
	configureAsFrameWithBlock(
		sxModule,
		'self::lcWorkEnvDescription',
		t('work environment description'),
		{
			emptyElementPlaceholderText: t('type the work environment description'),
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// learningPlan
	//     A Learning Plan topic describes learning needs and goals, instructional design models, task
	//     analyses, learning taxonomies, and other information necessary to the lesson planning process.
	configureAsSheetFrame(sxModule, 'self::learningPlan', t('learning plan'), {
		defaultTextContainer: 'learningPlanbody',
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

	// learningPlan nested in topic
	configureAsFrame(
		sxModule,
		'self::learningPlan and ancestor::*[fonto:dita-class(., "topic/topic")]',
		undefined,
		{
			defaultTextContainer: 'learningPlanbody',
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in learningPlan
	configureAsTitleFrame(sxModule, 'self::title[parent::learningPlan]', undefined, {
		fontVariation: 'document-title'
	});

	// learningPlanbody
	//     The <learningPlanbody> element is the main body-level element in a learningPlan topic.
	configureAsStructure(sxModule, 'self::learningPlanbody', t('body'), {
		defaultTextContainer: 'section',
		ignoredForNavigationNextToSelector: 'false()',
		isRemovableIfEmpty: false
	});

	// section in learningPlanbody
	configureContextualOperations(sxModule, 'self::section[parent::learningPlanbody]', [
		{ name: ':section-insert-title' },
		{ name: ':contextual-delete-section' }
	]);
}
