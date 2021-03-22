import specialCharactersManager from 'fontoxml-special-characters/src/specialCharactersManager.js';

function convertMappingToCharacterSetFormat(mappingObject) {
	return Object.keys(mappingObject).map(function(codePoint) {
		return {
			codePoints: [codePoint],
			id: codePoint,
			name: mappingObject[codePoint]
		};
	});
}

export default function install() {
	specialCharactersManager.addCharacterSet(
		'quick-access-currency-symbols',
		convertMappingToCharacterSetFormat({
			'U+0024': 'Dollar sign',
			'U+00A3': 'Pound sterling',
			'U+20AC': 'Euro sign',
			'U+00A5': 'Yen',
			'U+20BD': 'Russian rouble sign',
			'U+00A2': 'Cent sign',
			'U+20A0': 'Euro-currency sign',
			'U+20A1': 'Colon sign',
			'U+20A2': 'Cruzeiro sign',
			'U+20A3': 'French franc sign',
			'U+20A4': 'Lira sign',
			'U+20A5': 'Mill sign',
			'U+20A6': 'Naira sign',
			'U+20A7': 'Peseta sign',
			'U+20A8': 'Rupee sign',
			'U+20A9': 'Won sign',
			'U+20AA': 'New sheqel sign',
			'U+20AB': 'Dong sign',
			'U+20AD': 'Kip sign',
			'U+20AE': 'Tugrik sign',
			'U+20AF': 'Drachma sign',
			'U+20B0': 'German penny sign',
			'U+20B1': 'Peso sign',
			'U+20B2': 'Guarani sign',
			'U+20B3': 'Austral sign',
			'U+20B4': 'Hryvnia sign',
			'U+20B5': 'Cedi sign'
		})
	);
}
