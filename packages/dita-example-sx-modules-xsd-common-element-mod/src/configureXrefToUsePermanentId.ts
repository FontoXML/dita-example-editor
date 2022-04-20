import configureAsInlineLink from 'fontoxml-families/src/configureAsInlineLink';
import configureProperties from 'fontoxml-families/src/configureProperties';
import xq from 'fontoxml-selectors/src/xq';

export default function configureXrefToUsePermanentId(sxModule) {
	// To enable permanentId's in cross references (also known as the reference pipeline), reconfigure the attribute
	// name that is expected to contain the permanentId, and set popoverData.targetIsPermanent to TRUE.

	configureAsInlineLink(sxModule, xq`self::xref`, undefined, {
		referenceQuery: xq`@href`,
		isPermanentId: true,
		priority: 2,
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=dita]',
			targetIsPermanentId: true,
			targetQuery: xq`@href`,
		},
	});

	configureProperties(sxModule, xq`self::xref[@format="html"]`, {
		priority: 2,
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=html]',
			targetIsPermanentId: true,
			targetQuery: xq`@href`,
		},
	});
}
