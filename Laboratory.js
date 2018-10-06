//console.log("Hello\nWorld");
var checker = function(str) {
	let len = str.length, i, real, desired = "", left;

	if ((len & 1) === 1) {
		return false
	} else if (str === "()") {
		return true;
	} else if (str === "[]") {
		return true;
	}

	str = str.replace(/\(\)/g, "");
	str = str.replace(/\[\]/g, "");

	i = str.indexOf("\)");

	if(str.indexOf("\]") !== -1 && str.indexOf("\]") < i) {
		i = str.indexOf("\]");
	}

	left = str.substring(0, i);
	real = str.substring(i);
	len = left.length - 1;

	for(let i = len; i >= 0; i--) {
		desired += left[i];
	}
	desired = desired.replace(/\(/g, "\)").replace(/\[/g, "\]");

	//only change the code below this line
	console.log(desired);
	console.log(real);
	console.log(left);

	if(desired === real) {
		return true;
	}

	return false;
}
