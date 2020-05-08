import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame.js';
import configureAsInlineImageInFrame from 'fontoxml-families/src/configureAsInlineImageInFrame.js';

// This file removes the permanentId which is the other way around then for cross reference,
// for compatability reasons.
export default function configureImageWithoutPermanentId(sxModule) {
	// To disable permanentId's in images (also known as the reference pipeline), set
	// isPermanentId to false.

	configureAsImageInFrame(sxModule, 'self::image', undefined, {
		priority: 2,
		referenceQuery: '@href',
		isPermanentId: false
	});

	configureAsInlineImageInFrame(
		sxModule,
		'self::image and fonto:in-inline-layout(.)',
		undefined,
		{
			priority: 2,
			referenceQuery: '@href',
			isPermanentId: false
		}
	);
}
