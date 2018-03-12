define([
	'fontoxml-pivot-model/pivotModelTransformerManager'
], function (
	pivotModelTransformerManager
) {
	'use strict';

	return function configureSxModule (sxModule) {
		// This is the configuration for transforming clipboard data, for example from MS Word or your browser, into
		// the logical default DITA structure.
		//
		// See also:
		//     http://documentation.fontoxml.com/editor/latest/define-copy-paste-behaviour-3099104.html
		pivotModelTransformerManager.registerTransformers(
			sxModule,
			[
				{
					qualifiedName: 'table',
					isTable: true,
					cellQualifiedName: 'entry'
				},

				{
					qualifiedName: 'b',
					flags: ['bold'],
					type: 'inline'
				},
				{
					qualifiedName: 'u',
					flags: ['underline'],
					type: 'inline'
				},
				{
					qualifiedName: 'i',
					flags: ['italic'],
					type: 'inline'
				},

				// <b> is the preferred inline, which is why it is repeated here without flags.
				{
					qualifiedName: 'b',
					type: 'inline'
				},

				// <p> is the preferred block-level to contain text.
				{
					qualifiedName: 'p',
					type: 'block'
				},

				{
					qualifiedName: null,
					type: 'frame'
				},

				{
					qualifiedName: 'ul',
					type: 'group',
					flags: ['unordered-list'],
					contents: [
						{
							qualifiedName: 'li',
							type: 'frame'
						}
					]
				},
				{
					qualifiedName: 'ol',
					type: 'group',
					flags: ['ordered-list'],
					contents: [
						{
							qualifiedName: 'li',
							type: 'frame'
						}
					]
				},

				// <ul> is the preferred list container which is why it is repeated here without flags.
				{
					qualifiedName: 'ul',
					type: 'group',
					contents: [
						{
							qualifiedName: 'li',
							type: 'frame'
						}
					]
				}
			]);

		// Ignore blocks under <pre>
		pivotModelTransformerManager.registerContextualTransformer(
			sxModule,
			'ancestor-or-self::pre',
			{
				qualifiedName: null,
				type: 'block'
			});
	};
});
