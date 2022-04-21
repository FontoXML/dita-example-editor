import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
	MenuItemWithDrop,
} from 'fds/components';
import * as React from 'react';

import FxMultiOperationsMenuItem from 'fontoxml-fx/src/FxMultiOperationsMenuItem';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';

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
									{ operationName: ':insert-plentry--above' },
									{ operationName: ':insert-chrow--above' },
									{
										operationName:
											':insert-property--above',
									},
								]}
							/>

							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'row-after-insert' },
									{ operationName: ':insert-dlentry--below' },
									{ operationName: ':insert-plentry--below' },
									{ operationName: ':insert-chrow--below' },
									{
										operationName:
											':insert-property--below',
									},
								]}
							/>

							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'row-delete' },
									{ operationName: ':delete-dlentry-dlhead' },
									{ operationName: ':delete-plentry' },
									{ operationName: ':delete-chrow-chhead' },
									{
										operationName:
											':delete-property-prophead',
									},
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
							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: 'column-delete' },
									{
										operationName:
											':delete-properties-column',
									},
								]}
							/>
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
													{
														operationName:
															'increase-header-row-count',
													},
													{
														operationName:
															':insert-dlhead',
													},
													{
														operationName:
															':insert-chhead',
													},
													{
														operationName:
															':insert-prophead',
													},
												]}
											/>

											<FxMultiOperationsMenuItem
												operations={[
													{
														operationName:
															'decrease-header-row-count',
													},
													{
														operationName:
															':delete-dlhead',
													},
													{
														operationName:
															':delete-chhead',
													},
													{
														operationName:
															':delete-prophead',
													},
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
