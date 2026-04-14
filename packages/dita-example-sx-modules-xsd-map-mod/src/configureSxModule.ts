import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// anchor
	configureAsRemoved(sxModule, xq`self::anchor`, t('anchor'));

	// linktext
	configureAsRemoved(sxModule, xq`self::linktext`, t('link text'));

	// map
	configureAsSheetFrame(sxModule, xq`self::map`, t('map'), {
		defaultTextContainer: 'title',
		titleQuery: xq`if (./title) then fonto:curated-text-in-node(./title) else ()`,
		visibleChildSelector: xq`self::title`,
		blockFooter: [
			createRelatedNodesQueryWidget(
				xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
			),
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// title in map
	configureAsTitleFrame(sxModule, xq`self::title[parent::map]`, undefined, {
		fontVariation: 'collection-title',
	});

	// navref
	configureAsRemoved(sxModule, xq`self::navref`, t('navref'));

	// relcell
	configureAsRemoved(sxModule, xq`self::relcell`, t('relcell'));

	// relcolspec
	configureAsRemoved(sxModule, xq`self::relcolspec`, t('relcolspec'));

	// relheader
	configureAsRemoved(sxModule, xq`self::relheader`, t('relheader'));

	// relrow
	configureAsRemoved(sxModule, xq`self::relrow`, t('relrow'));

	// reltable
	configureAsRemoved(sxModule, xq`self::reltable`, t('reltable'));

	// searchtitle
	configureAsRemoved(sxModule, xq`self::searchtitle`, t('searchtitle'));

	// shortdesc
	//     The short description (<shortdesc>) element occurs between the topic title and the topic body, as
	//     the initial paragraph-like content of a topic, or it can be embedded in an abstract element. The
	//     short description, which represents the purpose or theme of the topic, is also intended to be used
	//     as a link preview and for searching. When used within a DITA map, the short description of the
	//     <topicref> can be used to override the short description in the topic. Category: Topic elements
	configureAsRemoved(sxModule, xq`self::shortdesc`, t('introduction'));

	// topicmeta
	configureAsRemoved(sxModule, xq`self::topicmeta`, t('topic metadata'));

	// navtitle in topicmeta (in topichead and topicgroup)
	configureAsTitleFrame(
		sxModule,
		xq`self::navtitle and parent::topicmeta`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);

	// topicref
	configureAsRemoved(sxModule, xq`self::topicref`, t('link to topic'), {
		// For topicrefs referencing documents that are not loaded, show the navtitle instead of the
		// topic title if one is available
		titleQuery: xq`if (./topicmeta/navtitle) then fonto:curated-text-in-node(./topicmeta/navtitle) else string(./@navtitle)`,
	});

	// ux-window
	configureAsRemoved(sxModule, xq`self::ux-window`, t('ux-window'));
}
