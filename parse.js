
var indicator = false;
function parse(indicator, text){
var word = "Free";
var keyword = [];

// Look for "F" in the text
for(var i = 0; i < text.length; i++) {
	if (text[i] == word[i]) {
		// If we find it, add characters up to
		// the length of my name to the array
		for(var j = i; j < (word.length + i); j++) {
		keyword.push(text[j]);
		}
	}
}

if (keyword.length != 0) {
	indicator = true;
}
}
