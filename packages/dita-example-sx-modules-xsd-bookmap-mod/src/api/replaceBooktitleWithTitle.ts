import CustomMutationResult from 'fontoxml-base-flow/src/CustomMutationResult';
import { convertElement } from 'fontoxml-base-flow/src/primitives';
import type Blueprint from 'fontoxml-blueprints/src/Blueprint';
import { unsafeCollapseElement } from 'fontoxml-blueprints/src/blueprintMutations';
import blueprintQuery from 'fontoxml-blueprints/src/blueprintQuery';
import type BlueprintSelection from 'fontoxml-blueprints/src/BlueprintSelection';
import type { FontoElementNode } from 'fontoxml-dom-utils/src/types';
import type { OperationStepData } from 'fontoxml-operations/src/types';
import type { Format } from 'fontoxml-schema-experience/src/format';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean';
import evaluateXPathToFirstNode from 'fontoxml-selectors/src/evaluateXPathToFirstNode';
import xq from 'fontoxml-selectors/src/xq';

const replaceBooktitleWithTitle = (
	stepData: OperationStepData & {
		contextNodeId: string;
	},
	blueprint: Blueprint,
	format: Format,
	_selection: BlueprintSelection
): CustomMutationResult => {
	const booktitleNode = blueprint.lookup(stepData.contextNodeId);

	if (
		!booktitleNode ||
		!blueprintQuery.isInDocument(blueprint, booktitleNode)
	) {
		return CustomMutationResult.notAllowed().setActive();
	}

	const bookTitleChildNodes = blueprint.getChildNodes(booktitleNode);

	if (!bookTitleChildNodes.length) {
		return CustomMutationResult.notAllowed();
	}

	const mainbooktitleNode = evaluateXPathToFirstNode(
		xq`./child::mainbooktitle`,
		booktitleNode,
		blueprint
	) as FontoElementNode;

	bookTitleChildNodes.forEach((node) => {
		if (!evaluateXPathToBoolean(xq`self::mainbooktitle`, node, blueprint)) {
			blueprint.removeChild(booktitleNode, node);
		}
	});

	unsafeCollapseElement(
		blueprint.getParentNode(booktitleNode),
		booktitleNode,
		blueprint
	);

	convertElement(blueprint, mainbooktitleNode, 'title', format);

	return CustomMutationResult.ok();
};

export default replaceBooktitleWithTitle;
