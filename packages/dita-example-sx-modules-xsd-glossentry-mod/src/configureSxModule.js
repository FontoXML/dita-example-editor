import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock.js';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// glossAbbreviation
	//     The <glossAbbreviation> element provides an abbreviated form of the term contained in a <glossterm>
	//     element.
	configureAsFrameWithBlock(sxModule, 'self::glossAbbreviation', t('abbreviation'), {
		emptyElementPlaceholderText: t('type the abbreviation for this term'),
		isRemovableIfEmpty: false,
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossAcronym
	//     The <glossAcronym> element defines an acronym as an alternate form for the term defined in the
	//     <glossterm> element.
	configureAsFrameWithBlock(sxModule, 'self::glossAcronym', t('acronym'), {
		emptyElementPlaceholderText: t('type the acronym for this term'),
		isRemovableIfEmpty: false,
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossAlt
	//     The <glossAlt> element contains a variant term for the preferred term. The variant should have the
	//     same meaning as the term in the <glossterm> element; the variant is simply another way to refer to
	//     the same term. There may be many ways to refer to a term; each variant is placed in its own
	//     <glossAlt> element.
	configureAsFrame(sxModule, 'self::glossAlt', t('variation'), {
		contextualOperations: [
			{ name: ':glossAlt-convert-to-glossAbbreviation' },
			{ name: ':glossAlt-convert-to-glossAcronym' },
			{ name: ':glossAlt-convert-to-glossShortForm' },
			{ name: ':glossAlt-convert-to-glossSynonym' },
			{ name: ':glossAlt-insert-glossUsage' },
			{ name: ':contextual-delete-glossAlt' }
		],
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// glossAlternateFor
	//     The <glossAlternateFor> element indicates when a variant term has a relationship to another variant
	//     term as well as to the preferred term.
	configureAsRemoved(sxModule, 'self::glossAlternateFor', t('alternate for'));

	// glossBody
	//     The <glossbody> element is used to provide details about a glossary term (such as part of speech or
	//     additional forms of the term).
	configureAsStructure(sxModule, 'self::glossBody', t('body'), {
		isAutoremovableIfEmpty: true
	});

	// glossdef
	//     The <glossdef> element specifies the definition of one sense of a term. If a term has multiple
	//     senses, create a separate <glossentry> topic to define each sense. Category: Glossentry elements
	configureAsFrameWithBlock(sxModule, 'self::glossdef', t('definition'), {
		emptyElementPlaceholderText: t('define the term'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossentry
	//     The <glossentry> element defines a single sense of a glossary term. The expected book processing is
	//     to sort and group the glossary entries based on the localized term so a back-of-the-book glossary
	//     can contain a collated list of terms with the definitions of the senses of the terms indented under
	//     the terms. The glossary can have a different organization in different languages depending on the
	//     translation of the terms. One possible online processing is to associate a hotspot for mentions of
	//     terms in <term> elements and display the definition on hover or click. Glossary entries for
	//     different term senses can be reused independently of one another. Category: Glossentry elements
	configureAsSheetFrame(sxModule, 'self::glossentry', t('entry'), {
		titleQuery:
			'./glossterm//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()',
		blockFooter: [
			createRelatedNodesQueryWidget('./related-links'),
			createRelatedNodesQueryWidget(
				'descendant::fn[not(@conref) and fonto:in-inline-layout(.)]'
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossentry nested in topic (including glossgroup)
	configureAsFrame(
		sxModule,
		'self::glossentry[parent::*[fonto:dita-class(., "topic/topic")]]',
		undefined,
		{
			contextualOperations: [
				{ name: ':glossentry-insert-glossdef' },
				{ name: ':glossentry-insert-glossUsage' },
				{ name: ':contextual-insert-glossentry--above' },
				{ name: ':contextual-insert-glossentry--below' },
				{ name: ':contextual-delete-glossentry' }
			],
			blockFooter: [createRelatedNodesQueryWidget('./related-links')],
			blockHeaderLeft: [createMarkupLabelWidget()],
			blockOutsideAfter: [createElementMenuButtonWidget()]
		}
	);

	// glossPartOfSpeech
	//     Identifies the part of speech for the preferred and alternate terms. Alternate terms must have the
	//     same part of speech as the preferred term because all terms in the glossentry topic designate the
	//     same subject. If the part of speech isn't specified, the default is a noun for the standard
	//     enumeration.
	configureAsRemoved(sxModule, 'self::glossPartOfSpeech', t('part of speech'));

	// glossProperty
	//     The <glossProperty> element is an extension point which allows additional details about the
	//     preferred term or its subject.
	configureAsRemoved(sxModule, 'self::glossProperty', t('property'));

	// glossScopeNote
	//     A clarification of the subject designated by the <glossterm> such as examples of included or
	//     excluded companies or products. For instance, a scope note for "Linux" might explain that the term
	//     doesn't apply to UNIX products and give some examples of Linux products that are included as well as
	//     UNIX products that are excluded.
	configureAsRemoved(sxModule, 'self::glossScopeNote', t('scope note'));

	// glossShortForm
	//     The <glossShortForm> element provides a shorter alternative to the primary term specified in the
	//     <glossterm> element.
	configureAsFrameWithBlock(sxModule, 'self::glossShortForm', t('short form'), {
		emptyElementPlaceholderText: t('type the short form for this term'),
		isRemovableIfEmpty: false,
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossStatus
	//     Identifies the usage status of a preferred or alternate term. If the status isn't specified, the
	//     <glossterm> provides a preferred term and an alternate term provides an allowed term.
	configureAsRemoved(sxModule, 'self::glossStatus', t('status'));

	// glossSurfaceForm
	//     The <glossSurfaceForm> element specifies an unambiguous presentation of the <glossterm> that may
	//     combine multiple forms. The surface form is suitable to introduce the term in new contexts.
	configureAsRemoved(sxModule, 'self::glossSurfaceForm', t('surface form'));

	// glossSymbol
	//     The <glossSymbol> element identifies a standard image associated with the subject of the
	//     <glossterm>.
	configureAsRemoved(sxModule, 'self::glossSymbol', t('symbol'));

	// glossSynonym
	//     Provides a term that is a synonym of the primary value in the <glossterm> element.
	configureAsFrameWithBlock(sxModule, 'self::glossSynonym', t('synonym'), {
		emptyElementPlaceholderText: t('type the synonym for this term'),
		isRemovableIfEmpty: false,
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// glossterm
	//     The <glossterm> element specifies the preferred term associated with a definition of a sense. If the
	//     same term has multiple senses, create a separate <glossentry> topic for each sense. Category:
	//     Glossentry elements
	configureAsTitleFrame(sxModule, 'self::glossterm', t('term'), {
		emptyElementPlaceholderText: t('type the term')
	});

	// glossUsage
	//     The <glossUsage> element provides information about the correct use of a term, such as where or how
	//     it can be used.
	configureAsFrame(sxModule, 'self::glossUsage', t('usage'), {
		emptyElementPlaceholderText: t('explain how this term may be used'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	configureAsFrame(sxModule, 'self::glossUsage[parent::glossAlt]', t('usage'), {
		emptyElementPlaceholderText: t('explain how this variation may be used'),
		defaultTextContainer: 'p',
		blockHeaderLeft: [createMarkupLabelWidget()]
	});
}
