import addTransform from 'fontoxml-operations/src/addTransform';

export default function install(): void {
	addTransform(
		'unsetSelectedImageIdForGetState',
		function (stepData) {
			// After checking the state, we go to the next operation to select the reference from image url
			return stepData;
		},
		function unsetSelectedImageIdForGetState(stepData) {
			// When we get the operation state, we don't still want to select the image, we
			// only want to check if document is editable
			stepData.selectedImageId = null;
			return stepData;
		}
	);

	addTransform('setReferenceForUrl', function setReferenceForUrl(stepData) {
		stepData.reference = stepData.url;
		return stepData;
	});
}
