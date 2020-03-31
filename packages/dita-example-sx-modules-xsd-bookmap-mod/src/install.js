import addAction from 'fontoxml-operations/src/addAction.js';
import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation.js';
import addTransform from 'fontoxml-operations/src/addTransform.js';
import documentLoader from 'fontoxml-remote-documents/src/documentLoader.js';
import documentsHierarchy from 'fontoxml-documents/src/documentsHierarchy.js';
import documentsManager from 'fontoxml-documents/src/documentsManager.js';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean.js';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint.js';

import replaceTitleWithBooktitle from './api/replaceTitleWithBooktitle.js';
import replaceBooktitleWithTitle from './api/replaceBooktitleWithTitle.js';
import wrapAppendixElementsInAppendices from './api/wrapAppendixElementsInAppendices.js';

function isDocumentAMapPromise(stepData) {
	const remoteDocumentId = stepData.selectedDocumentTemplateId || stepData.remoteDocumentId;

	const getDocumentId = stepData.documentId
		? Promise.resolve(stepData.documentId)
		: documentLoader.loadDocument(remoteDocumentId);

	return getDocumentId.then(documentId => {
		var documentNode = documentId ? documentsManager.getDocumentNode(documentId) : null;
		if (!documentNode) {
			return true;
		}

		if (
			evaluateXPathToBoolean(
				'fonto:dita-class(., "map/map")',
				documentNode.documentElement,
				readOnlyBlueprint
			)
		) {
			return true;
		}
		return false;
	});
}

export default function install() {
	addCustomMutation('replace-title-with-booktitle', replaceTitleWithBooktitle);
	addCustomMutation('replace-booktitle-with-title', replaceBooktitleWithTitle);
	addCustomMutation('wrap-appendix-elements-in-appendices', wrapAppendixElementsInAppendices);

	addAction(
		'disableWhenSelectedDocumentedIsAMap',
		function(stepData) {
			return isDocumentAMapPromise(stepData).then(isDocumentAMap => {
				if (isDocumentAMap) {
					return addAction.CANCEL_OPERATION;
				}
			});
		},
		function(stepData) {
			return isDocumentAMapPromise(stepData).then(isDocumentAMap => {
				if (isDocumentAMap) {
					return {
						enabled: false
					};
				}

				return {
					enabled: true
				};
			});
		}
	);

	addTransform(
		'setHierarchyNodeIdToLastChildForDocumentForBookmap',
		function setHierarchyNodeIdToLastChildForDocumentForBookmap(stepData) {
			var hierarchyNodeId = stepData.hierarchyNodeId;
			var currentHierarchyNode = documentsHierarchy.find(function(node) {
				return node.getId() === hierarchyNodeId;
			});
			if (!currentHierarchyNode) {
				stepData.hierarchyNodeId = null;
				return stepData;
			}

			var documentId = stepData.documentId;
			var targetHierarchyNode = currentHierarchyNode.children
				.concat()
				.reverse()
				.find(function(node) {
					return (
						node.documentReference && node.documentReference.documentId === documentId
					);
				});
			if (!targetHierarchyNode) {
				stepData.hierarchyNodeId = null;
				return stepData;
			}

			stepData.hierarchyNodeId = targetHierarchyNode.getId();
			return stepData;
		}
	);
}
