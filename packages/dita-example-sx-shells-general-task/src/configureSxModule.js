import configureMarkupLabel from 'fontoxml-families/src/configureMarkupLabel.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	configureMarkupLabel(sxModule, 'self::task', t('general task'));
}
