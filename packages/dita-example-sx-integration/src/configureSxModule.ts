import configureImageWithoutPermanentId from 'dita-example-sx-modules-xsd-common-element-mod/src/configureImageWithoutPermanentId';
import configureHazardsymbolWithoutPermanentId from 'dita-example-sx-modules-xsd-hazard-domain/src/configureHazardsymbolWithoutPermanentId';

import configureAsConref from 'fontoxml-dita/src/configureAsConref';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureProperties from 'fontoxml-families/src/configureProperties';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
	// Mark this configureSxModule.js file as an addon entry file, so that we don't have to explicitly depend on
	// this package from an *-sx-shell. The best practice is to always depend on the specific *-sx-module packages
	// from your own shell.
	sxModule.markAsAddon();

	// Declare the namespace for the dita-example-sx-modules-xsd-mathml-domain / dita-example-sx-modules-xsd-equation-domain packages.
	namespaceManager.addNamespace(
		'mathml',
		'http://www.w3.org/1998/Math/MathML'
	);

	// Configuring any element (with a very low priority selector) as "removed" makes sure Fonto will never crash
	// if it encounters an unconfigured element - it will simply be hidden.
	//
	// Make sure you've tested your application without this configuration, in order to more easily detect elements
	// that are lacking configuration.
	configureAsRemoved(sxModule, xq`self::*`, undefined, {
		priority: -2,
	});

	// This is an example configuration for conreffed <note> elements, which is a reuse mechanism in DITA. The
	// configureAsConref family will itself determine wether an XML tag indeed has all the required conref
	// information. Fonto will then render the note in the location of the conref, regardless of which document
	// actually contains the conreffed content.
	configureAsConref(sxModule, xq`self::note`, 'reused note', {
		contextualOperations: [],
		popoverData: {
			editOperationName: 'contextual-edit-note[@conref]',
		},
		blockHeaderLeft: [],
		blockOutsideAfter: [],
	});

	// Needed for bookmap implementation
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "topic/topic")][not(parent::*[fonto:dita-class(., "topic/topic")])]`,
		{
			titleQuery: xq`
			let $refNodeName := fonto:hierarchy-source-node(fonto:current-hierarchy-node-id())/name(),
			$title := ./*[fonto:dita-class(., "topic/title")]//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()

			return
				if(not($refNodeName) or not(bookmap:retrieve-element-label($refNodeName)))
				then $title
				else string-join(upper-case(bookmap:retrieve-element-label($refNodeName)) || ": " || $title)`,
			blockHeaderLeft: [
				createLabelQueryWidget(xq`""`, {
					prefixQuery: xq`
					let $refNodeName := fonto:hierarchy-source-node(fonto:current-hierarchy-node-id())/name()

					return
						if( not($refNodeName) or not(bookmap:retrieve-element-label($refNodeName)) )
						then ()
						else string-join(bookmap:retrieve-element-label($refNodeName) || " | ")`,
					inline: true,
				}),
				createMarkupLabelWidget(),
			],
			priority: 10,
		}
	);

	// Configure everything without permanentIds
	configureImageWithoutPermanentId(sxModule);
	configureHazardsymbolWithoutPermanentId(sxModule);
}
