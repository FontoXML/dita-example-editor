import {
	ButtonWithDrop,
	Drop,
	MastheadToolbar,
	MastheadToolbarButtons,
	Menu,
	MenuGroup,
	MenuItemWithDrop,
} from 'fds/components';
import React, { useMemo } from 'react';

import FxOperationButton from 'fontoxml-fx/src/FxOperationButton';
import FxOperationMenuItem from 'fontoxml-fx/src/FxOperationMenuItem';
import useXPath from 'fontoxml-fx/src/useXPath';
import ReturnTypes from 'fontoxml-selectors/src/ReturnTypes';
import xq from 'fontoxml-selectors/src/xq';

const renderNeedsAnalysisDrop = () => (
	<Drop>
		<Menu>
			<MenuGroup>
				<FxOperationMenuItem operationName=":insert-lcNeedsAnalysis" />
			</MenuGroup>

			<MenuItemWithDrop
				label="Organizational"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcOrganizational" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcGeneralDescription" />
								<FxOperationMenuItem operationName=":insert-lcGoals" />
								<FxOperationMenuItem operationName=":insert-lcNeeds" />
								<FxOperationMenuItem operationName=":insert-lcValues" />
								<FxOperationMenuItem operationName=":insert-lcOrgConstraints" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<MenuItemWithDrop
				label="Plan audience"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcPlanAudience" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcGeneralDescription" />
								<FxOperationMenuItem operationName=":insert-lcEdLevel" />
								<FxOperationMenuItem operationName=":insert-lcAge" />
								<FxOperationMenuItem operationName=":insert-lcBackground" />
								<FxOperationMenuItem operationName=":insert-lcSkills" />
								<FxOperationMenuItem operationName=":insert-lcKnowledge" />
								<FxOperationMenuItem operationName=":insert-lcMotivation" />
								<FxOperationMenuItem operationName=":insert-lcSpecChars" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<MenuItemWithDrop
				label="Work environment"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcWorkEnv" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcWorkEnvDescription" />
								<FxOperationMenuItem operationName=":insert-lcPlanResources" />
								<FxOperationMenuItem operationName=":insert-lcProcesses" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>

			<MenuItemWithDrop
				label="Task"
				renderDrop={() => (
					<Drop>
						<Menu>
							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcTask" />
							</MenuGroup>

							<MenuGroup>
								<FxOperationMenuItem operationName=":insert-lcTaskItem" />
								<FxOperationMenuItem operationName=":insert-lcKnowledge" />
								<FxOperationMenuItem operationName=":insert-lcSkills" />
								<FxOperationMenuItem operationName=":insert-lcAttitude" />
							</MenuGroup>
						</Menu>
					</Drop>
				)}
			/>
		</Menu>
	</Drop>
);

