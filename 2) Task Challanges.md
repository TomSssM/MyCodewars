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

# 29) Next