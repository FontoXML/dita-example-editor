import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame';
import configureAsInlineImageInFrame from 'fontoxml-families/src/configureAsInlineImageInFrame';
import xq from 'fontoxml-selectors/src/xq';

// This file removes the permanentId which is the other way around then for cross reference,
// for compatability reasons.
export default function configureImageWithoutPermanentId(sxModule) {
	// To disable permanentId's in images (also known as the reference pipeline), set
	// isPermanentId to false.

	configureAsImageInFrame(sxModule, xq`self::image`, undefined, {
		priority: 2,
		referenceQuery: xq`@href`,
		isPermanentId: false,
	});

	configureAsInlineImageInFrame(
		sxModule,
		xq`self::image and fonto:in-inline-layout(.)`,
		undefined,
		{
			priority: 2,
			referenceQuery: xq`@href`,
			isPermanentId: false,
			defaultTextContainer: {
				localName: 'alt',
				namespaceURI: null,
				insert: 'always',
				implicit: 'inline',
			},
		}
	);
}
