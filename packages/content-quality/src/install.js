import t from 'fontoxml-localization/src/t.js';

import contentQualityManager from 'fontoxml-content-quality/src/contentQualityManager.js';

export default function install() {
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
