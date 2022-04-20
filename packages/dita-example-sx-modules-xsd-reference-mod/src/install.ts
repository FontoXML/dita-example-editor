import addCustomMutation from 'fontoxml-base-flow/src/addCustomMutation';
import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import documentsManager from 'fontoxml-documents/src/documentsManager';
import addTransform from 'fontoxml-operations/src/addTransform';
import evaluateXPathToBoolean from 'fontoxml-selectors/src/evaluateXPathToBoolean';
import xq from 'fontoxml-selectors/src/xq';

import removePropertiesColumn from './api/removePropertiesColumnCustomMutation';

export default function install() {
	addCustomMutation('remove-properties-column', removePropertiesColumn);

	/**
	 * Prepares the `childNodeStructure` operation data for inserting a new row in a <properties>-like table.
	 * @param  {Object}     stepData
	 * @param  {NodeId}     stepData.tableNodeId
	 * @param  {string}     stepData.rowNodeName
	 * @param  {Object}     stepData.columns
	 * @param  {string[]}   stepData.columns.otherNodeNames
	 * @param  {string}     stepData.columns.currentNodeName
	 * @return {{ childNodeStructure: Stencil }}
	 */
	addTransform(
		'setChildNodeStructureForExistingColumns',
		function setChildNodeStructureForExistingColumns(stepData) {
			const tableNode = documentsManager.getNodeById(
				stepData.tableNodeId
			);
			if (!tableNode) {
				return stepData;
			}

			let isFirstCell = true;
			stepData.childNodeStructure = [stepData.rowNodeName];
			stepData.columns.forEach(function (column) {
				if (
					!evaluateXPathToBoolean(
						xq`child::*/child::*[name() = ${column.currentNodeName}]`,
						tableNode,
						readOnlyBlueprint
					)
				) {
					return;
				}

				if (
					column.otherNodeNames &&
					column.otherNodeNames.some((nodeName) =>
						evaluateXPathToBoolean(
							xq`child::*/child::*[name() = ${nodeName}]`,
							tableNode,
							readOnlyBlueprint
						)
					)
				) {
					return;
				}

				const cellNodeStructure = [column.currentNodeName];
				if (isFirstCell) {
					isFirstCell = false;
					cellNodeStructure.push([
						{ bindTo: 'selection', empty: true },
					]);
				}
				stepData.childNodeStructure.push(cellNodeStructure);
			});

			return stepData;
		}
	);
}
