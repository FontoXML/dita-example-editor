import blueprintMutations from 'fontoxml-blueprints/src/blueprintMutations.js';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery.js';
import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult.js';
import evaluateXPathToNodes from 'fontoxml-selectors/src/evaluateXPathToNodes.js';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager.js';

const wrapAppendixElementsInAppendices = (argument, blueprint) => {
	const bookmapNode = blueprint.lookup(argument.contextNodeId);

	if (!bookmapNode || !blueprintQuery.isInDocument(blueprint, bookmapNode)) {
		return CustomMutationResult.notAllowed();
	}

	const appendixNodes = evaluateXPathToNodes('./appendix', bookmapNode, blueprint);

	if (!appendixNodes.length) {
		return CustomMutationResult.notAllowed();
	}

	const appendicesNode = namespaceManager.createElement(bookmapNode, 'appendices');

	if (argument.href) {
		blueprint.setAttribute(appendicesNode, 'href', argument.href);
	}

	blueprint.insertBefore(bookmapNode, appendicesNode, appendixNodes[0]);

	blueprintMutations.unsafeMoveNodes(
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
