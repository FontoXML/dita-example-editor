import bookmapElementLabels from 'dita-example-sx-modules-xsd-bookmap-mod/src/api/bookmapElementLabels';
import { Drop, Menu, MenuGroup, MenuItemWithDrop } from 'fds/components';
import React, { useEffect, useState } from 'react';

import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import documentsHierarchy from 'fontoxml-documents/src/documentsHierarchy';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import getNodeId from 'fontoxml-dom-identification/src/getNodeId';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import useXPath from 'fontoxml-fx/src/useXPath';
import t from 'fontoxml-localization/src/t';
import selectionManager from 'fontoxml-selection/src/selectionManager';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean';
import evaluateXPathToString from 'fontoxml-selectors/src/evaluateXPathToString';
import xq from 'fontoxml-selectors/src/xq';

function uppercaseFirstLetter(input) {
	if (input === '') {
		return input;
	}
	const firstCharacter = String.fromCodePoint(input.codePointAt(0));
	return firstCharacter.toUpperCase() + input.substr(firstCharacter.length);
}

function getSubMenuForAlternativeInsertRefElement(
	refNodeId,
	refElementName,
	placeholderOrContainer,
	context = 'contextual'
) {
	return (
		<MenuItemWithDrop
			label={uppercaseFirstLetter(
				bookmapElementLabels[refElementName].markupLabel
			)}
			renderDrop={() => (
				<Drop>
					<Menu>
						<MenuGroup>
							<FxOperationMenuItem
								operationName={`:${context}-insert-${refElementName}--from-template`}
								operationData={{ contextNodeId: refNodeId }}
							/>
							<FxOperationMenuItem
								operationName={`:${context}-insert-${refElementName}--to-existing-document`}
								operationData={{ contextNodeId: refNodeId }}
							/>
						</MenuGroup>
						<MenuGroup>
							<FxOperationMenuItem
								operationName={`:${context}-insert-${refElementName}--${placeholderOrContainer}`}
								operationData={{ contextNodeId: refNodeId }}
							/>
						</MenuGroup>
					</Menu>
				</Drop>
			)}
		/>
	);
}

function getSubMenuForRefElement(
	refNodeId,
	refElementName,
	parent,
	placeholderOrContainer
) {
	return (
		<MenuItemWithDrop
			label={uppercaseFirstLetter(
				bookmapElementLabels[refElementName].markupLabel
			)}
			renderDrop={() => (
				<Drop>
					<Menu>
						<MenuGroup>
							<FxOperationMenuItem
								operationName=":_contextual-insert-{refElementName}--from-template"
								operationData={{
									contextNodeId: refNodeId,
									refElementName,
								}}
								tooltipContent={t(
									'Create a new topic and insert it under {PARENT_DESCRIPTION} as {ELEMENT_DESCRIPTION}.',
									{
										PARENT_DESCRIPTION:
											bookmapElementLabels[parent]
												.description,
										ELEMENT_DESCRIPTION:
											bookmapElementLabels[refElementName]
												.description,
									}
								)}
							/>
							<FxOperationMenuItem
								operationName=":_contextual-insert-{refElementName}--to-existing-document"
								operationData={{
									contextNodeId: refNodeId,
									refElementName,
								}}
								tooltipContent={t(
									'Insert an existing topic under {PARENT_DESCRIPTION} as {ELEMENT_DESCRIPTION}.',
									{
										PARENT_DESCRIPTION:
											bookmapElementLabels[parent]
												.description,
										ELEMENT_DESCRIPTION:
											bookmapElementLabels[refElementName]
												.description,
									}
								)}
							/>
						</MenuGroup>
						<MenuGroup>
							<FxOperationMenuItem
								operationName=":_contextual-insert-{elementName}--placeholder-container"
								operationData={{
									contextNodeId: refNodeId,
									elementName: refElementName,
								}}
								label={t('Insert as {CONTAINER_PLACEHOLDER}', {
									CONTAINER_PLACEHOLDER:
										placeholderOrContainer,
								})}
								tooltipContent={t(
									'Insert {ELEMENT_DESCRIPTION} under {PARENT_DESCRIPTION} as a {CONTAINER_PLACEHOLDER}.',
									{
										PARENT_DESCRIPTION:
											bookmapElementLabels[parent]
												.description,
										ELEMENT_DESCRIPTION:
											bookmapElementLabels[refElementName]
												.description,
										CONTAINER_PLACEHOLDER:
											placeholderOrContainer,
									}
								)}
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
							operationName=":contextual-insert-topicref--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName=":contextual-insert-topicref--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</Menu>
				</Drop>
			)}
		/>
	);
}

