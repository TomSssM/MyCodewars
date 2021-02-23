const aGeneratorObject = function* () {
  yield 1;
  yield 2;
  yield 3;
}();

typeof aGeneratorObject.next;
// "function", because it has a next method, so it's an iterator

typeof aGeneratorObject[Symbol.iterator];
// "function", because it has an @@iterator method, so it's an iterable

aGeneratorObject[Symbol.iterator]() === aGeneratorObject;
// true, because its @@iterator method returns itself (an iterator), so
// it's an well-formed iterable

[...aGeneratorObject];
// [1, 2, 3]

// generators guide:

// 1) verify that anything has an iterator:

console.log('1) verify that anything has an iterator:');

console.log('hi'[Symbol.iterator]()); // StringIterator {}

function* lilGen() {
  yield 1;
  yield 2;
  yield 3;
}

console.log(lilGen()[Symbol.iterator]); // ƒ [Symbol.iterator]() { [native code] }

let g;

// 2) whenever you call next the function runs up to the yield keyword

console.log('2) whenever you call next the function runs up to the yield keyword');

function* gen1(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

g = gen1(1);
console.log(g.next()); // 2
console.log(g.next()); // 3
console.log(g.next()); // 4

// 3) assigning yield to a variable

console.log('3) assigning yield to a variable');

function* gen2() {
  const x = yield 'me';
  console.log(`x: ${x}`);
  const y = yield 'something';
  console.log(`y: ${y}`);
}
g = gen2();
console.log(g.next().value); // me
console.log(g.next().value);
// x: undefined
// something
console.log(g.next(':)').done);
// y: :)
// true

// ok, why that?

// after 'me' was yielded the value of 'yield' ( which yielded 'me' )
// becomes undefined; when we do next() one more time the second 'yield' ( which yields
// 'something ) becomes the current yield and whatever the argument was to the current
// next() call becomes the value of previous yield ( which yielded 'me' )
// since the current next ( the second one ) was called with no arguments the previous
// yield is assigned to undefined because the argument was 'undefined'
// the same happens in the third call to next(':)'); after it the second yield ( 'something' )
// becomes the previous one and is equal to the argument to the 'next' function, which is ':)'
// thus the value of the previous ( second ) yield gets assigned to ':)' and then gets assigned
// to 'y'

// here is another example:

function* gen3(i) {
  console.log(`i: ${i}`);
  const j = 5 * (yield (i * 10));
  console.log(`j: ${j}`);
  const k = yield (2 * j / 4);
  console.log(`k: ${k}`);
  return (i + j + k);
}

g = gen3(10);
// i: 10
console.log(g.next(20)); // value: 100
console.log(g.next(10));
// j: 50
// value: 25
console.log(g.next(5));
// k: 5
// value: 65, done: true

// Explanation:
// When we call the first next(20), every line of code till the first yield is printed.
// As we do not have any previous yield expression this value 20 is discarded.
// In the output we get yield value as i*10, which is 100 here. Also the state of
// the execution stops with first yield and the const j is not yet set.
// The second next(10) call, replaces the entire first yield expression with 10,
// imagine yield (i * 10) = 10, which goes on to set the value of const j to 50 before returning
// the second yield’s value. The yield value here is 2 * 50 / 4 = 25.
// Third next(5), replaces the entire second yield with 5, bringing the value of k to 5.
// And further continues to execute return statement and return (x + y + z) => (10 + 50 + 5) = 65
// as the final yield value along with done true.

// 4) Passing Yield as an Argument of a Function

console.log('4) Passing Yield as an Argument of a Function');

function* gen4() {
  yield; // pause here and return undefined in .value
  foo(yield 'I\'m useless'); // pause inside the parenthesis and
                             // wait till the next call to .next()
}

const foo = (arg) => console.log(`arg: ${arg}`);

g = gen4();
console.log(g.next()); // value: undefined
console.log(g.next()); // value: I'm useless
console.log(g.next()); // calls foo and completes the run:
// arg: undefined
// done: true

// 5) Yield with a Function Call

console.log('5) Yield with a Function Call');

function* gen5() {
  const user = yield getUser();
  console.log(user);
}

const getUser = () => ({name: 'Tom', dob: '2000'});

g= gen5();
console.log(g.next()); // value: output of calling getUser()
console.log(g.next('this guy: >-0'));
// this guy: >-0
// done: true

// 6) YIELD*

console.log('6) YIELD*');

function* innerGen() {
  yield 2;
  yield 3;
  yield 4;
}
function* gen7() {
  yield 1;
  yield* innerGen(); // note the *
  yield 5;
}

// the function above is tantamount to:
// yield 1
// yield 2 <- yielded by innerGen()
// yield 3 <- yielded by innerGen()
// yield 4 <- yielded by innerGen()
// yield 5

// if we didn't use the * in the second yield
// we would get

// yield 1
// yield <generator> ( the result of calling innerGen() )
// yield 5

g = gen7();
console.log(g.next()); // value: 1
console.log(g.next()); // value: 2
console.log(g.next()); // value: 3
console.log(g.next()); // value: 4
console.log(g.next()); // value: 5
console.log(g.next()); // done: true

// without *:
function* gen7Mist() {
  yield 1;
  yield innerGen();
  yield 5;
}

g = gen7Mist();
console.log('----gen7Mist----');
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

// 7) Return Statement in Generators

console.log('7) Return Statement in Generators');

function* gen8() {
  yield 7;
  yield 'smth';
  return 'return value';
  yield 'ignored yield';
}

g = gen8();
console.log(g.next()); // value: 7
console.log(g.next()); // value: 'smth'

// the return value becomes the value in .value and done flag gets set to true
console.log(g.next()); // done: true, value: 'return value'
console.log(g.next()); // however after the call above the value becomes undefined
console.log(g.next());
console.log(g.next());

// 8) Yield* with Return

console.log('8) Yield* with Return');

// if there is a return inside inner yield
// we jump out of the inner yield and the return
// value is assigned to 'const x'

function* innerGenReturn() {
  yield 'inner 1';
  yield 'inner 2';
  return 'inner return';
}

function* gen9() {
  yield 1;
  yield 2;
  const x = yield* innerGenReturn();
  console.log(x);
  yield 3;
}

g = gen9();

console.log(g.next()); // value: 1;
console.log(g.next()); // value: 2;
console.log(g.next()); // value: inner 1;
console.log(g.next()); // value: inner 2;
console.log(g.next());
// 'inner return'
// value: 3;

// 9) Yield* + Iterable

console.log('9) Yield* + Iterable');

function* gen10() {
  yield 'abc';
  yield* 'abc';
  yield* {
    [Symbol.iterator]() {
      return {
        i: 0,
        next() {
          if(this.i < 3) return {
            value: this.i++,
            done: false
          }; else return {
            value: undefined,
            done: true
          }
        }
      }
    }
  };
}

g = gen10();

console.log(g.next()); // 'abc'
console.log(g.next()); // a
console.log(g.next()); // b
console.log(g.next()); // c
console.log(g.next()); // 0
console.log(g.next()); // 1
console.log(g.next()); // 2
console.log(g.next()); // done: true

// making a bot with a generator:
console.log('making a bot with a generator:');

function* botGenerator() {
  let ans = yield '[bot says:]'+ 'I\'m ready';
  while(true) {
    switch (ans) {
      case '1': {
        ans = yield '[bot says:]'+ 'I`ve got 1';
        break;
      }
      case '2': {
        ans = yield '[bot says:]'+ 'I`ve got 2';
        break;
      }
      default: {
        ans = yield '[bot says:]'+ 'I don`t understand';
      }
    }
  }
}

const bot = botGenerator();
console.log(bot.next().value); // I'm ready
console.log(bot.next('1').value); // I`ve got 1
console.log(bot.next(23432432432+'asfsdfs').value); // I don`t understand
console.log(bot.next('2').value); // I`ve got 2

function* botGeneratorVersion2() {
  let ans = yield '[bot2 says:]' + 'I\'m ready';
  let wow = yield '[bot2 says:]' + 'redefining';
  if(ans === '2') yield '[bot2 says:]' + 'answer';
  if(wow === '2') yield '[bot2 says:]' + 'wow';
}

const bot2 = botGeneratorVersion2();
console.log(bot2.next().value); // I'm ready
console.log(bot2.next('1').value); // redefining
console.log(bot2.next('2').value); // wow
console.log(bot2.next(23432432432+'asfsdfs').done); // true