import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame';
import xq from 'fontoxml-selectors/src/xq';

// This file removes the permanentId which is the other way around then for cross reference,
// for compatability reasons.
export default function configureHazardSymbolWithoutPermanentId(sxModule) {
	// To disable permanentId's in hazard symbols (also known as the reference pipeline), set
	// isPermanentId to false.

	configureAsImageInFrame(sxModule, xq`self::hazardsymbol`, undefined, {
		priority: 2,
		referenceQuery: xq`@href`,
		isPermanentId: false,
	});
}
