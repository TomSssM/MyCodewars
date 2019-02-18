// In the browser, there’s a limitation of how often nested timers can run.
// The HTML5 standard says: “after five nested timers, the interval is forced
// to be at least four milliseconds.”.
// Let’s demonstrate what it means with the example below.
// The setTimeout call in it re-schedules itself after 0ms.
// Each call remembers the real time from the previous one in the times array.
// What do the real delays look like? Let’s see:

let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run, 0); // else re-schedule
}, 0);

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

// First timers run immediately (just as written in the spec),
// and then the delay comes into play and we see 9, 15, 20, 24....
// That limitation comes from ancient times and many scripts rely on it,
// so it exists for historical reasons.
// For server-side JavaScript, that limitation does not exist,
// and there exist other ways to schedule an immediate asynchronous job,
// like process.nextTick and setImmediate for Node.JS. So the notion is browser-specific only.