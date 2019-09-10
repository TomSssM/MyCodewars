# 21) Remove Duplicate Chars from a String
```javascript
function removeDuplicateChar(str) {
  let char;
  const charCount = {};
  const newStr = [];

  for(let i =0; i < str.length; i++) {
    char = str[i];
    if(charCount[char]) {
      charCount[char]++;
    } else charCount[char] = 1;
  }

  for (let char in charCount) {
    if (charCount[char]==1) newStr.push(char);
  }

  return newStr.join('');
}

removeDuplicateChar('Learn more javascript dude'); // "Lnmojvsciptu"
```

# 22) Random Numbers
## Integers from 0 to a (exc.)
```javascript
const a = 100;
Math.floor(Math.random() * a);
Math.floor(0.9999999999 * a); // 99
```
## Integers from 0 to a (inc.)
```javascript
const a = 100;
Math.floor(Math.random() * (a + 1));
Math.floor(0.9999999999 * (a + 1)); // 99
```
## Integers from a
```javascript
const a = 10;
Math.floor(Math.random() * 100) + a; // [a, (100 + a))

// lower limit:
Math.floor(0.0000000 * 100) + a; // 10

// upper limit:
Math.floor(0.9999999 * 100) + a; // 109
```
## Integers from a (inc.) to b (exc.)
```javascript
function randomExc(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
```
## Integers from a (inc.) to b (inc.)
```javascript
function randomInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
## Random between a to b if we have random for a
In this example the task is: how to get a random number between 5 to 7
if we have a random function to get 1 to 5
```javascript
function rand5() {
   return 1 + Math.random() * 4;
}

function rand7() {
  return 5 + rand5() / 5 * 2;
}
```
# 23) Find a Missing Number in an Unsorted Array

For this there is a math formula to get a sum of a sequence of n characters.
For example: find a sum of consequtive numbers between 5 and 62, altogether there are 20 numbers.

What the above task means is that the difference between 2 neighboring numbers is not 1
but perhaps 4 or something. It's OK, the formula works so long as the numbers are uniformly distributed.
Let 5 be `a1` and 62 be `a2` and let `n` be the number of numbers in the sequence (thus `n = 20`). The
formula looks as follows:

> SUM = (n * (a1 + a2)) / 2

Let's calculate: `SUM = (20 * (5 + 62)) / 2 = 670`

Similarly we can calculate the sum for the sequence of numbers: `1-10` is `SUM = 10*(1+10)/2 = 55`

Let's use this formula to solve our problem:
```javascript
function missingNumber(arr) {
  const n = arr.length + 1;
  const expectedSum = n * (1 + n) / 2;
  const sum = arr.reduce((t,v) => t + v);
  return expectedSum - sum;
}

missingNumber([5, 2, 6, 1, 3]); // 4
```
# 24) Sum of two equal to a number
__Question:__ From a unsorted array, check whether there are any two numbers that will sum
up to a given number?

__Answer:__ Simplest thing in the world: double loop:
```javascript
function sumFinder(arr, sum) {
  const len = arr.length;
  for(let i = 0; i < len - 1; i++) {
    for(let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === sum) return true;
    }
  }
  return false;
}

sumFinder([6,4,3,2,1,7], 9); // true
sumFinder([6,4,3,2,1,7], 2); // false
```
__Interviewer:__ What is the time complexity of this function

__You:__ O(n^2)

__Interviewer:__ Can you make this better

__You:__ Let me see. I can have an object where I will store the difference of sum and element. And then
when i get to a new element and if i find the difference in the object, then i have a pair that sums up
to the desired sum.
```javascript
function sumFinder(arr, sum) {
  const len = arr.length;
  const differences = {};
  let num;
  for(let i = 0; i < len; i++) {
    num = arr[i];
    if(differences[num]) {
      return true;
    } else differences[sum-num] = true;
  }
  return false;
}

sumFinder([6,4,3,2,1,7], 9); // true
sumFinder([6,4,3,2,1,7], 2); // false


