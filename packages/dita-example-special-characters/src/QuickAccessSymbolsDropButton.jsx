import React from 'react';

import { Block, ButtonWithDrop, Drop } from 'fds/components';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton.jsx';
import SymbolsGrid from 'fontoxml-special-characters/src/SymbolsGrid.jsx';

function renderDrop({ closeDrop }) {
	return (
		<Drop>
			<SymbolsGrid
				characterSet="quick-access-currency-symbols"
				columns={6}
				onItemClick={closeDrop}
			/>

			<Block paddingSize="s">
				<FxOperationButton
					label="All symbols"
					operationName="default-special-character-insert"
				/>
			</Block>
		</Drop>
	);
}

export default function QuickAccessSymbolsDropButton() {
	return <ButtonWithDrop icon="omega" label="Symbol" renderDrop={renderDrop} />;
}
