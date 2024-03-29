import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// lcInteractionBase2
	configureAsRemoved(
		sxModule,
		xq`self::lcInteractionBase2`,
		t('lcInteractionBase2')
	);

	// lcInteractionLabel2
	configureAsTitleFrame(
		sxModule,
		xq`self::lcInteractionLabel2`,
		t('interaction label'),
		{
			emptyElementPlaceholderText: t('Type the interaction label'),
			fontVariation: 'figure-title',
		}
	);

	// lcQuestionBase2
	configureAsRemoved(
		sxModule,
		xq`self::lcQuestionBase2`,
		t('lcQuestionBase2')
	);
}
