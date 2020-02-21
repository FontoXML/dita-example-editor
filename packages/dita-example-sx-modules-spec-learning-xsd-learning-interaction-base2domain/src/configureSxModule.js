import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// lcInteractionBase2
	configureAsRemoved(sxModule, 'self::lcInteractionBase2', t('lcInteractionBase2'));

	// lcInteractionLabel2
	configureAsTitleFrame(sxModule, 'self::lcInteractionLabel2', t('interaction label'), {
		emptyElementPlaceholderText: t('type the interaction label'),
		fontVariation: 'figure-title'
	});

	// lcQuestionBase2
	configureAsRemoved(sxModule, 'self::lcQuestionBase2', t('lcQuestionBase2'));
}
