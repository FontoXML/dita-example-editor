import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock.js';
import configureAsMapSheetFrame from 'fontoxml-dita/src/configureAsMapSheetFrame.js';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import namespaceManager from 'fontoxml-dom-namespaces/src/namespaceManager.js';
import registerCustomXPathFunction from 'fontoxml-selectors/src/registerCustomXPathFunction.js';
import t from 'fontoxml-localization/src/t.js';

import bookmapElementLabels from './api/bookmapElementLabels.js';

const getPlaceholderOrContainerOperations = placeholderOrContainer => [
	[':contextual-insert-@href--from-template', ':contextual-insert-@href--to-existing-document'],
	[
		'contextual-topicref-move-up',
		'contextual-topicref-move-down',
		'contextual-topicref-move-to-top',
		'contextual-topicref-move-to-bottom'
	],
	[`:contextual-delete-bookmap-${placeholderOrContainer}-element`]
];

const insertTopicOperations = [
	':contextual-insert-topicref--from-template',
	':contextual-insert-topicref--to-existing-document'
];
const convertToPlaceholderOrContainerOperations = placeholderOrContainer => [
	[`:contextual-convert-to-${placeholderOrContainer}`],
	[
		'contextual-topicref-move-up',
		'contextual-topicref-move-down',
		'contextual-topicref-move-to-top',
		'contextual-topicref-move-to-bottom'
	],
	['contextual-topicref-remove']
];

function uppercaseFirstLetter(input) {
	if (input === '') {
		return input;
	}
	const firstCharacter = String.fromCodePoint(input.codePointAt(0));
	return firstCharacter.toUpperCase() + input.substr(firstCharacter.length);
}

const getSubMenuForAlternativeInsertRefElement = (
	refElementName,
	placeholderOrContainer,
	context = 'contextual'
) => ({
	subMenuLabel: uppercaseFirstLetter(bookmapElementLabels[refElementName].markupLabel),
	contents: [
		{
			contents: [
				{ name: `:${context}-insert-${refElementName}--from-template` },
				{
					name: `:${context}-insert-${refElementName}--to-existing-document`
				}
			]
		},
		{
			contents: [{ name: `:${context}-insert-${refElementName}--${placeholderOrContainer}` }]
		}
	]
});

function formatContextualOperationListWithGroups(list) {
	return list.map(group => ({
		contents: group.map(operation => ({
			name: operation,
			hideIn: ['context-menu', 'breadcrumbs-menu']
		}))
	}));
}

const getSubMenuForRefElement = (refElementName, parent, placeholderOrContainer) => ({
	subMenuLabel: uppercaseFirstLetter(bookmapElementLabels[refElementName].markupLabel),
	contents: [
		{
			contents: [
				{
					name: `:_contextual-insert-{refElementName}--from-template`,
					operationData: { refElementName: refElementName },
					tooltipContent: t(
						'Create a new topic and insert it under {PARENT_DESCRIPTION} as {ELEMENT_DESCRIPTION}.',
						{
							PARENT_DESCRIPTION: bookmapElementLabels[parent].description,
							ELEMENT_DESCRIPTION: bookmapElementLabels[refElementName].description
						}
					)
				},
				{
					name: `:_contextual-insert-{refElementName}--to-existing-document`,
					operationData: { refElementName: refElementName },
					tooltipContent: t(
						'Insert an existing topic under {PARENT_DESCRIPTION} as {ELEMENT_DESCRIPTION}.',
						{
							PARENT_DESCRIPTION: bookmapElementLabels[parent].description,
							ELEMENT_DESCRIPTION: bookmapElementLabels[refElementName].description
						}
					)
				}
			]
		},
		{
			contents: [
				{
					name: `:_contextual-insert-{elementName}--placeholder-container`,
					label: t('Insert as {CONTAINER_PLACEHOLDER}', {
						CONTAINER_PLACEHOLDER: placeholderOrContainer
					}),
					operationData: { elementName: refElementName },
					tooltipContent: t(
						'Insert {ELEMENT_DESCRIPTION} under {PARENT_DESCRIPTION} as a {CONTAINER_PLACEHOLDER}.',
						{
							PARENT_DESCRIPTION: bookmapElementLabels[parent].description,
							ELEMENT_DESCRIPTION: bookmapElementLabels[refElementName].description,
							CONTAINER_PLACEHOLDER: placeholderOrContainer
						}
					)
				}
			]
		}
	]
});

