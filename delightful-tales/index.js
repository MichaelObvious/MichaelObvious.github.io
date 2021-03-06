/*
     WARNING:
	 Tell you: this is awful code,
	 I spent like two afternoons on it.
	 advise you not to touch it
	                            Sincerely yours,
								    -- MichaelObvious
*/

let tale;
let wordTextInput;
let wordSubmitButton;
let wordInputLabel;
let wordInputDiv;
let taleDiv;
let taleTitle;
let remainingLabel;
let allWordsCollectedText;
let generateDiv;
let generateButton;
let newTaleDiv;
let newTaleBtn;

let insertTextTemplate;
let remainingTextTemplate;

let taleTemplates;

class ParsedWord {
	constructor(type, tag) {
		this.type = type;
		this.tag = tag;
	}
}

class Idx {
	constructor(idx) {
		this.idx = idx;
	}
}

let parseTemplate = () => {
	let template = tale.tale;
	tale.parsedWords = {};
	tale.parsedTale = [];


	let last_idx = 0;
	for (let i = 0; i < template.length - 1; i++) {
		let curr = template[i];

		if (curr === '@') {
			let hash_idx = '';
			let hole_start = i + 1;
			tale.parsedTale.push(template.slice(last_idx, i));
			do {
				i++;
				curr = template[i];

				if (curr === '#') {
					hash_idx = template.slice(hole_start, i);
					hole_start = i + 1;
				}
			} while (curr !== '@' && i < template.length - 1);
			let hole_end = i;
			
			if (hash_idx.length == 0) {
				do  {
					hash_idx = hash(rndInt(0, 1_000_000).toString()).toString();
				} while (hash_idx in tale.parsedWords);
			}
			tale.parsedTale.push(new Idx(hash_idx));
			
			let hole = template.slice(hole_start, hole_end);
			if (hole.includes(':')) {
				let [type, tag] = hole.split(':');
				tale.parsedWords[hash_idx] = new ParsedWord(type, tag);
			} else {
				tale.parsedWords[hash_idx] = new ParsedWord(hole);
			}

			i++;
			last_idx = i;
		} else {
			continue;
		}
	}
	
	tale.parsedTale.push(template.slice(last_idx));
};

let countTaleHoles = (list) => {
	let count = 0;
	for (const e of list) {
		if (!isStr(e)) {
			count++;
		}
	}
	return count;
};

let getLabelText = () => {
	const temp = tale.parsedWords[tale.idx];
	const type = temp.type;
	const tag = temp.tag;

	let text = insertTextTemplate.format(`<b>${type}</b> `);
	if (tag) {
		text += `<em>${tag}</em>`;
	}

	return text;
}

let getParsedTaleText = () => {
	let text = "";
	
	for (const e of tale.parsedTale) {
		text += e;
	}

	return text;
}

let getWordsFromUser = () => {
	const word = wordTextInput.value;
	
	if (word.length == 0) {
		return;
	}

	for (let i = 0; i < tale.parsedTale.length; i++) {
		if (!isStr(tale.parsedTale[i])) {
			if (tale.parsedTale[i].idx === tale.idx) {
				tale.parsedTale[i] = `<em style="font-weight: 100;">${word}</em>`;
			} 
		} 
	}
	delete tale.parsedWords[tale.idx];

	wordTextInput.value = "";
	const keys = Object.keys(tale.parsedWords);
	const holes_count = keys.length;
	
	if (holes_count > 0) {
		tale.idx = keys[rndInt(0, holes_count)];

		wordInputLabel.innerHTML = getLabelText();
		remainingLabel.innerHTML = remainingTextTemplate.format(holes_count);
		wordTextInput.focus();
	} else {
		hide(wordInputDiv);
		show(generateDiv);
		
		taleDiv.innerHTML = getParsedTaleText();
	}
};

window.onload = () => {
	wordTextInput = document.getElementById("wordtext");
	wordSubmitButton = document.getElementById("wordbutton");
	wordInputLabel = document.getElementById("wordinputlabel");
	remainingLabel = document.getElementById("remaininglabel");
	wordInputDiv = document.getElementById("wordinputdiv");
	taleDiv = document.getElementById("talediv");
	taleTitle = document.getElementById("taletitle");
	allWordsCollectedText = document.getElementById("allcollected");
	generateDiv = document.getElementById("generatediv");
	generateButton = document.getElementById("generatebtn");
	newTaleDiv = document.getElementById("newtalediv");
	newTaleBtn = document.getElementById("newtalebtn");

	show(wordInputDiv);
	hide(taleDiv);
	hide(generateDiv);
	show(newTaleDiv);

	// set language
	let lang;
	const params = new URLSearchParams(window.location.search);
	if (params.get("it") !== null) {
		wordSubmitButton.innerHTML = "Fatto";
		allWordsCollectedText.innerHTML = "Tutte le parole sono state raccolte";
		generateButton.innerHTML = "Mostra la storia";
		newTaleBtn.innerHTML = "Scegli un'altra storia";

		insertTextTemplate = "Inserisca un {0}";
		remainingTextTemplate = "{0} parole rimanenti...";

		taleTemplates = TEMPLATES.it;
		lang = "it";
	} else {
		wordSubmitButton.innerHTML = "Done";
		allWordsCollectedText.innerHTML = "All words are collected";
		generateButton.innerHTML = "Show the tale";
		newTaleBtn.innerHTML = "Pick another tale";

		insertTextTemplate = "Insert a {0}";
		remainingTextTemplate = "{0} words remaining...";

		taleTemplates = TEMPLATES.en;
		lang = "en";
	}

	// CHOOSE TALE
	// localStorage.removeItem('recentTales');
	let recentTales = JSON.parse(localStorage.getItem('recentTales'));
	if (!recentTales) {
		recentTales = { it: {}, en: {} };
	}

	let lowest_count = Infinity;
	let lowest_tale;

	for (let i = 0; i < 100; i++) {
		tale = taleTemplates[rndInt(0, taleTemplates.length)];
		
		if (!(tale.title in recentTales[lang])) {
			recentTales[lang][tale.title] = 0;
			lowest_tale = tale;
			break;
		}

		if (recentTales[lang][tale.title] < lowest_count) {
			lowest_count = recentTales[lang][tale.title];
			lowest_tale = tale;
		}
	}
	recentTales[lang][lowest_tale.title] += 1;
	localStorage.setItem('recentTales', JSON.stringify(recentTales));

	tale = lowest_tale;

	// END CHOOSE TALE

	taleTitle.innerHTML = tale.title;
	parseTemplate();
	const keys = Object.keys(tale.parsedWords);
	const holes = keys.length;
	tale.idx = keys[rndInt(0, holes)];
	wordInputLabel.innerHTML = getLabelText();
	remainingLabel.innerHTML = remainingTextTemplate.format(holes);
	wordSubmitButton.onclick = getWordsFromUser;
	wordInputDiv.onsubmit = () => { getWordsFromUser(); return false };
	newTaleBtn.onclick = window.onload;
	
	generateButton.onclick = () => {
		hide(wordInputDiv)
		hide(generateDiv);
		show(taleDiv);
	}
};