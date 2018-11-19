//1) Function.prototype.bind

Function.prototype.mybind = function () {
  const fn = this;
  const args = Array.from(arguments);
  const object = args.shift();
  return function () {
    return fn.apply(object, [...args, ...Array.from(arguments)]);
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

//The cool MDN Polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}