export default function configureSxModule(sxModule) {
	namespaceManager.addNamespace('bookmap', 'urn:fonto:dita:bookmap');
	registerCustomXPathFunction(
		'bookmap:retrieve-element-label',
		['xs:string'],
		'xs:string?',
		function(_dynamicContext, nodeName) {
			return (
				(bookmapElementLabels[nodeName] && bookmapElementLabels[nodeName].markupLabel) ||
				null
			);
		}
	);

	// abbrevlist
	//     The <abbrevlist> element references a list of abbreviations. It indicates to the processing software
	//     that the author wants an abbreviation list generated at the particular location. Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::abbrevlist', bookmapElementLabels.abbrevlist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::abbrevlist[not(@href)]',
		bookmapElementLabels.abbrevlist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// amendments
	//     The <amendments> element references a list of amendments or updates to the book. It indicates to the
	//     processing software that the author wants an amendments list generated at the particular location.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::amendments', bookmapElementLabels.amendments.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::amendments[not(@href)]',
		bookmapElementLabels.amendments.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// appendices
	//     The <appendices> element is an optional wrapper for <appendix> elements within a bookmap.
	configureAsRemoved(sxModule, 'self::appendices', bookmapElementLabels.appendices.markupLabel, {
		contextualOperations: [
			{
				hideIn: ['context-menu', 'breadcrumbs-menu'],
				contents: [getSubMenuForRefElement('appendix', 'appendices', 'container')]
			}
		].concat(
			formatContextualOperationListWithGroups([
				[':contextual-convert-to-container'],
				[':contextual-unwrap-appendices']
			])
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::appendices[not(@href)]',
		bookmapElementLabels.appendices.markupLabel,
		{
			contextualOperations: [
				{
					hideIn: ['context-menu', 'breadcrumbs-menu'],
					contents: [getSubMenuForRefElement('appendix', 'appendices', 'container')]
				}
			].concat(
				formatContextualOperationListWithGroups([
					[
						':contextual-insert-@href--from-template',
						':contextual-insert-@href--to-existing-document'
					],
					[':contextual-unwrap-appendices--container']
				])
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// appendix
	//     The <appendix> element references a topic as an appendix within a book. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::appendix', bookmapElementLabels.appendix.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups([
			insertTopicOperations,
			...convertToPlaceholderOrContainerOperations('container')
		])
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::appendix[not(@href)]',
		bookmapElementLabels.appendix.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// approved
	//     The <approved> element contains information about when and by whom the book was approved during its
	//     publication history. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::approved', t('approved'));

	// backmatter
	//     The <backmatter> element contains the material that follows the main body of a document and any
	//     appendixes. It may include items such as a colophon, legal notices, and various types of book lists
	//     such as a glossary or an index. Category: Bookmap elements
	configureAsMapSheetFrame(
		sxModule,
		'self::backmatter',
		bookmapElementLabels.backmatter.markupLabel,
		{
			contextualOperations: [
				{
					hideIn: ['context-menu', 'breadcrumbs-menu'],
					contents: [
						getSubMenuForRefElement('amendments', 'backmatter', 'placeholder'),
						{
							name: ':contextual-insert-booklists'
						},
						getSubMenuForRefElement('colophon', 'backmatter', 'placeholder'),
						getSubMenuForRefElement('dedication', 'backmatter', 'placeholder'),
						getSubMenuForRefElement('notices', 'backmatter', 'container'),
						{
							subMenuLabel: t('Topic'),
							contents: insertTopicOperations.map(operation => ({ name: operation }))
						}
					]
				},
				{
					name: ':contextual-delete-bookmap-container-element',
					hideIn: ['context-menu', 'breadcrumbs-menu']
				}
			],
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// bibliolist
	//     The <bibliolist> element references a list of bibliographic entries within the book. It indicates to
	//     the processing software that the author wants a bibliography, containing links to related books,
	//     articles, published papers, or other types of material, generated at the particular location.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bibliolist', bookmapElementLabels.bibliolist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::bibliolist[not(@href)]',
		bookmapElementLabels.bibliolist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// bookabstract
	//     The <bookabstract> element references a topic used within a bookmap as a brief summary of book
	//     content, generally output as part of the book's front matter. It is used to help the reader quickly
	//     evaluate the book's purpose. Category: Bookmap elements
	configureAsRemoved(
		sxModule,
		'self::bookabstract',
		bookmapElementLabels.bookabstract.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				convertToPlaceholderOrContainerOperations('placeholder')
			)
		}
	);
	configureAsMapSheetFrame(
		sxModule,
		'self::bookabstract[not(@href)]',
		bookmapElementLabels.bookabstract.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// bookchangehistory
	//     The <bookchangehistory> element contains information about the history of the book's creation and
	//     publishing lifecycle, who wrote, reviewed, edited, and tested the book, and when these events took
	//     place. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookchangehistory', t('book change history'));

	// bookevent
	//     The <bookevent> element indicates a general event in the publication history of a book. This is an
	//     appropriate element for specialization if the current set of specific book event types, that is,
	//     review, edit, test or approval, does not meed your needs. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookevent', t('book event'));

	// bookeventtype
	//     The <bookeventtype> element indicates the specific nature of a <bookevent>, such as updated,
	//     indexed, or deprecated. The required name attribute indicates the event's type. Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::bookeventtype', t('book event type'));

	// bookid
	//     The <bookid> element contains the publisher's identification information for the book, such as part
	//     number, edition number and ISBN number. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookid', t('book id'));

	// booklibrary
	//     The <booklibrary> element contains the library information for a book. Library entries contain
	//     information about the series, library, or collection of documents to which the book belongs.
	//     Category: Bookmap elements
	configureAsFrameWithBlock(sxModule, 'self::booklibrary', t('book library'), {
		contextualOperations: [
			{ name: ':contextual-delete-booklibrary', hideIn: ['structure-view'] }
		],
		emptyElementPlaceholderText: t('type the book library information'),
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// booklist
	//     The <booklist> element is a general purpose element, designed for use in specializations, that
	//     references a list of particular types of topics within the book. It indicates to the processing
	//     software that the author wants that list of topics generated at the particular location. For
	//     example, it could be used in a specialization to reference the location of a list of program
	//     listings or of authors of topics. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::booklist', bookmapElementLabels.booklist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::booklist[not(@href)]',
		bookmapElementLabels.booklist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// booklists
	//     The <booklists> element references lists of various kinds within the book. For example, it can be
	//     used within front matter to reference a <toc>, <tablelist>, and <figurelist>, or within back matter
	//     to reference a <glossarylist>, <indexlist>, and <abbrevlist>. It indicates to the processing
	//     software that the author wants the lists generated at the <booklists> location. Category: Bookmap
	//     elements

	configureAsMapSheetFrame(
		sxModule,
		'self::booklists',
		bookmapElementLabels.booklists.markupLabel,
		{
			contextualOperations: [
				{
					hideIn: ['context-menu', 'breadcrumbs-menu'],
					contents: [
						getSubMenuForRefElement('abbrevlist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('bibliolist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('booklist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('figurelist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('glossarylist', 'booklists', 'container'),
						getSubMenuForRefElement('indexlist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('tablelist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('trademarklist', 'booklists', 'placeholder'),
						getSubMenuForRefElement('toc', 'booklists', 'placeholder')
					]
				},
				{
					contents: [
						'contextual-topicref-move-up',
						'contextual-topicref-move-down',
						'contextual-topicref-move-to-top',
						'contextual-topicref-move-to-bottom'
					].map(operation => ({
						name: operation,
						hideIn: ['context-menu', 'breadcrumbs-menu']
					}))
				},
				{
					contents: [
						{
							name: ':contextual-delete-bookmap-container-element',
							hideIn: ['context-menu', 'breadcrumbs-menu']
						}
					]
				}
			],
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// bookmap
	//     The <bookmap> element is a map file used to organize DITA content into a traditional book format.
	//     Category: Bookmap elements
	configureAsMapSheetFrame(sxModule, 'self::bookmap', bookmapElementLabels.bookmap.markupLabel, {
		contextualOperations: [
			{
				contents: [
					{ name: ':bookmap-insert-title', hideIn: ['structure-view'] },
					{ name: ':bookmap-insert-book-title', hideIn: ['structure-view'] },
					{
						menuGroupHeading: 'Book title',
						contents: [
							{
								contents: [
									{
										name: ':bookmap-insert-book-library',
										hideIn: ['structure-view']
									},
									{
										name: ':bookmap-insert-alternative-title',
										hideIn: ['structure-view']
									}
								]
							}
						]
					}
				],
				hideIn: ['structure-view']
			},

			{
				hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu'],
				contents: [{ name: ':contextual-insert-frontmatter' }]
			},
			{
				hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu'],
				contents: [
					getSubMenuForAlternativeInsertRefElement('chapter', 'container', 'bookmap'),
					getSubMenuForAlternativeInsertRefElement('part', 'container', 'bookmap')
				]
			},
			{
				hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu'],
				contents: [
					getSubMenuForAlternativeInsertRefElement('appendices', 'container', 'bookmap'),
					getSubMenuForAlternativeInsertRefElement('appendix', 'container', 'bookmap')
				]
			},
			{
				hideIn: ['context-menu', 'breadcrumbs-menu', 'element-menu'],
				contents: [{ name: ':contextual-insert-backmatter' }]
			}
		],
		defaultTextContainer: 'title',
		titleQuery: `
			let $title := if(./title) then ./title else ./booktitle/mainbooktitle
			return $title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
		visibleChildSelectorOrNodeSpec: 'self::title or self::booktitle',
		blockFooter: [
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(name())]'
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// title in map
	configureAsTitleFrame(sxModule, 'self::title[parent::bookmap]', undefined, {
		fontVariation: 'collection-title'
	});

	// bookmeta
	//     The <bookmeta> element contains information about the book that is not considered book content, such
	//     as copyright information, author information, and any classifications. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookmeta', t('book meta'));

	// booknumber
	//     The <booknumber> element contains the book's form number, such as SC21-1920. Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::booknumber', t('book number'));

	// bookowner
	//     The <bookowner> element contains the owner of the copyright. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookowner', t('book owner'));

	// bookpartno
	//     The <bookpartno> element contains the book's part number; such as 99F1234. This is generally the
	//     number that the publisher uses to identify the book for tracking purposes. Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::bookpartno', t('book part number'));

	// bookrestriction
	//     The <bookrestriction> element indicates whether the book is classified, or restricted in some way.
	//     The value attribute indicates the restrictions; this may be a string like "All Rights Reserved,"
	//     representing the publisher's copyright restrictions. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookrestriction', t('book restriction'));

	// bookrights
	//     The <bookrights> element contains the information about the legal rights associated with the book,
	//     including copyright dates and owners. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::bookrights', t('book rights'));

	// booktitle
	//     The <booktitle> element contains the title information for a book. , including <booklibrary> data, a
	//     <maintitle> and subtitle (<titlealt>) as required. Category: Bookmap elements
	configureAsFrame(sxModule, 'self::booktitle', t('book title'), {
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// booktitlealt
	//     The <booktitlealt> element contains the alternative title, subtitle, or short title for a book.
	//     Category: Bookmap elements
	configureAsFrameWithBlock(sxModule, 'self::booktitlealt', t('alternative title'), {
		contextualOperations: [
			{ name: ':contextual-delete-booktitlealt', hideIn: ['structure-view'] }
		],
		emptyElementPlaceholderText: t('type the alternative title'),
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// chapter
	//     The <chapter> element references a topic as a chapter within a book. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::chapter', bookmapElementLabels.chapter.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups([
			insertTopicOperations,
			...convertToPlaceholderOrContainerOperations('container')
		])
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::chapter[not(@href)]',
		bookmapElementLabels.chapter.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// colophon
	//     The <colophon> element references a topic describing how this document was created. In publishing, a
	//     colophon describes details of the production of a book. This information generally includes the
	//     typefaces used, and often the names of their designers; the paper, ink and details of the binding
	//     materials and methods may also receive mention. In the case of technical books, a colophon may
	//     specify the software used to prepare the text and diagrams for publication. Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::colophon', bookmapElementLabels.colophon.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::colophon[not(@href)]',
		bookmapElementLabels.colophon.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// completed
	//     The <completed> element indicates a completion date for some type of book event, such as a review,
	//     editing, or testing. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::completed', t('completed'));

	// copyrfirst
	//     The <copyfirst> element contains the first copyright year within a multiyear copyright statement.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::copyrfirst', t('copyright year first'));

	// copyrlast
	//     The <copylast> element contains the last copyright year within a multiyear copyright statement.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::copyrlast', t('copyright year last'));

	// day
	//     The <day> element denotes a day of the month. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::day', t('day'));

	// dedication
	//     The <dedication> element references a topic containing a dedication for the book, such as to a
	//     person or group. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::dedication', bookmapElementLabels.dedication.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::dedication[not(@href)]',
		bookmapElementLabels.dedication.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// draftintro
	//     The <draftintro> element references a topic used as an introduction to the draft of this book.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::draftintro', bookmapElementLabels.draftintro.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups([
			insertTopicOperations,
			...convertToPlaceholderOrContainerOperations('container')
		])
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::draftintro[not(@href)]',
		bookmapElementLabels.draftintro.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// edited
	//     The <edited> element contains information about when and by whom the book was edited during its
	//     publication history. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::edited', t('edited'));

	// edition
	//     The <edition> element contains the edition number information, such as First Edition, or Third
	//     Edition, used by a publisher to identify a book. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::edition', t('edition'));

	// figurelist
	//     The <figurelist> element references a list of figures in the book. It indicates to the processing
	//     software that the author wants a list of figures generated at the particular location. Category:
	//     Bookmap elements
	configureAsRemoved(sxModule, 'self::figurelist', bookmapElementLabels.figurelist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::figurelist[not(@href)]',
		bookmapElementLabels.figurelist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// frontmatter
	//     The <frontmatter> element contains the material that precedes the main body of a document. It may
	//     include items such as an abstract, a preface, and various types of book lists such as a <toc>,
	//     <tablelist>, or <figurelist>. Category: Bookmap elements
	configureAsMapSheetFrame(
		sxModule,
		'self::frontmatter',
		bookmapElementLabels.frontmatter.markupLabel,
		{
			contextualOperations: [
				{
					hideIn: ['context-menu', 'breadcrumbs-menu'],
					contents: [
						getSubMenuForRefElement('bookabstract', 'frontmatter', 'placeholder'),
						{
							name: ':contextual-insert-booklists'
						},
						getSubMenuForRefElement('colophon', 'frontmatter', 'placeholder'),
						getSubMenuForRefElement('dedication', 'frontmatter', 'placeholder'),
						getSubMenuForRefElement('draftintro', 'frontmatter', 'container'),
						getSubMenuForRefElement('notices', 'frontmatter', 'container'),
						getSubMenuForRefElement('preface', 'frontmatter', 'container'),
						{
							subMenuLabel: t('Topic'),
							contents: insertTopicOperations.map(operation => ({ name: operation }))
						}
					]
				},
				{
					contents: [
						{
							name: ':contextual-delete-bookmap-container-element',
							hideIn: ['context-menu', 'breadcrumbs-menu']
						}
					]
				}
			],
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// glossarylist
	//     The <glossarylist> element references a list of glossary entries within the book. It indicates to
	//     the processing software that the author wants a glossary list generated at the particular location.
	//     Category: Bookmap elements
	configureAsRemoved(
		sxModule,
		'self::glossarylist',
		bookmapElementLabels.glossarylist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...convertToPlaceholderOrContainerOperations('container')
			])
		}
	);
	configureAsMapSheetFrame(
		sxModule,
		'self::glossarylist[not(@href)]',
		bookmapElementLabels.glossarylist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// indexlist
	//     The <indexlist> element lists the index entries in the book. It indicates to the processing software
	//     that the author wants an index generated at the particular location. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::indexlist', bookmapElementLabels.indexlist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::indexlist[not(@href)]',
		bookmapElementLabels.indexlist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// isbn
	//     The <isbn> element contains the book's International Standard Book Number (ISBN). Category: Bookmap
	//     elements
	configureAsRemoved(sxModule, 'self::isbn', t('isbn'));

	// mainbooktitle
	//     The <mainbooktitle> element contains the primary title information for a book. Category: Bookmap
	//     elements
	configureAsTitleFrame(sxModule, 'self::mainbooktitle', t('main book title'), {
		fontVariation: 'collection-title',
		emptyElementPlaceholderText: t('type the book title')
	});

	// maintainer
	//     The <maintainer> element contains information about who maiintains the document; this can be an
	//     organization or a person. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::maintainer', t('maintainer'));

	// month
	//     The <month> element denotes a month of the year. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::month', t('month'));

	// notices
	//     The <notices> element references special notice information, for example, legal notices about
	//     supplementary copyrights and trademarks associated with the book. . Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::notices', bookmapElementLabels.notices.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups([
			insertTopicOperations,
			...convertToPlaceholderOrContainerOperations('container')
		])
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::notices[not(@href)]',
		bookmapElementLabels.notices.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// organization
	//     The <organization> element contains the name of an organization. Note that unlike
	//     <organizationname>, the <organization> element is not restricted to usage within
	//     <authorinformation>; it does not have to contain the name of an authoring organization. Category:
	//     Bookmap elements
	configureAsRemoved(sxModule, 'self::organization', t('organization'));

	// part
	//     The <part> element references a part topic for the book. A new part is started. Use <part> to divide
	//     a document's chapters into logical groupings. For example, in a document that contains both guide
	//     and reference information, you can define two parts, one containing the guide information and the
	//     other containing the reference information. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::part', bookmapElementLabels.part.markupLabel, {
		contextualOperations: [
			{
				hideIn: ['context-menu', 'breadcrumbs-menu'],
				contents: [
					getSubMenuForRefElement('chapter', 'part', 'container'),
					{
						subMenuLabel: t('Topic'),
						contents: insertTopicOperations.map(operation => ({
							name: operation
						}))
					}
				]
			}
		].concat(
			formatContextualOperationListWithGroups(
				convertToPlaceholderOrContainerOperations('container')
			)
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::part[not(@href)]',
		bookmapElementLabels.part.markupLabel,
		{
			contextualOperations: [
				{
					hideIn: ['context-menu', 'breadcrumbs-menu'],
					contents: [
						getSubMenuForRefElement('chapter', 'part', 'container'),
						{
							subMenuLabel: t('Topic'),
							contents: insertTopicOperations.map(operation => ({
								name: operation
							}))
						}
					]
				}
			].concat(
				formatContextualOperationListWithGroups(
					getPlaceholderOrContainerOperations('container')
				)
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// person
	//     The <person> element contains information about the name of a person. Note that unlike the
	//     <personname> element, the <person> element is not restricted to describing the names of authors.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::person', t('person'));

	// preface
	//     The <preface> element references introductory information about a book, such as the purpose and
	//     structure of the document. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::preface', bookmapElementLabels.preface.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups([
			insertTopicOperations,
			...convertToPlaceholderOrContainerOperations('container')
		])
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::preface[not(@href)]',
		bookmapElementLabels.preface.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups([
				insertTopicOperations,
				...getPlaceholderOrContainerOperations('container')
			]),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// printlocation
	//     The <printlocation> element indicates the location where the book was printed. Customarily, the
	//     content is restricted to the name of the country. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::printlocation', t('print location'));

	// published
	//     The <published> element contains information about the person or organization publishing the book,
	//     the dates when it was started and completed, and any special restrictions associated with it.
	//     Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::published', t('published'));

	// publisherinformation
	//     The <publisherinformation> contains information about what group or person published the book, where
	//     it was published, and certain details about its publication history. Other publication history
	//     information is found in the <bookchangehistory> element. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::publisherinformation', t('publisher information'));

	// publishtype
	//     The <publishtype> element indicates whether the book is generally available or is restricted in some
	//     way. The value attribute indicates the restrictions. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::publishtype', t('publish type'));

	// reviewed
	//     The <reviewed> element contains information about when and by whom the book was reviewed during its
	//     publication history. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::reviewed', t('reviewed'));

	// revisionid
	//     The <revisionid> element indicates the revision number or revision ID of the book. The processing
	//     implementation determines how the level is displayed. Common methods include using a dash, for
	//     example "-01". or a period, such as ".01". Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::revisionid', t('revision id'));

	// started
	//     The <started> element indicates a start date for some type of book event, such as a review, editing,
	//     or testing. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::started', t('started'));

	// summary
	//     The <summary> element contains a text summary associated with a book event (such as <approved> or
	//     <reviewed>) or with the list of copyrights for the book. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::summary', t('summary'));

	// tablelist
	//     The <tablelist> element references a list of tables within the book. It indicates to the processing
	//     software that the author wants a list of tables generated at the particular location. Category:
	//     Bookmap elements
	configureAsRemoved(sxModule, 'self::tablelist', bookmapElementLabels.tablelist.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::tablelist[not(@href)]',
		bookmapElementLabels.tablelist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// tested
	//     The <tested> element contains information about when and by whom the book was tested during its
	//     publication history. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::tested', t('tested'));

	// toc
	//     The <toc> element references the table of contents within the book. It indicates to the processing
	//     software that the author wants a table of contents generated at the particular location. Category:
	//     Bookmap elements
	configureAsRemoved(sxModule, 'self::toc', bookmapElementLabels.toc.markupLabel, {
		contextualOperations: formatContextualOperationListWithGroups(
			convertToPlaceholderOrContainerOperations('placeholder')
		)
	});
	configureAsMapSheetFrame(
		sxModule,
		'self::toc[not(@href)]',
		bookmapElementLabels.toc.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// trademarklist
	//     The <trademarklist> element references a list of trademarks within the book. It indicates to the
	//     processing software that the author wants a list of trademarks generated at the particular location.
	//     Category: Bookmap elements
	configureAsRemoved(
		sxModule,
		'self::trademarklist',
		bookmapElementLabels.trademarklist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				convertToPlaceholderOrContainerOperations('placeholder')
			)
		}
	);
	configureAsMapSheetFrame(
		sxModule,
		'self::trademarklist[not(@href)]',
		bookmapElementLabels.trademarklist.markupLabel,
		{
			contextualOperations: formatContextualOperationListWithGroups(
				getPlaceholderOrContainerOperations('placeholder')
			),
			titleQuery: 'upper-case(bookmap:retrieve-element-label(name()))',
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// volume
	//     The <volume> element contains the book's volume number, such as Volume 2. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::volume', t('volume'));

	// year
	//     The <year> element denotes a year. Category: Bookmap elements
	configureAsRemoved(sxModule, 'self::year', t('year'));
}
