//Task 10
//Create the function prefill that returns an array of n elements that all have the same value v.
//See if you can do this without using a loop.
//You have to validate input:
// - v can be anything (primitive or otherwise)
// - if v is ommited, fill the array with undefined
// - if n is 0, return an empty array
// - if n is anything other than an integer or integer-formatted string (e.g. '123') that is >=0, throw a TypeError
//When throwing a TypeError, the message should be n is invalid, where you replace n for the actual value passed to the function.
//Code Examples
//	prefill(3,1) --> [1,1,1]
//	prefill(2,"abc") --> ['abc','abc']
//	prefill("1", 1) --> [1]
//	prefill(3, prefill(2,'2d'))	--> [['2d','2d'],['2d','2d'],['2d','2d']]
//	prefill("xyz", 1)	--> throws TypeError with message "xyz is invalid"

function prefill(n, v) {
  if(typeof n === 'boolean' || ~~n != n || +n < 0) throw new TypeError(n + " is invalid");
	n = parseInt(n, 10);
  let arr = [];
	arr.length = n;
	arr[n - 1] = "";
	return arr.fill(v);
}

//Task 11
//Checking for palidromes
function palindrome(str) {
  str = str.replace(/[\W_]/g, "").toLowerCase().split(""); 
  // we include underscore because \W excludes it
  // see what it is equivalent to; that would be [^A-Za-z0-9_]; alternative: /[^A-Za-z0–9]/g
  return str.join("") === str.reverse().join("");
}

//alternative
function palindrome(str) {
 var re = /[^A-Za-z0-9]/g;
 str = str.toLowerCase().replace(re, '');
 var len = str.length;
 for (var i = 0; i < len/2; i++) {
   if (str[i] !== str[len - 1 - i]) {
       return false;
   }
 }
 return true;
}

//Task 12
//do note the use of spread operator here

const lostSheep = (f,s,t) => t - [...f,...s].reduce((a,b) => a + b,0);
lostSheep([12, 20, 30], [1,2,3], 120);

//Task 13