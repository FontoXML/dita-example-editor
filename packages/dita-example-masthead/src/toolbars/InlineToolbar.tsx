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
import FxOperationsSplitButtonWithDropMenu from 'fontoxml-fx/src/FxOperationsSplitButtonWithDropMenu';

const InlineToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<ButtonWithDrop
					label="Formatting"
					renderDrop={() => (
						<Drop>
							<Menu>
								<MenuGroup>
									<FxOperationMenuItem operationName=":toggle-b" />
									<FxOperationMenuItem operationName=":toggle-i" />
									<FxOperationMenuItem operationName=":toggle-u" />
									<FxOperationMenuItem operationName=":toggle-line-through" />
								</MenuGroup>

								<MenuGroup>
									<FxOperationMenuItem operationName=":toggle-overline" />
									<FxOperationMenuItem operationName=":toggle-tt" />
								</MenuGroup>
							</Menu>
						</Drop>
					)}
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":toggle-sub" />
				<FxOperationButton operationName=":toggle-sup" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":toggle-ph" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":toggle-q" />
				<ButtonWithDrop
					icon="trademark"
					label="Trademark"
					renderDrop={() => (
						<Drop>
							<Menu>
								<MenuGroup>
									<FxOperationMenuItem operationName=":insert-tm[@tmtype=reg]" />
								</MenuGroup>

								<MenuGroup>
									<FxOperationMenuItem operationName=":insert-tm[@tmtype=tm]" />
									<FxOperationMenuItem operationName=":insert-tm[@tmtype=service]" />
								</MenuGroup>
							</Menu>
						</Drop>
					)}
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<ButtonWithDrop
					icon="link"
					label="Link"
					renderDrop={() => (
						<Drop>
							<Menu>
								<FxOperationMenuItem operationName=":insert-xref[@format=html]" />
								<FxOperationMenuItem operationName=":insert-xref[@format=dita]" />
							</Menu>
						</Drop>
					)}
				/>

				<FxOperationsSplitButtonWithDropMenu
					operations={[
						{ operationName: ':insert-image' },
						{ operationName: ':insert-fig.image' },
					]}
					tooltipContent="Any of the below"
				/>

				<FxOperationsSplitButtonWithDropMenu
					operations={[
						{ operationName: ':insert-equation-inline' },
						{ operationName: ':insert-equation-figure' },
						{ operationName: ':insert-equation-block' },
					]}
					tooltipContent="Any of the below"
				/>
			</MastheadToolbarButtons>
		</MastheadToolbar>
	);
};

export default InlineToolbar;
