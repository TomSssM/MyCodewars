//  write a function delay(f, ms) that would return a wrapper function, which
//  will call f only after a certain amount of ms

const delay = function(f, ms) {
  return function(...args) {
    setTimeout(() => f(...args), ms);
  }
};

const man = delay((val, val2) => console.log(val + val2), 1000);
man('>', 'o'); // -> '>0' after 1 second