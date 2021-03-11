import t from 'fontoxml-localization/src/t.js';

import registerContentQualityAnnotationType from 'fontoxml-content-quality/src/registerContentQualityAnnotationType.js';
import registerContentQualityAnnotationTypesCategory from 'fontoxml-content-quality/src/registerContentQualityAnnotationTypesCategory.js';

import renderCustomDictionaryAnnotationDetails from './renderCustomDictionaryAnnotationDetails.jsx';

export default function install() {
	registerContentQualityAnnotationType({
		namespaceURI: '',
		localName: 'matchid',
		heading: t('Annotation debug information'),
		color: 'orange',
		icon: 'far fa-gear',
		CardContentComponent: renderCustomDictionaryAnnotationDetails,
		decoration: 'wavy-underline'
	});

	registerContentQualityAnnotationTypesCategory(
		{
			id: 'custom-dictionary',
			label: t('Custom dictionary'),
			description: t('See suggestions for occurrences of the dictionary.')
		},
		[{ namespaceURI: '', localName: 'matchid' }]
	);

	registerContentQualityAnnotationTypesCategory(
		{
			id: 'hunspell-spelling',
			label: t('Spelling (hunspell)'),
			description: t(
				'See suggestions for spelling mistakes from the hunspell powered checker.'
			)
		},
		[
			{
				namespaceURI: 'urn:fontoxml:content-quality:spelling:1.0.0',
				localName: 'spelling-error'
			}
		]
	);

	registerContentQualityAnnotationTypesCategory(
		{
			id: 'spelling',
			label: t('Spelling'),
			description: t('See suggestions for spelling mistakes')
		},
		[
			{
				namespaceURI: 'urn:fontoxml:content-quality:language-tool:1.0.0',
				localName: 'spelling-error'
			}
		]
	);
	registerContentQualityAnnotationTypesCategory(
		{
			id: 'grammar',
			label: t('Grammar'),
			description: t('See suggestions for grammar mistakes')
		},
		[
			{
				namespaceURI: 'urn:fontoxml:content-quality:language-tool:1.0.0',
				localName: 'grammar-error'
			}
		]
	);
}
