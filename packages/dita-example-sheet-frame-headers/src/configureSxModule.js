import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

import configureAsMapSheetFrame from 'fontoxml-dita/src/configureAsMapSheetFrame.js';

import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';

import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	sxModule.markAsAddon();

	const selectorAndLabelForSheetFrameElements = [
		{ selector: 'self::concept', label: t('concept') },
		{ selector: 'self::glossentry', label: t('entry') },
		{ selector: 'self::glossgroup', label: t('glossary') },
		{ selector: 'self::learningAssessment', label: t('learning assessment') },
		{ selector: 'self::learningContent', label: t('learning content') },
		{ selector: 'self::learningOverview', label: t('learning overview') },
		{ selector: 'self::learningPlan', label: t('learning plan') },
		{ selector: 'self::learningSummary', label: t('learning summary') },
		{ selector: 'self::reference', label: t('reference') },
		{ selector: 'self::task', label: t('task') },
		{ selector: 'self::topic', label: t('topic') }
	];

	selectorAndLabelForSheetFrameElements.forEach(({ selector, label }) => {
		configureAsSheetFrame(sxModule, selector, label, {
			sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
				? 'DefaultSheetFrameHeader'
				: null
		});
	});

	// TODO: this does not work because "visibleChildSelectorOrNodeSpec" will be "forgotten"...
	// const selectorAndLabelForMapSheetFrameElements = [
	// 	{ selector: 'self::map', label: t('map') },
	// 	{ selector: 'self::topichead', label: t('topic group') },
	// 	{ selector: 'self::topicgroup', label: t('untitled group') }
	// ];

	// selectorAndLabelForMapSheetFrameElements.forEach(({ selector, label }) => {
	// 	configureAsMapSheetFrame(sxModule, selector, label, {
	// 		sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
	// 			? 'DefaultSheetFrameHeader'
	// 			: null
	// 	});
	// });

	// So instead repeat the individual configuration for each element with the correct value for
	// "visibleChildSelectorOrNodeSpec" which is copied from packages-shared:

	// map
	configureAsMapSheetFrame(sxModule, 'self::map', t('map'), {
		sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
			? 'DefaultSheetFrameHeader'
			: null,
		visibleChildSelectorOrNodeSpec: 'self::title'
	});

	// topicgroup
	//     The <topicgroup> element is for creating groups of <topicref> elements without affecting the
	//     hierarchy, as opposed to nested < topicref> elements within a <topicref>, which does imply a
	//     structural hierarchy. It is typically used outside a hierarchy to identify groups for linking
	//     without affecting the resulting toc/navigation output. Category: Mapgroup elements
	configureAsMapSheetFrame(sxModule, 'self::topicgroup', t('untitled topic group'), {
		sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
			? 'DefaultSheetFrameHeader'
			: null,
		visibleChildSelectorOrNodeSpec: 'self::topicmeta'
	});

	// topichead
	//     The <topichead> element provides a title-only entry in a navigation map, as an alternative to the
	//     fully-linked title provided by the <topicref> element. Category: Mapgroup elements
	configureAsMapSheetFrame(sxModule, 'self::topichead', t('topic group'), {
		sheetFrameHeaderComponentName: configurationManager.get('app/use-sheet-frame-headers')
			? 'DefaultSheetFrameHeader'
			: null,
		visibleChildSelectorOrNodeSpec: 'self::topicmeta'
	});
}
