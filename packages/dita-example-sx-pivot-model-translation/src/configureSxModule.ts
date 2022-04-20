import pivotModelTransformerManager from 'fontoxml-pivot-model/src/pivotModelTransformerManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
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
			type: 'inline',
			qualifiedName: 'xref',
			attributes: { format: 'html', scope: 'external' },
			copyAttributes: { href: 'reference' },
		},

		{
			qualifiedName: 'b',
			flags: ['bold'],
			type: 'inline',
		},
		{
			qualifiedName: 'sup',
			flags: ['superscript'],
			type: 'inline',
		},
		{
			qualifiedName: 'sub',
			flags: ['subscript'],
			type: 'inline',
		},
		{
			qualifiedName: 'u',
			flags: ['underline'],
			type: 'inline',
		},
		{
			qualifiedName: 'i',
			flags: ['italic'],
			type: 'inline',
		},

		// <b> is the preferred inline, which is why it is repeated here without flags.
		{
			qualifiedName: 'b',
			type: 'inline',
		},

		// <p> is the preferred block-level to contain text.
		{
			qualifiedName: 'p',
			type: 'block',
		},

		{
			qualifiedName: null,
			type: 'frame',
		},

		{
			qualifiedName: 'ul',
			type: 'group',
			flags: ['unordered-list'],
			contents: [
				{
					qualifiedName: 'li',
					type: 'frame',
				},
			],
		},
		{
			qualifiedName: 'ol',
			type: 'group',
			flags: ['ordered-list'],
			contents: [
				{
					qualifiedName: 'li',
					type: 'frame',
				},
			],
		},

		// <ul> is the preferred list container which is why it is repeated here without flags.
		{
			qualifiedName: 'ul',
			type: 'group',
			contents: [
				{
					qualifiedName: 'li',
					type: 'frame',
				},
			],
		},
	]);

	// Ignore blocks under <pre>
	pivotModelTransformerManager.registerContextualTransformer(
		sxModule,
		xq`ancestor-or-self::pre`,
		{
			qualifiedName: null,
			type: 'block',
		}
	);
}
