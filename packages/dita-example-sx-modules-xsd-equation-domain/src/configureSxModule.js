import configureAsInlineFrame from 'fontoxml-families/src/configureAsInlineFrame.js';
import configureAsFrame from 'fontoxml-families/src/configureAsFrame.js';
import configureAsFrameWithBlock from 'fontoxml-families/src/configureAsFrameWithBlock.js';
import configureAsTitleFrame from 'fontoxml-families/src/configureAsTitleFrame.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// equation-block
	//     The Block Equation element (<equation-block>) represents an equation to be rendered as a block.
	//     Block equations may be numbered. The equation content may be represented in any number of ways,
	//     including embedded MathML using the <mathml> specialization of <foreign>, a reference to an image,
	//     inline TeX markup, or any other way that an equation might be defined. The equation may include
	//     alternative forms, such as both a MathML version and an image.
	configureAsFrameWithBlock(sxModule, 'self::equation-block', t('equation'), {
		contextualOperations: [{ name: 'mathml-edit' }],
		blockHeaderLeft: [createMarkupLabelWidget()]
	});

	// equation-figure
	//     The Equation Figure element (<equation-figure>) represents an equation that may have a title or a
	//     description and that may be numbered. When equation figures are numbered they are often numbered
	//     separately from figures. Note that block and inline equations may also be numbered. The equation
	//     figure element is intended for equations that are not part of the rhetorical flow of a document but
	//     that are presented either out of line or otherwise need a title or description. Equation figures
	//     that are simply a single equation plus, optionally, a title or description, may use the <mathml>
	//     element directly. When the display equation content is more complicated, it should use
	//     >equation-block> to clearly distinguish the equation content from non-equation content, such as
	//     paragraphs that provide commentary on the equations within the display equation. The equation
	//     content may be represented in any number of ways, including embedded MathML using the <mathml>
	//     specialization of <foreign>, a reference to an image, inline TeX markup, or any other way that an
	//     equation might be defined. The equation may include alternative forms, such as both a MathML version
	//     and an image.
	configureAsFrame(sxModule, 'self::equation-figure', t('equation figure'), {
		contextualOperations: [
			{ name: ':equation-figure-insert-title' },
			{ name: ':equation-figure-insert-desc' },
			{ name: ':equation-figure-append-mathml', hideIn: ['context-menu'] },
			{
				name: ':equation-figure-insert-mathml',
				hideIn: ['element-menu', 'breadcrumbs-menu']
			},
			{ name: ':contextual-delete-equation-figure' }
		],
		titleQuery: './title',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// title in equation-figure
	configureAsTitleFrame(sxModule, 'self::title[parent::equation-figure]', t('title'), {
		fontVariation: 'figure-title'
	});

	// equation-inline
	//     The Inline Equation element (<equation-inline>) represents an equation that is intended to be
	//     rendered inline with its surrounding content. The equation content may be represented in any number
	//     of ways, including embedded MathML using the <mathml> specialization of <foreign>, a reference to an
	//     image, inline TeX markup, or any other way that an equation might be defined. The equation may
	//     include alternative forms, such as both a MathML version and an image.
	configureAsInlineFrame(sxModule, 'self::equation-inline', t('inline equation'), {
		contextualOperations: [{ name: 'mathml-edit' }]
	});

	// equation-number
	//     The Equation Number element (<equation-number>) indicates that the equation should be numbered. If
	//     the <equation-number> element has empty or whitespace-only content, then the number should be
	//     generated. If the <equation-number> element has content other than whitespace, the content should be
	//     used as the number.
	configureAsInlineFrame(sxModule, 'self::equation-number', t('equation number'));
}
