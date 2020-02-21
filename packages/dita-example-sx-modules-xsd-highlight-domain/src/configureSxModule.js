import configureAsInlineFormatting from 'fontoxml-families/src/configureAsInlineFormatting.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// b
	//     The bold (<b>) element is used to apply bold highlighting to the content of the element. Use this
	//     element only when there is not some other more proper element. For example, for specific items such
	//     as GUI controls, use the <uicontrol> element. This element is part of the DITA highlighting domain.
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::b', t('bold text'), {
		weight: 'bold'
	});

	// i
	//     The italic (<i>) element is used to apply italic highlighting to the content of the element.
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::i', t('italic text'), {
		slant: 'italic'
	});

	// line-through
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::line-through', t('strike-through'), {
		lineThroughStyle: 'single'
	});

	// overline
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::overline', t('overline'), {
		overlineStyle: 'single'
	});

	// sub
	//     A subscript (<sub>) indicates that text should be subscripted, or placed lower in relationship to
	//     the surrounding text. Subscripted text is often a smaller font than the surrounding text. Formatting
	//     may vary depending on your output process. This element is part of the DITA highlighting domain.
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::sub', t('subscript text'), {
		baseline: 'subscript'
	});

	// sup
	//     The superscript (<sup>) element indicates that text should be superscripted, or vertically raised in
	//     relationship to the surrounding text. Superscripts are usually a smaller font than the surrounding
	//     text. Use this element only when there is not some other more proper tag. This element is part of
	//     the DITA highlighting domain. Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::sup', t('superscript text'), {
		baseline: 'superscript'
	});

	// tt
	//     The teletype (<tt>) element is used to apply monospaced highlighting to the content of the element.
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::tt', t('teletype'), {
		isMonospaced: 'true'
	});

	// u
	//     The underline (<u>) element is used to apply underline highlighting to the content of the element.
	//     Category: Typographic elements
	configureAsInlineFormatting(sxModule, 'self::u', t('underlined text'), {
		underlineStyle: 'single'
	});
}
