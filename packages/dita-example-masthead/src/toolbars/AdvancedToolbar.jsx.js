import React from 'react';

import {
	Drop,
	ButtonWithDrop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup
} from 'fds/components';

import FxOperationButton from 'fontoxml-fx/FxOperationButton.jsx';
import FxOperationMenuItem from 'fontoxml-fx/FxOperationMenuItem.jsx';

const StructureToolbar = () => (
	<MastheadToolbar>
		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Alternate title"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName=":insert-navtitle" />
							<FxOperationMenuItem operationName=":insert-searchtitle" />
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton operationName=":insert-term" />

			<FxOperationButton operationName=":insert-keyword" />
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				icon="exclamation-circle"
				label="Hazard statement"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-hazardstatement" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=attention]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=caution]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=danger]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=fastpath]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=important]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=notice]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=remember]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=restriction]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=tip]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=warning]" />
								<FxOperationMenuItem operationName=":insert-hazardstatement[@type=other]" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default StructureToolbar;
