// ________________________________________________________________________________________________________________________
// Parameters
// ________________________________________________________________________________________________________________________

// You can provide a reference to a function +
// multiple parameters to invoke it with to setTiemout / setInterval
const binaryFunc = function(arg1, arg2) {
  console.log(arg1 + arg2);
};

setTimeout(binaryFunc, 1000, 'Hello ', 'World!');

// ________________________________________________________________________________________________________________________
// Recursive setTimeout vs setTimeinterval
// ________________________________________________________________________________________________________________________

// the following setInterval
setInterval(() => console.log('man'), 2000);

// is the same as the following setTimeout
setTimeout(function run() {
  console.log('man');
  setTimeout(run, 2000);
}, 2000);

// ________________________________________________________________________________________________________________________
// Imitating setInterval with setTimeout
// ________________________________________________________________________________________________________________________
// *the following information is the result of a long experiment
// since setInterval starts counting the interval and then invokes its
// callback for it either to execute during the interval or delay all
// others if it takes more time to execute than the interval we could also
// implement setTimeout that is absolutely the same as setInterval
setTimeout(function run() {
  setTimeout(run, 100); // first starts counting down our time
  soemFunc(); // then invoke func (even if it is difficult and takes for ever to execute)
}, 100);

// ________________________________________________________________________________________________________________________
// Details
// ________________________________________________________________________________________________________________________

// 1)
// let's suppose function hardwork takes more than 100ms to execute
// when is the callback in setTimeout going to be triggered?
setTimeout(callback, 100);
hardwork(); // executes over 100ms

// so the callback() is going to be executed as soon as
// the function hardwork() finishes executing

// 2)
// let's look into what is going to happen in the following code

const timer = setInterval(function() {
  console.log(i++);
}, 10);

setTimeout(function() {
  clearInterval(timer);
  alert( i );
}, 5000);

let i;

function f() {
  for (i = 0; i < 1e8; i++) f[i % 2] = i;
}

f(); // this function executes over 50ms, later we will see why it's important

// what is going to happen is the following:
// function f() is going to execute for 50+ ms
// during this time JS will queue one function call of setInterval
// and ignore all the rest that should have been triggered during those 50+ ms
// JS will only queue more function calls after that one if there is another timer like so:
let y1 = 0; // these values are just so we can stop timers when necessary
let y2 = 0;

let oneWasTriggered = false;
let twoWasTriggered = false;

const timer = setInterval(function() {
  if(!oneWasTriggered) {
    console.log('first function call timer one')
    oneWasTriggered = true;
  }
  if(y1 >= 4) clearInterval(timer);
  console.log(`First Timer triggered ${y1}`);
  y1++;
}, 10);

const timerTwo = setInterval(function() {
  if(!twoWasTriggered) {
    console.log('first function call timer two')
    twoWasTriggered = true;
  }
  if(y2 >= 4) clearInterval(timerTwo);
  console.log(`Second Timer triggered ${y2}`);
  y2++;
}, 10);

f();

// explanation: the first executions of the callbacks inside both timer
// and timerTwo are going to be queued; then as soon as f() finishes executing
// the first queued call of the callback of timer() is going to be executed
// and after that the following callbacks are going to be triggered every 10ms
// the same for timerTwo (its callback are going to be triggered right after
// those of timer; run the snippet above to better understand it)

// if we were to also add a setTimeout function whose interval is less
// than the execution time of f() it, too, would be triggered and executed along
// with all the other queued timers; do note however that the timers are going to be
// queued and executed in a certain order (the ones that should have been executed
// first - those with the smallest interval, obviously - are unqueued first)
// here is an example:

// ... here comes the same code as in lines 64 - 89 + the code below

setTimeout(function() {
  console.log('Timeout triggered');
  clearInterval(timer);
  clearInterval(timerTwo);
}, 50);

f();

// the output will be (in console):
// > first function call timer one
// > First Timer triggered 0
// > first function call timer two
// > Second Timer triggered 0
// > Timeout triggered