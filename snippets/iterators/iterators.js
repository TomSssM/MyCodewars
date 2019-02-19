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