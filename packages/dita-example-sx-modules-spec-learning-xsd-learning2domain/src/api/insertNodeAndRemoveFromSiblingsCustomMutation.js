import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult.js';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery.js';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode.js';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes.js';
import xq from 'fontoxml-selectors/src/xq';

/**
 * Arguments:
 * @param {NodeId} contextNodeId      	               The node in which the new node should be inserted.
 * @param {string} nodeName                            The name of the node that needs to be inserted and removed.
 * @param {string | XQExpression} referenceNodeQuery   An XPath Query or XQExpression to find a node 
 * 										               which should become the next sibling of the new node.
 */
export default function insertNodeAndRemoveFromSiblings(argument, blueprint) {
	var contextNode = blueprint.lookup(argument.contextNodeId);
	if (
		!contextNode ||
		!argument.nodeName ||
		!blueprintQuery.isInDocument(blueprint, contextNode)
	) {
		return CustomMutationResult.notAllowed();
	}

	var documentNode = blueprintQuery.getDocumentNode(blueprint, contextNode);
	var newNode = documentNode.createElement(argument.nodeName);
	var referenceNode = argument.referenceNodeQuery
		? evaluateXPathToFirstNode(argument.referenceNodeQuery, contextNode, blueprint)
		: null;

	blueprint.insertBefore(contextNode, newNode, referenceNode);

	evaluateXPathToNodes(xq`preceding-sibling::*`, contextNode, blueprint)
		.concat(evaluateXPathToNodes(xq`following-sibling::*`, contextNode, blueprint))
		.forEach(function(siblingNode) {
			var removeNode = evaluateXPathToFirstNode(
				xq`child::*[name() = ${argument.nodeName}]`,
				siblingNode,
				blueprint
			);

			if (removeNode) {
				blueprint.removeChild(siblingNode, removeNode);
			}
		});

	return CustomMutationResult.ok();
}
