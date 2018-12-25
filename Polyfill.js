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

// 2) String.prototype.toUpperCase + String.prototype.toLowerCase

String.prototype.myToUpper = function() {
  const strArra = this.split('');
  let res = '';
  strArra.forEach(v => {
    if(v >= 'a' && v <= 'z') {
      res += String.fromCharCode(v.charCodeAt(0) - 32);
    } else {
      res += v;
    }
  });
  return res;
};

String.prototype.myToLower = function() {
  const strArra = this.split('');
  let res = '';
  strArra.forEach(v => {
    if(v >= 'A' && v <= 'Z') {
      res += String.fromCharCode(v.charCodeAt(0) + 32);
    } else {
      res += v;
    }
  });
  return res;
};

console.log('aabD f g HH ww Zzz'.myToUpper()); // AABD F G HH WW ZZZ
console.log('ABC AA a $ \\ ~~ $ a v ww ZZZ'.myToLower()); // abc aa a $ \ ~~ $ a v ww zzz

// 3)