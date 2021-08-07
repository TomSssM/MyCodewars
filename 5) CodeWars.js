// Task 41
// Lazy evaluation is an evaluation strategy which delays the evaluation of an expression
// until its value is needed.

// Implement the Lazy function. This function has two methods:
//   add(fn[, arg1, arg2, ...]): adds the fn function to the lazy
//   chain evaluation. This function could receive optional arguments.
//   invoke(target): performs the evaluation chain over the target array.

// For example:

// Given these functions:

// function max() {
//     return Math.max.apply(null, arguments);
// }

// function filterNumbers() {
//   return Array.prototype.filter.call(arguments, function(value) {
//     return isNumeric(value);
//   });
// }

// function isNumeric(n) {
//   return !isNaN(n) && Number(n) === n;
// }

// function filterRange(min, max) {
//   var args = Array.prototype.slice.call(arguments, 2);
//   return Array.prototype.filter.call(args, function(value) {
//     return min <= value && value <= max;
//   });
// }

// You could use it via composition:
// max.apply(null, filterRange.apply(null, [1, 3].concat(filterNumbers(1, 2, "3", 7, 6, 5))));

// But this solution is not reusable.

// A better approach could be to use composition with lazy invocation:

// new Lazy()
//       .add(filterNumbers)
//       .add(filterRange, 2, 7)
//       .add(max)
//       .invoke([1, 8, 6, [], "7", -1, {v: 5}, 4]); //6

// Step by step, this is what should happen when invoke function is called:

// filterNumbers(1, 8, 6, [], "7", -1, {v: 5}, 4) // == [1, 8, 6, -1, 4]
//            ^------------------------------ from invoke
// filterRange(2, 7, 1, 8, 6, -1, 4) // == [6, 4]
// from add ---^  ^------------- from previous result
// max(6, 4) // == 6
//  ^--- from previous result

// Result from invoke: 6
//                  ^ from last result

function max() {
    return Math.max.apply(null, arguments);
}

function filterNumbers() {
    return Array.prototype.filter.call(arguments, function(value) {
        return isNumeric(value);
    });
}

function isNumeric(n) {
  return !isNaN(n) && Number(n) === n;
}

function filterRange(min, max) {
  var args = Array.prototype.slice.call(arguments, 2);
  return Array.prototype.filter.call(args, function(value) {
    return min <= value && value <= max;
  });
}

class Lazy {
    constructor() {
        this.chain = [];
    }

    add(fun, ...args) {
        this.chain.push(fun.bind(fun, ...args));
        return this;
    }

    invoke(argArr) {
        return this.chain.reduce((t,v) => v(...t), argArr);
    }
}

new Lazy()
      .add(filterNumbers)
      .add(filterRange, 2, 7)
      .add(max)
      .invoke([1, 8, 6, [], "7", -1, {v: 5}, 4]); // 6

// alternative:
function Lazy() {
    this.chain = [];
    return this;
}

Lazy.prototype.add = function(fn) {
    this.chain.push(fn.bind.apply(fn, [this].concat([].slice.call(arguments, 1))));
    return this;
}

Lazy.prototype.invoke = function(obj) {
    return this.chain.reduce(function(obj, fn){
        return fn.apply(this, obj);
    }, obj);
}

// Task 42
// Functional programming prefers recursion over iteration.
// Recursive functions are often more readable than its iterative version.

// Besides, functional programming avoids declaring variables, so functions do not have
// mutable state. Recursion can solve problems without mutable state.

// Here's an example:
// We want to create a function sum(number) that calculates the sum of numbers between 1 and
// the passed number.

// sum(1); // 1
// sum(2); // 1+2 = 3
// sum(4); // 10
// sum(10); // 55

// The iterative version of sum(number) could be:
// function iterativeSum(n) {
//   var i;
//   var sum = 0;
//   for (i = 1; i <= n; i++) {
//     sum += i;
//   }
//   return sum;
// }

// The recursive implementation is more elegant and it has not mutable state:
// function recursiveSum(n) {
//   if (n === 0) {
//     return 0;
//   } else {
//     return n + recursiveSum(n - 1);
//   }
// }

