import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import { convertElement } from 'fontoxml-base-flow/src/primitives';
import { unsafeMoveNodes } from 'fontoxml-blueprints/src/blueprintMutations';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager';

const replaceTitleWithBooktitle = (argument, blueprint, format, _selection) => {
	const titleNode = blueprint.lookup(argument.contextNodeId);

	if (!titleNode || !blueprintQuery.isInDocument(blueprint, titleNode)) {
		return CustomMutationResult.notAllowed().setActive();
	}

	const booktitleNode = namespaceManager.createElement(
		titleNode,
		'booktitle'
	);

	blueprint.insertBefore(
		blueprint.getParentNode(titleNode),
		booktitleNode,
		titleNode
	);

	unsafeMoveNodes(
		titleNode,
		titleNode,
		blueprint,
		booktitleNode,
		null,
		false
	);

	convertElement(blueprint, titleNode, 'mainbooktitle', format);

	return CustomMutationResult.ok();
};

export default replaceTitleWithBooktitle;
