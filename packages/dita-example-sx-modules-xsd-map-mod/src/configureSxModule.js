import configureAsMapSheetFrame from 'fontoxml-dita/src/configureAsMapSheetFrame.js';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// anchor
	configureAsRemoved(sxModule, 'self::anchor', t('anchor'));

	// linktext
	configureAsRemoved(sxModule, 'self::linktext', t('link text'));

	// map
	configureAsMapSheetFrame(sxModule, 'self::map', t('map'), {
		defaultTextContainer: 'title',
		titleQuery:
			'title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
		variation: 'compact-vertical',
		visibleChildSelectorOrNodeSpec: 'self::title',
		blockFooter: [
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(.)]'
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// title in map
	configureAsTitleFrame(sxModule, 'self::title[parent::map]', undefined, {
		fontVariation: 'collection-title'
	});

	// navref
	configureAsRemoved(sxModule, 'self::navref', t('navref'));

	// relcell
	configureAsRemoved(sxModule, 'self::relcell', t('relcell'));

	// relcolspec
	configureAsRemoved(sxModule, 'self::relcolspec', t('relcolspec'));

	// relheader
	configureAsRemoved(sxModule, 'self::relheader', t('relheader'));

	// relrow
	configureAsRemoved(sxModule, 'self::relrow', t('relrow'));

	// reltable
	configureAsRemoved(sxModule, 'self::reltable', t('reltable'));

	// searchtitle
	configureAsRemoved(sxModule, 'self::searchtitle', t('searchtitle'));

	// shortdesc
	//     The short description (<shortdesc>) element occurs between the topic title and the topic body, as
	//     the initial paragraph-like content of a topic, or it can be embedded in an abstract element. The
	//     short description, which represents the purpose or theme of the topic, is also intended to be used
	//     as a link preview and for searching. When used within a DITA map, the short description of the
	//     <topicref> can be used to override the short description in the topic. Category: Topic elements
	configureAsRemoved(sxModule, 'self::shortdesc', t('introduction'));

	// topichead
	//     The <topichead> element provides a title-only entry in a navigation map, as an alternative to the
	//     fully-linked title provided by the <topicref> element. Category: Mapgroup elements
	configureAsMapSheetFrame(sxModule, 'self::topichead', t('topic group'), {
		titleQuery:
			'if (topicmeta/navtitle) then (topicmeta/navtitle//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()) else string(./@navtitle)',
		variation: 'compact-vertical',
		visibleChildSelectorOrNodeSpec: 'self::topicmeta',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// topicgroup
	//     The <topicgroup> element is for creating groups of <topicref> elements without affecting the
	//     hierarchy, as opposed to nested < topicref> elements within a <topicref>, which does imply a
	//     structural hierarchy. It is typically used outside a hierarchy to identify groups for linking
	//     without affecting the resulting toc/navigation output. Category: Mapgroup elements
	configureAsMapSheetFrame(sxModule, 'self::topicgroup', t('untitled topic group'), {
		variation: 'compact-vertical',
		visibleChildSelectorOrNodeSpec: 'self::topicmeta',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// topicmeta
	configureAsRemoved(sxModule, 'self::topicmeta', t('topic metadata'));

	configureAsStructure(sxModule, 'self::topicmeta[parent::topichead]', undefined);

	// navtitle in topicmeta in topichead
	configureAsTitleFrame(
		sxModule,
		'self::navtitle and parent::topicmeta[parent::topichead]',
		undefined,
		{
			fontVariation: 'document-title'
		}
	);

	// topicref
	configureAsRemoved(sxModule, 'self::topicref', t('link to topic'));

	// ux-window
	configureAsRemoved(sxModule, 'self::ux-window', t('ux-window'));
}
