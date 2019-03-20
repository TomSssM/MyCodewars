// 1) Iterables
// in order to be called an iterable an object must
// implement an iterator method (called Symbol.iterator)

// we also call an object an iterable if there is a Symbol.iterator
// implementation not directly on our object but somewhere
// in its prototype chain

const iterable = {
  [Symbol.iterator]: function() {
    // ...
  }
}

// an iterator is an object that must
// implement a .next() method it is an iterator
// that is invoked in the for...of loop

const iterator = {
  next: function() {
    // ...
  }
}

// 2) Built-in Iterables

// examples of built-in iterables:
String.prototype[Symbol.iterator];
Array.prototype[Symbol.iterator];
Set.prototype[Symbol.iterator];
Map.prototype[Symbol.iterator];
Int8Array.prototype[Symbol.iterator];

// 3) Custom iterable

// simple
const simpleIterable = {
  [Symbol.iterator]: function() {
    return {
      currentIndex: 0,
      next() {
        if(this.currentIndex < 4) {
          return {
            value: this.currentIndex++,
            done: false,
          };
        } else {
          return {
            done: true,
          }
        }
      },
    };
  },
};

const iterator2 = simpleIterable[Symbol.iterator]();
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

// infinite
const infiniteIterable = {
  [Symbol.iterator]: function() {
    return {
      index: 0,
      next() {
        return {done: false, value: `id: ${this.index++}`};
      },
    };
  },
};
const iterator3 = infiniteIterable[Symbol.iterator]();
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.next());
// ...

// with generator
const generatorIterable = {
  currentIndex: 0,
  [Symbol.iterator]: function* () {
    while(this.currentIndex <= 3) {
      yield this.currentIndex++;
    }
  },
};
for(let val of generatorIterable) {
  console.log(val);
}

// with ES2015 Class
class Iterable {
  constructor() {
    this.index = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        return this.index >= 3 ?
        {done: true, value: this.index = 0} :
        {done: false, value: `class: ${this.index++}`}
      }
    };
  }
}

const iterableClass = new Iterable();
console.log([...iterableClass]);
console.log(Array.from(iterableClass));

// 4) Use cases of Iterables

// Map([iterable]), WeakMap([iterable]), Set([iterable]),
// WeakSet([iterable]), Array.from etc.
new Set('abc').has('a'); // true

// for...of loop
for(let val of 'abc') {
  console.log(val);
}

// spread operator
console.log([...new Iterable()]);

// yeild keyword
const gen = function* () {
  yield* simpleIterable;
};

const iteratorGen = gen();
console.log(iteratorGen.next());
console.log(iteratorGen.next());
console.log(iteratorGen.next());
console.log(iteratorGen.next());
console.log(iteratorGen.next());

// destructuring assignment
const [a,b,c] = simpleIterable;
console.log(`a: ${a}`);
console.log(`b: ${b}`);
console.log(`c: ${c}`);

const [aSet, bSet, cSet] = new Set(simpleIterable);
// but not:
// const {'0': aSet, '1': bSet, '2': cSet} = new Set(simpleIterable);
console.log(`aSet: ${aSet}`);
console.log(`bSet: ${bSet}`);
console.log(`cSet: ${cSet}`);

// iterate an objecto:
const obj = {
  a: 'property one',
  b: 'property two',
  c: 'property three',
  [Symbol.iterator]: function* () {
    let i = 0;
    const keys = Object.keys(this);
    while(i < keys.length) yield this[keys[i++]];
  }
};

obj.newProp = 'new property';
delete obj.b;
console.log([...obj]);

// Iterating primitives:
Number.prototype[Symbol.iterator] = function* () {
  for(let i = 0; i <= this; i++) {
    yield i;
  }
};

console.log(...3);

String.prototype[Symbol.iterator] = function* () {
  yield 'I';
  yield 'be';
  yield 'stringo star';
};

console.log(...'drummer');

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