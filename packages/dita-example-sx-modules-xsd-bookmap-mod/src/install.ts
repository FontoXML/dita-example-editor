import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import documentsHierarchy from 'fontoxml-documents/src/documentsHierarchy';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import type { DocumentId } from 'fontoxml-documents/src/types';
import type { FontoDocumentNode } from 'fontoxml-dom-utils/src/types';
import addAction, { CANCEL_OPERATION } from 'fontoxml-operations/src/addAction';
import addTransform from 'fontoxml-operations/src/addTransform';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import documentLoader from 'fontoxml-remote-documents/src/documentLoader';
import type { RemoteDocumentId } from 'fontoxml-remote-documents/src/types';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean';
import xq from 'fontoxml-selectors/src/xq';

import replaceBooktitleWithTitle from './api/replaceBooktitleWithTitle';
import replaceTitleWithBooktitle from './api/replaceTitleWithBooktitle';
import wrapAppendixElementsInAppendices from './api/wrapAppendixElementsInAppendices';

async function isDocumentAMapPromise(
	stepData: OperationStepData &
		(
			| { documentId: DocumentId }
			| { remoteDocumentId: RemoteDocumentId }
			| { selectedDocumentTemplateId: RemoteDocumentId }
		)
): Promise<boolean> {
	const remoteDocumentId = (stepData.selectedDocumentTemplateId ||
		stepData.remoteDocumentId) as RemoteDocumentId;

	if (!stepData.documentId && !remoteDocumentId) {
		return false;
	}

	const getDocumentId = (
		stepData.documentId
			? Promise.resolve(stepData.documentId)
			: documentLoader.loadDocument(remoteDocumentId)
	) as Promise<DocumentId>;

	const documentId = await getDocumentId;
	const documentNode = documentId
		? (documentsManager.getDocumentNode(
				documentId
		  ) as FontoDocumentNode<'readable'>)
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
}

export default function install(): void {
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
		async function (stepData) {
			if (await isDocumentAMapPromise(stepData)) {
				return CANCEL_OPERATION;
			}
			return undefined;
		},
		async function (stepData) {
			if (await isDocumentAMapPromise(stepData)) {
				return {
					active: false,
					enabled: false,
				};
			}

			return {
				active: false,
				enabled: true,
			};
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
