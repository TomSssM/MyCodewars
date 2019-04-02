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

// 3) Array.prototype.forEach

Array.prototype.myForEach = function(fn, thisCont) {
  const arr = this;
  for(let i = 0; i < arr.length; i++) {
    fn.call(thisCont, arr[i], i, arr);
  }
};

[1,2,3].myForEach(function(v, i, arr) {
  console.log(`value: ${v}; index: ${i}; array value: ${arr}`);
  console.log(`this cont: ${this}`); // => Wrapper Object
}, 'stringo');


// 4) Array.prototype.filter
Array.prototype.myFilter = function(callback) {
  return this.reduce((t,v,i) => {
    if(callback(v,i, this))  t.push(v);
    return t;
  }, []);
};
[1,2,3].myFilter(v => v > 2) // [3]

// 5) Array.prototype.map
if (!Array.prototype.mapUsingReduce) {
  Array.prototype.mapUsingReduce = function(callback) {
    return this.reduce(function(mappedArray, currentValue, index, array) {
      mappedArray[index] = callback(currentValue, index, array);
      return mappedArray;
    }, []);
  };
}

[1, 2, , 3].mapUsingReduce(
  (currentValue, index, array) => currentValue + index + array.length
); // [5, 7, <1 empty item>, 10]