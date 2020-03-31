import blueprintMutations from 'fontoxml-blueprints/src/blueprintMutations.js';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery.js';
import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult.js';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean.js';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode.js';
import primitives from 'fontoxml-base-flow/src/primitives.js';

const replaceBooktitleWithTitle = (argument, blueprint, format, _selection) => {
	const booktitleNode = blueprint.lookup(argument.contextNodeId);

	if (!booktitleNode || !blueprintQuery.isInDocument(blueprint, booktitleNode)) {
		return CustomMutationResult.notAllowed().setActive();
	}

	const bookTitleChildNodes = blueprint.getChildNodes(booktitleNode);

	if (!bookTitleChildNodes.length) {
		return CustomMutationResult.notAllowed();
	}

	const mainbooktitleNode = evaluateXPathToFirstNode(
		'./child::mainbooktitle',
		booktitleNode,
		blueprint
	);

	bookTitleChildNodes.forEach(node => {
		if (!evaluateXPathToBoolean('self::mainbooktitle', node, blueprint)) {
			blueprint.removeChild(booktitleNode, node);
		}
	});

	blueprintMutations.unsafeCollapseElement(
		blueprint.getParentNode(booktitleNode),
		booktitleNode,
		blueprint
	);

	primitives.convertElement(blueprint, mainbooktitleNode, 'title', format);

	return CustomMutationResult.ok();
};

export default replaceBooktitleWithTitle;
