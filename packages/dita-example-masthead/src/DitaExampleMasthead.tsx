import { Flex } from 'fds/components';
import React from 'react';

import FindAndReplaceDropButton from 'fontoxml-find-and-replace/src/FindAndReplaceDropButton';
import FxBooleanXPathQueryByNameFromSelection from 'fontoxml-fx/src/FxBooleanXPathQueryByNameFromSelection';
import FxEditorMasthead from 'fontoxml-fx/src/FxEditorMasthead';
import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxSaveButton from 'fontoxml-fx/src/FxSaveButton';
import xq from 'fontoxml-selectors/src/xq';
import TableToolbar from 'fontoxml-table-flow/src/TableToolbar';

import AdvancedToolbar from './toolbars/AdvancedToolbar';
import GlossaryToolbar from './toolbars/GlossaryToolbar';
import InlineToolbar from './toolbars/InlineToolbar';
import LearningTrainingToolbar from './toolbars/LearningTrainingToolbar';
import QuestionToolbar from './toolbars/QuestionToolbar';
import StartToolbar from './toolbars/StartToolbar';
import StructureToolbar from './toolbars/StructureToolbar';
import TaskToolbar from './toolbars/TaskToolbar';
import ToolsToolbar from './toolbars/ToolsToolbar';

const labels = {
	matching: 'Matching question',
	multipleSelect: 'Multiple choice',
	openQuestion: 'Open question',
	sequencing: 'Sequencing question',
	singleSelect: 'Single choice',
	trueFalse: 'True/false choice',
};

const getQuestionLabel = (result) =>
	Object.keys(result).reduce((label, type) => {
		if (result[type] && labels[type]) {
			return labels[type];
		}
		return label;
	}, 'Question');

const tabs = (result) => [
	{ id: 'start', label: 'Start', content: <StartToolbar /> },
	{ id: 'structure', label: 'Structure', content: <StructureToolbar /> },
	{ id: 'inline', label: 'Inline', content: <InlineToolbar /> },
	{
		id: 'table',
		label: 'Table',
		isVisibleTabQuery: xq`ancestor-or-self::*[self::table or self::simpletable or self::dl or self::parml or self::properties or self::choicetable]`,
		isHighlightedTab: true,
		content: <TableToolbar />,
	},
	{
		id: 'task',
		label: 'Task',
		isVisibleTabQuery: xq`ancestor-or-self::task`,
		isHighlightedTab: true,
		content: <TaskToolbar />,
	},
	{
		id: 'glossary',
		label: 'Glossary',
		isVisibleTabQuery: xq`ancestor-or-self::glossgroup`,
		isHighlightedTab: true,
		content: <GlossaryToolbar />,
	},
	{
		id: 'learning',
		label: 'Learning & training',
		isVisibleTabQuery: xq`ancestor-or-self::*[self::learningAssessment or self::learningPlan or self::learningOverview or self::learningSummary or self::learningContent]`,
		isHighlightedTab: true,
		content: <LearningTrainingToolbar />,
	},
	{
		id: 'question',
		label: getQuestionLabel(result),
		isVisibleTabQuery: xq`ancestor-or-self::*[self::lcMatching2 or self::lcMultipleSelect2 or self::lcOpenQuestion2 or self::lcSequencing2 or self::lcSingleSelect2 or self::lcTrueFalse2]`,
		isHighlightedTab: true,
		content: <QuestionToolbar />,
	},
	{ id: 'advanced', label: 'Advanced', content: <AdvancedToolbar /> },
	{ id: 'tools', label: 'Tools', content: <ToolsToolbar /> },
];

export default function DitaExampleMasthead() {
	return (
		<FxBooleanXPathQueryByNameFromSelection
			xpathQueryByName={{
				matching: xq`ancestor-or-self::lcMatching2`,
				multipleSelect: xq`ancestor-or-self::lcMultipleSelect2`,
				openQuestion: xq`ancestor-or-self::lcOpenQuestion2`,
				sequencing: xq`ancestor-or-self::lcSequencing2`,
				singleSelect: xq`ancestor-or-self::lcSingleSelect2`,
				trueFalse: xq`ancestor-or-self::lcTrueFalse2`,
			}}
		>
			{({ xpathQueryResultByName }) => (
				<FxEditorMasthead
					quickAccessButtons={
						<Flex flexDirection="row" flex="none">
							<FxOperationButton label="" operationName="undo" />
							<FxOperationButton label="" operationName="redo" />

							<FxOperationButton
								label=""
								operationName="convert-range-to-plain-text"
							/>

							<FxSaveButton />
						</Flex>
					}
					mastheadAlignRightContent={<FindAndReplaceDropButton />}
					tabs={tabs(xpathQueryResultByName)}
				/>
			)}
		</FxBooleanXPathQueryByNameFromSelection>
	);
}