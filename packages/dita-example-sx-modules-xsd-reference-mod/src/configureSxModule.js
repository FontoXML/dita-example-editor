import configureAsBlock from 'fontoxml-families/src/configureAsBlock.js';
import configureAsDefinitionsTableRow from 'fontoxml-families/src/configureAsDefinitionsTableRow.js';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsSheetFrame from 'fontoxml-families/src/configureAsSheetFrame.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import configureProperties from 'fontoxml-families/src/configureProperties.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import createRelatedNodesQueryWidget from 'fontoxml-families/src/createRelatedNodesQueryWidget.js';
import t from 'fontoxml-localization/src/t.js';
import xq from 'fontoxml-selectors/src/xq';

export default function configureSxModule(sxModule) {
	// propdesc
	//     The <propdesc> element is used to provide a short description of the property type and its listed
	//     values (or just the value). Category: Reference elements
	configureAsStructure(sxModule, xq`self::propdesc`, t('description'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the description')
	});

	// p in propdesc
	configureProperties(
		sxModule,
		xq`self::p[parent::propdesc] and not(preceding-sibling::p or following-sibling::p)`,
		{
			emptyElementPlaceholderText: t('type the description')
		}
	);

	// propdeschd
	//     The propdeschd element supports regular headings for the description column of a property table.
	//     Category: Reference elements
	configureAsStructure(sxModule, xq`self::propdeschd`, t('descriptions title'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the title for the descriptions')
	});

	// p in propdeschd
	configureProperties(
		sxModule,
		xq`self::p[parent::propdeschd] and not(preceding-sibling::p or following-sibling::p)`,
		{
			emptyElementPlaceholderText: t('type the title for the descriptions')
		}
	);

	// properties
	//     The <properties> element gives a list of properties for the subject of the current topic, for
	//     example whether a class is public or protected. Each property can include the type, value, and a
	//     description. The typical rendering is usually in a table-like format. To represent multiple values
	//     for a type, just create additional property elements and use only the <propvalue> element (and
	//     <propdesc> when needed) for each successive value. Category: Reference elements
	configureAsFrame(sxModule, xq`self::properties`, t('properties'), {
		contextualOperations: [{ name: ':contextual-delete-properties' }],
		tabNavigationItemSelector:
			xq`name() = ("proptypehd", "propvaluehd", "propdeschd", "proptype", "propvalue", "propdesc")`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// property
	//     The <property> element represents a property of the current topic's subject. For example, if the
	//     current topic is a class, the property might show that the class is protected rather than public. It
	//     contains three optional elements: type, value, and description. Category: Reference elements
	configureAsDefinitionsTableRow(sxModule, xq`self::property`, t('property'), {
		columns: [
			{
				query: xq`./proptype`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/proptype) and not(child::prophead/proptypehd)]`,
				clickOperationWhenEmpty: ':property-insert-proptype'
			},
			{
				query: xq`./propvalue`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/propvalue) and not(child::prophead/propvaluehd)]`,
				clickOperationWhenEmpty: ':property-insert-propvalue'
			},
			{
				query: xq`./propdesc`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/propdesc) and not(child::prophead/propdeschd)]`,
				clickOperationWhenEmpty: ':property-insert-propdesc'
			}
		],
		contextualOperations: [
			{ name: ':property-insert-proptype' },
			{ name: ':property-insert-propvalue' },
			{ name: ':property-insert-propdesc' },
			{ name: ':contextual-insert-property--above' },
			{ name: ':contextual-insert-property--below' },
			{ name: ':contextual-delete-property' }
		],
		borders: true
	});

	// prophead
	//     The prophead element supports regular headings for the properties element. Category: Reference
	//     elements
	configureAsDefinitionsTableRow(sxModule, xq`self::prophead`, t('header'), {
		columns: [
			{
				query: xq`./proptypehd`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/proptype) and not(child::prophead/proptypehd)]`,
				clickOperationWhenEmpty: ':prophead-insert-proptypehd'
			},
			{
				query: xq`./propvaluehd`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/propvalue) and not(child::prophead/propvaluehd)]`,
				clickOperationWhenEmpty: ':prophead-insert-propvaluehd'
			},
			{
				query: xq`./propdeschd`,
				width: 1,
				hideColumnIfQueryIsTrue:
					xq`parent::properties[not(child::property/propdesc) and not(child::prophead/propdeschd)]`,
				clickOperationWhenEmpty: ':prophead-insert-propdeschd'
			}
		],
		borders: true,
		backgroundColor: 'black',
		showWhen: 'always',
		contextualOperations: [
			{ name: ':prophead-insert-proptypehd' },
			{ name: ':prophead-insert-propvaluehd' },
			{ name: ':prophead-insert-propdeschd' },
			{ name: ':contextual-delete-prophead' }
		]
	});

	// proptype
	//     The proptype element describes the type of property. Category: Reference elements
	configureAsBlock(sxModule, xq`self::proptype`, t('type'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		emptyElementPlaceholderText: t('type the property type')
	});

	// proptypehd
	//     The proptypehd element supports regular headings for the type column of a property table.
	//     Category: Reference elements
	configureAsStructure(sxModule, xq`self::proptypehd`, t('type title'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the title for the property type')
	});

	// p in proptypehd
	configureProperties(
		sxModule,
		xq`self::p[parent::proptypehd] and not(preceding-sibling::p or following-sibling::p)`,
		{
			emptyElementPlaceholderText: t('type the title for the property type')
		}
	);

	// propvalue
	//     The <propvalue> element indicates the value or values for the current property type. You can put
	//     values in separate rows if they need separate descriptions, and just leave the <proptype> element
	//     blank. Category: Reference elements
	configureAsBlock(sxModule, xq`self::propvalue`, t('value'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		emptyElementPlaceholderText: t('type the value')
	});

	// propvaluehd
	//     The propvaluehd element supports regular headings for the value column of a property table.
	//     Category: Reference elements
	configureAsStructure(sxModule, xq`self::propvaluehd`, t('value title'), {
		contextualOperations: [{ name: ':contextual-delete-properties-column' }],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the title for the property value')
	});

	// p in propvaluehd
	configureProperties(
		sxModule,
		xq`self::p[parent::propvaluehd] and not(preceding-sibling::p or following-sibling::p)`,
		{
			emptyElementPlaceholderText: t('type the title for the property value')
		}
	);

	// refbody
	//     The <refbody> element is a container for the main content of the reference topic. Reference topics
	//     limit the body structure to tables (both simple and standard), property lists, syntax sections, and
	//     generic sections and examples, in any sequence or number. Category: Reference elements
	configureAsStructure(sxModule, xq`self::refbody`, t('body'), {
		defaultTextContainer: 'section',
		isRemovableIfEmpty: false
	});

	// section in refbody/refbodydiv
	configureContextualOperations(
		sxModule,
		xq`self::section[(parent::refbody or parent::refbodydiv) and child::*[not(self::table or self::simpletable)]]`,
		[{ name: ':section-insert-title' }, { name: ':contextual-delete-section' }]
	);

	// example in refbody/refbodydiv
	configureContextualOperations(
		sxModule,
		xq`self::example[(parent::refbody or parent::refbodydiv) and child::*[not(self::table or self::simpletable)]]`,
		[{ name: ':example-insert-title' }, { name: ':contextual-delete-example' }]
	);

	// refbodydiv
	//     The <refbodydiv> element is similar to the <bodydiv> element in that it provides an informal
	//     container for content that may be grouped within a reference. Reference topics place many
	//     restrictions on their content compared to generic topics; the <refbodydiv> element maintains these
	//     restrictions by only allowing elements that are already available within the body of a reference.
	//     There are no additional semantics attached to the <refbodydiv> element; it is purely a grouping
	//     element provided to help organize content.
	configureAsFrame(sxModule, xq`self::refbodydiv`, t('body division'), {
		contextualOperations: [{ name: ':contextual-unwrap-refbodydiv' }],
		defaultTextContainer: 'section',
		emptyElementPlaceholderText: t('type the content'),
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// reference
	//     The <reference> element defines a top-level container for a reference topic. Reference topics
	//     document programming constructs or facts about a product. Examples of reference topics include
	//     language elements, class descriptions, commands, functions, statements, protocols, types,
	//     declarators, operands, and API information, which provide quick access to facts, but no explanation
	//     of concepts or procedures. Reference topics have the same high-level structure as any other topic
	//     type, with a title, short description, and body. Within the body, reference topics are typically
	//     organized into one or more sections, property lists, and tables. The reference topic type provides
	//     general rules that apply to all kinds of reference information, using elements like <refsyn> for
	//     syntax or signatures, and <properties> for lists of properties and values. Category: Reference
	//     elements
	configureAsSheetFrame(sxModule, xq`self::reference`, t('reference'), {
		defaultTextContainer: 'refbody',
		titleQuery:
			xq`./title//text()[not(ancestor::*[name() = ("sort-at", "draft-comment", "foreign", "unknown", "required-cleanup", "image")])]/string() => string-join()`,
		blockFooter: [
			createRelatedNodesQueryWidget(xq`./related-links`),
			createRelatedNodesQueryWidget(
				xq`descendant::fn[not(@conref) and fonto:in-inline-layout(.)]`
			)
		],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// reference nested in topic
	configureAsFrame(
		sxModule,
		xq`self::reference[parent::*[fonto:dita-class(., "topic/topic")]]`,
		undefined,
		{
			defaultTextContainer: 'refbody',
			blockFooter: [createRelatedNodesQueryWidget(xq`./related-links`)],
			blockHeaderLeft: [createMarkupLabelWidget()]
		}
	);

	// title in reference
	configureAsTitleFrame(sxModule, xq`self::title[parent::reference]`, undefined, {
		fontVariation: 'document-title'
	});

	// refsyn
	//     The <refsyn> element is a special section inside a reference topic. The section often contains
	//     syntax or signature content (for example, a command-line utility's calling syntax, or an API's
	//     signature). The <refsyn> contains a brief, possibly diagrammatic description of the subject's
	//     interface or high-level structure. Category: Reference elements
	configureAsFrame(sxModule, xq`self::refsyn`, t('reference syntax'), {
		contextualOperations: [
			{ name: ':refsyn-insert-title' },
			{ name: ':contextual-unwrap-refsyn' }
		],
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the syntax'),
		titleQuery: xq`./title`,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	configureContextualOperations(
		sxModule,
		xq`self::refsyn[(parent::refbody or parent::refbodydiv) and child::*[not(self::table or self::simpletable)]]`,
		[{ name: ':refsyn-insert-title' }, { name: ':contextual-delete-refsyn' }]
	);

	// title in refsyn
	configureAsTitleFrame(sxModule, xq`self::title[parent::refsyn]`, undefined, {
		fontVariation: 'section-title'
	});
}
