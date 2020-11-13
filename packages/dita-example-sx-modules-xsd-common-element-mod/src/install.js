import documentsManager from 'fontoxml-documents/src/documentsManager.js';
import addAction from 'fontoxml-operations/src/addAction.js';
import remoteDocumentStateManager from 'fontoxml-remote-documents/src/remoteDocumentStateManager.js';

export default function install() {
	addAction(
		'isDocumentReady',
		function isDocumentReady(stepData) {},
		function getIsDocumentReadyState(stepData) {
			var documentId = documentsManager.getDocumentIdByNodeId(stepData.contextNodeId);

			// If document out of sync, we need to disable the operation
			const documentStatus = remoteDocumentStateManager.getState(documentId);
			const isDirty = documentStatus.isDirty;
			const isInSync = documentStatus.isInSync;
			const isModifyingLock = documentStatus.isModifyingLock;
			const isSaving = documentStatus.isSaving;
			if (!isDirty && isInSync && !isModifyingLock && !isSaving) {
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
