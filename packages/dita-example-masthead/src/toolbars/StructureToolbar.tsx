import type { FC } from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
	MenuItemWithDrop,
} from 'fontoxml-design-system/src/components';
import FxMultiOperationsMenuItem from 'fontoxml-fx/src/FxMultiOperationsMenuItem';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationInsertTableMenu from 'fontoxml-fx/src/FxOperationInsertTableMenu';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import FxOperationsSplitButtonWithDropMenu from 'fontoxml-fx/src/FxOperationsSplitButtonWithDropMenu';
import t from 'fontoxml-localization/src/t.js';

import InsertTopicMenu from '../menus/InsertTopicMenu.jsx';

const StructureToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<ButtonWithDrop
					label={t('Insert topic')}
					renderDrop={() => (
						<Drop>
							<InsertTopicMenu />
						</Drop>
					)}
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<ButtonWithDrop
					label={t('Table')}
					icon="table"
					renderDrop={() => (
						<Drop>
							<Menu>
								<MenuGroup>
									<MenuItemWithDrop
										label={t('Generic table')}
										renderDrop={() => (
											<Drop>
												<FxOperationInsertTableMenu operationName=":insert-cals-table" />
											</Drop>
										)}
									/>

									<MenuItemWithDrop
										label={t('Simple table')}
										renderDrop={() => (
											<Drop>
												<FxOperationInsertTableMenu operationName="simpletable-insert" />
											</Drop>
										)}
									/>

									<MenuItemWithDrop
										label={t('Simple table in figure')}
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
						{ operationName: ':insert-fig.image' },
						{ operationName: ':insert-image' },
					]}
					tooltipContent="Any of the below"
				/>

				<FxOperationsSplitButtonWithDropMenu
					operations={[
						{ operationName: ':insert-equation-figure' },
						{ operationName: ':insert-equation-block' },
						{ operationName: ':insert-equation-inline' },
					]}
					tooltipContent="Any of the below"
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<ButtonWithDrop
					label={t('Intro')}
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
					label={t('Section')}
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
					label={t('Group')}
					renderDrop={() => (
						<Drop>
							<Menu>
								<FxOperationMenuItem operationName=":insert-div" />
								<FxMultiOperationsMenuItem
									operations={[
										{ operationName: ':insert-bodydiv' },
										{ operationName: ':insert-conbodydiv' },
										{ operationName: ':insert-refbodydiv' },
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
					label={t('Note')}
					renderDrop={() => (
						<Drop>
							<Menu>
								<MenuGroup>
									<FxOperationMenuItem
										label={t('Generic note')}
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
									<FxOperationMenuItem operationName=":insert-note[@conref]" />
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
					label={t('Related links')}
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
};

export default StructureToolbar;
