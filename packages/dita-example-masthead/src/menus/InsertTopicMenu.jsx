import React, { useEffect, useState } from 'react';

import documentsHierarchy from 'fontoxml-documents/src/documentsHierarchy.js';
import documentsManager from 'fontoxml-documents/src/documentsManager.js';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean.js';
import evaluateXPathToString from 'fontoxml-selectors/src/evaluateXPathToString.js';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem.jsx';
import getNodeId from 'fontoxml-dom-identification/src/getNodeId.js';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint.js';
import selectionManager from 'fontoxml-selection/src/selectionManager.js';
import useXPath from 'fontoxml-fx/src/useXPath.js';
import t from 'fontoxml-localization/src/t.js';

import { Drop, Menu, MenuGroup, MenuItemWithDrop } from 'fds/components';

import bookmapElementLabels from 'dita-example-sx-modules-xsd-bookmap-mod/src/api/bookmapElementLabels.js';

function uppercaseFirstLetter(input) {
	if (input === '') {
		return input;
	}
	var firstCharacter = String.fromCodePoint(input.codePointAt(0));
	return firstCharacter.toUpperCase() + input.substr(firstCharacter.length);
}

function createStandardSubMenu(
	refNodeId,
	refNodeName,
	placeholderOrContainer,
	context = 'contextual'
) {
	return (
		<MenuItemWithDrop
			label={uppercaseFirstLetter(bookmapElementLabels[refNodeName])}
			renderDrop={() => (
				<Drop>
					<Menu>
						<MenuGroup>
							<FxOperationMenuItem
								operationName={`${context}-insert-${refNodeName}--from-template`}
								operationData={{ contextNodeId: refNodeId }}
							/>
							<FxOperationMenuItem
								operationName={`${context}-insert-${refNodeName}--to-existing-document`}
								operationData={{ contextNodeId: refNodeId }}
							/>
						</MenuGroup>
						<MenuGroup>
							<FxOperationMenuItem
								operationName={`${context}-insert-${refNodeName}--${placeholderOrContainer}`}
								operationData={{ contextNodeId: refNodeId }}
							/>
						</MenuGroup>
					</Menu>
				</Drop>
			)}
		/>
	);
}

function createTopicSubMenu(refNodeId) {
	return (
		<MenuItemWithDrop
			label={t('Topic')}
			renderDrop={() => (
				<Drop>
					<Menu>
						<FxOperationMenuItem
							operationName="contextual-insert-topicref--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName="contextual-insert-topicref--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</Menu>
				</Drop>
			)}
		/>
	);
}

