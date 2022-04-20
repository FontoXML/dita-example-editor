import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import getNodeId from 'fontoxml-dom-identification/src/getNodeId';
import addTransform from 'fontoxml-operations/src/addTransform';
import selectionManager from 'fontoxml-selection/src/selectionManager';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode';
import evaluateXPathToStrings from 'fontoxml-selectors/src/evaluateXPathToStrings';
import xq from 'fontoxml-selectors/src/xq';

import insertNodeAndRemoveFromSiblings from './api/insertNodeAndRemoveFromSiblingsCustomMutation';
import replaceNodesWithMappedStructure from './api/replaceNodesWithMappedStructureCustomMutation';

export default function install() {
	addCustomMutation(
		'insert-node-and-remove-from-siblings',
		insertNodeAndRemoveFromSiblings
	);
	addCustomMutation(
		'replace-nodes-with-mapped-structure',
		replaceNodesWithMappedStructure
	);

	addTransform('setSequenceValue', function setSequenceValue(stepData) {
		const contextNode = documentsManager.getNodeById(
			stepData.contextNodeId
		);
		if (!contextNode || !stepData.sequenceValueXPathQuery) {
			if (!stepData.operationState) {
				stepData.operationState = {};
			}
			stepData.operationState.enabled = false;
			return stepData;
		}

		const sequenceValues = evaluateXPathToStrings(
			stepData.sequenceValueXPathQuery,
			contextNode,
			readOnlyBlueprint
		);
		stepData.value = String(sequenceValues.length + 1);

		if (sequenceValues.length > 0) {
			for (let i = 1; i <= sequenceValues.length; i++) {
				if (!sequenceValues.includes(String(i))) {
					stepData.value = String(i);
					break;
				}
			}
		}

		return stepData;
	});

	addTransform(
		'disableOperationIfContextNode',
		function (stepData) {
			return stepData;
		},
		function disableOperationIfContextNode(stepData) {
			const contextNode = documentsManager.getNodeById(
				stepData.contextNodeId
			);
			if (contextNode) {
				stepData.operationState = {
					enabled: false,
				};
			}
			return stepData;
		}
	);

	addTransform(
		'setContextNodeIdToPrecedinglcInteraction',
		function setContextNodeIdToPrecedinglcInteraction(stepData) {
			const selectedElement = selectionManager.getSelectedElement();
			if (!selectedElement) {
				return stepData;
			}

			let lcInteractionNode;
			const selectionAncestor = evaluateXPathToFirstNode(
				xq`ancestor-or-self::*[self::section or self::lcSummary]`,
				selectedElement,
				readOnlyBlueprint
			);
			if (selectionAncestor) {
				lcInteractionNode = evaluateXPathToFirstNode(
					xq`preceding-sibling::lcInteraction[1]`,
					selectionAncestor,
					readOnlyBlueprint
				);
			} else {
				lcInteractionNode = evaluateXPathToFirstNode(
					xq`self::learningAssessmentbody/child::lcInteraction[last()]`,
					selectedElement,
					readOnlyBlueprint
				);
			}

			if (lcInteractionNode) {
				stepData.contextNodeId = getNodeId(lcInteractionNode);
			}

			return stepData;
		}
	);
}
