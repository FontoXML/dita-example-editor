import registerNodeStatus from 'fontoxml-families/src/registerNodeStatus.js';

export default function install() {
	registerNodeStatus('needs-review', 'Review', {
		componentProps: { label: 'Override', tooltipContent: 'Test' }
	});
}
