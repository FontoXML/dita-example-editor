import uiManager from 'fontoxml-modular-ui/src/uiManager';

import TimeValueModal from './ui/TimeValueModal.jsx';

export default function install(): void {
	uiManager.registerReactComponent('TimeValueModal', TimeValueModal);
}
