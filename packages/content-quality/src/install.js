import t from 'fontoxml-localization/src/t.js';

import contentQualityManager from 'fontoxml-content-quality/src/contentQualityManager.js';

import renderCustomDictionaryAnnotationDetails from './ui/renderCustomDictionaryAnnotationDetails.jsx';

export default function install() {
	contentQualityManager.registerAnnotationType('', 'matchid', {
		renderSidebarDetails: renderCustomDictionaryAnnotationDetails,
		color: 'orange',
		squiggleVariation: 'wavy-underline'
	});
	contentQualityManager.registerAnnotationTypesCategory(
		{
			id: 'custom-dictionary',
			label: 'Custom dictionary',
			description: 'Custom dictionary'
		},
		[{ namespace: '', name: 'matchid' }]
	);

	// TODO: cover this category with a Cypress test
	contentQualityManager.registerAnnotationTypesCategory(
		{
			id: 'hunspell-spelling',
			label: t('Spelling (hunspell)'),
			description: t(
				'See suggestions for spelling mistakes from the hunspell powered checker.'
			)
		},
		[{ namespace: 'urn:fontoxml:content-quality:spelling:1.0.0', name: 'spelling-error' }]
	);

	// TODO: merge these together and update Cypress tests
	contentQualityManager.registerAnnotationTypesCategory(
		{
			id: 'spelling',
			label: t('Spelling'),
			description: t('See suggestions for spelling mistakes')
		},
		[{ namespace: 'urn:fontoxml:fcq:annotations:language-tool:1.0.0', name: 'spelling-error' }]
	);
	contentQualityManager.registerAnnotationTypesCategory(
		{
			id: 'grammar',
			label: t('Grammar'),
			description: t('See suggestions for grammar mistakes')
		},
		[{ namespace: 'urn:fontoxml:fcq:annotations:language-tool:1.0.0', name: 'grammar-error' }]
	);
}