import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import pivotModelTransformerManager from 'fontoxml-pivot-model/src/pivotModelTransformerManager';
import PivotNodeTypes from 'fontoxml-pivot-model/src/PivotNodeTypes';

export default function configureSxModule(sxModule: SxModule) {
	// This is the configuration for transforming clipboard data, for example from MS Word or your browser, into
	// the logical default DITA structure.
	//
	// See also:
	//     http://documentation.fontoxml.com/editor/latest/define-copy-paste-behaviour-3099104.html
	pivotModelTransformerManager.registerTransformers(sxModule, [
		{
			qualifiedName: 'table',
			isTable: true,
			cellQualifiedName: 'entry',
		},

		{
			type: PivotNodeTypes.inline,
			qualifiedName: 'xref',
			attributes: { format: 'html', scope: 'external' },
			copyAttributes: { href: 'reference' },
		},

		{
			qualifiedName: 'b',
			flags: ['bold'],
			type: PivotNodeTypes.inline,
		},
		{
			qualifiedName: 'sup',
			flags: ['superscript'],
			type: PivotNodeTypes.inline,
		},
		{
			qualifiedName: 'sub',
			flags: ['subscript'],
			type: PivotNodeTypes.inline,
		},
		{
			qualifiedName: 'u',
			flags: ['underline'],
			type: PivotNodeTypes.inline,
		},
		{
			qualifiedName: 'i',
			flags: ['italic'],
			type: PivotNodeTypes.inline,
		},

		// <b> is the preferred inline, which is why it is repeated here without flags.
		{
			qualifiedName: 'b',
			type: PivotNodeTypes.inline,
		},

		// <p> is the preferred block-level to contain text.
		{
			qualifiedName: 'p',
			type: PivotNodeTypes.block,
		},

		{
			qualifiedName: null,
			type: PivotNodeTypes.frame,
		},

		{
			qualifiedName: 'ul',
			type: PivotNodeTypes.group,
			flags: ['unordered-list'],
			contents: [
				{
					qualifiedName: 'li',
					type: PivotNodeTypes.frame,
				},
			],
		},
		{
			qualifiedName: 'ol',
			type: PivotNodeTypes.group,
			flags: ['ordered-list'],
			contents: [
				{
					qualifiedName: 'li',
					type: PivotNodeTypes.frame,
				},
			],
		},

		// <ul> is the preferred list container which is why it is repeated here without flags.
		{
			qualifiedName: 'ul',
			type: PivotNodeTypes.group,
			contents: [
				{
					qualifiedName: 'li',
					type: PivotNodeTypes.frame,
				},
			],
		},
	]);

	// Ignore blocks under <pre>
	pivotModelTransformerManager.registerContextualTransformer(
		sxModule,
		'ancestor-or-self::pre',
		{
			qualifiedName: null,
			type: PivotNodeTypes.block,
		}
	);
}
