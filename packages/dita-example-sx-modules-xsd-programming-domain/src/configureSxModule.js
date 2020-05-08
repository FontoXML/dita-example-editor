import configureAsBlock from 'fontoxml-families/src/configureAsBlock.js';
import configureAsDefinitionsTableRow from 'fontoxml-families/src/configureAsDefinitionsTableRow.js';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBreakableBlock from 'fontoxml-families/src/configureAsFrameWithBreakableBlock.js';
import configureAsInlineFrame from 'fontoxml-families/src/configureAsInlineFrame.js';
import configureAsLine from 'fontoxml-families/src/configureAsLine.js';
import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureAsStructure from 'fontoxml-families/src/configureAsStructure.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// apiname
	//     The <apiname> element provides the name of an application programming interface (API) such as a Java
	//     class name or method name. This element is part of the DITA programming domain, a special set of
	//     DITA elements designed to document programming tasks, concepts and reference information. Category:
	//     Programming elements
	configureAsInlineFrame(sxModule, 'self::apiname', t('API name'));

	// codeblock
	//     The <codeblock> element represents lines of program code. Like the <pre> element, content of this
	//     element has preserved line endings and is output in a monospaced font. This element is part of the
	//     DITA programming domain, a special set of DITA elements designed to document programming tasks,
	//     concepts and reference information. Category: Programming elements
	configureAsFrameWithBreakableBlock(sxModule, 'self::codeblock', t('code block'), {
		backgroundColor: 'brown',
		contextualOperations: [{ name: ':contextual-unwrap-codeblock' }],
		emptyElementPlaceholderText: t('type the code'),
		isMonospaced: true,
		withNewlineBreakToken: true,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()],
		allowAutocapitalization: false
	});

	// codeph
	//     The code phrase (<codeph>) element represents a snippet of code within the main flow of text. The
	//     code phrase is displayed in a monospaced font for emphasis. This element is part of the DITA
	//     programming domain, a special set of DITA elements designed to document programming tasks, concepts
	//     and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::codeph', t('code phrase'), {
		isMonospaced: true
	});

	// coderef
	//     The codref element allows a reference to an external file that contains literal code. When evaluated
	//     the coderef element should cause the target code to be displayed inline. If the target contains
	//     non-XML characters such as < and &amp;, those will need to be handled in a way that they may be
	//     displayed correctly by the final rendering engine.
	configureAsRemoved(sxModule, 'self::coderef', t('code reference'));

	// delim
	//     Within a syntax diagram, the delimiter (<delim>) element defines a character marking the beginning
	//     or end of a section or part of the complete syntax. Typical delimiter characters are the
	//     parenthesis, comma, tab, vertical bar or other special characters. This element is part of the DITA
	//     programming domain, a special set of DITA elements designed to document programming tasks, concepts
	//     and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::delim', t('delimiter'));

	// fragment
	//     Within a syntax definition, a <fragment> is a labeled subpart of the syntax. The <fragment> element
	//     allows breaking out logical chunks of a large syntax diagram into named fragments. This element is
	//     part of the DITA programming domain, a special set of DITA elements designed to document programming
	//     tasks, concepts and reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::fragment', t('fragment'));

	// fragref
	//     The fragment reference (<fragref>) element provides a logical reference to a syntax definition
	//     fragment so that you can reference a syntax fragment multiple times, or pull a large section of
	//     syntax out of line for easier reading. This element is part of the DITA programming domain, a
	//     special set of DITA elements designed to document programming tasks, concepts and reference
	//     information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::fragref', t('link to fragment'));

	// groupchoice
	//     The <groupchoice> element is part of the subset of elements that define syntax diagrams in DITA. A
	//     group is a logical set of pieces of syntax that go together. A group choice specifies that the user
	//     must make a choice about which part of the syntax to use. Groups are often nested. This element is
	//     part of the DITA programming domain, a special set of DITA elements designed to document programming
	//     tasks, concepts and reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::groupchoice', t('group choice'));

	// groupcomp
	//     The <groupcomp> element is part of the subset of elements that define syntax diagrams in DITA. A
	//     group is a logical set of pieces of syntax that go together. The group composite means that the
	//     items that make up the syntax diagram will be formatted close together rather than being separated
	//     by a horizontal or vertical line, which is the usual formatting method. This element is part of the
	//     DITA programming domain, a special set of DITA elements designed to document programming tasks,
	//     concepts and reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::groupcomp', t('group composite'));

	// groupseq
	//     The <groupseq> element is part of the subset of elements that define syntax diagrams in DITA. A
	//     group is a logical set of pieces of syntax that go together. Within the syntax definition, groups of
	//     keywords, delimiters and other syntax units act as a combined unit, and they occur in a specific
	//     sequence, as delimited by the <groupseq> element. This element is part of the DITA programming
	//     domain, a special set of DITA elements designed to document programming tasks, concepts and
	//     reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::groupseq', t('group sequence'));

	// kwd
	//     The <kwd> element defines a keyword within a syntax diagram. A keyword must be typed or output,
	//     either by the user or application, exactly as specified in the syntax definition. This element is
	//     part of the DITA programming domain, a special set of DITA elements designed to document programming
	//     tasks, concepts and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::kwd', t('keyword'), {
		isMonospaced: true
	});

	// oper
	//     The operator (<oper>) element defines an operator within a syntax definition. Typical operators are
	//     equals (=), plus (+) or multiply (*). This element is part of the DITA programming domain, a special
	//     set of DITA elements designed to document programming tasks, concepts and reference information.
	//     Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::oper', t('operator'));

	// option
	//     The <option> element describes an option that can be used to modify a command (or something else,
	//     like a configuration). This element is part of the DITA programming domain, a special set of DITA
	//     elements designed to document programming tasks, concepts and reference information. Category:
	//     Programming elements
	configureAsInlineFrame(sxModule, 'self::option', t('option'));

	// parml
	//     The parameter list (<parml>) element contains a list of terms and definitions that describes the
	//     parameters in an application programming interface. This is a special kind of definition list that
	//     is designed for documenting programming parameters. This element is part of the DITA programming
	//     domain, a special set of DITA elements designed to document programming tasks, concepts and
	//     reference information. Category: Programming elements
	configureAsFrame(sxModule, 'self::parml', t('parameter table'), {
		contextualOperations: [{ name: ':contextual-delete-parml' }],
		tabNavigationItemSelector: 'self::pt or self::pd',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// parmname
	//     When referencing the name of an application programming interface parameter within the text flow of
	//     your topic, use the parameter name (<parmname>) element to markup the parameter. This element is
	//     part of the DITA programming domain, a special set of DITA elements designed to document programming
	//     tasks, concepts and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::parmname', t('parameter name'));

	// pd
	//     A parameter definition, within a parameter list entry, is enclosed by the <pd> element. This element
	//     is part of the DITA programming domain, a special set of DITA elements designed to document
	//     programming tasks, concepts and reference information. Category: Programming elements
	configureAsStructure(sxModule, 'self::pd', t('definition'), {
		defaultTextContainer: 'p',
		emptyElementPlaceholderText: t('type the definition')
	});

	configureAsFrame(
		sxModule,
		'self::pd[count(preceding-sibling::* | following-sibling::*) > 1]',
		t('definition'),
		{
			defaultTextContainer: 'p',
			emptyElementPlaceholderText: t('type the definition'),
			showWhen: 'has-focus'
		}
	);

	// p in pd
	configureAsLine(
		sxModule,
		'self::p[parent::pd] and not(preceding-sibling::p or following-sibling::p)',
		t('paragraph'),
		{
			emptyElementPlaceholderText: t('type the definition')
		}
	);

	// plentry
	//     The parameter list entry element (<plentry>) contains one or more parameter terms and definitions
	//     (pd and pt). This element is part of the DITA programming domain, a special set of DITA elements
	//     designed to document programming tasks, concepts and reference information. Category: Programming
	//     elements
	configureAsDefinitionsTableRow(sxModule, 'self::plentry', t('row'), {
		columns: [{ query: './pt', width: 1 }, { query: './pd', width: 2 }],
		contextualOperations: [
			{ name: ':plentry-insert-pt', hideIn: ['breadcrumbs-menu'] },
			{ name: ':plentry-insert-pd', hideIn: ['breadcrumbs-menu'] },
			{ name: ':contextual-insert-plentry--above' },
			{ name: ':contextual-insert-plentry--below' },
			{ name: ':contextual-delete-plentry' }
		],
		borders: true
	});

	// pt
	//     A parameter term, within a parameter list entry, is enclosed by the <pt> element. This element is
	//     part of the DITA programming domain, a special set of DITA elements designed to document programming
	//     tasks, concepts and reference information. Category: Programming elements
	configureAsBlock(sxModule, 'self::pt', t('parameter'), {
		emptyElementPlaceholderText: t('type the parameter')
	});

	configureAsFrame(
		sxModule,
		'self::pt[count(preceding-sibling::* | following-sibling::*) > 1]',
		t('parameter'),
		{
			emptyElementPlaceholderText: t('type the parameter'),
			showWhen: 'has-focus'
		}
	);

	// repsep
	//     The repeat separator (<repsep>) element in a syntax diagram defines a group of syntax elements that
	//     can (or should) be repeated. If the <repsep> element contains a separator character, such as a plus
	//     (+), this indicates that the character must be used between repetitions of the syntax elements. This
	//     element is part of the DITA programming domain, a special set of DITA elements designed to document
	//     programming tasks, concepts and reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::repsep', t('repeat separator'));

	// sep
	//     The separator (<sep>) element defines a separator character that is inline with the content of a
	//     syntax diagram. The separator occurs between keywords, operators or groups in a syntax definition.
	//     This element is part of the DITA programming domain, a special set of DITA elements designed to
	//     document programming tasks, concepts and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::sep', t('separator'));

	// synblk
	//     The syntax block (<synblk>) element organizes small pieces of a syntax definition into a larger
	//     piece. The syntax block element is part of the DITA programming domain, a special set of DITA
	//     elements designed to document programming tasks, concepts and reference information. Category:
	//     Programming elements
	configureAsRemoved(sxModule, 'self::synblk', t('syntax block'));

	// synnote
	//     The syntax note (<synnote>) element contains a note (similar to a footnote) within a syntax
	//     definition group or fragment. The syntax note explains aspects of the syntax that cannot be
	//     expressed in the markup itself. The note will appear at the bottom of the syntax diagram instead of
	//     at the bottom of the page. The syntax block element is part of the DITA programming domain, a
	//     special set of DITA elements designed to document programming tasks, concepts and reference
	//     information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::synnote', t('syntax note'));

	// synnoteref
	//     The syntax note (<synnoteref>) reference element references a syntax note element (<synnote>) that
	//     has already been defined elsewhere in the syntax diagram. The same notation can be used in more than
	//     one syntax definition. The syntax note reference element is part of the DITA programming domain, a
	//     special set of DITA elements designed to document programming tasks, concepts and reference
	//     information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::synnoteref', t('syntax note reference'));

	// synph
	//     The syntax phrase (<synph>) element is a container for syntax definition elements. It is used when a
	//     complete syntax diagram is not needed, but some of the syntax elements, such as kwd, oper, delim,
	//     are used within the text flow of the topic content. This element is part of the DITA programming
	//     domain, a special set of DITA elements designed to document programming tasks, concepts and
	//     reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::synph', t('syntax phrase'), {
		emptyElementPlaceholderText: t('type the syntax')
	});

	// syntaxdiagram
	//     The syntax diagram (<syntaxdiagram>) element is the main container for all the syntax elements that
	//     make up a syntax definition. The syntax diagram represents the syntax of a statement from a computer
	//     language, or a command, function call or programming language statement. Traditionally, the syntax
	//     diagram is formatted with railroad tracks that connect the units of the syntax together, but this
	//     presentation may differ depending on the output media. The syntax diagram element is part of the
	//     DITA programming domain, a special set of DITA elements designed to document programming tasks,
	//     concepts and reference information. Category: Programming elements
	configureAsRemoved(sxModule, 'self::syntaxdiagram', t('syntax diagram'));

	// var
	//     Within a syntax diagram, the <var> element defines a variable for which the user must supply
	//     content, such as their user name or password. It is represented in output in an italic font. This
	//     element is part of the DITA programming domain, a special set of DITA elements designed to document
	//     programming tasks, concepts and reference information. Category: Programming elements
	configureAsInlineFrame(sxModule, 'self::var', t('variable'), {
		slant: 'italic'
	});
}
