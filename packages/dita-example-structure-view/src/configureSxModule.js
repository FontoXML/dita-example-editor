import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import configureAsStructureViewItem from 'fontoxml-families/src/configureAsStructureViewItem.js';

const INSERT_TOPICREF_OPERATION_NAMES = [
	'contextual-insert-topicref--from-template',
	'contextual-insert-topicref--to-existing-document'
];

const MOVE_TOPICREF_OPERATION_NAMES = [
	[
		'contextual-topicref-move-up',
		'contextual-topicref-move-down',
		'contextual-topicref-indent',
		'contextual-topicref-outdent',

		'contextual-topicref-move-to-top',
		'contextual-topicref-move-to-bottom'
	],
	['contextual-topicref-remove']
];

function formatContextualOperationListWithGroups(list) {
	return list.map(group => ({
		contents: group.map(operation => ({
			name: operation,
			hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu']
		}))
	}));
}

export default function configureSxModule(sxModule) {
	sxModule.markAsAddon();

	configureAsStructureViewItem(sxModule, 'fonto:dita-class(., "map/map")', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()'
	});

	configureAsStructureViewItem(sxModule, 'fonto:dita-class(., "map/topicref") and not(@href)', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()'
	});

	configureAsStructureViewItem(sxModule, 'self::topicgroup', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()'
	});

	configureAsStructureViewItem(sxModule, 'self::topichead', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()'
	});

	configureAsStructureViewItem(sxModule, 'self::glossgroup', {
		icon: 'file-text-o',
		recursionQuery: 'glossentry'
	});

	configureAsStructureViewItem(sxModule, 'fonto:dita-class(., "topic/topic")', {
		icon: 'file-text-o'
	});

	configureContextualOperations(
		sxModule,
		'fonto:dita-class(., "map/map")',
		formatContextualOperationListWithGroups([
			INSERT_TOPICREF_OPERATION_NAMES
		]),
		-3
	);
	configureContextualOperations(
		sxModule,
		'fonto:dita-class(., "map/topicref")',
		formatContextualOperationListWithGroups([
			INSERT_TOPICREF_OPERATION_NAMES,
			...MOVE_TOPICREF_OPERATION_NAMES
		]),
		-3
	);
	configureContextualOperations(
		sxModule,
		'self::mapref',
		formatContextualOperationListWithGroups(MOVE_TOPICREF_OPERATION_NAMES),
		-2
	);
}
