import type { FC } from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
} from 'fontoxml-design-system/src/components';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import FxOperationsSplitButtonWithDropMenu from 'fontoxml-fx/src/FxOperationsSplitButtonWithDropMenu';
import t from 'fontoxml-localization/src/t';

const TaskToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<ButtonWithDrop
					label={t('Task')}
					renderDrop={() => (
						<Drop>
							<Menu>
								<FxOperationMenuItem operationName=":insert-prereq" />
								<FxOperationMenuItem operationName=":insert-context" />
								<FxOperationMenuItem operationName=":insert-steps" />
								<FxOperationMenuItem operationName=":insert-steps-unordered" />
								<FxOperationMenuItem operationName=":insert-steps-informal" />
								<FxOperationMenuItem operationName=":insert-result" />
								<FxOperationMenuItem operationName=":insert-tasktroubleshooting" />
								<FxOperationMenuItem operationName=":insert-example--task" />
								<FxOperationMenuItem operationName=":insert-postreq" />
							</Menu>
						</Drop>
					)}
				/>
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-stepsection" />
				<FxOperationButton operationName=":insert-step" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-note--task" />
				<FxOperationsSplitButtonWithDropMenu
					operations={[
						{ operationName: ':insert-info' },
						{ operationName: ':insert-tutorialinfo' },
					]}
				/>
				<FxOperationButton operationName=":insert-stepxmp" />
				<FxOperationButton operationName=":insert-choices" />
				<FxOperationButton operationName=":insert-choicetable" />
				<FxOperationButton operationName=":insert-substeps" />
				<FxOperationButton operationName=":insert-stepresult" />
				<FxOperationButton operationName=":insert-steptroubleshooting" />
			</MastheadToolbarButtons>
		</MastheadToolbar>
	);
};

export default TaskToolbar;
