import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult.js';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery.js';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes.js';

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
export default function removePropertiesColumn(stepData, blueprint) {
	var contextNode = blueprint.lookup(stepData.contextNodeId);
	if (!contextNode || !blueprintQuery.isInDocument(blueprint, contextNode)) {
		return CustomMutationResult.notAllowed();
	}

	// When removing a given element, we are also interested in removing the corresponding header element, and vice
	// versa.
	var contextNodeName = contextNode.nodeName;
	var otherNodeName =
		contextNodeName.slice(-2) === 'hd' ? contextNodeName.slice(0, -2) : contextNodeName + 'hd';

	// Query the relevant node names in all rows of the same properties table
	var columnNodes = evaluateXPathToNodes(
		'parent::*/parent::properties/*/*[self::' +
			contextNodeName +
			' or self::' +
			otherNodeName +
			']',
		contextNode,
		blueprint
	);

	columnNodes.forEach(function(node) {
		var parentNode = blueprint.getParentNode(node);
		blueprint.removeChild(parentNode, node);
	});

	return CustomMutationResult.ok();
}
