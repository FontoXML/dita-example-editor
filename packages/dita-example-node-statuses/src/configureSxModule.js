import configureProperties from 'fontoxml-families/src/configureProperties.js';

export default function configureSxModule(sxModule) {
	sxModule.markAsAddon();
	configureProperties(sxModule, 'fonto:dita-class(., "topic/topic")', {
		// We will use the statusQuery to search for the element that indicates a topic being
		// revised. This helps with the overal performance of the editor. For more details about
		// these performance concerns, check out this blog post written by our
		// XPath (engine) developer:
		// https://www.fontoxml.com/blog/make-your-editor-fast-optimize-your-xpaths/
		statusQuery: 'if (./prolog/metadata/data/@status="changed") then "revised" else ""'
	});
}