// But it has a problem of memory consumption.

// recursiveSum(10); //55
// recursiveSum(99999); //RangeError: Maximum call stack size exceeded

// Some languages can deal with this problem by using a technique known as tail recursion.
// A recursive function is tail recursive if the final result of the recursive call is the
// final result of the function itself. If the result of the recursive call must be
// further processed (say, by adding 1 to it, or consing another element onto the beginning of it),
// it is not tail recursive.

// The benefit of tail recursion is that tail calls can be implemented without adding a new
// stack frame to the call stack.

// This could be the tail recursive solution of our example:
// function tailRecursionSum(n) {
//   function _sum(ac, n) {
//     if (n === 0) {
//       return ac;
//     } else {
//       return _sum(ac + n, n - 1);
//     }
//   }

//   return _sum(0, n);
// }

// But JavaScript still does not support tail recursion:
// tailRecursionSum(10); //55
// tailRecursionSum(99999); //RangeError: Maximum call stack size exceeded

// Trampolining is a technique that allows us to create functions with the elegance of
// the recursive solution but without its memory issue, because, although it does not seem,
// the solution is actually iterative.

// This could be our solution:
// function trampolineSum(n) {
//   function _sum(n, ac) {
//     if (n === 0) {
//       return ac;
//     } else {
//       return thunk(_sum, n - 1, ac + n);
//     }
//   }

//   return trampoline(thunk(_sum, n, 0));
// }

// Note that the solution has the same structure as tailRecursionSum(n),
// but there is no recursive calls. Instead two auxiliary functions
// appear: thunk(fn /*, args */) and trampoline(thunk).

// thunk(fn /*, args */) is a function that receives a function and possibly
// some arguments to be passed to the function and returns a function. When this returned function
// is called, it returns the result of executing the function.
// In functional programming, a thunk is a deferred expression (function). Its evaluation is
// postponed until it's really needed.
// trampoline(thunk) is a function that executes repeatedly the thunk argument until it returns a non
// function value. Then this last value is returned.

// Here is an example:
// function add(a, b) {
//     return a + b;
// }

// thunk(add, 4, 5)(); // 9

// trampoline(thunk(add, 4, 5)); // 9

// Another example:
// function add(x , y) {
//   return function() {
//     return x + y + 6;
//   }
// }
// trampoline(thunk(add, 4, 5)); // 15 <- 4 + 5 + 6

// Your job is to implement thunk(fn /*, args */) and trampoline(thrunk) functions.
// Also you have to refactor the implementation of isEven(number) and isOdd(number) functions
// to use the trampoline(thunk) function.

// function isEven(n) {
//   return (n === 0 ? true : isOdd(n - 1));
// }

// function isOdd(n) {
//   return (n === 0 ? false : isEven(n - 1));
// }

function thunk(fn, ...args) {
    return function() {
        return fn(...args);
    };
}

function trampoline(thunk) {
    let res = thunk();
    while(typeof res === 'function') res = res();
    return res;
}

function _isEven(n) {
    if(n === 0) return true;
    return thunk(_isOdd, n - 1);
}

function _isOdd(n) {
    if(n === 0) return false;
    return thunk(_isEven, n - 1);
}

function isEven(n) {
    return trampoline(thunk(_isEven, n));
}

function isOdd(n) {
    return trampoline(thunk(_isOdd, n));
}

// Task 43

// You need to write a function f that returns the string 'Hello, world!'.

// Requirement: Every line must have at most 2 characters, and total number of lines must be less than 40.

// Hint: It's possible to complete this in 28 lines only.

f=
''
[
'\
t\
r\
i\
m'
]
[
'\
b\
i\
n\
d\
'
]
(`
H\
e\
l\
l\
o\
,\
 \
w\
o\
r\
l\
d\
!\
`)

// Note: here is a solution using only 28 lines:

f=
''
[
'\
t\
r\
i\
m'
][
'\
b\
i\
n\
d'
]`
H\
e\
l\
l\
o\
,\
 \
w\
o\
r\
l\
d!
`;

// Task 44