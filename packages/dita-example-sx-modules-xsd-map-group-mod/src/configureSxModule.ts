import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// anchorref
	//     The contents of an <anchorref> element are rendered both in the original authored location and at
	//     the location of the referenced <anchor> element. The referenced <anchor> element can be defined in
	//     the current map or another map.
	configureAsRemoved(sxModule, xq`self::anchorref`, t('anchorref'));

	// keydef
	//     The <keydef> element is a convenience element that is used to define keys without any of the other
	//     effects that occur when using a <topicref> element: no content is included in output, no title is
	//     included in the table of contents, and no linking or other relationships are defined. The <keydef>
	//     element is not the only way to define keys; its purpose is to simplify the process by defaulting
	//     several attributes to achieve the described behaviors.
	configureAsRemoved(sxModule, xq`self::keydef`, t('keydef'));

	// mapref
	//     The <mapref> element is a convenience element that has the same meaning as a <topicref> element that
	//     explicitly sets the format attribute to "ditamap". The hierarchy of the referenced map is merged
	//     into the container map at the position of the reference, and the relationship tables of the child
	//     map are added to the parent map.
	configureAsRemoved(sxModule, xq`self::mapref`, t('mapref'));

	// topichead
	//     The <topichead> element provides a title-only entry in a navigation map, as an alternative to the
	//     fully-linked title provided by the <topicref> element. Category: Mapgroup elements
	configureAsSheetFrame(sxModule, xq`self::topichead`, t('topic group'), {
		titleQuery: xq`if (topicmeta/navtitle) then (topicmeta/navtitle//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()) else string(./@navtitle)`,
		visibleChildSelector: xq`self::topicmeta`,
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// topicmeta in topichead
	configureAsStructure(
		sxModule,
		xq`self::topicmeta[parent::topichead]`,
		undefined
	);

	// navtitle in topicmeta in topichead
	configureAsTitleFrame(
		sxModule,
		xq`self::navtitle and parent::topicmeta[parent::topichead]`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);

	// topicgroup
	//     The <topicgroup> element is for creating groups of <topicref> elements without affecting the
	//     hierarchy, as opposed to nested < topicref> elements within a <topicref>, which does imply a
	//     structural hierarchy. It is typically used outside a hierarchy to identify groups for linking
	//     without affecting the resulting toc/navigation output. Category: Mapgroup elements
	configureAsSheetFrame(
		sxModule,
		xq`self::topicgroup`,
		t('untitled topic group'),
		{
			visibleChildSelector: xq`self::topicmeta`,
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// topicset
	//     The <topicset> element defines a complete unit of content that can be reused in other DITA maps or
	//     other <topicset> elements. The <topicset> element can be especially useful for task composition in
	//     which larger tasks that are composed indefinitely of smaller tasks. The id attribute on a <topicset>
	//     is required, which ensures that the complete unit is available for reuse in other contexts.
	configureAsRemoved(sxModule, xq`self::topicset`, t('topicset'));

	// topicsetref
	//     The <topicsetref> element references a <topicset> element. The referenced <topicset> element can be
	//     defined in the current map or in another map.
	configureAsRemoved(sxModule, xq`self::topicsetref`, t('topicsetref'));
}
