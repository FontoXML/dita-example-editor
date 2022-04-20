import configureMarkupLabel from 'fontoxml-families/src/configureMarkupLabel';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule) {
	configureMarkupLabel(sxModule, xq`self::task`, t('general task'));
}
