import type { FC } from 'react';

import {
	MastheadToolbar,
	MastheadToolbarButtons,
} from 'fontoxml-design-system/src/components';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';

const LearningAssessmentToolbar: FC = () => {
	return (
		<MastheadToolbar>
			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-lcIntro" />
				<FxOperationButton operationName=":insert-lcObjectives" />
				<FxOperationButton operationName=":insert-lcDuration" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-lcSummary" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-lcInstructornote2" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName="insert-{question}--from-operation-browser" />
			</MastheadToolbarButtons>
		</MastheadToolbar>
	);
};

export default LearningAssessmentToolbar;
