import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule) {
	// glossgroup
	//     The <glossgroup> element may be used to contain multiple <glossentry> topics within a single
	//     collection.
	configureAsSheetFrame(sxModule, xq`self::glossgroup`, t('glossary'), {
		titleQuery: xq`./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
		blockFooter: [
			createRelatedNodesQueryWidget(
				xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
			),
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// glossgroup nested in topic
	configureAsFrame(
		sxModule,
		xq`self::glossgroup[parent::*[fonto:dita-class(., "topic/topic")]]`,
		undefined,
		{
			blockFooter: [],
		}
	);

	// title in glossary
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::glossgroup]`,
		undefined,
		{
			fontVariation: 'document-title',
		}
	);
}
