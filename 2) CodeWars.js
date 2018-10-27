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
// Your goal in this kata is to implement a difference function, which subtracts 
// one list from another and returns the result.
// It should remove all values from list a, which are present in list b.
// array_diff([1,2],[1]) == [2]
// If a value is present in b, all of its occurrences must be removed from 
// the other:
// array_diff([1,2,2,2,3],[2]) == [1,3]
// beware stupid solution below!!!

function array_diff(a, b) {
  for(let i = 0; i < a.length; i++) {
    for(let j = 0; j < b.length; j++) {
      if(a[i] === b[j]) {
        a.splice(i, 1);
        i = -1; //do note that we have to set i to -1 to be able to access the 0 element
      }
    }
  }
  return a;
}

// good
function array_diff(a, b) {
  return a.filter((val) => {
    return b.every((v) => val !== v);
  });
}
//alt good
function array_diff(a, b) {
  return a.filter((val) => b.indexOf(val) === -1);
}

//Task 14
// Baby is getting his frst tooth. This means more sleepless nights, but with the fun of feeling round his gums and trying to guess which will be first out!
// Probably best have a sweepstake with your friends - because you have the best chance of knowing. You can feel the gums and see where the raised bits are - most raised, most likely tooth to come through first!
// Given an array of numbers (t) to represent baby's gums, you need to return the index of the lump that is most pronounced.
// The most pronounced lump is the one that has the biggest differential to its surrounding values. e.g.:
// [1, 2, 4] = 2
// index 0 has a differential of -1 to its right (it is lower so the figure is negative)
// index 1 has a differential of +1 to its left, and -2 to its right. Total is -1.
// index 2 has a differential of +2 to its left, and nothing to its right,
// If there is no distinct highest value (more than one occurence of the largest differential), return -1.

function firstTooth(t = []) {
  let previous = 0;
  let vals = 0;
  let diff = [];
  for(let i = 0; i < t.length; i++) {
    if(t[i+1]) {
      vals = t[i] - t[i+1];
      diff.push(previous + vals);
      previous = vals * (-1);
    } else {
      diff.push(previous);
    }
  }
  // NEVER EVER DO ANY CHANGES TO ARRAYS WITHOUT SLIIIIIIIIIIIIIIIIIIIIIIIICE!!!!!!!!!!!!!!!!!!
  const diffOrd = diff.slice().sort((a, b) => a - b);
  let lens = diffOrd.length - 1;
  return (diffOrd[lens] !== diffOrd[lens - 1])? diff.indexOf(diffOrd[lens]) : -1;
}
// alternative
function firstTooth(t) {
  var d = t.map((v,i) => (i ? v-t[i-1] : 0)+(i!=t.length-1 ? v-t[i+1] : 0));
  var m = Math.max.apply(null, d);
  return d.filter(v => v==m).length!=1 ? -1 : d.findIndex(v => v==m);
}

//Task 15
// We want to create a function, which returns an array of functions, which return their index in the array.
// For better understanding, here an example:
// var callbacks = createFunctions(5); // create an array, containing 5 functions
// callbacks[0](); // must return 0
// callbacks[3](); // must return 3
// We already implemented that function, but when we actually run the code, the result doesn't look like what we expected.
// Can you spot, what's wrong with it? A test fixture is also available

function createFunctions(n) {
  var callbacks = [];
  for (var i=0; i<n; i++) {
    let ises = i;
    callbacks.push(function() {
      return ises;
    });
  }
  
  return callbacks;
}

//do note, however, how easily we could fix that if we were to just replace var x to let x in the for loop
function createFunctions(n) {
  var callbacks = [];

  for (let i=0; i<n; i++) { //the original example had 'vari=0;' here
    callbacks.push(function() {
      return i;
    });
  }
  
  return callbacks;
}

//here is the original:
// function createFunctions(n) {
//   var callbacks = [];
//   for (var i=0; i<n; i++) {
//     callbacks.push(function() {
//       return i;
//     });
//   }
//   return callbacks;
// }

//alternative:
function createFunctions(n) {
  var callbacks = [];
  var factory = function(x){
    return function(){
      return x;
    };
  };
  for (var i=0; i<n; i++) {
    callbacks.push(factory(i));
  }
  return callbacks;
}

//alternative with IIFE
function createFunctions(n) {
  var callbacks = [];

  for (var i=0; i<n; i++) {
    var oneCall = (function(x) {
      return function() {
        return x;
      }
    })(i);
    callbacks.push(oneCall);
  }

  return callbacks;
}

//Task 16
