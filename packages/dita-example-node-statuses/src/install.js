import registerNodeStatus from 'fontoxml-families/src/registerNodeStatus.js';
import t from 'fontoxml-localization/src/t.js';

// In this file we are going to be registering any node statuses that we want to use throughout the
// editor.
export default function install() {
	// The simplest option is to only specify a label to use with a certain id.
	// registerNodeStatus('needs-review', t('Review'));

	// Or you can customize the default status badge component with some props:
	registerNodeStatus('revised', t('Revised'), {
		componentProps: {
			// These props are defined by the default component. Source code below.
			label: t('Revised'),
			backgroundColor: 'state-message-info-color',
			clickOperation: 'scroll-node-into-view',
			tooltipContent: t('This document has been revised.')
		}
	});

	// The status we have registered above is used in the configureSxModule.js file found in the
	// same folder as this file.
}
