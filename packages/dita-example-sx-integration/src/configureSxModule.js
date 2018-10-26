define([
	'fontoxml-dom-namespaces/namespaceManager',
	'fontoxml-dita/configureAsConref',
	'fontoxml-families/configureAsRemoved',

	'dita-example-sx-modules-xsd-common-element-mod/configureImageWithoutPermanentId',
	'dita-example-sx-modules-xsd-hazard-domain/configureHazardsymbolWithoutPermanentId'
], function (
	namespaceManager,
	configureAsConref,
	configureAsRemoved,

	configureImageWithoutPermanentId,
	configureHazardsymbolWithoutPermanentId
) {
	'use strict';

	return function configureSxModule (sxModule) {
		// Mark this configureSxModule.js file as an addon entry file, so that we don't have to explicitly depend on
		// this package from an *-sx-shell. The best practice is to always depend on the specific *-sx-module packages
		// from your own shell.
		sxModule.markAsAddon();

		// Declare the namespace for the dita-example-sx-modules-xsd-mathml-domain / dita-example-sx-modules-xsd-equation-domain packages.
		namespaceManager.addNamespace('mathml', 'http://www.w3.org/1998/Math/MathML');

		// Configuring any element (with a very low priority selector) as "removed" makes sure Fonto will never crash
		// if it encounters an unconfigured element - it will simply be hidden.
		//
		// Make sure you've tested your application without this configuration, in order to more easily detect elements
		// that are lacking configuration.
		configureAsRemoved(sxModule, 'self::*', undefined, {
			priority: -2
		});

		// This is an example configuration for conreffed <note> elements, which is a reuse mechanism in DITA. The
		// configureAsConref family will itself determine wether an XML tag indeed has all the required conref
		// information. Fonto will then render the note in the location of the conref, regardless of which document
		// actually contains the conreffed content.
		configureAsConref(sxModule, 'self::note', 'reused note', {
			contextualOperations: [],
			popoverData: {
				editOperationName: 'contextual-edit-note[@conref]'
			},
			blockHeaderLeft:[],
			blockOutsideAfter: []
		});

		// Configure everything without permanentIds
		configureImageWithoutPermanentId(sxModule);
		configureHazardsymbolWithoutPermanentId(sxModule);
	};
});
