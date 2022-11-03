import configureProperties from 'fontoxml-families/src/configureProperties';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

/**
 * This module is included in all schema experiences for DITA map specializations in order to
 * configure the documentsHierarchy represented by those maps. For maximum DITA-compatibility, the
 * following configuration uses the `fonto:dita-class` function to apply to and match any DITA
 * specialization of these elements.
 *
 * For very large documents performance may be improved by replacing this configuration with
 * separate rules, one per element, with a selector that explicitly mentions that element:
 *
 * ```
 * configureProperties(sxModule, 'self::topicref', ...);
 * configureProperties(sxModule, 'self::mapref', ...);
 * configureProperties(sxModule, 'self::topicgroup', ...);
 * ```
 *
 * Please refer to our documentation on XPath performance for more information:
 * https://documentation.fontoxml.com/latest/performance-a2c8c8d819cd#id-3d20b151-e9f0-6bf7-c051-9afc59761693
 *
 * Note that specific schema-specific configuration may override this configuration to match the
 * intended interpretation of specific elements.
 */
export default function configureSxModule(sxModule: SxModule): void {
	// Any root-level document has a hierarchy node for its root element
	configureProperties(sxModule, xq`self::document-node()`, {
		hierarchyChildNodesQuery: xq`child::*`,
		hierarchyContentQuery: null,
	});

	// Configure map and its specializations

	configureProperties(sxModule, xq`self::*[fonto:dita-class(., "map/map")]`, {
		// maps have topicrefs and any of its specializations as children
		hierarchyChildNodesQuery: xq`child::*[fonto:dita-class(., "map/topicref")]`,
		// maps show a sheetframe for themselves
		hierarchyContentQuery: xq`.`,
	});

	// Configure topicref and its specializations

	// Each topicref has topicrefs and any of its specializations as children
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "map/topicref")]`,
		{
			hierarchyChildNodesQuery: xq`child::*[fonto:dita-class(., "map/topicref")]`,
		}
	);
	// Each topicref with an href points at a content document
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "map/topicref") and @href]`,
		{
			hierarchyContentQuery: xq`fonto:document(@href)`,
		}
	);
	// Each topicref without an href represents itself (e.g., topichead / topicgroup)
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "map/topicref") and not(@href)]`,
		{
			hierarchyContentQuery: xq`.`,
		}
	);
	// Each topicref with format="ditamap" points at a map and the hierarchy should include that
	// map's children
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "map/topicref") and @href and @format="ditamap"]`,
		{
			// Combine children of the topicref with the hierarchy children of the target map
			hierarchyChildNodesQuery: xq`(child::*[fonto:dita-class(., "map/topicref")], fonto:document(@href)/*/fonto:hierarchy-child-nodes(.))`,
		}
	);
}
