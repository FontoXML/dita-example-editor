import uiManager from 'fontoxml-modular-ui/src/uiManager.js';
import TimeValueModal from './ui/TimeValueModal.jsx';

export default function install() {
	uiManager.registerReactComponent('TimeValueModal', TimeValueModal);
}
