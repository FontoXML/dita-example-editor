import React from 'react';

import ContentQualityAnnotationDebugInformation from 'fontoxml-content-quality/src/ContentQualityAnnotationDebugInformation.jsx';

export default function renderCustomDictionaryAnnotationDetails({ annotationId }) {
	return <ContentQualityAnnotationDebugInformation annotationId={annotationId} />;
}
