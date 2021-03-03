import configureAsReadOnly from 'fontoxml-families/src/configureAsReadOnly.js';
import configureProperties from 'fontoxml-families/src/configureProperties.js';
import createLabelQueryWidget from 'fontoxml-families/src/createLabelQueryWidget.js';

// These configurations are for testing but not for real life usages.
export default function configureReadOnlyElements(sxModule) {
	configureAsReadOnly(
		sxModule,
		`self::*[
			let $name := name(.) return
			ancestor-or-self::topic[
				@outputclass="readonly" and
				descendant::abstract[
					contains(., string-join((" readonly-", $name, " ")))
				]
			]
		]`
	);

	configureProperties(
		sxModule,
		`self::simpletable[ancestor::topic[@outputclass="readonly"] and contains(., "activate widgets")]`,
		{
			showInsertionWidget: true,
			showHighlightingWidget: true,
			columnBefore: [createLabelQueryWidget('"Mehmet"')]
		}
	);
}