const LearningTrainingToolbar = () => {
	const learningAssessment = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::learningAssessment`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const learningContent = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::learningContent`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const learningOverview = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::learningOverview`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const learningSummary = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::learningSummary`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);
	const learningPlan = useXPath(
		xq`fonto:selection-common-ancestor()/ancestor-or-self::learningPlan`,
		null,
		{
			expectedResultType: ReturnTypes.BOOLEAN,
		}
	);

	const xpathQueryResultByName = useMemo(
		() => ({
			learningAssessment,
			learningContent,
			learningOverview,
			learningSummary,
			learningPlan,
		}),
		[
			learningAssessment,
			learningContent,
			learningOverview,
			learningSummary,
			learningPlan,
		]
	);

	return (
		<MastheadToolbar>
			{xpathQueryResultByName.learningAssessment && (
				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcIntro" />
					<FxOperationButton operationName=":insert-lcObjectives" />
					<FxOperationButton operationName=":insert-lcDuration" />
				</MastheadToolbarButtons>
			)}
			{xpathQueryResultByName.learningAssessment && (
				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcSummary" />
				</MastheadToolbarButtons>
			)}

			{xpathQueryResultByName.learningContent && (
				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcIntro" />
					<FxOperationButton operationName=":insert-lcDuration" />
					<FxOperationButton operationName=":insert-lcObjectives" />
					<FxOperationButton operationName=":insert-lcChallenge" />
					<FxOperationButton operationName=":insert-lcInstruction" />
				</MastheadToolbarButtons>
			)}

			{xpathQueryResultByName.learningOverview && (
				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcIntro" />
					<FxOperationButton operationName=":insert-lcAudience" />
					<FxOperationButton operationName=":insert-lcDuration" />
					<FxOperationButton operationName=":insert-lcPrereqs" />
					<FxOperationButton operationName=":insert-lcObjectives" />
					<FxOperationButton operationName=":insert-lcResources" />
				</MastheadToolbarButtons>
			)}

			{xpathQueryResultByName.learningSummary && (
				<MastheadToolbarButtons>
					<FxOperationButton operationName=":insert-lcSummary" />
					<FxOperationButton operationName=":insert-lcObjectives" />
					<FxOperationButton operationName=":insert-lcReview" />
					<FxOperationButton operationName=":insert-lcNextSteps" />
					<FxOperationButton operationName=":insert-lcResources" />
				</MastheadToolbarButtons>
			)}

			{xpathQueryResultByName.learningPlan && (
				<MastheadToolbarButtons>
					<ButtonWithDrop
						label="Project"
						renderDrop={() => (
							<Drop>
								<Menu>
									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcProject" />
									</MenuGroup>

									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcClient" />
										<FxOperationMenuItem operationName=":insert-lcPlanTitle" />
										<FxOperationMenuItem operationName=":insert-lcCIN" />
										<FxOperationMenuItem operationName=":insert-lcModDate" />
										<FxOperationMenuItem operationName=":insert-lcDelivDate" />
										<FxOperationMenuItem operationName=":insert-lcPlanSubject" />
										<FxOperationMenuItem operationName=":insert-lcPlanDescrip" />
										<FxOperationMenuItem operationName=":insert-lcPlanPrereqs" />
									</MenuGroup>
								</Menu>
							</Drop>
						)}
					/>
					<ButtonWithDrop
						label="Needs analysis"
						renderDrop={renderNeedsAnalysisDrop}
					/>
					<ButtonWithDrop
						label="Gap analysis"
						renderDrop={() => (
							<Drop>
								<Menu>
									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcGapAnalysis" />
										<FxOperationMenuItem operationName=":insert-lcGapItem" />
									</MenuGroup>

									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcPlanObjective" />
										<FxOperationMenuItem operationName=":insert-lcJtaItem" />
										<FxOperationMenuItem operationName=":insert-lcGapItemDelta" />
									</MenuGroup>
								</Menu>
							</Drop>
						)}
					/>
					<ButtonWithDrop
						label="Intervention"
						renderDrop={() => (
							<Drop>
								<Menu>
									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcIntervention" />
										<FxOperationMenuItem operationName=":insert-lcInterventionItem" />
									</MenuGroup>

									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcLearnStrat" />
										<FxOperationMenuItem operationName=":insert-lcPlanObjective" />
										<FxOperationMenuItem operationName=":insert-lcAssessment" />
										<FxOperationMenuItem operationName=":insert-lcDelivery" />
									</MenuGroup>
								</Menu>
							</Drop>
						)}
					/>
					<ButtonWithDrop
						label="Technical"
						renderDrop={() => (
							<Drop>
								<Menu>
									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcTechnical" />
									</MenuGroup>

									<MenuGroup>
										<FxOperationMenuItem operationName=":insert-lcLMS" />
										<FxOperationMenuItem operationName=":insert-lcNoLMS" />
										<FxOperationMenuItem operationName=":insert-lcHandouts" />
										<FxOperationMenuItem operationName=":insert-lcClassroom" />
										<FxOperationMenuItem operationName=":insert-lcOJT" />
										<FxOperationMenuItem operationName=":insert-lcConstraints" />
										<FxOperationMenuItem operationName=":insert-lcW3C" />
										<FxOperationMenuItem operationName=":insert-lcPlayers" />
										<FxOperationMenuItem operationName=":insert-lcGraphics" />
										<FxOperationMenuItem operationName=":insert-lcViewers" />
										<FxOperationMenuItem operationName=":insert-lcResolution" />
										<FxOperationMenuItem operationName=":insert-lcFileSizeLimitations" />
										<FxOperationMenuItem operationName=":insert-lcDownloadTime" />
										<FxOperationMenuItem operationName=":insert-lcSecurity" />
									</MenuGroup>
								</Menu>
							</Drop>
						)}
					/>
				</MastheadToolbarButtons>
			)}

			<MastheadToolbarButtons>
				<FxOperationButton operationName=":insert-lcInstructornote2" />
			</MastheadToolbarButtons>

			<MastheadToolbarButtons>
				<FxOperationButton operationName="insert-{question}--from-operation-browser" />
			</MastheadToolbarButtons>
		</MastheadToolbar>
	);
};

export default LearningTrainingToolbar;
