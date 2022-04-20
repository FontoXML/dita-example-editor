import configureAsStructureViewItem from 'fontoxml-families/src/configureAsStructureViewItem';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations';
import configureProperties from 'fontoxml-families/src/configureProperties';
import registerNodeStatus from 'fontoxml-families/src/registerNodeStatus';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

// Operation names to create a child topic, either from template or reusing an existing topic;
const INSERT_TOPICREF_OPERATION_NAMES = [
	':contextual-insert-topicref--from-template',
	':contextual-insert-topicref--to-existing-document',
];

// The operation names used for moving or removing a topic. Notice that this array contains nested
// arrays, which determine the grouping that these operations are shown in.
const MOVE_TOPICREF_OPERATION_NAMES = [
	[
		'contextual-topicref-move-up',
		'contextual-topicref-move-down',
		'contextual-topicref-indent',
		'contextual-topicref-outdent',

		'contextual-topicref-move-to-top',
		'contextual-topicref-move-to-bottom',
	],
	['contextual-topicref-remove'],
];

// Helper function to convert a list of operations to objects the shape of ContextualOperation:
//   https://documentation.fontoxml.com/latest/contextualoperation-9316242986ab#properties
function formatContextualOperationListWithGroups(list) {
	return list.map((group) => ({
		contents: group.map((operation) => ({
			name: operation,
			hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu'],
		})),
	}));
}

export default function configureSxModule(sxModule: SxModule) {
	sxModule.markAsAddon();

	// Configure DITA elements that extend the map/topicref/topic classes to show up in
	// Fonto's Outline view.
	//
	// See also:
	//   https://documentation.fontoxml.com/latest/add-and-configure-document-outline-e4f7c8b3a049
	configureAsStructureViewItem(sxModule, xq`fonto:dita-class(., "map/map")`, {
		icon: 'folder-open-o',
		recursionQuery: xq`()`,
	});
	configureAsStructureViewItem(
		sxModule,
		xq`fonto:dita-class(., "map/topicref") and not(@href)`,
		{
			icon: 'folder-open-o',
			recursionQuery: xq`()`,
		}
	);
	configureAsStructureViewItem(sxModule, xq`self::topicgroup`, {
		icon: 'folder-open-o',
		recursionQuery: xq`()`,
	});
	configureAsStructureViewItem(sxModule, xq`self::topichead`, {
		icon: 'folder-open-o',
		recursionQuery: xq`()`,
	});
	configureAsStructureViewItem(sxModule, xq`self::glossgroup`, {
		icon: 'file-text-o',
		recursionQuery: xq`glossentry`,
	});
	configureAsStructureViewItem(
		sxModule,
		xq`fonto:dita-class(., "topic/topic")`,
		{
			icon: 'file-text-o',
		}
	);

	// Register the contextual operations with which a user can move topics up/down/left/right,
	// as well as insert child topics and so on.
	//
	// Using our own helper function `formatContextualOperationListWithGroups` to create the
	// ContextualOperation objects expected by this configuration, without spending a lot of words.
	//
	// See also:
	//   https://documentation.fontoxml.com/latest/configure-contextual-operations-4c67c3ab5da1
	//   https://documentation.fontoxml.com/latest/contextualoperation-9316242986ab#properties
	configureContextualOperations(
		sxModule,
		xq`fonto:dita-class(., "map/map")`,
		formatContextualOperationListWithGroups([
			INSERT_TOPICREF_OPERATION_NAMES,
		]),
		-3
	);
	configureContextualOperations(
		sxModule,
		xq`fonto:dita-class(., "map/topicref")`,
		formatContextualOperationListWithGroups([
			INSERT_TOPICREF_OPERATION_NAMES,
			...MOVE_TOPICREF_OPERATION_NAMES,
		]),
		-3
	);
	configureContextualOperations(
		sxModule,
		xq`self::mapref`,
		formatContextualOperationListWithGroups(MOVE_TOPICREF_OPERATION_NAMES),
		-2
	);

	// Register node status queries, which help users identify Outline items with one status or another.
	// The node statuses are then associated with any node via the `statusQuery` option, which references
	// the identifier given to a node status.
	//
	// See also:
	//   https://documentation.fontoxml.com/latest/registernodestatus-dc8b1cd71d0e
	//
	// The simplest option is to only specify a label to use with a certain id;
	//   registerNodeStatus('needs-review', t('Review'));
	//
	// Or you can customize the default status badge component with some props:
	registerNodeStatus('revised', t('Revised'), {
		componentProps: {
			icon: 'history',
			condensedLabel: t('R'),
			backgroundColor: 'state-message-info-color',
			clickOperation: 'scroll-node-into-view',
			tooltipContent: t('This document has been revised.'),
		},
	});
	registerNodeStatus('clog', t('Clogs'), {
		componentProps: {
			condensedLabel: t('C'),
			backgroundColor: 'state-message-success-color',
		},
	});
	configureProperties(sxModule, xq`self::*`, {
		statusQuery: xq`
			(
				if (./prolog/metadata/data/@status="changed")
					then "revised"
					else (),
				if (
					@outputclass="clogs" or
					fonto:hierarchy-source-node(fonto:current-hierarchy-node-id())/@outputclass = "clogs"
				)
					then "clog"
					else ()
			)
		`,
	});
}
