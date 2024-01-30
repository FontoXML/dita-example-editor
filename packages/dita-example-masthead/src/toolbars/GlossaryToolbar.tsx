import type { FC } from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
} from 'fontoxml-design-system/src/components';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import t from 'fontoxml-localization/src/t';

const GlossaryToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-glossentry" />

				<FxOperationButton
					label={t('Sort entries')}
					operationName="glossentry-sort"
					tooltipContent="Sorts the entries in this group alphabetically by term."
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-glossdef" />
				<FxOperationButton operationName=":insert-glossUsage--in-glossentry" />
				<ButtonWithDrop
					label={t('Variation')}
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
};

export default GlossaryToolbar;
