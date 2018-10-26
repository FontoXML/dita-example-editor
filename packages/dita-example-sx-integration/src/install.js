define([
	'fontoxml-operations/addTransform'
], function (
	addTransform
	) {
	'use strict';

	return function install () {
		addTransform(
			'setReferenceForUrl',
			function setReferenceForUrl (stepData) {
				stepData.reference = stepData.url;
				return stepData;
			});

	};
});
