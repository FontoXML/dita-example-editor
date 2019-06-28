import uiManager from 'fontoxml-modular-ui/src/uiManager.js';
import DitaExampleMasthead from './DitaExampleMasthead.jsx';

export default function install() {
	uiManager.registerReactComponent('Masthead', DitaExampleMasthead);
}
