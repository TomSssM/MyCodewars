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