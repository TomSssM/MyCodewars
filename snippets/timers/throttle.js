function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      return;
    }

    func(...args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  }
  return wrapper;
}

// here is how it works:
const f = function(a) {
  console.log(a);
};

const f1000 = throttle(f, 1000);

f1000(1); // instantly logs 1
f1000(2); // let's throttle it as 1000 ms aren't up yet
f1000(3); // let's throttle it as 1000 ms aren't up yet

// as soon as 100ms are up; it will log the most-up to-date
// parameter passed after the one it was initially invoked with
// and it is 3

// also let's use this function to slow down the mosuemove event
const sendStats = function(event) {
  console.log(`x: ${event.clientX}; y: ${event.clientY}`);
};

const throttledStats = throttle(sendStats, 1000);

document.addEventListener('mousemove', function(e) {
  throttledStats(e);
});