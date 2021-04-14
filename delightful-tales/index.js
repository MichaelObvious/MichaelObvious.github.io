let tale;
let wordTextInput;
let wordSubmitButton;
let wordInputLabel;
let wordInputDiv;
let taleDiv;
let taleTitle;
let remainingLabel;
let generateDiv;
let generateButton;
let newTaleDiv;
let newTaleBtn;

let isStr = (x) => {
	return typeof x === 'string' || x instanceof String;
}

let rndInt = (min = 0, max = 1) => {
	return Math.floor(Math.random() * (max - min) ) + min;
}

let hash = (s) => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

let hide = (element) => {
	element.style = "display: none;";
}

let show = (element) => {
	element.style = "";
}

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
	let temp = tale.parsedWords[tale.idx];
	let type = temp.type;
	let tag = temp.tag;

	let text = `Insert a <b>${type}</b> `;
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
	let word = wordTextInput.value;
	
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
	let keys = Object.keys(tale.parsedWords);
	let holes_count = keys.length;
	
	if (holes_count > 0) {
		tale.idx = keys[rndInt(0, holes_count)];

		wordInputLabel.innerHTML = getLabelText();
		remainingLabel.innerHTML = `${holes_count} words remaining...`;
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
	generateDiv = document.getElementById("generatediv");
	generateButton = document.getElementById("generatebtn");
	newTaleDiv = document.getElementById("newtalediv");
	newTaleBtn = document.getElementById("newtalebtn");

	show(wordInputDiv);
	hide(taleDiv);
	hide(generateDiv);
	show(newTaleDiv);

	{ // set language

	}

	tale = templates[rndInt(0, templates.length)];

	taleTitle.innerHTML = tale.title;
	parseTemplate();
	let keys = Object.keys(tale.parsedWords);
	let holes = keys.length;
	tale.idx = keys[rndInt(0, holes)];
	wordInputLabel.innerHTML = getLabelText();
	remainingLabel.innerHTML = `${holes} words remaining...`;
	wordSubmitButton.onclick = getWordsFromUser;
	newTaleBtn.onclick = window.onload;
	
	generateButton.onclick = () => {
		hide(wordInputDiv)
		hide(generateDiv);
		show(taleDiv);
	}
};