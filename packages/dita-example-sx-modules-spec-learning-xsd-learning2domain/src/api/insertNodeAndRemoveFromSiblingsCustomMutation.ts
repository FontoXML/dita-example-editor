import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes';
import xq from 'fontoxml-selectors/src/xq';

/**
 * Arguments:
 * @param {NodeId} contextNodeId      	               The node in which the new node should be inserted.
 * @param {string} nodeName                            The name of the node that needs to be inserted and removed.
 * @param {string | XQExpression} referenceNodeQuery   An XPath Query or XQExpression to find a node
 * 										               which should become the next sibling of the new node.
 */
export default function insertNodeAndRemoveFromSiblings(
	stepData: OperationStepData & {
		contextNodeId: string;
		nodeName: string;
		referenceNodeQuery: string;
	},
	blueprint: Blueprint
): CustomMutationResult {
	const contextNode = blueprint.lookup(stepData.contextNodeId);
	if (
		!contextNode ||
		!stepData.nodeName ||
		!blueprintQuery.isInDocument(blueprint, contextNode)
	) {
		return CustomMutationResult.notAllowed();
	}

	const documentNode = blueprintQuery.getDocumentNode(blueprint, contextNode);
	const newNode = documentNode.createElement(stepData.nodeName);
	const referenceNode = stepData.referenceNodeQuery
		? evaluateXPathToFirstNode(
				stepData.referenceNodeQuery,
				contextNode,
				blueprint
		  )
		: null;

	blueprint.insertBefore(contextNode, newNode, referenceNode);

	evaluateXPathToNodes(xq`preceding-sibling::*`, contextNode, blueprint)
		.concat(
			evaluateXPathToNodes(
				xq`following-sibling::*`,
				contextNode,
				blueprint
			)
		)
		.forEach(function (siblingNode) {
			const removeNode = evaluateXPathToFirstNode(
				xq`child::*[name() = ${stepData.nodeName}]`,
				siblingNode,
				blueprint
			);

			if (removeNode) {
				blueprint.removeChild(siblingNode, removeNode);
			}
		});

	return CustomMutationResult.ok();
}
