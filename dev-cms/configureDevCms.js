'use strict';

const matchAnnotationToCurrentFilter = require('../packages/fontoxml-review-reference-configuration/src/matchAnnotationToCurrentFilter');

module.exports = (_router, _config) => {
	return {
		reviewAnnotationFilter: matchAnnotationToCurrentFilter
	};
};
