// 1) Function.prototype.bind

Function.prototype.mybind = function (...args1) {
  const fn = this;
  const object = args1.shift();
  return function (...args2) {
    return fn.apply(object, [...args1, ...args2]);
  };
};

const myObject = {
	x: "my value"
};

console.log(
  function(val1, val2){
    return this.x + " " + val1 + " " + val2;
  }.mybind(myObject, "is")("cool")
);

// 2)