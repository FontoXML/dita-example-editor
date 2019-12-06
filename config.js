module.exports = () => {
	let documentIds = ['clogs/clogs.ditamap'];
	let userId = 'tb';
	let userDisplayName = 'Thomas Brekelmans';
	let alwaysRegenerateSessionToken = true;

	let proxyContentQualityHostname = 'localhost';
	let proxyContentQualityPort = 6000;

	let proxyDocumentHistoryHostname = 'localhost';
	let proxyDocumentHistoryPort = 7000;

	let proxyReviewHostname = 'localhost';
	let proxyReviewPort = 6020;

	if (process.env.DOCUMENT_IDS) {
		documentIds = process.env.DOCUMENT_IDS.split(',');
	}
	if (process.env.USER_ID) {
		userId = process.env.USER_ID;
	}
	if (process.env.USER_DISPLAY_NAME) {
		userDisplayName = process.env.USER_DISPLAY_NAME;
	}

	if (process.env.ALWAYS_REGENERATE_SESSION_TOKEN) {
		alwaysRegenerateSessionToken = process.env.ALWAYS_REGENERATE_SESSION_TOKEN;
	}

	if (process.env.PROXY_CONTENT_QUALITY_HOSTNAME) {
		proxyContentQualityHostname = process.env.PROXY_CONTENT_QUALITY_HOSTNAME;
	}
	if (process.env.PROXY_CONTENT_QUALITY_PORT) {
		proxyContentQualityPort = process.env.PROXY_CONTENT_QUALITY_PORT;
	}

	if (process.env.PROXY_DOCUMENT_HISTORY_HOSTNAME) {
		proxyDocumentHistoryHostname = process.env.PROXY_DOCUMENT_HISTORY_HOSTNAME;
	}
	if (process.env.PROXY_DOCUMENT_HISTORY_PORT) {
		proxyDocumentHistoryPort = process.env.PROXY_DOCUMENT_HISTORY_PORT;
	}

	if (process.env.PROXY_REVIEW_HOSTNAME) {
		proxyReviewHostname = process.env.PROXY_REVIEW_HOSTNAME;
	}
	if (process.env.PROXY_REVIEW_PORT) {
		proxyReviewPort = process.env.PROXY_REVIEW_PORT;
	}

	return {
		scope: {
			configuration: {
				'app/use-sheet-frame-headers': true,
				'structure-view-expand-items-until-level': 1
			},
			documentIds: [],
			user: {
				displayName: userDisplayName,
				id: userId,
				roleId: 'editor'
			}
		},
		alwaysRegenerateSessionToken: alwaysRegenerateSessionToken,
		proxy: {
			'content-quality': `http://${proxyContentQualityHostname}:${proxyContentQualityPort}/`,
			'document-history': `http://${proxyDocumentHistoryHostname}:${proxyDocumentHistoryPort}/`,
			'review': `http://${proxyReviewHostname}:${proxyReviewPort}/`
		}
	};
};
