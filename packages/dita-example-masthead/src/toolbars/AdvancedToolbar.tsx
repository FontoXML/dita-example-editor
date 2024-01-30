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

const AdvancedToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<ButtonWithDrop
					label={t('Alternate title')}
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
					label={t('Hazard statement')}
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
					label={t('Reference')}
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
					label={t('User interface')}
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
					label={t('Programming')}
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
};

export default AdvancedToolbar;
