import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import addReducer from 'fontoxml-indices/src/addReducer.js';
import configureAsStructureViewItem from 'fontoxml-structure-view/src/configureAsStructureViewItem.js';

const INSERT_TOPICREF_OPERATION_NAMES = [
	'contextual-insert-topicref--from-template',
	'contextual-insert-topicref--to-existing-document'
];

const MOVE_TOPICREF_OPERATION_NAMES = [
	'contextual-topicref-move-up',
	'contextual-topicref-move-down',
	'contextual-topicref-indent',
	'contextual-topicref-outdent',

	'contextual-topicref-move-to-top',
	'contextual-topicref-move-to-bottom',

	'contextual-topicref-remove'
];

function toContextualOperations(operationName) {
	return {
		name: operationName,
		hideIn: ['context-menu', 'element-menu', 'breadcrumbs-menu']
	};
}

export default function configureSxModule(sxModule) {
	sxModule.markAsAddon();

	addReducer(
		'http://www.fontoxml.com/app',
		'calculateStructureViewItemNumber',
		'self::topicref or self::topicgroup or self::topichead or self::glossentry',
		'http://www.fontoxml.com/app',
		'onReduceStructureViewItemToNumber'
	);

	configureAsStructureViewItem(sxModule, 'self::map', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()'
	});

	// TODO: not sure this should be in the structure view
	configureAsStructureViewItem(sxModule, 'self::topicgroup', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()',
		titleQuery: `
			import module namespace app = "http://www.fontoxml.com/app";
			(: TODO: the ./topicmeta/navtitle part here is a bit naive/simplistic, it would be better to use the actual titleQuery for self::topichead here :)
			string-join(app:calculateStructureViewItemNumber(fonto:current-hierarchy-node-id(), .), ".") || " - " || ./topicmeta/navtitle
		`
	});

	configureAsStructureViewItem(sxModule, 'self::topichead', {
		icon: 'folder-open-o',
		// Recursion is handled by the documents hierarchy
		recursionQuery: '()',
		titleQuery: `
			import module namespace app = "http://www.fontoxml.com/app";
			(: TODO: the ./topicmeta/navtitle part here is a bit naive/simplistic, it would be better to use the actual titleQuery for self::topichead here :)
			string-join(app:calculateStructureViewItemNumber(fonto:current-hierarchy-node-id(), .), ".") || " - " || ./topicmeta/navtitle
		`
	});

	configureAsStructureViewItem(sxModule, 'self::glossgroup', {
		icon: 'file-text-o',
		recursionQuery: 'glossentry'
	});

	configureAsStructureViewItem(sxModule, 'fonto:dita-class(., "topic/topic")', {
		icon: 'file-text-o',
		titleQuery: `
			import module namespace app = "http://www.fontoxml.com/app";
			(: TODO: the ./title part here is a bit naive/simplistic, it would be better to use the actual titleQuery for self::topic here :)
			string-join(app:calculateStructureViewItemNumber(fonto:current-hierarchy-node-id(), .), ".") || " - " || ./title
		`
	});

	configureAsStructureViewItem(
		sxModule,
		'fonto:dita-class(., "topic/topic") and self::glossentry',
		{
			icon: 'file-text-o',
			titleQuery: `
				import module namespace app = "http://www.fontoxml.com/app";
				(: TODO: the ./glossterm part here is a bit naive/simplistic, it would be better to use the actual titleQuery for self::glossentry here :)
				string-join(app:calculateStructureViewItemNumber(fonto:current-hierarchy-node-id(), .), ".") || " - " || ./glossterm
			`
		}
	);

	configureContextualOperations(
		sxModule,
		'fonto:dita-class(., "map/map")',
		INSERT_TOPICREF_OPERATION_NAMES.map(toContextualOperations)
	);
	configureContextualOperations(
		sxModule,
		'fonto:dita-class(., "map/topicref")',
		INSERT_TOPICREF_OPERATION_NAMES.concat(MOVE_TOPICREF_OPERATION_NAMES).map(
			toContextualOperations
		)
	);
	configureContextualOperations(
		sxModule,
		'self::mapref',
		MOVE_TOPICREF_OPERATION_NAMES.map(toContextualOperations),
		2
	);
}
