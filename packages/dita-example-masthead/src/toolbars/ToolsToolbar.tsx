import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
} from 'fds/components';
import React from 'react';

import FxMultiOperationsMenuItem from 'fontoxml-fx/src/FxMultiOperationsMenuItem';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';

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
												'wide-canvas-content-view-to-150%-text-size-not-150%',
										},
										{
											operationName:
												'untoggle-wide-canvas-content-view-to-150%-text-size-not-150%',
										},
									]}
								/>
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton operationName="toggle-spell-checker" />
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton
				icon="align-right icon-flip-vertical"
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
	</MastheadToolbar>
);

export default ToolsToolbar;
