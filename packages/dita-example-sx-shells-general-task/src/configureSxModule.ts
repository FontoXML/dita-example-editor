import configureMarkupLabel from 'fontoxml-families/src/configureMarkupLabel';
import t from 'fontoxml-localization/src/t';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
	configureMarkupLabel(sxModule, xq`self::task`, t('general task'));
}
