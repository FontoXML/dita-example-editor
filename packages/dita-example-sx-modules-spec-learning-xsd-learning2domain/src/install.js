import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation.js';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint.js';
import documentsManager from 'fontoxml-documents/src/documentsManager.js';
import getNodeId from 'fontoxml-dom-identification/src/getNodeId.js';
import addTransform from 'fontoxml-operations/src/addTransform.js';
import selectionManager from 'fontoxml-selection/src/selectionManager.js';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode.js';
import evaluateXPathToStrings from 'fontoxml-selectors/src/evaluateXPathToStrings.js';
import insertNodeAndRemoveFromSiblings from './api/insertNodeAndRemoveFromSiblingsCustomMutation.js';
import replaceNodesWithMappedStructure from './api/replaceNodesWithMappedStructureCustomMutation.js';

export default function install() {
	addCustomMutation('insert-node-and-remove-from-siblings', insertNodeAndRemoveFromSiblings);
	addCustomMutation('replace-nodes-with-mapped-structure', replaceNodesWithMappedStructure);

	addTransform('setSequenceValue', function setSequenceValue(stepData) {
		var contextNode = documentsManager.getNodeById(stepData.contextNodeId);
		if (!contextNode || !stepData.sequenceValueXPathQuery) {
			if (!stepData.operationState) {
				stepData.operationState = {};
			}
			stepData.operationState.enabled = false;
			return stepData;
		}

		var sequenceValues = evaluateXPathToStrings(
			stepData.sequenceValueXPathQuery,
			contextNode,
			readOnlyBlueprint
		);
		stepData.value = String(sequenceValues.length + 1);

		if (sequenceValues.length > 0) {
			for (var i = 1; i <= sequenceValues.length; i++) {
				if (sequenceValues.indexOf(String(i)) === -1) {
					stepData.value = String(i);
					break;
				}
			}
		}

		return stepData;
	});

	addTransform(
		'disableOperationIfContextNode',
		function(stepData) {
			return stepData;
		},
		function disableOperationIfContextNode(stepData) {
			var contextNode = documentsManager.getNodeById(stepData.contextNodeId);
			if (contextNode) {
				stepData.operationState = {
					enabled: false
				};
			}
			return stepData;
		}
	);

	addTransform(
		'setContextNodeIdToPrecedinglcInteraction',
		function setContextNodeIdToPrecedinglcInteraction(stepData) {
			var selectedElement = selectionManager.getSelectedElement();
			if (!selectedElement) {
				return stepData;
			}

			var lcInteractionNode;
			var selectionAncestor = evaluateXPathToFirstNode(
				'ancestor-or-self::*[self::section or self::lcSummary]',
				selectedElement,
				readOnlyBlueprint
			);
			if (selectionAncestor) {
				lcInteractionNode = evaluateXPathToFirstNode(
					'preceding-sibling::lcInteraction[1]',
					selectionAncestor,
					readOnlyBlueprint
				);
			} else {
				lcInteractionNode = evaluateXPathToFirstNode(
					'self::learningAssessmentbody/child::lcInteraction[last()]',
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
