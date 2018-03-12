import React from 'react';

import {
	Drop,
	ButtonWithDrop,
	MenuItemWithDrop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup
} from 'fds/components';

import FxOperationMenuItem from 'fontoxml-fx/FxOperationMenuItem.jsx';
import FxMultiOperationsMenuItem from 'fontoxml-fx/FxMultiOperationsMenuItem.jsx';

const TableToolbar = () => (
	<MastheadToolbar>
		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Row"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'row-insert' },
									{ operationName: ':insert-dlentry--above' },
									{ operationName: ':insert-chrow--above' }
								]}
							/>

							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'row-after-insert' },
									{ operationName: ':insert-dlentry--below' },
									{ operationName: ':insert-chrow--below' }
								]}
							/>

							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'row-delete' },
									{ operationName: ':delete-dlentry-dlhead' },
									{ operationName: ':delete-chrow-chhead' }
								]}
							/>
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Column"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName="column-insert" />
							<FxOperationMenuItem operationName="column-after-insert" />
							<FxOperationMenuItem operationName="column-delete" />
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Cell"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName="split-cell-into-rows" />
								<FxOperationMenuItem operationName="split-cell-into-columns" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName="merge-cell-right" />
								<FxOperationMenuItem operationName="merge-cell-left" />
								<FxOperationMenuItem operationName="merge-cell-above" />
								<FxOperationMenuItem operationName="merge-cell-below" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName="split-cell-completely" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Headers"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuItemWithDrop
								label="Rows"
								renderDrop={() => (
									<Drop>
										<Menu>
											<FxMultiOperationsMenuItem
												operations={[
													{ operationName: 'increase-header-row-count' },
													{ operationName: ':insert-dlhead' },
													{ operationName: ':insert-chhead' }
												]}
											/>

											<FxMultiOperationsMenuItem
												operations={[
													{ operationName: 'decrease-header-row-count' },
													{ operationName: ':delete-dlhead' },
													{ operationName: ':delete-chhead' }
												]}
											/>
										</Menu>
									</Drop>
								)}
							/>

							<MenuItemWithDrop
								label="Column"
								renderDrop={() => (
									<Drop>
										<Menu>
											<FxOperationMenuItem operationName=":set-table[@rowheader=firstcol]" />

											<FxOperationMenuItem operationName=":set-table[@rowheader=null]" />
										</Menu>
									</Drop>
								)}
							/>
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Borders"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName="add-table-borders" />
							<FxOperationMenuItem operationName="remove-table-borders" />

							<MenuItemWithDrop
								label="Cell border"
								renderDrop={() => (
									<Drop>
										<Menu>
											<MenuGroup>
												<FxOperationMenuItem
													label="All cell borders"
													operationName="cals-set-cell-border-all"
												/>
												<FxOperationMenuItem
													label="No cell borders"
													operationName="cals-set-cell-border-none"
												/>
											</MenuGroup>

											<MenuGroup>
												<FxOperationMenuItem operationName="cals-set-cell-border-top" />
												<FxOperationMenuItem operationName="cals-set-cell-border-bottom" />
												<FxOperationMenuItem operationName="cals-set-cell-border-left" />
												<FxOperationMenuItem operationName="cals-set-cell-border-right" />
											</MenuGroup>
										</Menu>
									</Drop>
								)}
							/>
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Cell alignment"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName="cals-set-cell-horizontal-alignment-left" />
								<FxOperationMenuItem operationName="cals-set-cell-horizontal-alignment-right" />
								<FxOperationMenuItem operationName="cals-set-cell-horizontal-alignment-center" />
								<FxOperationMenuItem operationName="cals-set-cell-horizontal-alignment-justify" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName="cals-set-cell-vertical-alignment-top" />
								<FxOperationMenuItem operationName="cals-set-cell-vertical-alignment-bottom" />
								<FxOperationMenuItem operationName="cals-set-cell-vertical-alignment-center" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default TableToolbar;