console.log(sumFinder([6,4,3,2,1,7], 9)); // true
console.log(sumFinder([6,4,3,2,1,7], 2)); // false
```
# 25) Largest Sum of Two
__Question:__ How would you find the largest sum of any two elements?

__Answer:__ this is actually very simple and straight forward. Just find the two largest number and
return sum of them
```javascript
function topSum(arr) {
  let biggest = arr[0];
  let second = arr[1];
  const len = arr.length;
  let i = 2;

  if (len < 2) return null;
  if (biggest < second) [biggest, second] = [second, biggest];

  while(i < len) {
    if(arr[i] > biggest) {
      second = biggest;
      biggest = arr[i];
    } else if (arr[i] > second) second = arr[i];
    i++;
 }
 return biggest + second;
}

topSum([1,2,3,4,2,3,1,2]); // 7
```

# 26) Counting Zeros
__Question:__ Count Total number of zeros from 1 upto n?

__Answer:__ If n = 50. number of 0 would be 11 (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100). Please note that 100 has two 0. This one looks simple but little tricky

__Explanation:__ So the tick here is. If you have a number 1 to 50 the value is 5.
just 50 divided by 10. However, if the value is 100. the value is 11.
You will get by 100/10 = 10 and 10/10. Thats how you will
get in the more zeros in one number like (100, 200, 1000)

```javascript
function countZero(n) {
  let count = 0;
  while(n > 0) {
    count += Math.floor(n / 10);
    n /= 10;
  }
  return count;
}

