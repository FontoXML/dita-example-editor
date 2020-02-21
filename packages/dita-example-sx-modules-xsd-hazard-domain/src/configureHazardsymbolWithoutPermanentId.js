import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame.js';

// This file removes the permanentId which is the other way around then for cross reference,
// for compatability reasons.
export default function configureHazardSymbolWithoutPermanentId(sxModule) {
	// To disable permanentId's in hazard symbols (also known as the reference pipeline), set
	// isPermanentId to false.

	configureAsImageInFrame(sxModule, 'self::hazardsymbol', undefined, {
		priority: 2,
		referenceQuery: '@href',
		isPermanentId: false
	});
}
