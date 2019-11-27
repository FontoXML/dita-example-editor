import configurationManager from 'fontoxml-configuration/src/configurationManager.js';

export default function setDefaultConfiguration() {
	/**
	 * Whether or not to use the (default) sheet frame header component.
	 * Defaults to true.
	 */
	configurationManager.setDefault('app/use-sheet-frame-headers', true);
}
