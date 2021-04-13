class ParsedWord {
	constructor(type, tags) {
		this.type = type;
		this.tags = tags;
	}
}

class Article {}

let parseTemplate = (tale) => {
	let parsed = [];

	let last_idx = 0;
	for (let i = 0; i < tale.length - 1; i++) {
		let curr = tale[i];
		let next = tale[i + 1];

		if (curr === '@') {
			let hole_start = i + 1;
			parsed.push(tale.slice(last_idx, i));
			do {
				i++;
				curr = tale[i];
				next = tale[i + 1];
			} while (curr !== '@' && i < tale.length - 1);
			let hole_end = i;
			
			let hole = tale.slice(hole_start, hole_end);
			if (hole.includes(':')) {
				let tags = hole.split(':');
				hole = tags[0];
				parsed.push(new ParsedWord(tags[0], tags.slice(1)));
			} else {
				parsed.push(new ParsedWord(hole));
			}

			i++;
			last_idx = i;
		} else if (curr === '<') {
			parsed.push(tale.slice(last_idx, i));
			do {
				i++;
				curr = tale[i];
				next = tale[i + 1];
			} while (curr !== '>' && i < tale.length - 1);
			
			parsed.push(new Article());

			i++;
			last_idx = i;
		} else {
			continue;
		}
	}
	return parsed;
}

console.log(templates[0].tale)
console.log(parseTemplate(templates[0].tale))