import addTransform from 'fontoxml-operations/src/addTransform.js';

export default function install() {
	addTransform('setReferenceForUrl', function setReferenceForUrl(stepData) {
		stepData.reference = stepData.url;
		return stepData;
	});
}
