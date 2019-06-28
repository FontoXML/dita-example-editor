import React from 'react';

import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu
} from 'fds/components';

import FxBooleanXPathQueryByNameFromSelection from 'fontoxml-fx/src/FxBooleanXPathQueryByNameFromSelection.jsx';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton.jsx';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem.jsx';

const QuestionToolbar = () => (
	<FxBooleanXPathQueryByNameFromSelection
		xpathQueryByName={{
			matching: 'ancestor-or-self::lcMatching2',
			multipleOrSingleSelect:
				'ancestor-or-self::*[self::lcMultipleSelect2 or self::lcSingleSelect2]',
			openQuestion: 'ancestor-or-self::lcOpenQuestion2',
			sequencing: 'ancestor-or-self::lcSequencing2',
			trueFalse: 'ancestor-or-self::lcTrueFalse2'
		}}
	>
		{({ xpathQueryResultByName }) => (
			<MastheadToolbar>
				<MastheadToolbarButtons>
					<FxOperationButton operationName="insert-{question}--from-operation-browser" />
				</MastheadToolbarButtons>

				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcInteractionLabel2" />
					<FxOperationButton operationName=":insert-image--in-lcAsset2" />
				</MastheadToolbarButtons>

				{xpathQueryResultByName.matching && (
					<MastheadToolbarButtons>
						<FxOperationButton operationName=":insert-lcMatchingHeader2" />
						<FxOperationButton operationName=":insert-lcMatchingPair2" />
						<ButtonWithDrop
							label="Pair feedback"
							renderDrop={() => (
								<Drop>
									<Menu>
										<FxOperationMenuItem operationName=":insert-lcFeedback2--in-lcMatchingPair2" />
										<FxOperationMenuItem operationName=":insert-lcFeedbackIncorrect2--in-lcMatchingPair2" />
										<FxOperationMenuItem operationName=":insert-lcFeedbackCorrect2--in-lcMatchingPair2" />
									</Menu>
								</Drop>
							)}
						/>
					</MastheadToolbarButtons>
				)}

				{xpathQueryResultByName.multipleOrSingleSelect && (
					<MastheadToolbarButtons>
						<FxOperationButton operationName=":insert-lcAnswerOption2" />
						<FxOperationButton operationName=":insert-lcFeedback2" />
					</MastheadToolbarButtons>
				)}

				{xpathQueryResultByName.openQuestion && (
					<MastheadToolbarButtons>
						<FxOperationButton operationName=":insert-lcOpenAnswer2" />
					</MastheadToolbarButtons>
				)}

				{xpathQueryResultByName.sequencing && (
					<MastheadToolbarButtons>
						<FxOperationButton operationName=":insert-lcSequenceOption2" />
					</MastheadToolbarButtons>
				)}

				{xpathQueryResultByName.trueFalse && (
					<MastheadToolbarButtons>
						<FxOperationButton operationName=":insert-lcFeedback2" />
					</MastheadToolbarButtons>
				)}

				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcFeedbackIncorrect2" />
					<FxOperationButton operationName=":insert-lcFeedbackCorrect2" />
				</MastheadToolbarButtons>
			</MastheadToolbar>
		)}
	</FxBooleanXPathQueryByNameFromSelection>
);

export default QuestionToolbar;
