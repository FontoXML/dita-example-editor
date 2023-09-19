import uiManager from 'fontoxml-modular-ui/src/uiManager';

import DitaExampleMasthead from './DitaExampleMasthead';

export default function install(): void {
	uiManager.registerReactComponent('Masthead', DitaExampleMasthead);
}
