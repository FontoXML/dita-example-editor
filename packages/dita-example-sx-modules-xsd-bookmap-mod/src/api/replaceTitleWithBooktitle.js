import blueprintMutations from 'fontoxml-blueprints/src/blueprintMutations.js';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery.js';
import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult.js';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager.js';
import primitives from 'fontoxml-base-flow/src/primitives.js';

const replaceTitleWithBooktitle = (argument, blueprint, format, _selection) => {
	const titleNode = blueprint.lookup(argument.contextNodeId);

	if (!titleNode || !blueprintQuery.isInDocument(blueprint, titleNode)) {
		return CustomMutationResult.notAllowed().setActive();
	}

	const booktitleNode = namespaceManager.createElement(titleNode, 'booktitle');

	blueprint.insertBefore(blueprint.getParentNode(titleNode), booktitleNode, titleNode);

	blueprintMutations.unsafeMoveNodes(titleNode, titleNode, blueprint, booktitleNode, null, false);

	primitives.convertElement(blueprint, titleNode, 'mainbooktitle', format);

	return CustomMutationResult.ok();
};

export default replaceTitleWithBooktitle;
