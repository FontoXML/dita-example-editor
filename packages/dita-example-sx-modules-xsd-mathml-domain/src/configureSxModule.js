import configureAsRemoved from 'fontoxml-families/src/configureAsRemoved.js';
import configureContextualOperations from 'fontoxml-families/src/configureContextualOperations.js';
import configureAsInlineMathMlContainer from 'fontoxml-mathml/src/configureAsInlineMathMlContainer.js';
import configureAsMathMlContainer from 'fontoxml-mathml/src/configureAsMathMlContainer.js';
import t from 'fontoxml-localization/src/t.js';

export default function configureSxModule(sxModule) {
	// mathml
	//     The MathML container (<mathml>) element contains inline MathML markup or references to MathML
	//     elements stored in a separate non-DITA XML document. The purpose of this element is simply to
	//     contain MathML markup. It is not intended, by itself, to convey the semantic of "equation". Rather,
	//     it simply serves to hold one of many possible ways that the content of an equation may be
	//     represented. The companion equation domain provides elements for representing equations
	//     semantically, independent of the format of the equation content. The MathML markup must have a root
	//     element of "math" within the MathML namespace "http://www.w3.org/1998/Math/MathML". This element is
	//     part of the DITA MathML domain. Category: Foreign elements
	configureAsMathMlContainer(sxModule, 'self::mathml', t('mathematical expression'));
	configureContextualOperations(sxModule, 'self::mathml', [{ name: 'mathml-edit' }]);

	// mathml in inline layout
	configureAsInlineMathMlContainer(
		sxModule,
		'self::mathml[fonto:in-inline-layout(.)]',
		t('mathematical expression')
	);
	// The edit operation should be on the container of the mathml element in inline layout
	configureContextualOperations(sxModule, 'self::mathml[fonto:in-inline-layout(.)]', []);

	// mathmlref
	//     The MathML reference (<mathmlref>) element is used to refer to a non-DITA XML document containing
	//     MathML markup in order to use the markup by reference. The reference must be to a MathML <math>
	//     element. The reference may be a URI that addresses an XML document whose root element is a MathML
	//     <math> element or a URI that addresses and XML document and a fragment identifier that is the XML ID
	//     of a <math> element within the document. NOTE: To reuse MathML markup stored within a DITA topic,
	//     use a normal content reference from the <mathml> element. The reference may be direct, via the @href
	//     attribute, or indirect, via the @keyref attribute. For key references, only the key name should be
	//     specified. Any fragment identifier for specifying the ID of the <mathml> element to use must be
	//     specified as part of the key definition's @href value. Example: For example, to refer to the <math>
	//     element with the @id value "equation-02" within a larger document using a key reference, you would
	//     define the key like so: <keydef keys="mathml-equation-02"
	//     href="math/mathml-equations.xml#equation-02" format="mathml"/> You would refer to this key using
	//     just the key name: <mathml> <mathmlref keyref="mathml-equation-02"/> </mathml> The MathML should be
	//     processed and rendered as though the <m:math> element had occurred directly in the content of the
	//     containing <mathml> element. This element is part of the DITA MathML domain. Category: XRef elements
	configureAsRemoved(sxModule, 'self::mathmlref', t('mathmlref'));
}
