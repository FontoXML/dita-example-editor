import readOnlyBlueprint from 'fontoxml-blueprints/src/readOnlyBlueprint';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock';
import configureAsGroup from 'fontoxml-families/src/configureAsGroup';
import configureAsLine from 'fontoxml-families/src/configureAsLine';
import configureAsObjectInFrame from 'fontoxml-families/src/configureAsObjectInFrame';
import configureAsOutOfOrderStructure from 'fontoxml-families/src/configureAsOutOfOrderStructure';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import configureProperties from 'fontoxml-families/src/configureProperties';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import evaluateXPathToString from 'fontoxml-selectors/src/evaluateXPathToString';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// abstract
	//     The abstract element occurs between the topic title and the topic body, as the initial content of a
	//     topic. It can contain paragraph-level content as well as one or more shortdesc elements which can be
	//     used for providing link previews or summaries. The <abstract> element cannot be overridden by maps,
	//     but its contained <shortdesc> elements can be, for the purpose of creating link summaries or
	//     previews. Category: Topic elements
	configureAsFrame(sxModule, xq`self::abstract`, t('abstract'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the summary'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// body
	//     The <body> element is the container for the main content of a <topic>. Category: Topic elements
	configureAsStructure(sxModule, xq`self::body`, t('body'), {
		defaultTextContainer: 'p',
		isRemovableIfEmpty: false,
	});

	// bodydiv
	//     The <bodydiv> element is used to contain informal blocks of information within the body of a topic.
	//     The bodydiv element is specifically designed to be a grouping element, without any explicit
	//     semantics, other than to organize subsets of content into logical groups that are not intended or
	//     should not be contained as a topic. As such, it does not contain an explicit title to avoid enabling
	//     the creation of deeply nested content that would otherwise be written as separate topics. Content
	//     that requires a title should use a section element or a nested topic.
	configureAsFrame(sxModule, xq`self::bodydiv`, t('body division'), {
		contextualOperations: [{ name: ':contextual-unwrap-bodydiv' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the content'),
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// example
	//     The <example> element is a section with the specific role of containing examples that illustrate or
	//     support the current topic. The <example> element has the same content model as <section>. Category:
	//     Topic elements
	configureAsFrame(sxModule, xq`self::example`, t('example'), {
		contextualOperations: [
			{ name: ':example-insert-title' },
			{ name: ':contextual-unwrap-example' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the content'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// title in example
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::example]`,
		undefined,
		{
			fontVariation: 'section-title',
		}
	);

	// link
	//     The <link> element defines a relationship to another topic. Links represent the types and roles of
	//     topics in a web of information, and therefore represent navigational links within that web. Links
	//     are typically sorted on output based on their attributes. The optional container elements for link
	//     (<linkpool> and <linklist>) allow authors to define groups with common attributes, or to preserve
	//     the authored sequence of links on output. Links placed in a <linkpool> may be rearranged for display
	//     purposes (combined with other local or map-based links); links in a <linklist> should be displayed
	//     in the order they are defined. Refer to those elements for additional explanation. Category: Related
	//     Links elements

	// A cross link. (cross link is used by default)
	configureAsObjectInFrame(sxModule, xq`self::link`, t('link'), {
		contextualOperations: [
			{ name: ':link-insert-linktext' },
			{ name: ':link-insert-desc' },
		],
		backgroundColor: 'grey',
		defaultTextContainer: 'linktext',
		popoverComponentName: 'DitaCrossReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-link[@format=dita]',
			targetQuery: xq`@href`,
		},
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
		createInnerJsonMl(sourceNode, _renderer) {
			return [
				'cv-inline-link',
				{
					contenteditable: 'false',
					'cv-layout': 'inline',
					'cv-show-when': 'ancestor-has-focus',
				},
				[
					'cv-content',
					evaluateXPathToString(
						xq`@href`,
						sourceNode,
						readOnlyBlueprint
					),
				],
			];
		},
	});

	// A web link. (same as above other than the popover)
	configureProperties(sxModule, xq`self::link[@format="html"]`, {
		popoverComponentName: 'WebReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-link[@format=html]',
			targetQuery: xq`@href`,
		},
	});

	// desc in link
	configureAsGroup(sxModule, xq`self::desc[parent::link]`, undefined, {
		defaultTextContainer: 'p',
		blockHeaderLeft: [],
	});

	// p in desc in link
	configureAsLine(
		sxModule,
		xq`self::p[parent::desc[parent::link]]`,
		undefined,
		{
			slant: 'italic',
		}
	);

	// linkinfo
	//     The <linkinfo> element allows you to place a descriptive paragraph following a list of links in a
	//     <linklist> element. Category: Related Links elements
	configureAsRemoved(sxModule, xq`self::linkinfo`, t('link information'));

	// linklist
	//     The <linklist> element defines an author-arranged group of links. Within <linklist>, the
	//     organization of links on final output is in the same order as originally authored in the DITA topic.
	//     Category: Related Links elements
	configureAsRemoved(sxModule, xq`self::linklist`, t('link list'));

	// linkpool
	//     The <linkpool> element defines a group of links that have common characteristics, such as type or
	//     audience or source. When links are not in a <linklist> (that is, they are in <related-links> or
	//     <linkpool> elements), the organization of links on final output is determined by the output process,
	//     not by the order that the links actually occur in the DITA topic. Category: Related Links elements
	configureAsRemoved(sxModule, xq`self::linkpool`, t('link pool'));

	// linktext
	//     The <linktext> element provides the literal label or line of text for a link. In most cases, the
	//     text of a link can be resolved during processing by cross reference with the target resource. Use
	//     the <linktext> element only when the target cannot be reached, such as when it is a peer or external
	//     link, or the target is local but not in DITA format. When used inside a topic, it will be used as
	//     the text for the specified link; when used within a map, it will be used as the text for generated
	//     links that point to the specified topic. Category: Related Links elements
	configureAsLine(sxModule, xq`self::linktext`, t('linktext'), {
		emptyElementPlaceholderText: t('type the link text'),
	});

	// no-topic-nesting
	//     The <no-topic-nesting> element is a placeholder in the DITA architecture. It is not actually used by
	//     the default DITA document types; it is for use only when creating a validly customized document type
	//     where the information designer wants to eliminate the ability to nest topics. Not intended for use
	//     by authors, and has no associated output processing. Category: Specialization elements
	configureAsRemoved(
		sxModule,
		xq`self::no-topic-nesting`,
		t('no topic nesting')
	);

	// prolog
	//     The <prolog> element contains information about the topic as an whole (for example, author
	//     information or subject category) that is either entered by the author or machine-maintained. Much of
	//     the metadata inside the <prolog> will not be displayed with the topic on output, but may be used by
	//     processes that generate search indexes or customize navigation. Category: Prolog elements
	configureAsRemoved(sxModule, xq`self::prolog`, t('metadata'));

	// related-links
	//     The related information links of a topic (<related-links> element) are stored in a special section
	//     following the body of the topic. After a topic is processed into it final output form, the related
	//     links are usually displayed at the end of the topic, although some Web-based help systems might
	//     display them in a separate navigation frame. Category: Topic elements
	configureAsOutOfOrderStructure(
		sxModule,
		xq`self::related-links`,
		t('related links'),
		{
			expression: 'compact',
			isAutoremovableIfEmpty: true,
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// searchtitle
	//     When your DITA topic is transformed to XHTML, the <searchtitle> element is used to create a title
	//     element at the top of the resulting HTML file. This title is normally used in search result
	//     summaries by some search engines, such as that in Eclipse (http://eclipse.org); if not set, the
	//     XHTML's title element defaults to the source topic's title content (which may not be as well
	//     optimized for search summaries) Category: Topic elements
	configureAsFrameWithBlock(
		sxModule,
		xq`self::searchtitle`,
		t('search title'),
		{
			emptyElementPlaceholderText: t('type the search title'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// section
	//     The <section> element represents an organizational division in a topic. Sections are used to
	//     organize subsets of information that are directly related to the topic. For example, the titles
	//     Reference Syntax, Example and Properties might represent section-level discourse within a topic
	//     about a command-line process�the content in each section relates uniquely to the subject of that
	//     topic. Multiple sections within a single topic do not represent a hierarchy, but rather peer
	//     divisions of that topic. Sections cannot be nested. A section may have an optional title. Category:
	//     Topic elements
	configureAsFrame(sxModule, xq`self::section`, t('section'), {
		contextualOperations: [
			{ name: ':section-insert-title' },
			{ name: ':contextual-unwrap-section' },
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the content'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// title in section
	configureAsTitleFrame(
		sxModule,
		xq`self::title[parent::section]`,
		undefined,
		{
			fontVariation: 'section-title',
		}
	);

	// sectiondiv
	//     The <sectiondiv> element allows logical grouping of content within a section. There is no additional
	//     semantic associated with the sectiondiv element, aside from its function as a container for other
	//     content. The sectiondiv element does not contain a title; the lowest level of titled content within
	//     a topic is the section itself. If additional hierarchy is required, nested topics should be used in
	//     place of the section.
	configureAsFrame(sxModule, xq`self::sectiondiv`, t('section division'), {
		contextualOperations: [{ name: ':contextual-unwrap-sectiondiv' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the content'),
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// shortdesc
	//     The short description (<shortdesc>) element occurs between the topic title and the topic body, as
	//     the initial paragraph-like content of a topic, or it can be embedded in an abstract element. The
	//     short description, which represents the purpose or theme of the topic, is also intended to be used
	//     as a link preview and for searching. When used within a DITA map, the short description of the
	//     <topicref> can be used to override the short description in the topic. Category: Topic elements
	configureAsFrameWithBlock(
		sxModule,
		xq`self::shortdesc`,
		t('short description'),
		{
			emptyElementPlaceholderText: t('type the short description'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// titlealts
	//     The alternate title element (<titlealts>) is optional, but can occur after the topic title. Two
	//     elements can be inserted as sub-elements of <titlealts>: navigation title <navtitle> and search
	//     title <searchtitle>. Category: Topic elements
	configureAsStructure(sxModule, xq`self::titlealts`, t('alternate titles'), {
		isAutoremovableIfEmpty: true,
	});

	// topic
	//     The <topic> element is the top-level DITA element for a single-subject topic or article. Other
	//     top-level DITA elements that are more content-specific are <concept>, <task>, <reference>, and
	//     <glossary>. Category: Topic elements
	configureAsSheetFrame(sxModule, xq`self::topic`, t('topic'), {
		defaultTextContainer: 'body',
		titleQuery: xq`fonto:curated-text-in-node(./title)`,
		blockFooter: [
			createRelatedNodesQueryWidget(xq`./related-links`),
			createRelatedNodesQueryWidget(
				xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
			),
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// topic nested in topic
	configureAsFrame(
		sxModule,
		xq`self::topic[parent::*[fonto:dita-class(., "topic/topic")]]`,
		undefined,
		{
			defaultTextContainer: 'body',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// Needed for bookmap implementation
	configureProperties(
		sxModule,
		xq`self::*[fonto:dita-class(., "topic/topic")][not(parent::*[fonto:dita-class(., "topic/topic")])]`,
		{
			titleQuery: xq`
					let $refNodeName := fonto:hierarchy-source-node(fonto:current-hierarchy-node-id())/name(),
						$title := fonto:curated-text-in-node(./*[fonto:dita-class(., "topic/title")])

					return
						if(not($refNodeName) or not(bookmap:retrieve-element-label($refNodeName)))
						then $title
						else string-join(upper-case(bookmap:retrieve-element-label($refNodeName)) || ": " || $title)`,
			blockHeaderLeft: [
				createLabelQueryWidget(xq`""`, {
					prefixQuery: xq`
							let $refNodeName := fonto:hierarchy-source-node(fonto:current-hierarchy-node-id())/name()

							return
								if(not($refNodeName) or not(bookmap:retrieve-element-label($refNodeName)) )
								then ()
								else string-join(bookmap:retrieve-element-label($refNodeName) || " | ")`,
					inline: true,
				}),
				createMarkupLabelWidget(),
			],
			priority: 10,
		}
	);

	// title in topic
	configureAsTitleFrame(sxModule, xq`self::title[parent::topic]`, undefined, {
		fontVariation: 'document-title',
	});
}
