import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import { unsafeMoveNodes } from 'fontoxml-blueprints/src/blueprintMutations';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes';
import xq from 'fontoxml-selectors/src/xq';

const wrapAppendixElementsInAppendices = (
	stepData: OperationStepData & {
		contextNodeId: string;
		href: string;
	},
	blueprint: Blueprint
): CustomMutationResult => {
	const bookmapNode = blueprint.lookup(stepData.contextNodeId);

	if (!bookmapNode || !blueprintQuery.isInDocument(blueprint, bookmapNode)) {
		return CustomMutationResult.notAllowed();
	}

	const appendixNodes = evaluateXPathToNodes(
		xq`./appendix`,
		bookmapNode,
		blueprint
	);

	if (!appendixNodes.length) {
		return CustomMutationResult.notAllowed();
	}

	const appendicesNode = namespaceManager.createElement(
		bookmapNode,
		'appendices'
	);

	if (stepData.href) {
		blueprint.setAttribute(appendicesNode, 'href', stepData.href);
	}

	blueprint.insertBefore(bookmapNode, appendicesNode, appendixNodes[0]);

	unsafeMoveNodes(
		appendixNodes[0],
		appendixNodes[appendixNodes.length - 1],
		blueprint,
		appendicesNode,
		null,
		false
	);

	return CustomMutationResult.ok();
};

export default wrapAppendixElementsInAppendices;
