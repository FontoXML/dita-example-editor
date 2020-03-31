import React from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
	MenuItemWithDrop
} from 'fds/components';

import FxMultiOperationsMenuItem from 'fontoxml-fx/src/FxMultiOperationsMenuItem.jsx';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton.jsx';
import FxOperationInsertTableMenu from 'fontoxml-fx/src/FxOperationInsertTableMenu.jsx';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem.jsx';
import FxOperationsSplitButtonWithDropMenu from 'fontoxml-fx/src/FxOperationsSplitButtonWithDropMenu.jsx';

import InsertTopicMenu from '../menus/InsertTopicMenu.jsx'

const StructureToolbar = () => (
	<MastheadToolbar>
		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Insert topic"
				renderDrop={() => (
					<Drop>
						<InsertTopicMenu />
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Table"
				icon="table"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<MenuItemWithDrop
									label="Generic table"
									renderDrop={() => (
										<Drop>
											<FxOperationInsertTableMenu operationName=":insert-cals-table" />
										</Drop>
									)}
								/>

								<MenuItemWithDrop
									label="Simple table"
									renderDrop={() => (
										<Drop>
											<FxOperationInsertTableMenu operationName="simpletable-insert" />
										</Drop>
									)}
								/>

								<MenuItemWithDrop
									label="Simple table in figure"
									renderDrop={() => (
										<Drop>
											<FxOperationInsertTableMenu operationName=":insert-fig.simpletable" />
										</Drop>
									)}
								/>
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-dl" />
								<FxOperationMenuItem operationName=":insert-parml" />
								<FxOperationMenuItem operationName=":insert-properties" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<FxOperationsSplitButtonWithDropMenu
				operations={[
					{ operationName: ':insert-dl' },
					{ operationName: ':insert-parml' },
					{ operationName: ':insert-properties' }
				]}
			/>

			<FxOperationsSplitButtonWithDropMenu
				operations={[
					{ operationName: ':insert-fig.image' },
					{ operationName: ':insert-image' }
				]}
				tooltipContent="Any of the below"
			/>

			<FxOperationsSplitButtonWithDropMenu
				operations={[
					{ operationName: ':insert-equation-figure' },
					{ operationName: ':insert-equation-block' },
					{ operationName: ':insert-equation-inline' }
				]}
				tooltipContent="Any of the below"
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Intro"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName=":insert-shortdesc" />
							<FxOperationMenuItem operationName=":insert-abstract" />
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Section"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-section" />
								<FxOperationMenuItem operationName=":insert-example" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-refsyn" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<ButtonWithDrop
				label="Group"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName=":insert-div" />
							<FxMultiOperationsMenuItem
								operations={[
									{ operationName: ':insert-bodydiv' },
									{ operationName: ':insert-conbodydiv' },
									{ operationName: ':insert-refbodydiv' }
								]}
							/>
							<FxOperationMenuItem operationName=":insert-sectiondiv" />
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				icon="sticky-note-o"
				label="Note"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem
									label="Generic note"
									operationName=":insert-note--task"
								/>
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-note[@type=attention]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=caution]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=danger]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=fastpath]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=important]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=notice]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=remember]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=restriction]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=tip]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=warning]--task" />
								<FxOperationMenuItem operationName=":insert-note[@type=other]--task" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName="insert-note[@conref]" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<FxOperationButton operationName=":insert-lq" />
			<FxOperationButton operationName=":insert-fn" />
		</MastheadToolbarButtons>

		<MastheadToolbarButtons>
			<ButtonWithDrop
				label="Related links"
				renderDrop={() => (
					<Drop>
						<Menu>
							<FxOperationMenuItem operationName=":insert-link[@format=html]" />
							<FxOperationMenuItem operationName=":insert-link[@format=dita]" />
						</Menu>
					</Drop>
				)}
			/>
		</MastheadToolbarButtons>
	</MastheadToolbar>
);

export default StructureToolbar;
