import configureAsRelatedLink from 'fontoxml-dita/src/configureAsRelatedLink.js';
import createElementMenuButtonWidget from 'fontoxml-families/src/createElementMenuButtonWidget.js';
import createMarkupLabelWidget from 'fontoxml-families/src/createMarkupLabelWidget.js';
import xq from 'fontoxml-selectors/src/xq';

export default function configureXrefToUsePermanentId(sxModule) {
	// To enable permanentId's in references (also known as the reference pipeline), change
	// hasPermanentId to TRUE, and set popoverData.targetIsPermanent to TRUE.

	// A cross link. (cross link is used by default)
	configureAsRelatedLink(sxModule, xq`self::link`, undefined, {
		contextualOperations: [{ name: ':link-insert-linktext' }, { name: ':link-insert-desc' }],
		backgroundColor: 'grey',
		defaultTextContainer: 'linktext',
		hasPermanentId: true,
		popoverComponentName: 'DitaCrossReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-link[@format=dita]',
			targetIsPermanentId: true,
			targetQuery: xq`@href`
		},
		showWhen: 'always',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});

	// A web link.
	configureAsRelatedLink(sxModule, xq`self::link[@format="html"]`, undefined, {
		contextualOperations: [{ name: ':link-insert-linktext' }, { name: ':link-insert-desc' }],
		backgroundColor: 'grey',
		defaultTextContainer: 'linktext',
		hasPermanentId: true,
		popoverComponentName: 'WebReferencePopover',
		popoverData: {
			editOperationName: ':contextual-edit-link[@format=html]',
			targetIsPermanentId: true,
			targetQuery: xq`@href`
		},
		showWhen: 'always',
		blockHeaderLeft: [createMarkupLabelWidget()],
		blockOutsideAfter: [createElementMenuButtonWidget()]
	});
}
