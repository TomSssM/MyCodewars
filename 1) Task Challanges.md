# 1) Decimal To Binary
```javascript
const decToBin = function(num = 0) {
  if(~~num !== num) throw new Error('Must Be Integer!');
  let res = '';
  let sign = 1;
  if(num < 0) {
    sign = -1;
    num = Math.abs(num);
  }

  while(num > 0) {
    res = (num % 2) + res;
    num = Math.floor(num / 2);
  }
  
  return res * sign;
};

console.log(decToBin(123) == 123..toString(2));
console.log(decToBin(145871865) == 145871865..toString(2));
console.log(decToBin(1456165378) == 1456165378..toString(2));
console.log(decToBin(15313523) == 15313523..toString(2));
```

# 2) Binary To Decimal
```javascript
const binToDec = function(num) {
  return (num + '').split('').reverse()
    .reduce((t, v, i) => (v === '1') ? t + Math.pow(2, i) : t, 0);
}

console.log(binToDec(1010101010) === parseInt('1010101010', 2));
console.log(binToDec('101100111') === parseInt('101100111', 2));
console.log(binToDec(1101) === parseInt('1101', 2));
console.log(binToDec('1111111111111') === parseInt('1111111111111', 2));
```

# 3) Palindrome
```javascript
const palindrome = function(str) {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return str.split('').reverse().join('') === str;
 }

 console.log(palindrome("never odd or even...")); // true
 console.log(palindrome("My age is 0, 0 si ega ym.")); // true
 console.log(palindrome("1 eye for of 1 eye.")); // false
 console.log(palindrome("0_0 (: /-\\ :) 0–0")); // true
```

# 4) Currying
```javascript
function curry(fn) {
  const arity = fn.length;
  return (function resolver(...args) {
    const memory = args;
    return function(arg) {
      const local = memory.slice();
      local.push(arg);
      const next = local.length >= arity ? fn : resolver;
      return next(...local);
    };
  }());
}

const fun = function(a,b,c){
  console.log(a,b,c);
};

console.log(curry(fun)(3)(true, 'hidden')('a')); // 3 true a
```

# 5) Partial Application
```javascript
const partialAny = (function() {
  const partialAnyInn = function(fn, ...args1) {
    return function(...args2) {
      const args = [];
      args1.forEach(v => {
        args.push(v === partialAny._ ? args2.shift() : v);
      });
      return fn(...args, ...args2);
    };
  }

  partialAnyInn._ = {};
  return partialAnyInn;
}());

const __ = partialAny._;
function hex(r, g, b) {
  return `#${r}${g}${b}`;
}

const greenMax = partialAny(hex, __, 'ff');
console.log(greenMax('33', '44'));  // "#33ff44"
```

# 6) Function Composition
## 1st
```javascript
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```
## 2nd
```javascript
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
```
## 3rd
```javascript
const compose = (fn, ...rest) =>
  (...args) =>
    (rest.length === 0)
      ? fn(...args)
      : fn(compose(...rest)(...args));
```
## Pipe
### 1st
```javascript
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```
### 2nd
```javascript
const pipe = (fn, ...fns) => (...args) => fns.reduce( (acc, fn) => fn(acc), fn(...args));
```

# 7) Array.prototype.map Polyfill
## With Recursion
```javascript
const mapWith = (fn, [first, ...rest]) =>
  first === undefined
  ? []
  : [fn(first), ...mapWith(fn, rest)];

mapWith((x) => x * x, [1, 2, 3, 4, 5]) // => [1,4,9,16,25]
```
## With Reduce
```javascript
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
); // [5, 7, , 10]
```

# 8) Memoization
## Default
```javascript
// we can memoize only pure functions

function memoize(func) {
  const cache = {};
  return function() {
    const key = JSON.stringify(arguments);
    if(cache[key]) {
      return cache[key];
    }
    else {
      const val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    }
  };
}
```
## As a Method
```javascript
function memoize(func, depsFunc) {
  const cache = {};
  return function() {
    const key = JSON.stringify([depsFunc(), arguments]);
    if(cache[key]) {
      return cache[key];
    }
    else {
      const val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    }
  };
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.fullName = memoize(
    function(title) {
      return title + ' ' + this.firstName + ' ' + this.lastName;
    },

    function() {
      return [this.firstName, this.lastName];
    }.bind(this));
}

const person = new Person('Jonathan', 'Lehman');
```
# 9) Next