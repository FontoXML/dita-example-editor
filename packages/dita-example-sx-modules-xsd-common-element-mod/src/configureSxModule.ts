import configureAsConref from 'fontoxml-dita/src/configureAsConref';
import configureAsSimpletableTableElements from 'fontoxml-dita/src/configureAsSimpletableTableElements';
import configureAsBlock from 'fontoxml-families/src/configureAsBlock';
import configureAsDefinitionsTableRow from 'fontoxml-families/src/configureAsDefinitionsTableRow';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock';
import configureAsGroupWithBlock from 'fontoxml-families/src/configureAsGroupWithBlock';
import configureAsImageInFrame from 'fontoxml-families/src/configureAsImageInFrame';
import configureAsInlineAnchorToStructure from 'fontoxml-families/src/configureAsInlineAnchorToStructure';
import configureAsInlineFrame from 'fontoxml-families/src/configureAsInlineFrame';
import configureAsInlineImageInFrame from 'fontoxml-families/src/configureAsInlineImageInFrame';
import configureAsInlineLink from 'fontoxml-families/src/configureAsInlineLink';
import configureAsInlineObject from 'fontoxml-families/src/configureAsInlineObject';
import configureAsInlineStructure from 'fontoxml-families/src/configureAsInlineStructure';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations';
import configureMarkupLabel from 'fontoxml-families/src/configureMarkupLabel';
import configureProperties from 'fontoxml-families/src/configureProperties';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget';
import configureAsListElements, {
	ListStyles,
} from 'fontoxml-list-flow/src/configureAsListElements';
import t from 'fontoxml-localization/src/t';
import type { SxModule } from 'fontoxml-modular-schema-experience/src/sxManager';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule: SxModule): void {
	// alt
	//     The alt element provides alternate text for an image. It is equivalent to the alt attribute on the
	//     image element; the attribute is deprecated, so the alt element should be used instead. As an
	//     element, alt provides direct text entry within an XML editor and is more easily accessed than an
	//     attribute for translation. Category: Body elements
	configureAsFrameWithBlock(sxModule, xq`self::alt`, t('alternative text'), {
		emptyElementPlaceholderText: t('Type the alternative text'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	configureAsInlineStructure(
		sxModule,
		xq`self::alt and parent::image[fonto:in-inline-layout(.)]`,
		t('alternative text')
	);

	// boolean
	//     The <boolean> element is used to express one of two opposite values, such as yes or no, on or off,
	//     true or false, high or low, and so forth. The element itself is empty; the value of the element is
	//     stored in its state attribute, and the semantic associated with the value is typically in a
	//     specialized name derived from this element. Category: Specialization elements
	configureAsRemoved(sxModule, xq`self::boolean`, t('boolean'));

	// cite
	//     The <cite> element is used when you need a bibliographic citation that refers to a book or article.
	//     It specifically identifies the title of the resource. Category: Body elements
	configureAsInlineFrame(sxModule, xq`self::cite`, t('citation'));

	// data
	//     The <data> element represents a property within a DITA topic or map. While the <data> element can be
	//     used directly to capture properties, it is particularly useful as a basis for specialization.
	//     Default processing treats the property values as an unknown kind of metadata, but custom processing
	//     can match the name attribute or specialized element to format properties as sidebars or other
	//     adornments or to harvest properties for automated processing. Category: Miscellaneous elements
	configureAsRemoved(sxModule, xq`self::data`, t('data'));

	// data-about
	//     The <data-about> element identifies the subject of a property when the subject isn't associated with
	//     the context in which the property is specified. The property itself is expressed by the <data>
	//     element. The <data-about> element handles exception cases where a property must be expressed
	//     somewhere other than inside the actual subject of the property. The <data-about> element is
	//     particularly useful as a basis for specialization in combination with the <data> element. Category:
	//     Miscellaneous elements
	configureAsRemoved(sxModule, xq`self::data-about`, t('data-about'));

	// dd
	//     The definition description (<dd>) element contains the description of a term in a definition list
	//     entry. Category: Body elements
	configureAsStructure(sxModule, xq`self::dd`, t('definition'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the definition'),
	});

	configureAsFrame(
		sxModule,
		xq`self::dd and count(preceding-sibling::* | following-sibling::*) > 1`,
		t('definition'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the definition'),
			showWhen: 'has-focus',
		}
	);

	// p in dd
	configureAsBlock(
		sxModule,
		xq`self::p[parent::dd] and not(preceding-sibling::* or following-sibling::*)`,
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('Type the definition'),
		}
	);

	// ddhd
	//     The definition descriptions heading (<ddhd>) element contains an optional heading or title for a
	//     column of descriptions or definitions in a definition list. Category: Body elements
	configureAsBlock(sxModule, xq`self::ddhd`, t('definitions title'), {
		emptyElementPlaceholderText: t('Type the title for the definitions'),
	});

	// desc
	//     The <desc> element contains the description of the current element. A description should provide
	//     more information than the title. This is its behavior in fig/table/linklist, for example. In
	//     xref/link, it provides a description of the target; processors that support it may choose to display
	//     this as hover help. In object, it contains alternate content for use when in contexts that cannot
	//     display the object. Category: Body elements
	configureAsFrame(sxModule, xq`self::desc`, t('description'), {
		emptyElementPlaceholderText: t('Type the description'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// p in desc
	configureProperties(
		sxModule,
		xq`self::p[parent::desc] and not(preceding-sibling::* or following-sibling::*)`,
		{
			emptyElementPlaceholderText: t('Type the definition'),
		}
	);

	// div
	//     Category: Body elements
	configureAsFrame(sxModule, xq`self::div`, t('division'), {
		contextualOperations: [{ name: ':contextual-unwrap-div' }],
		emptyElementPlaceholderText: t('Type the content'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// dl
	//     A definition list (<dl>) is a list of terms and corresponding definitions. The term (<dt>) is
	//     usually flush left. The description or definition (<dd>) is usually either indented and on the next
	//     line, or on the same line to the right of the term. Category: Body elements
	configureAsFrame(sxModule, xq`self::dl`, t('definition table'), {
		contextualOperations: [{ name: ':contextual-delete-dl' }],
		tabNavigationItemSelector: xq`self::dthd or self::ddhd or self::dt or self::dd`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// dlentry
	//     In a definition list, each list item is defined by the definition list entry (<dlentry>) element.
	//     The definition list entry element includes a term <dt> and one or more definitions or descriptions
	//     <dd> of that term. Category: Body elements
	configureAsDefinitionsTableRow(sxModule, xq`self::dlentry`, t('row'), {
		columns: [
			{ query: xq`./dt`, width: 1 },
			{ query: xq`./dd`, width: 2 },
		],
		contextualOperations: [
			{ name: ':dlentry-insert-dt', hideIn: ['breadcrumbs-menu'] },
			{ name: ':dlentry-insert-dd', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-dlentry--above' },
			{ name: ':contextual-insert-dlentry--below' },
			{ name: ':contextual-delete-dlentry' },
		],
		borders: true,
	});

	// dlhead
	//     The <dlhead> element contains optional headings for the term and description columns in a definition
	//     list. The definition list heading contains a heading <dthd> for the column of terms and an optional
	//     heading <ddhd>for the column of descriptions. Category: Body elements
	configureAsDefinitionsTableRow(sxModule, xq`self::dlhead`, t('header'), {
		columns: [
			{ query: xq`./dthd`, width: 1 },
			{ query: xq`./ddhd`, width: 2 },
		],
		contextualOperations: [{ name: ':contextual-delete-dlhead' }],
		borders: true,
		backgroundColor: 'black',
		showWhen: 'always',
	});

	// draft-comment
	//     The <draft-comment> element allows simple review and discussion of topic contents within the
	//     marked-up content. Use the <draft-comment> element to ask a question or make a comment that you
	//     would like others to review. To indicate the source of the draft comment or the status of the
	//     comment, use the author, time or disposition attributes. Category: Miscellaneous elements
	configureAsRemoved(sxModule, xq`self::draft-comment`, t('comment'));

	// dt
	//     The definition term <dt> element contains a term in a definition list entry. Category: Body elements
	configureAsBlock(sxModule, xq`self::dt`, t('term'), {
		emptyElementPlaceholderText: t('Type the term'),
	});
	// dt which is not the only dt in dlentry
	configureAsFrameWithBlock(
		sxModule,
		xq`self::dt and count(preceding-sibling::* | following-sibling::*) > 1`,
		t('term'),
		{
			showWhen: 'has-focus',
		}
	);

	// dthd
	//     The definition term heading (<dthd>) element is contained in a definition list head (<dlhead>) and
	//     provides an optional heading for the column of terms in a description list. Category: Body elements
	configureAsBlock(sxModule, xq`self::dthd`, t('terms title'), {
		emptyElementPlaceholderText: t('Type the title for the terms'),
	});

	// fig
	//     The figure (<fig>) element is a display context (sometimes called an exhibit) with an optional title
	//     for a wide variety of content. Most commonly, the figure element contains an image element (a
	//     graphic or artwork), but it can contain several kinds of text objects as well. A title is placed
	//     inside the figure element to provide a caption to describe the content. Category: Body elements
	configureAsFrame(sxModule, xq`self::fig`, t('figure'), {
		contextualOperations: {
			titleOperations: {
				priority: 20,
				contextualOperations: [{ name: ':fig-insert-title' }],
			},
			descOperations: {
				priority: 10,
				contextualOperations: [{ name: ':fig-insert-desc' }],
			},
			otherOperations: {
				priority: 0,
				contextualOperations: [
					{ name: ':fig-append-image', hideIn: ['context-menu'] },
					{
						name: ':fig-insert-image',
						hideIn: ['element-menu', 'breadcrumbs-menu'],
					},
					{ name: ':contextual-delete-fig' },
				],
			},
		},
		isContextMenuScopeBoundary: true,
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	configureProperties(sxModule, xq`self::fig[child::title]`, {
		contextualOperations: {
			titleOperations: {
				priority: 20,
				contextualOperations: [{ name: ':fig-delete-title' }],
			},
		},
	});

	configureProperties(sxModule, xq`self::fig[child::desc]`, {
		contextualOperations: {
			descOperations: {
				priority: 10,
				contextualOperations: [{ name: ':fig-delete-desc' }],
			},
		},
	});

	// title in fig
	configureAsTitleFrame(sxModule, xq`self::title[parent::fig]`, t('title'), {
		fontVariation: 'figure-title',
	});

	// figgroup
	//     The <figgroup> element is used only for specialization at this time. Figure groups can be used to
	//     contain multiple cross-references, footnotes or keywords, but not multipart images. Multipart images
	//     in DITA should be represented by a suitable media type displayed by the <object> element. Category:
	//     Body elements
	configureAsRemoved(sxModule, xq`self::figgroup`, t('figure group'));

	// fn
	//     Use footnote (<fn>) to annotate text with notes that are not appropriate for inclusion in line or to
	//     indicate the source for facts or other material used in the text. Category: Miscellaneous elements
	configureAsFrame(sxModule, xq`self::fn`, t('footnote'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('Type the footnote'),
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	configureAsInlineAnchorToStructure(
		sxModule,
		xq`self::fn and not(@conref) and fonto:in-inline-layout(.)`,
		t('footnote'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('Type the footnote'),
			endDelimiter: ']',
			startDelimiter: '[',
			blockHeaderLeft: [],
		}
	);

	// p in fn
	configureAsBlock(
		sxModule,
		xq`self::p[parent::fn] and not(preceding-sibling::* or following-sibling::*)`,
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('Type the footnote'),
		}
	);

	// foreign
	//     The <foreign> element is an open extension that allows information architects to incorporate
	//     existing standard vocabularies for non-textual content. like MathML and SVG, as inline objects. If
	//     <foreign> contains more than one alternative content element, they will all be processed.
	//     Specialization of <foreign> should be implemented as a domain, but for those looking for more
	//     control over the content can implement foreign vocabulary as an element specialization. Category:
	//     Specialization elements
	configureAsRemoved(sxModule, xq`self::foreign`, t('foreign'));

	// image
	//     Include artwork or images in a DITA topic by using the <image> element. The <image> element has
	//     optional attributes that indicate whether the placement of the included graphic or artwork should be
	//     inline (like a button or icon) or on a separate line for a larger image. There are also optional
	//     attributes that indicate the size to which the included graphic or artwork should be scaled. An href
	//     attribute is required on the image element, as this attribute creates a pointer to the image, and
	//     allows the output formatting processor to bring the image into the text flow. To make the intent of
	//     the image more accessible for users using screen readers or text-only readers, always include a
	//     description of the image's content in the alt element. Category: Body elements
	configureAsImageInFrame(sxModule, xq`self::image`, t('image'), {
		contextualOperations: {
			imageOperations: {
				priority: 20,
				contextualOperations: [{ name: ':contextual-edit-image' }],
			},
			otherOperations: {
				priority: 10,
				contextualOperations: [{ name: ':image-insert-alt' }],
			},
		},
		referenceQuery: xq`@href`,
	});

	configureProperties(sxModule, xq`self::image[child::alt]`, {
		contextualOperations: {
			otherOperations: {
				priority: 10,
				contextualOperations: [{ name: ':image-remove-alt' }],
			},
		},
	});

	configureAsInlineImageInFrame(
		sxModule,
		xq`self::image and fonto:in-inline-layout(.)`,
		t('inline image'),
		{
			defaultTextContainer: {
				localName: 'alt',
				namespaceURI: null,
				insert: 'always',
				implicit: 'inline',
			},
			referenceQuery: xq`@href`,
		}
	);

	// index-base
	//     The <index-base> element allows indexing extensions to be added by specializing off this element. It
	//     does not in itself have any meaning and should be ignored in processing. Category: Miscellaneous
	//     elements
	configureAsRemoved(sxModule, xq`self::index-base`, t('index-base'));

	// indexterm
	//     An <indexterm> element allows the author to indicate that a certain word or phrase should produce an
	//     index entry in the generated index. Category: Miscellaneous elements
	configureAsInlineFrame(sxModule, xq`self::indexterm`, t('index term'), {
		emptyElementPlaceholderText: t('Type the index term'),
		backgroundColor: 'blue',
	});

	// indextermref
	//     This element is not completely defined, and is reserved for future use. Category: Miscellaneous
	//     elements
	configureAsRemoved(sxModule, xq`self::indextermref`, t('indextermref'));

	// itemgroup
	//     The <itemgroup> element is reserved for use in specializations of DITA. As a container element, it
	//     can be used to sub-divide or organize elements that occur inside a list item, definition, or
	//     parameter definition. Category: Specialization elements
	configureAsRemoved(sxModule, xq`self::itemgroup`, t('itemgroup'));

	// keyword
	//     The <keyword> element identifies a keyword or token, such as a single value from an enumerated list,
	//     the name of a command or parameter, product name, or a lookup key for a message. Category: Body
	//     elements
	configureAsInlineFrame(sxModule, xq`self::keyword`, t('keyword'), {
		backgroundColor: 'blue',
	});

	// li
	//     A list (<li>) item is a single item in an ordered <ol> or unordered <ul> list. When a DITA topic is
	//     formatted for output, numbers and alpha characters are usually output with list items in ordered
	//     lists, while bullets and dashes are usually output with list items in unordered lists. Category:
	//     Body elements
	configureProperties(sxModule, xq`self::li`, {
		markupLabel: t('item'),
	});

	// lines
	//     The <lines> element may be used to represent dialogs, lists, text fragments, and so forth. The
	//     <lines> element is similar to <pre> in that hard line breaks are preserved, but the font style is
	//     not set to monospace, and extra spaces inside the lines are not preserved. Category: Body elements
	configureAsGroupWithBlock(
		sxModule,
		xq`self::lines`,
		t('text with line breaks'),
		{
			expression: 'compact',
			withNewlineBreakToken: true,
		}
	);

	// longdescref
	//     A reference to a textual description of the graphic or object. This element is a replacement for the
	//     longdescref attribute on image and object elements.
	configureAsRemoved(sxModule, xq`self::longdescref`, t('longdescref'));

	// longquoteref
	//     The <longquoteref> element provides a reference to the source of a long quote. The long quote (<lq>)
	//     element itself allows an href attribute to specify the source of a quote, but it does not allow
	//     other standard linking attributes such as keyref, scope, and format. The <longquoteref> element
	//     should be used for references that make use of these attributes.
	configureAsInlineObject(sxModule, xq`self::longquoteref`, t('source'));

	// lq
	//     The long quote (<lq>) element indicates content quoted from another source. Use the quote element
	//     <q> for short, inline quotations, and long quote <lq> for quotations that are too long for inline
	//     use, following normal guidelines for quoting other sources. You can store a URL to the source of the
	//     quotation in the href attribute; the href value may point to a DITA topic. Category: Body elements
	configureAsFrame(sxModule, xq`self::lq`, t('long quote'), {
		contextualOperations: [{ name: ':contextual-unwrap-lq' }],
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// navtitle
	//     The navigation title (<navtitle>) element is one of a set of alternate titles that can be included
	//     inside the <titlealts> element. This navigation title may differ from the first level heading that
	//     shows in the main browser window. Use <navtitle> when the actual title of the topic isn't
	//     appropriate for use in navigation panes or online contents (for example, because the actual title is
	//     too long). Category: Topic elements
	configureAsRemoved(sxModule, xq`self::navtitle`, t('navigation title'));

	configureAsFrameWithBlock(
		sxModule,
		xq`self::navtitle[parent::titlealts]`,
		undefined,
		{
			emptyElementPlaceholderText: t('Type the navigation title'),
			blockHeaderLeft: [createMarkupLabelWidget()],
		}
	);

	// note
	//     A <note> element contains information, differentiated from the main text, which expands on or calls
	//     attention to a particular point. Category: Body elements
	const NOTE_CONVERT_OPERATIONS = [
		{ name: ':note-convert-to-@type=null' },
		{ name: ':note-convert-to-@type=attention' },
		{ name: ':note-convert-to-@type=caution' },
		{ name: ':note-convert-to-@type=danger' },
		{ name: ':note-convert-to-@type=fastpath' },
		{ name: ':note-convert-to-@type=important' },
		{ name: ':note-convert-to-@type=notice' },
		{ name: ':note-convert-to-@type=remember' },
		{ name: ':note-convert-to-@type=restriction' },
		{ name: ':note-convert-to-@type=tip' },
		{ name: ':note-convert-to-@type=warning' },
		{ name: ':note-convert-to-@type=other' },
	];
	const NOTE_VISUALIZATION_BY_TYPE = {
		attention: {
			label: t('attention'),
			backgroundColor: 'yellow',
		},
		caution: {
			label: t('caution'),
			backgroundColor: 'orange',
		},
		danger: {
			label: t('danger'),
			backgroundColor: 'red',
		},
		fastpath: {
			label: t('fast path'),
			backgroundColor: 'grey',
		},
		important: {
			label: t('important'),
			backgroundColor: 'amber',
		},
		notice: {
			label: t('notice'),
			backgroundColor: 'light-blue',
		},
		remember: {
			label: t('remember'),
			backgroundColor: 'light-green',
		},
		restriction: {
			label: t('restriction'),
			backgroundColor: 'brown',
		},
		tip: {
			label: t('tip'),
			backgroundColor: 'green',
		},
		other: {
			label: t('other'),
			backgroundColor: 'grey',
		},
		warning: {
			label: t('warning'),
			backgroundColor: 'deep-orange',
		},
	};

	function getContextualOperationsForNoteType(noteType) {
		return NOTE_CONVERT_OPERATIONS.filter(function (element) {
			return !element.name.includes(noteType);
		}).concat([{ name: ':contextual-unwrap-note' }]);
	}

	configureAsFrame(sxModule, xq`self::note`, t('note'), {
		contextualOperations: getContextualOperationsForNoteType('@type=null'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
	});

	// This is an example configuration for conreffed <note> elements, which is a reuse mechanism in DITA. The
	// configureAsConref family will itself determine wether an XML tag indeed has all the required conref
	// information. Fonto will then render the note in the location of the conref, regardless of which document
	// actually contains the conreffed content.
	configureAsConref(sxModule, xq`self::note`, t('reused note'), {
		contextualOperations: [],
		popoverData: {
			editOperationName: ':contextual-edit-note[@conref]',
		},
		blockHeaderLeft: [],
		blockOutsideAfter: [],
	});

	Object.keys(NOTE_VISUALIZATION_BY_TYPE).forEach(function (noteType) {
		const noteVisualization = NOTE_VISUALIZATION_BY_TYPE[noteType];
		configureProperties(sxModule, xq`self::note[@type=${noteType}]`, {
			markupLabel: noteVisualization.label,
			contextualOperations: getContextualOperationsForNoteType(noteType),
			backgroundColor: noteVisualization.backgroundColor,
		});
	});

	// object
	//     DITA's <object> element corresponds to the HTML <object> element. Category: Body elements
	configureAsRemoved(sxModule, xq`self::object`, t('object'));

	// ol
	// li in ol
	// p in li in ol
	configureMarkupLabel(sxModule, xq`self::ol`, t('numbered list'));
	configureContextualOperations(sxModule, xq`self::ol`, [
		{ name: ':ol-convert-to-ul' },
	]);

	configureAsListElements(sxModule, {
		list: {
			selector: xq`self::ol`,
			style: ListStyles.NUMBERED,
			nodeName: 'ol',
		},
		item: {
			selector: xq`self::li`,
			nodeName: 'li',
		},
		paragraph: {
			nodeName: 'p',
		},
	});

	// p
	//     A paragraph element (<p>) is a block of text containing a single main idea. Category: Body elements
	configureAsBlock(sxModule, xq`self::p`, t('paragraph'));

	// param
	//     The parameter (<param>) element specifies a set of values that may be required by an <object> at
	//     runtime. Any number of <param> elements may appear in the content of an object in any order, but
	//     must be placed at the start of the content of the enclosing object. This element is comparable to
	//     the XHMTL <param> element. Category: Body elements
	configureAsRemoved(sxModule, xq`self::param`, t('param'));

	// ph
	//     The phrase (<ph>) element is used to organize content for reuse or conditional processing (for
	//     example, when part of a paragraph applies to a particular audience). It can be used by
	//     specializations of DITA to create semantic markup for content at the phrase level, which then allows
	//     (but does not require) specific processing or formatting. Category: Body elements
	configureAsInlineFrame(sxModule, xq`self::ph`, t('phrase'), {
		backgroundColor: 'blue',
	});

	// pre
	//     The preformatted element (<pre>) preserves line breaks and spaces entered manually by the author in
	//     the content of the element, and also presents the content in a monospaced type font (depending on
	//     your output formatting processor). Do not use <pre> when a more semantically specific element is
	//     appropriate, such as <codeblock>. Category: Body elements
	configureAsGroupWithBlock(sxModule, xq`self::pre`, t('preformatted text'), {
		expression: 'compact',
		withNewlineBreakToken: true,
		allowAutocapitalization: false,
	});

	// q
	//     A quotation element (<q>) indicates content quoted from another source. This element is used for
	//     short quotes which are displayed inline. Use the long quote element (<lq>) for quotations that
	//     should be set off from the surrounding text. Category: Body elements
	configureAsInlineFrame(sxModule, xq`self::q`, t('quote'), {
		endDelimiter: '’',
		slant: 'italic',
		startDelimiter: '‘',
	});

	// required-cleanup
	//     A <required-cleanup> element is used as a placeholder for migrated elements that cannot be
	//     appropriately tagged without manual intervention. As the element name implies, the intent for
	//     authors is to clean up the contained material and eventually get rid of the <required-cleanup>
	//     element. Authors should not insert this element into documents. Category: Specialization elements
	configureAsRemoved(
		sxModule,
		xq`self::required-cleanup`,
		t('required-cleanup')
	);

	// simpletable
	//     The <simpletable> element is used for tables that are regular in structure and do not need a
	//     caption. Choose the simple table element when you want to show information in regular rows and
	//     columns. For example, multi-column tabular data such as phone directory listings or parts lists are
	//     good candidates for simpletable. Another good use of simpletable is for information that seems to
	//     beg for a "three-part definition list"—just use the keycol attribute to indicate which column
	//     represents the "key" or term-like column of your structure. Category: Table elements
	// @NOTE: Simpletables are hardcoded to their element names.
	configureAsSimpletableTableElements(sxModule, {
		stentry: {
			defaultTextContainer: 'p',
		},
		showInsertionWidget: true,
		showSelectionWidget: true,
	});

	configureProperties(sxModule, xq`self::simpletable`, {
		markupLabel: t('simple table'),
		tabNavigationItemSelector: xq`self::stentry`,
		blockHeaderLeft: [createMarkupLabelWidget()],
	});

	// sl
	//     The simple list (<sl>) element contains a simple list of items of short, phrase-like content, such
	//     as in documenting the materials in a kit or package. Category: Body elements
	// sli
	//     A simple list item (<sli>) is a single item in a simple list <sl>. Simple list items have phrase or
	//     text content, adequate for describing package contents, for example. When a DITA topic is formatted
	//     for output, the items of a simple list are placed each on its own line, with no other prefix such as
	//     a number (as in an ordered list) or bullet (as in an unordered list). Category: Body elements
	configureMarkupLabel(sxModule, xq`self::sl`, t('simple list'));
	configureProperties(sxModule, xq`self::sli`, {
		markupLabel: t('item'),
	});

	configureAsListElements(sxModule, {
		list: {
			selector: xq`self::sl`,
			style: ListStyles.EMPTY,
		},
		item: {
			selector: xq`self::sli`,
			nodeName: 'sli',
		},
	});

	// state
	//     The <state> element specifies a name/value pair whenever it is necessary to represent a named state
	//     that has a variable value. The element is primarily intended for use in specializations to represent
	//     specific states (like logic circuit states, chemical reaction states, airplane instrumentation
	//     states, and so forth). Category: Specialization elements
	configureAsRemoved(sxModule, xq`self::state`, t('state'));

	// stentry
	//     The simpletable entry (<stentry>) element represents a single table cell, like <entry> in <table>.
	//     You can place any number of stentry cells in either an <sthead> element (for headings) or <strow>
	//     element (for rows of data). Category: Table elements
	configureProperties(sxModule, xq`self::stentry`, {
		markupLabel: t('cell'),
	});

	// sthead
	//     The simpletable header (<sthead>) element contains the table's header row. The header row is
	//     optional in a simple table. Category: Table elements
	configureProperties(sxModule, xq`self::sthead`, {
		markupLabel: t('row'),
	});

	// strow
	//     The <simpletable> row (<strow>) element specifies a row in a simple table. Category: Table elements
	configureProperties(sxModule, xq`self::strow`, {
		markupLabel: t('row'),
	});

	// term
	//     The <term> element identifies words that may have or require extended definitions or explanations.
	//     In future development of DITA, for example, terms might provide associative linking to matching
	//     glossary entries. Category: Specialization elements
	configureAsInlineFrame(sxModule, xq`self::term`, t('term'), {
		backgroundColor: 'blue',
	});

	// text
	//     The text element associates no semantics with its content. It exists to serve as a container for
	//     text where a container is needed (e.g., for conref, or for restricted content models in
	//     specializations). Unlike ph, text cannot contain images. Unlike keyword, text does not imply
	//     keyword-like semantics. The text element contains only text data, or nested text elements. All
	//     universal attributes are available on text.
	configureAsRemoved(sxModule, xq`self::text`, t('text'));

	// title
	//     The <title> element contains a heading or label for the main parts of a topic, including the topic
	//     as a whole, its sections and examples, and its labelled content, such as figures and tables.
	//     Beginning with DITA 1.1, the element may also be used to provide a title for a map. Category: Topic
	//     elements
	configureAsTitleFrame(sxModule, xq`self::title`, t('title'), {
		emptyElementPlaceholderText: t('Type the title'),
	});

	// tm
	//     The trademark (<tm>) element in DITA is used to markup and identify a term or phrase that is
	//     trademarked. Trademarks include registered trademarks, service marks, slogans and logos. Category:
	//     Miscellaneous elements
	configureAsInlineFrame(sxModule, xq`self::tm`, t('trademark'), {
		endDelimiter: '™',
	});
	configureProperties(sxModule, xq`self::tm[@tmtype="reg"]`, {
		markupLabel: t('registered trademark'),
		endDelimiter: '®',
	});

	configureProperties(sxModule, xq`self::tm[@tmtype="service"]`, {
		markupLabel: t('servicemark'),
		endDelimiter: '℠',
	});

	configureProperties(sxModule, xq`self::tm[@tmtype="reg"]`, {
		markupLabel: t('registered trademark'),
		endDelimiter: '®',
	});

	configureProperties(sxModule, xq`self::tm[@tmtype="service"]`, {
		markupLabel: t('service mark'),
		endDelimiter: '℠',
	});

	// ul
	// li in ul
	// p in li in ul
	//     In an unordered list (<ul>), the order of the list items is not significant. List items are
	//     typically styled on output with a "bullet" character, depending on nesting level. Category: Body
	//     elements
	configureMarkupLabel(sxModule, xq`self::ul`, t('bulleted list'));
	configureContextualOperations(sxModule, xq`self::ul`, [
		{ name: ':ul-convert-to-ol' },
	]);

	configureAsListElements(sxModule, {
		list: {
			selector: xq`self::ul`,
			style: ListStyles.BULLETED,
			nodeName: 'ul',
		},
		item: {
			selector: xq`self::li`,
			nodeName: 'li',
		},
		paragraph: {
			nodeName: 'p',
		},
	});

	// unknown
	//     The <unknown> element is an open extension that allows information architects to incorporate xml
	//     fragments that do not necessarily fit into an existing DITA use case. The base processing for
	//     <unknown> is to suppress unless otherwise instructed. Category: Specialization elements
	configureAsRemoved(sxModule, xq`self::unknown`, t('unknown'));

	// xref
	//     Use the cross-reference (<xref>) element to link to a different location within the current topic,
	//     or a different topic within the same help system, or to external sources, such as Web pages, or to a
	//     location in another topic. The href attribute on the <xref> element provides the location of the
	//     target. Category: Body elements
	configureAsInlineLink(sxModule, xq`self::xref`, t('link'), {
		emptyElementPlaceholderText: t('Type the link text'),
		popoverComponentName: 'DitaCrossReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=dita]',
			targetQuery: xq`@href`,
		},
	});

	configureProperties(sxModule, xq`self::xref[@format="html"]`, {
		popoverComponentName: 'WebReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-xref[@format=html]',
			targetQuery: xq`@href`,
		},
	});
}
