import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
} from 'fds/components';
import React from 'react';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';

const AdvancedToolbar = () => (
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

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Reference"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName=":insert-refsyn" />
							<FxOperationMenuItem operationName=":insert-properties" />
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="User interface"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-screen" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":toggle-wintitle" />
								<FxOperationMenuItem operationName=":toggle-shortcut" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-menucascade" />
								<FxOperationMenuItem operationName=":insert-uicontrol" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Programming"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-codeblock" />
								<FxOperationMenuItem operationName=":insert-parml" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":toggle-apiname" />
								<FxOperationMenuItem operationName=":toggle-codeph" />
								<FxOperationMenuItem operationName=":toggle-option" />
								<FxOperationMenuItem operationName=":toggle-parmname" />
								<FxOperationMenuItem operationName=":toggle-synph" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default AdvancedToolbar;
