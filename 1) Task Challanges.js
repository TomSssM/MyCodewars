// Task 1
// Decimal To Binary

const DecToBin = function(num = 0) {
  if(~~num !== num) throw new Error('Must Be Integer!');
  let res = '';
  let sign = 1;
  if(num < 0) {
    sign = -1;
    num = Math.abs(num);
  }

  while(num > 0) {
    res += num % 2;
    num = Math.floor(num / 2);
  }
  
  return res.split('').reverse().join('') * sign;
};

// Task 2