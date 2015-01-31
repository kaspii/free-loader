
var indicator = false;
function parse(indicator, text){
var word = "free";

// Look for "F" in the text
for(var i = 0; i < text.length; i++) {
	if (text[i] == word[0]) {
		var j=1;
		i++;
		// If we find it, add characters up to
		// the length of my name to the array
		for(i; i < (word.length + i); i++;j++) {
			if(text[i]==word[j])
			;
			else
			break;
		}
		if(j==4)
		indicator=true;
	}
}}
