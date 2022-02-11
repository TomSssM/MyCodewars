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

# 46) Longest sequence of 1's

Your task is to implement algorithm that finds the longest sequence of 1's in array consisting of 1's and 0's. For this task you also have to
exclude at least 1 element out of the array, for example:

```js
countOnes([1, 0]); // 1
countOnes([1, 1]); // 1 (because we have to throw away at least one element, thus we throw away 1)
countOnes([0, 0]); // 0
countOnes([1, 1, 1, 0, 1, 0, 0, 1, 1, 1]); // 4 (we throw away 0 at index 3 and get four 1's)
```

The solution is to use a counter that we save and reset sometimes:

```js
/**
 * @param {number[]} array
 */
function countOnes(array) {
  let max = 0;
  let current = 0;
  let prev = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === 1) {
      current++;
    }

    if (array[i] === 0) {
      prev = current;
      current = 0;
    }

    max = Math.max(current + prev, max);
  }

  return max === array.length ? max - 1 : max;
}
```

# 47) Sort letters from one array via another array

We have 2 arrays with a length equal to `n`: one filled with letters, the other filled with numbers (the number are from 0 to n-1).

You gotta swap letters _in place_ in the 1st array such that the letters at indexes `i` from the 1st array correspond to numbers at indexes `i`
from the 2nd array.

For example:

```
[D A B E C] [3 0 1 4 2] -> [A B C D E]
```

So we look at 0'th element: it is `D` in the 1st array and `3` in the 2nd array, therefore `D` should be at index `3` in the result array
and so on for each letter, `A` to `0`, `B` to `1`, `E` to `4` and `C` to `2`.

The phrase "in place" in the extract above means that we don't create an intermediary array to return it, thus we gotta swap elements
of the 1st array to get the result array.

You also have a memory constraint here: `O(1)` (it means that the more elements the arrays have should not icrease memory consumption, this is also why
we have to swap elements of the arrays _in place_, without creating intermediary arrays).

Note that you can mutate both of the arrays.

<details>

<summary>Hint 1</summary>

We could jump over the elements of the 2nd array like so:

- first element is `3`, therefore go to element at index `3`
- at index `3` we have `4`, therefore go to element at index `4`
- at index `4` we have `2`, therefore go to element at index `2`
- at index `2` we have `1`, therefore go to element at index `1`
- at index `1` we have `0`, therefore go to element at index `0`
- we have iterated the 2nd array

If we do it like that we will indeed be able to match the arrays above but the problem here is that there can be a situation where you can be caught in
a loop and therefore skip some part of the array, here is an example:

```
[D C B A E] [3 2 1 0 4]
3 -> 0 -> 3 -> ...
```

Therefore such solution, though clever, does not suit the requirements.

</details>

<details>

<summary>Solution</summary>

We sort in place the 2nd array but together with the elements of the 2nd array we also swap the elements of the 1st array

```js
function swap(array, i1, i2) {
  ([array[i1], array[i2]] = [array[i2], array[i1]]);
}

function solution(letters, indexes) {
  /**
   * for simplicity we use Bubble Sort here, but in real interview please use Quick Sort
   * see ./snippets/algorithms/quick-sort.html
   */
  for (let i = 1; i < indexes.length; i++) {
    let j = i;
    while (indexes[j] < indexes[j - 1] && j > 0) {
      swap(indexes, j, j - 1);
      swap(letters, j, j - 1);
      j--;
    }
  }
}
```

</details>

---

[task archieve :arrow_right:](./corejs-codejam/task-archieve/task)
