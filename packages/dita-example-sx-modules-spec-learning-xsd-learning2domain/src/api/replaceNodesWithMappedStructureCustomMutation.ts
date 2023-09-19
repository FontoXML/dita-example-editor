import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import type BlueprintSelection from 'fontoxml-blueprints/src/BlueprintSelection';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import type { Format } from 'fontoxml-schema-experience/src/format';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode';
import createStencil from 'fontoxml-stencils/src/createStencil';

/**
 * Replaces one or more nodes (based on an xpath query starting from the context node) with the structure
 * that is mapped to that xpath.
 *
 * This custom mutation was initially developed to replace <lcAreaShape2> and <lcAreaCoords2> when editing an area
 * in the lcHotspot2 interaction type. It might also be used by structures inheriting from these DITA classes, such
 * as the DITA LCE graphic gap match.
 *
 * Arguments:
 * @param {NodeId} contextNodeId                       The node from where to start querying
 * @param {Object} queryToReplacementStructureMapping
 */
export default function replaceNodesWithMappedStructure(
	stepData: OperationStepData & {
		contextNodeId: string;
	},
	blueprint: Blueprint,
	format: Format,
	selection: BlueprintSelection
): CustomMutationResult {
	const contextNode = blueprint.lookup(stepData.contextNodeId);
	const documentNode = blueprintQuery.getDocumentNode(
		blueprint,
		selection.startContainer
	);
	if (!contextNode || !blueprintQuery.isInDocument(blueprint, contextNode)) {
		return CustomMutationResult.notAllowed();
	}

	// The operation is only a success if all mappings can be applied.
	const opSuccess = Object.keys(
		stepData.queryToReplacementStructureMapping
	).every(function (query) {
		const alignedStencil = createStencil(
			stepData.queryToReplacementStructureMapping[query]
		).generate(blueprint, format, documentNode);
		if (!alignedStencil) {
			return false;
		}

		const oldNode = evaluateXPathToFirstNode(query, contextNode, blueprint);
		blueprint.replaceChild(
			blueprint.getParentNode(oldNode),
			alignedStencil.dom,
			oldNode
		);
		return true;
	});

	return opSuccess
		? CustomMutationResult.ok()
		: CustomMutationResult.notAllowed();
}
