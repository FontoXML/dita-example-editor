import configureAsFrameWithBreakableBlock from 'fontoxml-families/src/configureAsFrameWithBreakableBlock.js';
import configureAsInlineFrame from 'fontoxml-families/src/configureAsInlineFrame.js';
import configureProperties from 'fontoxml-families/src/configureProperties.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createIconWidget from 'fontoxml-families/src/createIconWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// menucascade
	//     The <menucascade> element is used to document a series of menu choices. The <menucascade> element
	//     contains one or more user interface control (<uicontrol>) elements, for example: Start > Programs >
	//     Accessories > Notepad. If there is more than one <uicontrol> element, the formatter shows connecting
	//     characters between the menu items to represent the menu cascade. This element is part of the DITA
	//     user interface domain, a special set of DITA elements designed to document user interface tasks,
	//     concepts and reference information. Category: User interface elements
	configureAsInlineFrame(sxModule, 'self::menucascade', t('menu cascade'), {
		ignoredForNavigationNextToSelector: 'false()',
		defaultTextContainer: 'uicontrol'
	});

	// screen
	//     The <screen> element contains or refers to a textual representation of a computer screen or user
	//     interface panel (window). Category: User interface elements
	configureAsFrameWithBreakableBlock(sxModule, 'self::screen', t('screen'), {
		backgroundColor: 'brown',
		contextualOperations: [{ name: ':contextual-unwrap-screen' }],
		emptyElementPlaceholderText: t('type the screen text'),
		isMonospaced: true,
		withNewlineBreakToken: true,
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// shortcut
	//     The <shortcut> element identifies a keyboard shortcut for a menu or window action. This element is
	//     part of the DITA user interface domain, a special set of DITA elements designed to document user
	//     interface tasks, concepts and reference information. Category: User interface elements
	configureAsInlineFrame(sxModule, 'self::shortcut', t('shortcut'), {
		emptyElementPlaceholderText: t('type the shortcut')
	});

	// uicontrol
	//     The user interface control (<uicontrol>) element is used to mark up names of buttons, entry fields,
	//     menu items, or other objects that allow the user to control the interface. Use the <uicontrol>
	//     element inside a <menucascade> element to identify a sequence of menu choices in a nested menu, such
	//     as File New. This element is part of the DITA user interface domain, a special set of DITA elements
	//     designed to document user interface tasks, concepts and reference information. Category: User
	//     interface elements
	configureAsInlineFrame(sxModule, 'self::uicontrol', t('UI control'), {
		emptyElementPlaceholderText: t('type the label of the UI control')
	});

	configureProperties(
		sxModule,
		'self::uicontrol[parent::menucascade and preceding-sibling::uicontrol]',
		{
			emptyElementPlaceholderText: t('type the label of the UI control'),
			inlineBefore: [createIconWidget('angle-right')]
		}
	);

	// wintitle
	//     The window title <wintitle> element can be used to mark up names of windows or dialogs, or other
	//     user interface elements at the same level of grouping, including wizard titles, wizard page titles,
	//     and window pane titles. This element is part of the DITA user interface domain, a special set of
	//     DITA elements designed to document user interface tasks, concepts and reference information.
	//     Category: User interface elements
	configureAsInlineFrame(sxModule, 'self::wintitle', t('window title'), {
		emptyElementPlaceholderText: t('type the window title')
	});
}
