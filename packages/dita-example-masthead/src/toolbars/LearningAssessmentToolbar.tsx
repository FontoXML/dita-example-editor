import { MastheadToolbar, MastheadToolbarButtons } from 'fds/components';
import * as React from 'react';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';

const LearningAssessmentToolbar = () => (
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

export default LearningAssessmentToolbar;