const InsertTopicMenu = () => {
	const selectionNode = useXPath('fonto:selection-common-ancestor()');
	const [refNodeId, setRefNodeId] = useState(null);
	const [refNodeName, setRefNodeName] = useState('');
	const [isContainerOrPlaceholder, setIsContainerOrPlaceholder] = useState(false);

	useEffect(() => {
		let newRefNodeId = null;

		// Check whether there is a focused hierarchy node
		var focusedHierarchyNode = selectionManager.getFocusedHierarchyNode();
		if (
			focusedHierarchyNode &&
			focusedHierarchyNode.documentReference &&
			focusedHierarchyNode.documentReference.sourceNodeId
		) {
			var documentElement;
			if (!focusedHierarchyNode.documentReference.traversalRootNodeId) {
				var documentNode = documentsManager.getDocumentNode(
					focusedHierarchyNode.documentReference.documentId
				);
				if (documentNode) {
					documentElement = documentNode.documentElement;
				}
			}
			if (
				!documentElement ||
				!evaluateXPathToBoolean(
					'fonto:dita-class(., "map/map")',
					documentElement,
					readOnlyBlueprint
				)
			) {
				newRefNodeId = focusedHierarchyNode.documentReference.sourceNodeId;
			}
		}

		if (!newRefNodeId) {
			var ancestor = selectionManager.getCommonAncestorContainer();
			while (ancestor) {
				var ancestorNodeId = getNodeId(ancestor);

				// Check if ancestor is itself a topicref or map (then use that)
				if (
					evaluateXPathToBoolean(
						'fonto:dita-class(., "map/topicref") or fonto:dita-class(., "map/map")',
						ancestor,
						readOnlyBlueprint
					)
				) {
					newRefNodeId = ancestorNodeId;
					ancestor = null;
				} else {
					// Check if ancestor is the traversal root node of a document hierarchy node (use its sourceNodeId)
					// eslint-disable-next-line no-loop-func
					var hierarchyNodeForTraversalRootNode = documentsHierarchy.find(function(node) {
						return (
							node.documentReference &&
							node.documentReference.traversalRootNodeId === ancestorNodeId
						);
					});
					if (hierarchyNodeForTraversalRootNode) {
						newRefNodeId =
							hierarchyNodeForTraversalRootNode.documentReference.sourceNodeId;
						ancestor = null;
					} else {
						ancestor = ancestor.parentNode;
					}
				}
			}
		}

		if (!newRefNodeId && selectionManager.focusedDocumentId) {
			var hierarchyNodeForFocusedDocument = documentsHierarchy.find(function(node) {
				return (
					node.documentReference &&
					node.documentReference.documentId === selectionManager.focusedDocumentId
				);
			});
			if (hierarchyNodeForFocusedDocument) {
				newRefNodeId = hierarchyNodeForFocusedDocument.documentReference.sourceNodeId;
			}
		}

		setRefNodeId(newRefNodeId);
		const newRefNode = documentsManager.getNodeById(newRefNodeId);
		setRefNodeName(
			newRefNode ? evaluateXPathToString('./name()', newRefNode, readOnlyBlueprint) : ''
		);
		setIsContainerOrPlaceholder(
			newRefNode ? evaluateXPathToBoolean('not(@href)', newRefNode, readOnlyBlueprint) : ''
		);
	}, [selectionNode]);

	const wrapInMenu = contents => (
		<Menu>
			{contents.map((content, index) => (
				<MenuGroup
					key={index}
					heading={
						index === 0
							? bookmapElementLabels[refNodeName]
								? uppercaseFirstLetter(bookmapElementLabels[refNodeName])
								: null
							: null
					}
				>
					{content}
				</MenuGroup>
			))}
			<MenuGroup>
				<FxOperationMenuItem
					icon="align-right icon-flip-vertical"
					label="View document outline"
					operationData={{ panesId: 'sidebar', paneId: 'structure' }}
					operationName="open-ui-pane"
					tooltipContent="Open the sidebar with the document outline"
				/>
			</MenuGroup>
		</Menu>
	);

	if (refNodeName === 'bookmap') {
		return wrapInMenu([
			<>
				<FxOperationMenuItem
					operationName="contextual-insert-frontmatter"
					operationData={{ contextNodeId: refNodeId }}
				/>
			</>,
			<>
				{createStandardSubMenu(refNodeId, 'chapter', 'container', 'bookmap')}
				{createStandardSubMenu(refNodeId, 'part', 'container', 'bookmap')}
			</>,
			<>
				{createStandardSubMenu(refNodeId, 'appendices', 'container', 'bookmap')}
				{createStandardSubMenu(refNodeId, 'appendix', 'container', 'bookmap')}
			</>,
			<>
				<FxOperationMenuItem
					operationName="contextual-insert-backmatter"
					operationData={{ contextNodeId: refNodeId }}
				/>
			</>
		]);
	} else if (refNodeName === 'frontmatter') {
		return wrapInMenu([
			<>
				{createStandardSubMenu(refNodeId, 'bookabstract', 'placeholder')}
				<FxOperationMenuItem
					operationName="contextual-insert-booklists"
					operationData={{ contextNodeId: refNodeId }}
				/>
				{createStandardSubMenu(refNodeId, 'colophon', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'dedication', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'draftintro', 'container')}
				{createStandardSubMenu(refNodeId, 'notices', 'container')}
				{createStandardSubMenu(refNodeId, 'preface', 'container')}
				{createTopicSubMenu(refNodeId)}
			</>
		]);
	} else if (refNodeName === 'booklists') {
		return wrapInMenu([
			<>
				{createStandardSubMenu(refNodeId, 'abbrevlist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'bibliolist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'booklist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'figurelist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'glossarylist', 'container')}
				{createStandardSubMenu(refNodeId, 'indexlist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'tablelist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'trademarklist', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'toc', 'placeholder')}
			</>
		]);
	} else if (refNodeName === 'part') {
		return wrapInMenu([
			<>
				{createStandardSubMenu(refNodeId, 'chapter', 'container')}
				{createTopicSubMenu(refNodeId)}
			</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName="contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>
		]);
	} else if (refNodeName === 'appendices') {
		return wrapInMenu([
			<>{createStandardSubMenu(refNodeId, 'appendix', 'container')}</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName="contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>
		]);
	} else if (refNodeName === 'backmatter') {
		return wrapInMenu([
			<>
				{createStandardSubMenu(refNodeId, 'amendments', 'placeholder')}
				<FxOperationMenuItem
					operationName="contextual-insert-booklists"
					operationData={{ contextNodeId: refNodeId }}
				/>
				{createStandardSubMenu(refNodeId, 'colophon', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'dedication', 'placeholder')}
				{createStandardSubMenu(refNodeId, 'notices', 'container')}
				{createTopicSubMenu(refNodeId)}
			</>
		]);
	} else if (
		['appendix', 'chapter', 'draftintro', 'glossarylist', 'notices', 'preface'].includes(
			refNodeName
		)
	) {
		return wrapInMenu([
			<>
				<FxOperationMenuItem
					operationName="contextual-insert-topicref--from-template"
					operationData={{ contextNodeId: refNodeId }}
				/>
				<FxOperationMenuItem
					operationName="contextual-insert-topicref--to-existing-document"
					operationData={{ contextNodeId: refNodeId }}
				/>
			</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName="contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>
		]);
	} else if (
		[
			'amendments',
			'bookabstract',
			'colophon',
			'dedication',
			'abbrevlist',
			'bibliolist',
			'booklist',
			'figurelist',
			'indexlist',
			'tablelist',
			'toc',
			'trademarklist'
		].includes(refNodeName)
	) {
		return wrapInMenu([
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName="contextual-convert-to-placeholder"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName="contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>
		]);
	}
	return wrapInMenu([
		<>
			<FxOperationMenuItem operationName="insert-topicref--from-template" />
			<FxOperationMenuItem operationName="insert-topicref--to-existing-document" />
		</>
	]);
};

export default InsertTopicMenu;
