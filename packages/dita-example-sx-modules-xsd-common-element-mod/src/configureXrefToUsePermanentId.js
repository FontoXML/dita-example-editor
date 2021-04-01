import configureAsInlineLink from 'fontoxml-families/src/configureAsInlineLink.js';
import configureProperties from 'fontoxml-families/src/configureProperties.js';

export default function configureXrefToUsePermanentId(sxModule) {
	// To enable permanentId's in cross references (also known as the reference pipeline), reconfigure the attribute
	// name that is expected to contain the permanentId, and set popoverData.targetIsPermanent to TRUE.

	configureAsInlineLink(sxModule, 'self::xref', {
		priority: 2,
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=dita]',
			targetIsPermanentId: true,
			targetQuery: '@href'
		},
		referenceQuery: '@href'
	});

	configureProperties(sxModule, 'self::xref[@format="html"]', {
		priority: 2,
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=html]',
			targetIsPermanentId: true,
			targetQuery: '@href'
		}
	});
}