countZero(2014); // 223
```
# 27) Sudoku Solve (Recursive Backtracking)
```javascript
function solveSudoku(matrix) {
  function isInRow(row, num) {
    for(let i = 0; i < 9; i++) {
      if(matrix[row][i] === num) return true;
    }
  }

  function isInCol(col, num) {
    for(let i = 0; i < 9; i++) {
      if(matrix[i][col] === num) return true;
    }
  }

  function isInBox(row, col, num) {
    const r = Math.floor(row / 3) * 3;
    const c = Math.floor(col / 3) * 3;
    for(let i = r; i < r + 3; i++) {
      for(let j = c; j < c + 3; j++) {
        if(matrix[i][j] === num) return true;
      }
    }
  }

  function isSafe(row, col, num) {
    return (!isInRow(row, num) && !isInCol(col, num) && !isInBox(row, col, num));
  }

  function solve() {
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if(!matrix[row][col]) {
          for(let num = 1; num <= 9; num++) {
            if(isSafe(row, col, num)) {
              matrix[row][col] = num;
              if(solve()) {
                return true;
              } else {
                matrix[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  if(solve()) {
    return matrix;
  } else throw new Error('unsolvable');
}
```
# 28) Permutations of a String
This task is for __*Recursive Backtracking*__

__Explanation:__

__Idea:__ Idea is very simple. We will convert the string to an array. from the array we will pick one character and then permute rest of it.
After getting the permutation of the rest of the characters, we will concatenate each of them with the character we have picked.

__step-1__ First copy original array to avoid changing it while picking elements

__step-2__ Use splice to removed element from the copied array. We copied the array because splice will remove the item from the array.
We will need the picked item in the next iteration.

__step-3__ `[1,2,3,4].splice(2,1)` will return `[3]` and remaining array = `[1,2,4]`

__step-4__ Use recursive method to get the permutation of the rest of the elements by passing array as string

__step-5__ Finally, concat like `a + permute(bc)` for each
```javascript
function permutations(str) {
  const arr = str.split('');
  const perms = [];
  let rest;
  let picked;
  let restPerms;
  let next;

  if (arr.length === 1) return [str];
  for (let i = 0; i < arr.length; i++) {
    rest = [...arr];
    picked = rest.splice(i, 1);
    restPerms = permutations(rest.join(''));
    for (let j = 0; j < restPerms.length; j++) {
      next = [...picked, ...restPerms[j]]
      perms.push(next.join(''));
    }
  }
  return perms;
}

permutations('boat'); // 24 permutations
```

# 29) Push Zeros Case

Implement a function which pushes all 0s to the right while keeping the non-zero values in order, use of `push`
or `splice` is forbidden:
```javascript
const arr = [0, 10, 0, 1, 2, 3, 0, 0, 4, 0, 0, 0];
shiftZeros(arr); // [10, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0];

function shiftZeros(arr) {
    // first count non-zeros:
    let nonZeroCount = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) nonZeroCount++;
    }

    // then loop until all the non-zero
    // elements have been moved to the beginning
    let count = 0;
    let i = 0;
    while (count < nonZeroCount) {
        if (arr[i] !== 0) {
            [arr[i], arr[count]] = [arr[count], arr[i]];
            count++;
        }
        i++;
    }
    return arr;
}
```

# 30) 3 Greatest Integers in an Array

Find the greatest 3 elements of the array without using sort of any kind or mutating the source array:

```javascript
function threeBiggest(arr) {
    let maxOne = -Infinity;
    let maxTwo = -Infinity;
    let maxThree = -Infinity;
    let elem;
    for (let i = 0; i < arr.length; i += 1) {
        elem = arr[i];
        if (elem > maxOne) {
            maxThree = maxTwo;
            maxTwo = maxOne;
            maxOne = elem;
        } else if (elem > maxTwo) {
            maxThree = maxTwo;
            maxTwo = elem;
        } else if (elem > maxThree) {
            maxThree = elem;
        }
    }
    return `first - ${maxOne}, second - ${maxTwo}, third - ${maxThree}`;
}

threeBiggest([5,4,3,6,7,8,9,10,1,2]); // "first - 10, second - 9, third - 8"
```

# 31) Serial Process

Write a function that works like so:

```js
serialProcess([1,2,3,4,5], (el, index, list, done) => {
    setTimeout(() => { done(el + el); });
}).then(console.log); // [1,4,9,16,25]
```

Takes in an array and a callback ( which modifies each array item in a certain way ). Beware that the callback
only calls its last parameter ( another callback ) in `setTimeout`. The return value should be a Promise with
an array of modified items as seen above. Here is the solution:

```js
function serialProcess(arr, cb) {
    return Promise.all(
        arr.map((value, index, array) => {
            return new Promise((resolve) => {
                cb(value, index, array, resolve);
            })
        })
    );
}
```

# 32) bind() Upgraded

Write `bind` that can be chained like so `fun.bind().bind().bind()`. Each new call to `bind` should replace
the context and all but beware as the source function should remain the same ( or else Maximum Call
Stack exceeded ):

```javascript
Function.prototype.bind = (function() {
    let fun = null;
    let context = null;
    let firstParams = null;

    return function() {
        context = arguments[0];
        firstParams = Array.prototype.slice.call(arguments, 1);
        if (!fun) {
            fun = this;
        }

        return function() {
            const secondParams = Array.prototype.slice.call(arguments);
            const funToCall = fun;
            fun = null;
            return funToCall.apply(context, firstParams.concat(secondParams));
        }
    }
}());

class Cat {
    constructor(name) {
        this.name = name;
        this.x = 12;
        this.y = 11;
    }

    danceAround(param1, param2) {
        this.name += this.x + this.y + param1;
        this.param2 = param2;
    }
}

const cat = new Cat('Tom');

const rightObject = { name: 'Holmes', x: 'node', y: 'Nose' };

cat.danceAround
        .bind({ name: 'Cool', x: 'wow', y: 0 }, ':)', '>0')
        .bind({ name: 'Another dide', x: 'what', y: 'where' }, '--)')
        .bind(rightObject, 'coolFirstPar')('coolSecond Par');

rightObject; // { name: 'HolmesnodeNosecoolFirstPar, x: 'node', y: 'Nose', param2: 'coolSecond Par' }
```

# 33) Request Managing

## Difficulty 1

Here is a task I come up with: we have `n` number of requests, make JS fetch them one after another:

```js
const urlCount = 30;
const baseURI = 'https://jsonplaceholder.typicode.com/todos/';
const urls = [];

let i = 0;
while (i < urlCount) {
    urls[i] = `${baseURI}${i}`;
    i += 1;
}

function getRandom() {
    Promise.all(urls.map((url, i) => fetch(url).then(res => {
        // console.log(`Getting: ${i}`);
        return  res.json();
    }))).then(console.log);
}

function getOrdered() {
    urls.reduce((t, url, i) => {
        return t.then(() => {
            return fetch(url).then(res => {
                // console.log(`Getting ${i}`);
                return res.json();
            }).then(console.log);
        });
    }, Promise.resolve());
}

function getOrderedToo() {
    urls.reduce((t, url, i) => {
        return t.then(() => fetch(url)).then(res => {
            // console.log(`Getting ${i}`);
            return res.json();
        }).then(console.log);
    }, Promise.resolve());
}
```

## Difficulty 2

Now let's make it harder. Imagine that our server can handle only `m` number of requests at a time, thus you should
fetch `m` out of `n` urls, and only after they have arrived, fetch another `m` urls and so on until we are done.

Here is the solution:

```js
const n = 30;
const m = 4;

const baseURI = 'https://jsonplaceholder.typicode.com/todos/';
const urls = [];

fillURLs();
doStuff();

function fillURLs() {
    let i = 0;
    while (i < n) {
        urls[i] = `${baseURI}${i}`;
        i += 1;
    }
}

function doStuff() {
    let promise = Promise.resolve();
    for (let i = 0; i < n; i += m) {
        const urlsToFetchAtATime = urls.slice(i, Math.min(i + m, n));
        promise = promise.then(() => {
            return Promise.all(urlsToFetchAtATime.map(url => {
                return fetch(url).then(res => res.json());
            })).then(responses => {
                console.log('I have fetched:', responses);
            });
        });
    }
}
```

It is awesome!

# 34) CSS Parser

CSS Parser is a great thing. It may be too complicated to ask at the interview but I need to keep it somewhere:

```js
function parseCss(text) {
    let tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi,
        rules = [],
        rule, token;
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    while ( (token = tokenizer.exec(text)) ) {
        const style = parseRule( token[2].trim() );
        style.cssText = stringifyRule(style);
        rule = {
            selectorText : token[1].trim().replace(/\s*\,\s*/, ', '),
            style,
        };
        rule.cssText = rule.selectorText + ' { ' + rule.style.cssText + ' }';
        rules.push(rule);
    }
    return rules;
}


function parseRule(css) {
    let tokenizer = /\s*([a-z\-]+)\s*:\s*((?:[^;]*url\(.*?\)[^;]*|[^;]*)*)\s*(?:;|$)/gi,
        obj = {},
        token;
    while ( (token=tokenizer.exec(css)) ) {
        obj[token[1].toLowerCase()] = token[2];
    }
    return obj;
}

function stringifyRule(style) {
    let text = '',
        keys = Object.keys(style).sort();
    for (let i=0; i<keys.length; i++) {
        text += ' ' + keys[i] + ': ' + style[keys[i]] + ';';
    }
    return text.substring(1);
}

const ast = parseCss(`
body {
    color: yellow;
    font-size: 14px;
}
.className {
    display: flex;
}
`);
```

`ast` ( Abstract Syntax Tree ) will look like this:

```json
[
    {
        "selectorText": "body",
        "style": {
            "color": "yellow",
            "font-size": "14px",
            "cssText": "color: yellow; font-size: 14px;"
        },
        "cssText": "body { color: yellow; font-size: 14px; }"
    },
    {
        "selectorText": ".className",
        "style": {
            "display": "flex",
            "cssText": "display: flex;"
        },
        "cssText": ".className { display: flex; }"
    }
]
```

# 35) Composable Array Sort

Imagine the situation where we have `items`:

```js
const items = [
    {name: 'Zh', surname: 'Pak', age: 19},
    {name: 'Va',  surname: 'In',  age: 26},
    {name: 'An',   surname: 'Ik', age: 27},
    {name: 'Mi',  surname: 'Tr', age: 30},
    {name: 'Ma',  surname: 'Pv', age: 30},
];
```

And we want to sort them first by name and then by surname. So the logic would look like this:

```js
items.sort((left, right) => {
    const firstCharLeft = left.name[0];
    const firstCharRight = right.name[0];

    // if the first 2 letters are the same then sort by surname
    if (firstCharLeft === firstCharRight) {
        return sortBySurname(left, right);
    }

    return firstCharLeft > firstCharRight ? 1 : -1;
});

function sortBySurname(left, right) {
    const firstCharLeft = left.surname[0];
    const firstCharRight = right.surname[0];

    // normally if the callback provided to Array.prototype.sort returns 0, then
    // JS will not swap the two elements for whose comparison the callback returned 0
    if (firstCharLeft === firstCharRight) return 0;

    return firstCharLeft > firstCharRight ? 1 : -1;
}
```

But what if the surnames are the same too? Then we would want to sort by *age*. Well, it is good but getting
the sort for age into our existing code is starting to make our code look like shit. Thus we need to write
a composable sort that would look like this:

```js
composeSort(sortByName, sortBySurname, sortByAge);
```

Such a call to `composeSort` will return a callback we should be able to pass like so:

```js
items.sort(composeSort(sortByName, sortBySurname, sortByAge));
```

to the `.sort` method. And such a callback returned by `composeSort` should thus sort all the values

- first by `sortByName`
- then in case `sortByName` encounters the same 2 first letters, then sort by `sortBySurname`
- and if the same story happens to `sortBySurname`, then sort with `sortByAge`

So we want a utility to make possible our logic that we just now came up with above.

Here is the implementation:

```js
function composeSort(...sortCbs) {
    return (left, right) => {
        return sortCbs.reduce((t, cb) => t || cb(left, right), 0);
    };
}
```

So the resulting callback from `composeSort` looks at the value ( either -1 or 1 ) returned by the *first* callback, 
then if it is 0 it checks that the next callback returns either 1 or -1 and not 0, yet if it also retruns 0 it looks at 
the value returned by the 3rd callback and so on all that by *reducing* the array of callbacks.

# 36) Transactions

Implement a `Transation` class that would behave like so:

```js
function Transaction(arr) {
    ...
}

const arr = [];

const tA = new Transaction(arr);
const tB = new Transaction(arr);
const tC = new Transaction(arr);

tA.push('A1');
tA.push('A2');

tB.push('B1');
tB.push('B2');

tC.unshift('C1');
tC.push('C2');

tB.push('B3');

tA.push('A3');

console.log('1st', arr); // 1st: ['C1', 'A1', 'A2', 'B1', 'B2', 'C2', 'B3', 'A3']

tB.rollback();
console.log('2nd', arr); // 2nd: ['C1', 'A1', 'A2', 'C2', 'A3']

tA.commit();
tA.rollback();
console.log('3rd', arr); // 3rd: ['C1', 'A1', 'A2', 'C2', 'A3']

tC.rollback();
console.log('4th', arr); // 4th: ['A1', 'A2', 'A3']
```

Here is the implementation ( it is one of those tasks that you solve by using 2 arrays ):

```js
function Transaction(arr) {
    this.hash = String(Math.random()).slice(2);

    if (!Transaction.array) {
        Transaction.array = arr;
    }
}

Transaction.array = null;
Transaction.hashesArr = [];

Transaction.prototype.push = function (val) {
    this.constructor.array.push(val);
    this.constructor.hashesArr.push(this.hash);
};

Transaction.prototype.unshift = function (val) {
    this.constructor.array.unshift(val);
    this.constructor.hashesArr.unshift(this.hash);
};

Transaction.prototype.rollback = function () {
    const array = this.constructor.array;
    const hashesArray = this.constructor.hashesArr;

    for (let i = array.length; i >= 0; i -= 1) {
        if (hashesArray[i] === this.hash) {
            array.splice(i, 1);
            hashesArray.splice(i, 1);
        }
    }
};

Transaction.prototype.commit = function () {
    const hashesArray = this.constructor.hashesArr;

    for (let i = hashesArray.length; i >= 0; i -= 1) {
        if (hashesArray[i] === this.hash) {
            delete hashesArray[i];
        }
    }
};
```

# 37) Next
