import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
} from 'fds/components';
import React, { useMemo } from 'react';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import useXPath from 'fontoxml-fx/src/useXPath';
import ReturnTypes from 'fontoxml-selectors/src/ReturnTypes';
import xq from 'fontoxml-selectors/src/xq';

const QuestionToolbar = () => {
	const matching = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::lcMatching2`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const multipleOrSingleSelect = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::*[self::lcMultipleSelect2 or self::lcSingleSelect2]`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const openQuestion = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::lcOpenQuestion2`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const sequencing = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::lcSequencing2`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const trueFalse = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::lcTrueFalse2`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);

	const xpathQueryResultByName = useMemo(
		() => ({
			matching,
			multipleOrSingleSelect,
			openQuestion,
			sequencing,
			trueFalse,
		}),
		[matching, multipleOrSingleSelect, openQuestion, sequencing, trueFalse]
	);

	return (
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
	);
};

export default QuestionToolbar;
