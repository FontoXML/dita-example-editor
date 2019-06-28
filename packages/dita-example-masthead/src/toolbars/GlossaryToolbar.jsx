import React from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup
} from 'fds/components';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton.jsx';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem.jsx';

const GlossaryToolbar = () => (
	<MastheadToolbar>
		<MastheadToolbarButtons>
			<FxOperationButton operationName=":insert-glossentry" />

			<FxOperationButton
				label="Sort entries"
				operationName="glossentry-sort"
				tooltipContent="Sorts the entries in this group alphabetically by term."
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<FxOperationButton operationName=":insert-glossdef" />
			<FxOperationButton operationName=":insert-glossUsage--in-glossentry" />
			<ButtonWithDrop
				label="Variation"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-glossAbbreviation" />
								<FxOperationMenuItem operationName=":insert-glossAcronym" />
								<FxOperationMenuItem operationName=":insert-glossShortForm" />
								<FxOperationMenuItem operationName=":insert-glossSynonym" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-glossUsage--in-glossAlt" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default GlossaryToolbar;
