// write a function that logs numbers 1 - 20
// each number every 100ms so that in general
// after 2 seconds it will have logged all numbers
const printNumbInt = function() {
  let i = 1;
  const timerId = setInterval(() => {
    if(i > 20) {
      clearInterval(timerId);
      return;
    }
    console.log(i++);
  }, 100);
};

// same functionality except usig recursive setTimeout
const printNumbRec = function() {
  let i = 1;

  setTimeout(function callback() {
    if(i > 20) return;
    console.log(i++);
    setTimeout(callback, 100);
  }, 100);
};