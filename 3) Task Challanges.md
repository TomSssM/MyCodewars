# 41) `new F === F`

Actually we wrote about it a long time ago as "A Nice Alternative to IIFE" ( JavaScript volume 1 ). Let's now
explain that!

The thing is, if we call a `Function` with `new`, then we do not have to write the parenthesis:

```js
function F() {
    this.name = 'Tom';
}
const t = new F; // same as new F();
t; // { name: 'Tom' }
```

Also, there is a popuplar interview task to write `F` in such a way that the following expression evaluates
to `true`:

```js
new F === F;
```

For this, we simply need to return `F` inside `F`:

```js
function F() {
    return F;
}
new F === F; // true
```

Also think for a moment what is `F`? It is an expression. If you take a look at MDN, you will see that
there are 2 operators, which use the `new` keyword:

- `new` (with argument list): `new … ( … )`
- `new` (without argument list, evaluated right-to-left ): `new …`

In other words:

```js
new F(); // first case
new F; // second case
```

Second case is actually very interesting: what we provide after `new` is an expression because `F` is an expression.

The fact that we can invoke any _function expression_ with `new` allows us to write IIFEs in an awesome style:

```js
// IIFE:
(function() {
    console.log('Hi!');
})();
// also IIFE:
new function() {
    console.log('Hi!');
}
```

because `function() { console.log('Hi!'); }` is the same expression as `F`.

But the first use case is more preferred :)

# 42) A deep dive into `Array.prototype.sort`

Write a sort function, which given a value, would be passed to `Array.prototype.sort` and sort the array in
such a way that this value will be last. Here is an example:

```js
const compareFunction = (val) => (a, b) => {
    // ...
};
const arr = [3, 2, 1, 4, 8, 5, 6, 7];
const result = arr.sort(compareFunction(3)); // [ 1, 2, 4, 5, 6, 7, 8, 3 ]
```

We tell `compareFunction` to move the value `3` to the end of the array and sort all the rest.
How to do that?

Well, the answer to that lies in studying how the compare function works ( from MDN ):

```
If compareFunction is supplied, all non-undefined array elements are sorted according to the return
value of the compare function ( all undefined elements are sorted to the end of the array, with no call
to compareFunction ).

If a and b are two elements being compared, then:
  If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
  If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with
    respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior,
    thus, not all browsers ( e.g. Mozilla versions dating back to at least 2003 ) respect this.
  If compareFunction(a, b) returns greater than 0, sort b to an index lower than a (i.e. b comes first).

compareFunction(a, b) must always return the same value when given a specific pair of elements a and b
as its two arguments. If inconsistent results are returned, then the sort order is undefined.
```

Thus our compare function will look like this:

```js
const compareFunction = (val) => (a, b) => {
    /**
     * -1 - a comes first
     * 1  - b comes first
     */

    if (a === val) {
        return 1;
    }

    if (b === val) {
        return -1;
    }

    return a - b;
};
```

So the solution is really simple: if `a` equals the necessary value, then make `a` come last and `b` come first,
if `b` equals the necessary value, then make `b` come last and `a` come first. This way the necessary value will
propagate all the way to the right ( or we could have as well made it go to the left in this manner ).

An important point to make is that we need to check not only that `a` equals the necessary value but also `b` as well
because once the `Array.prototype.sort` is invoked with our callback, our callback is going to be passed all kinds of
elements from the array in an unsorted order and the necessary value can be `b` just as likely as `a`.
Thus we check both.

# 43) Event Emitter to async generator

For some unknown reason one day I decided to create a `Symbol.asyncIterator` method for a simple event emitter:

