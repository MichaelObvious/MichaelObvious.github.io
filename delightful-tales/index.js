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

let rndInt = (min = 0, max = 1) => {
	return Math.floor(Math.random() * (max - min) ) + min;
}

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

let parseTemplate = (template) => {
	let parsed = [];

	let last_idx = 0;
	for (let i = 0; i < template.length - 1; i++) {
		let curr = template[i];

		if (curr === '@') {
			let hole_start = i + 1;
			parsed.push(template.slice(last_idx, i));
			do {
				i++;
				curr = template[i];
			} while (curr !== '@' && i < template.length - 1);
			let hole_end = i;
			
			let hole = template.slice(hole_start, hole_end);
			if (hole.includes(':')) {
				let [type, tag] = hole.split(':');
				parsed.push(new ParsedWord(type, tag));
			} else {
				parsed.push(new ParsedWord(hole));
			}

			i++;
			last_idx = i;
		} else {
			continue;
		}
	}

	parsed.push(template.slice(last_idx));
	return parsed;
};

let countTaleHoles = (list) => {
	let count = 0;
	for (const e of list) {
		if (!(typeof e === 'string' || e instanceof String)) {
			count++;
		}
	}
	return count;
};

let relativeIdx2Abs = () => {
	let idx = tale.idx;
	
	for (let i = 0; i < tale.parsedTale.length; i++) {
		let e = tale.parsedTale[i];
		if (!(typeof e === 'string' || e instanceof String)) {
			if (idx == 0) {
				return i;
			} else {
				idx--;
			}
		}
	}
}

let getLabelText = () => {
	let temp = tale.parsedTale[relativeIdx2Abs()];
	let type = temp.type;
	let tag = temp.tag;

	let text = `<b>${type}</b> `;
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

	tale.parsedTale[relativeIdx2Abs()] = `<em style="font-weight: 100;">${word}</em>`;

	wordTextInput.value = "";
	let holes_count = countTaleHoles(tale.parsedTale);
	
	if (holes_count > 0) {
		tale.idx = rndInt(0, holes_count);

		wordInputLabel.innerHTML = getLabelText();
		remainingLabel.innerHTML = `${holes_count} words remaining...`;
		//wordTextInput.focus();
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

	show(wordInputDiv);
	hide(taleDiv);

	{ // set language

	}

	tale = templates[rndInt(0, templates.length)];

	taleTitle.innerHTML = tale.title;
	tale.parsedTale = parseTemplate(tale.tale);
	let holes = countTaleHoles(tale.parsedTale);
	tale.idx = rndInt(0, holes);
	wordInputLabel.innerHTML = getLabelText();
	remainingLabel.innerHTML = `${holes} words remaining...`;
	wordSubmitButton.onclick = getWordsFromUser;
	
	generateButton.onclick = () => {
		hide(wordInputDiv)
		hide(generateDiv);
		show(taleDiv);
	}
};