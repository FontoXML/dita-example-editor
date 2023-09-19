import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import { convertElement } from 'fontoxml-base-flow/src/primitives';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import { unsafeMoveNodes } from 'fontoxml-blueprints/src/blueprintMutations';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import type BlueprintSelection from 'fontoxml-blueprints/src/BlueprintSelection';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import type { Format } from 'fontoxml-schema-experience/src/format';

const replaceTitleWithBooktitle = (
	stepData: OperationStepData & {
		contextNodeId: string;
	},
	blueprint: Blueprint,
	format: Format,
	_selection: BlueprintSelection
): CustomMutationResult => {
	const titleNode = blueprint.lookup(stepData.contextNodeId);

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
