import React from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup
} from 'fds/components';

import ContentQualityControls from 'fontoxml-content-quality/src/ContentQualityControls.jsx';
import DocumentHistoryShowChangesButton from 'fontoxml-document-history/src/DocumentHistoryShowChangesButton.jsx';

import FxMultiOperationsMenuItem from 'fontoxml-fx/src/FxMultiOperationsMenuItem.jsx';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton.jsx';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem.jsx';

const ToolsToolbar = () => (
	<MastheadToolbar>
		<MastheadToolbarButtons>
			<FxOperationButton operationName="toggle-display-mode-document" />

			<ButtonWithDrop
				icon="search"
				label="Zoom"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName="zoom-content-view-to-75%-75%" />
								<FxOperationMenuItem operationName="zoom-content-view-to-100%-100%" />
								<FxOperationMenuItem operationName="zoom-content-view-to-125%-125%" />
								<FxOperationMenuItem operationName="zoom-content-view-to-150%-150%" />
								<FxOperationMenuItem operationName="zoom-content-view-to-200%-200%" />
							</MenuGroup>

							<MenuGroup>
								<FxMultiOperationsMenuItem
									operations={[
										{
											operationName:
												'wide-canvas-content-view-to-150%-text-size-not-150%'
										},
										{
											operationName:
												'untoggle-wide-canvas-content-view-to-150%-text-size-not-150%'
										}
									]}
								/>
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				icon="edit"
				label="Track Changes"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'start-tracking-changes' },
									{
										operationName:
											'accept-all-changes-and-stop-tracking-changes'
									}
								]}
							/>
							<FxOperationMenuItem operationName="accept-all-changes" />
							<FxOperationMenuItem operationName="accept-all-changes-in-document" />
							<FxOperationMenuItem operationName="reject-all-changes" />
							<FxOperationMenuItem operationName="reject-all-changes-in-document" />
						</Menu>
					</Drop>
				)}
			/>

			<DocumentHistoryShowChangesButton />
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton operationName="toggle-spell-checker" />
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton
				icon="align-left fa-flip-vertical"
				label="Outline"
				operationData={{ tabId: 'structure' }}
				operationName="toggle-sidebar-tab"
				tooltipContent="Document outline"
			/>

			<FxOperationButton
				icon="code"
				label="Source"
				operationData={{ tabId: 'source' }}
				operationName="toggle-sidebar-tab"
				tooltipContent="XML source code"
			/>
		</MastheadToolbarButtons>
		<MastheadToolbarButtons>
			<ContentQualityControls />
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default ToolsToolbar;
