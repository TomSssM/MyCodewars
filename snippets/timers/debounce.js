// this function debounce executes a function fn after a certain
// amount of ms, but if debounce is told to delay another function
// before the previous one that was passed to it was executed
// it cancels the delayed execution of the previous function

// here is an illustration:
const debounce = (function() {
  let timer = null;
  return function(fn, ms) {
    return function(...args) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };
}());

const f = function(i) {
  alert(i);
};

// init debounce
const deb = debounce(f, 1000);

// this will delay the execution of f by one second
deb(1);

// this will cancel the previous delay of f and now
// we will instead delay the execution of f(2) by a second
deb(2);

// if we were to call f(3) right now (before a second passes)
// the execution of f(2) would be canceled and instead f(3) would be delayed
// to execute after one second; but a call to f(3) is in a setTimeout itself
// so it won't happen until f(2) is executed (not until 1100 ms pass)

// f(2) will alert 2 somewhere here

// we delay the execution of f(3) by a second
setTimeout(() => deb(3), 1100);

// oops looks like a second hasn't passed yet (only 100ms passed) and
// f(3) hasn't been executed yet well now we are going to forget about it and
// delay the execution of f(4) by a second instead
setTimeout(() => deb(4), 1200); // will alert 4 in a second