// console.log("Hello\nWorld");
const add1 = function(a){return a + 3};
const add2 = function(a){return a - 1};
const add3 = function(a){return a};
const add4 = function(a){return a + 7};

function compose(...args) {
  return function(num) {
    const len = args.length - 1;
    let result = args[len](num);
    for(let i = len; i > 0; i--) {
      result = args[i-1](result);
    }
    return result;
  };
}

console.log(compose(add1, add2, add3, add4)(3));