let isStr = (x) => {
	return typeof x === 'string' || x instanceof String;
}

if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
		return typeof args[number] != 'undefined'
			? args[number]
			: match
		;
		});
	};
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

let removeChildren = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
