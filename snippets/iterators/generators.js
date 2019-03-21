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

// TODO: guide

// making a bot with a generator:
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