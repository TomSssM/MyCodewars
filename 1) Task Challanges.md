# 1) Decimal To Binary
```javascript
const DecToBin = function(num = 0) {
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

console.log(DecToBin(123) == 123..toString(2));
console.log(DecToBin(145871865) == 145871865..toString(2));
console.log(DecToBin(1456165378) == 1456165378..toString(2));
console.log(DecToBin(15313523) == 15313523..toString(2));
```
# 2) Currying
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
# 3) Partial Application
```javascript
```
# 4) Function Composition
```javascript
```