```js
class Emitter {
  constructor({ amount }) {
    this.listeners = {};
    this.amount = amount; // how much data to produce
    this.last = 0;
    this.started = false;
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.read();
  }

  read() {
    setTimeout(() => {
      this.emit('data', this.last);
      this.last++;
      if (this.last <= this.amount) {
        this.read();
      } else {
        this.emit('end');
        this.started = false;
        this.last = 0;
      }
    }, 100); // emulating i/o call
  }

  emit(event, ...args) {
    const listeners = this.listeners[event];
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  async *[Symbol.asyncIterator]() {
    let ended = false;
    let resolver;
    let value;

    this.start();

    this.on('data', (data) => {
      value = data;
      resolver();
    });

    this.on('end', () => {
      ended = true;
    });

    while (true) {
      if (ended) return;

      await new Promise((resolve) => {
        resolver = () => {
          resolve();
          resolver = null;
        };
      });

      yield value;
    }
  }
}
```

Non-generator usage:

```js
const emitter = new Emitter({ amount: 10 });

emitter.start();

emitter.on('data', (data) => {
  console.log('got data:', data);
});
```

Generator usage:

```js
const emitter = new Emitter({ amount: 10 });

void (async () => {
  for await (const data of emitter) {
    console.log('got data too:', data);
  }
})();
```

__Note:__ the only limitation of such an iterator is that once it does `yield ...`, the value it yields needs to be processed _synchrously_
or else the `data` event handler will attempt to call `resolver` which will be `undefined` because the line that creates the resolver (after the
`yield` statement) has not been executed yet. Here is an example of such a scenario:

```js
const emitter = new Emitter({ amount: 10 });
void (async () => {
  for await (const data of emitter) {
    console.log('got data:', data);

    await new Promise((res) => {
      setTimeout(() => {
        console.log('I am logging data after 1 sec...', data);
        res();
      }, 1000);
    });
  }
})();
```

I guess for this very reason Node.js Readable stream iterator doesn't use the `data` event but rather the `readable` event
(snippet from the official git repository):

```js
/* ... */

async function* createAsyncIterator(stream, options) {
  let callback = nop;

  function next(resolve) {
    if (this === stream) {
      callback();
      callback = nop;
    } else {
      callback = resolve;
    }
  }

  stream.on('readable', next);

  let error;
  eos(stream, { writable: false }, (err) => {
    error = err ? aggregateTwoErrors(error, err) : null;
    callback();
    callback = nop;
  });

  try {
    while (true) {
      const chunk = stream.destroyed ? null : stream.read();
      if (chunk !== null) {
        yield chunk;
      } else if (error) {
        throw error;
      } else if (error === null) {
        return;
      } else {
        await new Promise(next);
      }
    }
  } catch (err) { /* ... */ }
}

/* ... */
```

# 44) Create Nested Path

Your task is to write a function that given a certain path in object keys creates nested objects, for example:

```
createNestedPath({
  "key1.key2.key3": "123",
  "keyA.keyB.keyC": "abc"
})
-> {
  "key1": {
    "key2":: {
      "key3": "123"
    }
  },
  "keyA": {
    "keyB": {
      "keyC": "abc"
    }
  }
}
```

This function is rockin' it:

```js
function createNestedPath(input) {
  return Object.entries(input).reduce((acc, [key, value]) => {
    key.split('.').reduce((innerAcc, splitKey, index, array) => {
      const isLast = index === array.length - 1;

      if (isLast) {
        innerAcc[splitKey] = value;
        return innerAcc;
      }

      return innerAcc[splitKey] = {};
    }, acc);

    return acc;
  }, {});
}
```

# 45) A note on Array Heap Sort

In the Array [Heap Sort algorithm](./snippets/algorithms/heap-sort.js) we said that in order to find the node of
the heap that we are going to start from in order to "heapify" the array we need to calculate the index of this node
via a special formula: `lastParent = Math.floor((numOfAllElem - 2) / 2);`.

If you [recall](./snippets/Data%20Structures/max-heap.js), we use the `Math.floor(i / 2)` formula in order to find the
_parent_ of the node in a heap (if heap is represented as an array). This formula is actually very similar to the one above
except for slight difference: in the formula above we also subtract `2` from `i`. But why that?

