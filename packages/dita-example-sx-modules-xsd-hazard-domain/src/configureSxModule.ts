import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock';
import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import configureProperties from 'fontoxml-families/src/configureProperties';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// consequence
	//     The <consequence> element is the container for the second text entry of a safety label. It contains
	//     the description of the consequences of not avoiding the hazard, such as "Keep guard in place".
	configureAsFrameWithBlock(
		sxModule,
		xq`self::consequence`,
		t('consequence'),
		{
			emptyElementPlaceholderText: t('type the consequence'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// hazardstatement
	//     The <hazardstatement> element contains hazard warning information. It is based on the regulations of
	//     the ANSI Z535 and the ISO 3864 standards. It gives the author the opportunity to select the hazard
	//     statement, to add one or more safety signs and to add the required phrases.
	const HAZARD_CONVERT_OPERATIONS = [
		{ name: ':hazardstatement-convert-to-@type=null' },
		{ name: ':hazardstatement-convert-to-@type=attention' },
		{ name: ':hazardstatement-convert-to-@type=caution' },
		{ name: ':hazardstatement-convert-to-@type=danger' },
		{ name: ':hazardstatement-convert-to-@type=fastpath' },
		{ name: ':hazardstatement-convert-to-@type=important' },
		{ name: ':hazardstatement-convert-to-@type=notice' },
		{ name: ':hazardstatement-convert-to-@type=remember' },
		{ name: ':hazardstatement-convert-to-@type=restriction' },
		{ name: ':hazardstatement-convert-to-@type=tip' },
		{ name: ':hazardstatement-convert-to-@type=warning' },
		{ name: ':hazardstatement-convert-to-@type=other' },
	];
	const HAZARD_VISUALIZATION_BY_TYPE = {
		attention: {
			label: t('hazard statement attention'),
			backgroundColor: 'yellow',
		},
		caution: {
			label: t('hazard statement caution'),
			backgroundColor: 'orange',
		},
		danger: {
			label: t('hazard statement danger'),
			backgroundColor: 'red',
		},
		fastpath: {
			label: t('hazard statement fast path'),
			backgroundColor: 'grey',
		},
		important: {
			label: t('hazard statement important'),
			backgroundColor: 'amber',
		},
		notice: {
			label: t('hazard statement notice'),
			backgroundColor: 'light-blue',
		},
		remember: {
			label: t('hazard statement remember'),
			backgroundColor: 'light-green',
		},
		restriction: {
			label: t('hazard statement restriction'),
			backgroundColor: 'brown',
		},
		tip: {
			label: t('hazard statement tip'),
			backgroundColor: 'green',
		},
		other: {
			label: t('hazard statement other'),
			backgroundColor: 'grey',
		},
		warning: {
			label: t('hazard statement warning'),
			backgroundColor: 'deep-orange',
		},
	};

	function getContextualOperationsForHazardType(hazardType) {
		const contextualOperations = [
			{
				name: ':hazardstatement-append-messagepanel',
				hideIn: ['context-menu'],
			},
			{
				name: ':hazardstatement-insert-messagepanel',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
			{
				name: ':hazardstatement-append-hazardsymbol',
				hideIn: ['context-menu'],
			},
			{
				name: ':hazardstatement-insert-hazardsymbol',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
		]
			.concat(
				HAZARD_CONVERT_OPERATIONS.filter(function (element) {
					return !element.name.includes(hazardType);
				})
			)
			.concat([{ name: ':contextual-delete-hazardstatement' }]);
		return contextualOperations;
	}

	configureAsFrame(
		sxModule,
		xq`self::hazardstatement`,
		t('hazard statement'),
		{
			contextualOperations:
				getContextualOperationsForHazardType('standard-hazard'),
			defaultTextContainer: 'messagepanel',
			isIgnoredForNavigation: false,
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()],
		}
	);

	Object.keys(HAZARD_VISUALIZATION_BY_TYPE).forEach(function (hazardType) {
		const hazardVisualization = HAZARD_VISUALIZATION_BY_TYPE[hazardType];
		configureProperties(
			sxModule,
			xq`self::hazardstatement[@type=${hazardType}]`,
			{
				markupLabel: hazardVisualization.label,
				contextualOperations:
					getContextualOperationsForHazardType(hazardType),
				backgroundColor: hazardVisualization.backgroundColor,
			}
		);
	});

	// hazardsymbol
	//     A graphic representation intended to convey a message without the use of words. It may represent a
	//     hazard, a hazardous situation, a precaution to avoid a hazard, a result of not avoiding a hazard, or
	//     any combination of these messages.
	configureAsImageInFrame(
		sxModule,
		xq`self::hazardsymbol`,
		t('hazard symbol'),
		{
			contextualOperations: [
				{ name: ':contextual-edit-hazardsymbol' },
				{ name: ':hazardsymbol-insert-alt' },
			],
			referenceQuery: xq`@href`,
			isPermanentId: true,
		}
	);

	// howtoavoid
	//     The <howtoavoid> element is the container for the third text entry of a safety label. It contains
	//     the description of how to avoid the hazard, such as "Lock out power before servicing".
	configureAsFrameWithBlock(
		sxModule,
		xq`self::howtoavoid`,
		t('how to avoid'),
		{
			emptyElementPlaceholderText: t(
				'type the description of how to avoid the hazard'
			),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// messagepanel
	//     The <messagepanel> element describes the area of a safety sign or label that contains the word
	//     message which identifies a hazard, indicates how to avoid the hazard, and advises of the probable
	//     consequences of not avoiding the hazard.
	configureAsFrame(sxModule, xq`self::messagepanel`, t('message panel'), {
		contextualOperations: [
			{
				name: ':messagepanel-append-consequence',
				hideIn: ['context-menu'],
			},
			{
				name: ':messagepanel-insert-consequence',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
			{
				name: ':messagepanel-append-howtoavoid',
				hideIn: ['context-menu'],
			},
			{
				name: ':messagepanel-insert-howtoavoid',
				hideIn: ['element-menu', 'breadcrumbs-menu'],
			},
			{ name: ':contextual-delete-messagepanel' },
		],
		defaultTextContainer: 'howtoavoid',
		isIgnoredForNavigation: false,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// typeofhazard
	//     <typeofhazard> element is the container for the first text entry of a safety label. It contains the
	//     description of the type of hazard, such as "Moving parts can crush and cut".
	configureAsTitleFrame(
		sxModule,
		xq`self::typeofhazard`,
		t('type of hazard'),
		{
			emptyElementPlaceholderText: t('type the type of hazard'),
			fontVariation: 'figure-title',
		}
	);
}
