// advanced-zeros
// Let's count zeros!

// Task
// Your task is to implement getZerosCount function, which takes any integer number number 
// (1 <= number <= 10^7) as first argument and any integer number base (2 <= base <= 256) 
// as second argument. You should calculate how many zeros in the end of number, which is 
// factorial of number in base base system

// For example:

// Factorial of 10 is 3628800 and the same in 10th base system
//     const zerosCount = getZerosCount(10, 10); 
//     console.log(zerosCount); // 2. Because there is 2 *tail* zeros in number 3628800

// Factorial of 16 is 20922789888000 in 10th base system and *130777758000* in 16th base system
//     const zerosCount = getZerosCount(16, 16); 
//     console.log(zerosCount); // 3. Because there is 3 *tail* zeros in number *130777758000*

// Important!
// Do not try to calculate factorial! First - you will not get exact answer on big numbers. 
// Second - it could take several years to calculate factorial on big integers! Try to think 
// up your awesome solution without such calculations. Good luck!

function getZerosCount(number, base) {
  const factorize = function(num) {
    const fact = {};
    for(let i = 2; i <= num; i++) {
      if(!(num % i)) {
        fact[i] = fact[i] || 0;
        fact[i]++;
        num /= i;
        i--;
      }
    }
    return fact;
  }

  const getZeros = function(num, fact) {
    let next = Math.trunc(num / fact);
    const res = [];
    let i = 2;
    while(next) {
      res.push(next);
      next = Math.trunc(num / Math.pow(fact, i++));
    }
    return res.reduce((t,v) => t + v);
  }

  const factObj = factorize(base);
  const factValues = Object.keys(factObj);
  const factFreq = factValues.map(val => factObj[val]);
  let res = factValues.map(val => getZeros(number, val));
  res = res.map((v, i) => Math.trunc(v / factFreq[i]));
  return Math.min(...res);
}

console.log(getZerosCount(10, 10)); // 2
console.log(getZerosCount(16, 16)); // 3
console.log(getZerosCount(99, 12)); // 47
console.log(getZerosCount(200, 12)); // 97