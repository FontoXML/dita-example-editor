define([
	'fontoxml-operations/addTransform'
], function (
	addTransform
	) {
	'use strict';

	return function install () {
		addTransform(
			'setReferenceForPermanentIdOrUrl',
			function setReferenceForPermanentIdOrUrl (stepData) {
				if (stepData.permanentId) {
					stepData.reference = stepData.permanentId;
					return stepData;
				}

				stepData.reference = stepData.url;
				return stepData;
			});

	};
});