In reality it doesn't make much difference if we subtract `1` or `2` from `i` (called `numOfAllElem` in the formula above),
what we need to achieve here is _find the parent of the last node of the heap_. Also, the indexes of nodes in the heap
(if it be represented as an array) start with 1, therefore we need to subtract 1 to get the index of the last node in the heap.
Also, if we subtract 1 we will get the _right_ child of the last parent in the heap, but if we subtract 2 we get the _left_ child
of the last parent in the heap. This is why we subtract 2.

In other words, this formula means: find the last left child node in the heap and get its parent: this parent is going to be the
last parent in the heap.

Note: the Array Heap Sort algorithm would still work even if we started heapifying an array simply at the last index (without applying
the formula), but this way we would do more unnecessary iterations.

# 46) AsyncArray

We have `AsyncArray` class:

```js
'use strict';

((global) => {
  const timeoutMS = 100;

  const _async = (fn, cb) => {
    setTimeout(() => {
      cb(fn());
    }, Math.random() * timeoutMS);
  };

  const _error = (value) =>
    Math.random() < 0.1 ? null : value;

  // you may stub the _error function for debug purposes
  // const _error = (value) => value;

  const AsyncArray = function (a = []) {
    if (!new.target) {
      return new AsyncArray(a);
    }

    this.read = (index, cb) =>
      _async(() => _error(a[index]), cb);

    this.size = (cb) =>
      _async(() => _error(a.length), cb);
  };

  Object.freeze(AsyncArray);
  global.AsyncArray = AsyncArray;
})(typeof window === 'undefined' ? global : window);
```

And this is how we use it:

```js
const input = AsyncArray([
  8,
  AsyncArray([
    15,
    16,
  ]),
  AsyncArray([
    AsyncArray([
      AsyncArray([
        42,
        AsyncArray([
          AsyncArray([]),
          23,
        ]),
      ]),
    ]),
    4,
  ]),
]);

// example of calling "read"
input.read(0, (elem) => console.log(`read: ${elem}`));

// example of calling "size"
input.size((size) => console.log(`size: ${size}`));
```

The output is going to be:
```
size: 3
read: 8
```

Your task is to write a function called `solution` that accepts an `AsyncArray` instance and returns a `Promise` that resolves to a simple array derived from the `AsyncArray` instance. Here is an example of its usage:

```js
const input = AsyncArray([
  8,
  AsyncArray([
    15,
    16,
  ]),
  AsyncArray([
    AsyncArray([
      AsyncArray([
        42,
        AsyncArray([
          AsyncArray([]),
          23,
        ]),
      ]),
    ]),
    4,
  ]),
]);

solution(input).then(result => {
  console.log('result', result);

  const answer = [8, 15, 16, 42, 23, 4];
  const isEqual = String(answer) === String(result);

  if (isEqual) {
    console.log('OK');
  } else {
    console.log('WRONG');
  }
}).catch((error) => {
  console.error('we got error carl', error);
});
```

The output should be `OK`.

Here is the solution:

```js
async function solution(input) {
  return getChunk(input);
}

async function getChunk(input) {
  const size = await getAsyncArraySizePromise(input);
  const result = [];

  for (let i = 0; i < size; i++) {
    result.push(getAsyncArrayValuePromise(input, i));
  }

  return (await Promise.all(result)).flat();
}

function getAsyncArrayValuePromise(asyncArray, index) {
  return new Promise((res, rej) => {
    asyncArray.read(index, (value) => {
      if (value === null) {
        return rej(null);
      }

      if (value instanceof AsyncArray) {
        res(getChunk(value));
      } else {
        res(value);
      }
    });
  });
}

function getAsyncArraySizePromise(asyncArray) {
  return new Promise((res, rej) => {
    asyncArray.size((value) => {
      if (value === null) {
        rej(null);
      } else {
        res(value);
      }
    });
  });
}
```

Note how in the `getChunk` function we use `Promise.all` to parallel and thus speed up the execution of the code.