const InsertTopicMenu = () => {
	const selectionNode = useXPath(xq`fonto:selection-common-ancestor()`);
	const [refNodeId, setRefNodeId] = useState(null);
	const [refElementName, setRefElementName] = useState('');
	const [isContainerOrPlaceholder, setIsContainerOrPlaceholder] =
		useState(false);

	useEffect(() => {
		let newRefNodeId = null;

		// Check whether there is a focused hierarchy node
		const focusedHierarchyNode = selectionManager.getFocusedHierarchyNode();
		if (
			focusedHierarchyNode &&
			focusedHierarchyNode.documentReference &&
			focusedHierarchyNode.documentReference.sourceNodeId
		) {
			let documentElement;
			if (!focusedHierarchyNode.documentReference.traversalRootNodeId) {
				const documentNode = documentsManager.getDocumentNode(
					focusedHierarchyNode.documentReference.documentId
				);
				if (documentNode) {
					documentElement = documentNode.documentElement;
				}
			}
			if (
				!documentElement ||
				!evaluateXPathToBoolean(
					xq`fonto:dita-class(., "map/map")`,
					documentElement,
					readOnlyBlueprint
				)
			) {
				newRefNodeId =
					focusedHierarchyNode.documentReference.sourceNodeId;
			}
		}

		if (!newRefNodeId) {
			let ancestor = selectionManager.getCommonAncestorContainer();
			while (ancestor) {
				const ancestorNodeId = getNodeId(ancestor);

				// Check if ancestor is itself a topicref or map (then use that)
				if (
					evaluateXPathToBoolean(
						xq`fonto:dita-class(., "map/topicref") or fonto:dita-class(., "map/map")`,
						ancestor,
						readOnlyBlueprint
					)
				) {
					newRefNodeId = ancestorNodeId;
					ancestor = null;
				} else {
					// Check if ancestor is the traversal root node of a document hierarchy node (use its sourceNodeId)
					// eslint-disable-next-line no-loop-func
					const hierarchyNodeForTraversalRootNode =
						documentsHierarchy.find(function (node) {
							return (
								node.documentReference &&
								node.documentReference.traversalRootNodeId ===
									ancestorNodeId
							);
						});
					if (hierarchyNodeForTraversalRootNode) {
						newRefNodeId =
							hierarchyNodeForTraversalRootNode.documentReference
								.sourceNodeId;
						ancestor = null;
					} else {
						ancestor = ancestor.parentNode;
					}
				}
			}
		}

		if (!newRefNodeId && selectionManager.focusedDocumentId) {
			const hierarchyNodeForFocusedDocument = documentsHierarchy.find(
				function (node) {
					return (
						node.documentReference &&
						node.documentReference.documentId ===
							selectionManager.focusedDocumentId
					);
				}
			);
			if (hierarchyNodeForFocusedDocument) {
				newRefNodeId =
					hierarchyNodeForFocusedDocument.documentReference
						.sourceNodeId;
			}
		}

		setRefNodeId(newRefNodeId);
		const newRefNode = documentsManager.getNodeById(newRefNodeId);
		setRefElementName(
			newRefNode
				? evaluateXPathToString(
						xq`./name()`,
						newRefNode,
						readOnlyBlueprint
				  )
				: ''
		);
		setIsContainerOrPlaceholder(
			newRefNode
				? evaluateXPathToBoolean(
						xq`not(@href)`,
						newRefNode,
						readOnlyBlueprint
				  )
				: ''
		);
	}, [selectionNode]);

	const wrapInMenu = (contents) => (
		<Menu>
			{contents.map((content, index) => (
				<MenuGroup
					key={index}
					heading={
						index === 0
							? bookmapElementLabels[refElementName] &&
							  bookmapElementLabels[refElementName].markupLabel
								? uppercaseFirstLetter(
										bookmapElementLabels[refElementName]
											.markupLabel
								  )
								: null
							: null
					}
				>
					{content}
				</MenuGroup>
			))}
			<MenuGroup>
				<FxOperationMenuItem
					icon="sitemap"
					label="View the structure panel"
					operationData={{
						tabId: 'structure',
						disableWhenAlreadyOpen: true,
					}}
					operationName="open-sidebar-tab"
					tooltipContent="Document structure"
				/>
			</MenuGroup>
		</Menu>
	);

	if (refElementName === 'bookmap') {
		return wrapInMenu([
			<FxOperationMenuItem
				operationName=":contextual-insert-frontmatter"
				operationData={{ contextNodeId: refNodeId }}
			/>,
			<>
				{getSubMenuForAlternativeInsertRefElement(
					refNodeId,
					'chapter',
					'container',
					'bookmap'
				)}
				{getSubMenuForAlternativeInsertRefElement(
					refNodeId,
					'part',
					'container',
					'bookmap'
				)}
			</>,
			<>
				{getSubMenuForAlternativeInsertRefElement(
					refNodeId,
					'appendices',
					'container',
					'bookmap'
				)}
				{getSubMenuForAlternativeInsertRefElement(
					refNodeId,
					'appendix',
					'container',
					'bookmap'
				)}
			</>,
			<FxOperationMenuItem
				operationName=":contextual-insert-backmatter"
				operationData={{ contextNodeId: refNodeId }}
			/>,
		]);
	}
	if (refElementName === 'frontmatter') {
		return wrapInMenu([
			<>
				{getSubMenuForRefElement(
					refNodeId,
					'bookabstract',
					'frontmatter',
					'placeholder'
				)}
				<FxOperationMenuItem
					operationName=":contextual-insert-booklists"
					operationData={{ contextNodeId: refNodeId }}
				/>
				{getSubMenuForRefElement(
					refNodeId,
					'colophon',
					'frontmatter',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'dedication',
					'frontmatter',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'draftintro',
					'frontmatter',
					'container'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'notices',
					'frontmatter',
					'container'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'preface',
					'frontmatter',
					'container'
				)}
				{createTopicSubMenu(refNodeId)}
			</>,
		]);
	}
	if (refElementName === 'booklists') {
		return wrapInMenu([
			<>
				{getSubMenuForRefElement(
					refNodeId,
					'abbrevlist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'bibliolist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'booklist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'figurelist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'glossarylist',
					'booklists',
					'container'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'indexlist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'tablelist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'trademarklist',
					'booklists',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'toc',
					'booklists',
					'placeholder'
				)}
			</>,
		]);
	}
	if (refElementName === 'part') {
		return wrapInMenu([
			<>
				{getSubMenuForRefElement(
					refNodeId,
					'chapter',
					'part',
					'container'
				)}
				{createTopicSubMenu(refNodeId)}
			</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName=":contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>,
		]);
	}
	if (refElementName === 'appendices') {
		return wrapInMenu([
			<>
				{getSubMenuForRefElement(
					refNodeId,
					'appendix',
					'appendices',
					'container'
				)}
			</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName=":contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>,
		]);
	}
	if (refElementName === 'backmatter') {
		return wrapInMenu([
			<>
				{getSubMenuForRefElement(
					refNodeId,
					'amendments',
					'backmatter',
					'placeholder'
				)}
				<FxOperationMenuItem
					operationName=":contextual-insert-booklists"
					operationData={{ contextNodeId: refNodeId }}
				/>
				{getSubMenuForRefElement(
					refNodeId,
					'colophon',
					'backmatter',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'dedication',
					'backmatter',
					'placeholder'
				)}
				{getSubMenuForRefElement(
					refNodeId,
					'notices',
					'backmatter',
					'container'
				)}
				{createTopicSubMenu(refNodeId)}
			</>,
		]);
	}
	if (
		[
			'appendix',
			'chapter',
			'draftintro',
			'glossarylist',
			'notices',
			'preface',
		].includes(refElementName)
	) {
		return wrapInMenu([
			<>
				<FxOperationMenuItem
					operationName=":contextual-insert-topicref--from-template"
					operationData={{ contextNodeId: refNodeId }}
				/>
				<FxOperationMenuItem
					operationName=":contextual-insert-topicref--to-existing-document"
					operationData={{ contextNodeId: refNodeId }}
				/>
			</>,
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName=":contextual-convert-to-container"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>,
		]);
	}
	if (
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
			'trademarklist',
		].includes(refElementName)
	) {
		return wrapInMenu([
			<>
				{!isContainerOrPlaceholder && (
					<FxOperationMenuItem
						operationName=":contextual-convert-to-placeholder"
						operationData={{ contextNodeId: refNodeId }}
					/>
				)}
				{isContainerOrPlaceholder && (
					<>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--from-template"
							operationData={{ contextNodeId: refNodeId }}
						/>
						<FxOperationMenuItem
							operationName=":contextual-insert-@href--to-existing-document"
							operationData={{ contextNodeId: refNodeId }}
						/>
					</>
				)}
			</>,
		]);
	}
	return wrapInMenu([
		<>
			<FxOperationMenuItem operationName="insert-topicref--from-template" />
			<FxOperationMenuItem operationName="insert-topicref--to-existing-document" />
		</>,
	]);
};

export default InsertTopicMenu;