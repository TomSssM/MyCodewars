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
function binToDec(num){
  return (num + '').split('').reverse()
    .reduce((t, v, i) => (v === '1') ? t + Math.pow(2, i) : t, 0);
}

console.log(binToDec(1010101010) === parseInt('1010101010', 2));
console.log(binToDec('101100111') === parseInt('101100111', 2));
console.log(binToDec(1101) === parseInt('1101', 2));
console.log(binToDec('1111111111111') === parseInt('1111111111111', 2));
```

# 3) Currying
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
# 4) Partial Application
```javascript
```
# 5) Function Composition
```javascript
```
# 6)

# 7) Next