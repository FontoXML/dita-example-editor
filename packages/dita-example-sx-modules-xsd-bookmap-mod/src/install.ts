import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import documentsHierarchy from 'fontoxml-documents/src/documentsHierarchy';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import addAction from 'fontoxml-operations/src/addAction';
import addTransform from 'fontoxml-operations/src/addTransform';
import documentLoader from 'fontoxml-remote-documents/src/documentLoader';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean';
import xq from 'fontoxml-selectors/src/xq';

import replaceBooktitleWithTitle from './api/replaceBooktitleWithTitle';
import replaceTitleWithBooktitle from './api/replaceTitleWithBooktitle';
import wrapAppendixElementsInAppendices from './api/wrapAppendixElementsInAppendices';

function isDocumentAMapPromise(stepData) {
	const remoteDocumentId =
		stepData.selectedDocumentTemplateId || stepData.remoteDocumentId;

	const getDocumentId = stepData.documentId
		? Promise.resolve(stepData.documentId)
		: documentLoader.loadDocument(remoteDocumentId);

	return getDocumentId.then((documentId) => {
		const documentNode = documentId
			? documentsManager.getDocumentNode(documentId)
			: null;
		if (!documentNode) {
			return true;
		}

		if (
			evaluateXPathToBoolean(
				xq`fonto:dita-class(., "map/map")`,
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
	addCustomMutation(
		'replace-title-with-booktitle',
		replaceTitleWithBooktitle
	);
	addCustomMutation(
		'replace-booktitle-with-title',
		replaceBooktitleWithTitle
	);
	addCustomMutation(
		'wrap-appendix-elements-in-appendices',
		wrapAppendixElementsInAppendices
	);

	addAction(
		'disableWhenSelectedDocumentedIsAMap',
		function (stepData) {
			return isDocumentAMapPromise(stepData).then((isDocumentAMap) => {
				if (isDocumentAMap) {
					return addAction.CANCEL_OPERATION;
				}
			});
		},
		function (stepData) {
			return isDocumentAMapPromise(stepData).then((isDocumentAMap) => {
				if (isDocumentAMap) {
					return {
						enabled: false,
					};
				}

				return {
					enabled: true,
				};
			});
		}
	);

	addTransform(
		'setHierarchyNodeIdToLastChildForDocumentForBookmap',
		function setHierarchyNodeIdToLastChildForDocumentForBookmap(stepData) {
			const hierarchyNodeId = stepData.hierarchyNodeId;
			const currentHierarchyNode = documentsHierarchy.find(function (
				node
			) {
				return node.getId() === hierarchyNodeId;
			});
			if (!currentHierarchyNode) {
				stepData.hierarchyNodeId = null;
				return stepData;
			}

			const documentId = stepData.documentId;
			const targetHierarchyNode = currentHierarchyNode.children
				.concat()
				.reverse()
				.find(function (node) {
					return (
						node.documentReference &&
						node.documentReference.documentId === documentId
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
