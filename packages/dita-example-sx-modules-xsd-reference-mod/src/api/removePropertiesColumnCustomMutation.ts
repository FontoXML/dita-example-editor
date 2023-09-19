import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import type { OperationData } from 'fontoxml-operations/src/types';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes';
import xq from 'fontoxml-selectors/src/xq';

/**
 * Removes all cells in a column of <properties>.
 *
 * A custom mutation was necessary because FontoXML does not provide an operation which can remove multiple elements
 * at once.
 *
 * @param  {Object}     stepData                Accumulates over the preceding operation steps.
 * @param  {NodeId}     stepData.contextNodeId  The internal identifier of one of the cells of the column to remove.
 * @param  {Blueprint}  blueprint               Provided by Fonto.
 */
export default function removePropertiesColumn(
	stepData: OperationData & {
		contextNodeId: string;
	},
	blueprint: Blueprint
): CustomMutationResult {
	const contextNode = blueprint.lookup(stepData.contextNodeId);
	if (!contextNode || !blueprintQuery.isInDocument(blueprint, contextNode)) {
		return CustomMutationResult.notAllowed();
	}

	// When removing a given element, we are also interested in removing the corresponding header element, and vice
	// versa.
	const contextNodeName = contextNode.nodeName;
	const otherNodeName = contextNodeName.endsWith('hd')
		? contextNodeName.slice(0, -2)
		: `${contextNodeName}hd`;

	// Query the relevant node names in all rows of the same properties table
	const columnNodes = evaluateXPathToNodes(
		xq`parent::*/parent::properties/*/*[name() = ${contextNodeName} or name() = ${otherNodeName}]`,
		contextNode,
		blueprint
	);

	columnNodes.forEach(function (node) {
		const parentNode = blueprint.getParentNode(node);
		blueprint.removeChild(parentNode, node);
	});

	return CustomMutationResult.ok();
}
