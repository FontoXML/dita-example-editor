import documentsManager from 'fontoxml-documents/src/documentsManager.js';
import addAction from 'fontoxml-operations/src/addAction.js';
import remoteDocumentStateManager from 'fontoxml-remote-documents/src/remoteDocumentStateManager.js';

export default function install() {
	addAction(
		'isOutOfSyncDocument',
		function isOutOfSyncDocument(stepData) {},
		function getIsOutOfSyncDocumentState(stepData) {
			var documentId = documentsManager.getDocumentIdByNodeId(stepData.contextNodeId);

			// If document out of sync, we need to disable the operation
			const documentStatus = remoteDocumentStateManager.getState(documentId);
			const isInSync = documentStatus.isInSync;
			if (isInSync) {
				return {
					enabled: true,
					active: true
				};
			}

			return {
				enabled: false,
				active: true
			};
		}
	);
}
