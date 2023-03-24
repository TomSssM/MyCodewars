# Promise Details 2

## `throw new Error(...)` vs `Promise.reject(...)`

If an error is thrown inside `then`, then it is going to be caught by the
closest `catch` function:

```js
Promise.resolve()
    .then(() => {
        throw new Error('ok');
    })
    .catch(() => {
        console.log('caught');
    });
// caught
```

On the other hand, if a _promise_ rejects inside a `then` function, then it __won't__ be caught
by the closest `catch` function:

```js
Promise.resolve()
    .then(() => {
        Promise.reject('ok');
    })
    .catch(() => {
        console.log('caught');
    });
// uncaught exception: ok
```

Only _returned_ promise rejections will be caught:

```js
Promise.resolve()
    .then(() => {
        return Promise.reject('ok');
    })
    .catch(() => {
        console.log('caught');
    });
// caught
```

That is why it is so important to always return a promise inside `then`, or if you cannot afford to do that,
you should add more `catch` blocks like this:

```js
Promise.resolve()
    .then(() => {
        Promise.reject('ok').catch(() => {
            console.log('inner caught');
        });
    })
    .catch(() => {
        console.log('caught');
    });
// inner caught
```

**Note:** the same rules apply to the callback passed to a Promise constructor:

```js
new Promise(() => {
    throw new Error('ok');
}).catch(() => {
    console.log('caught');
});
// caught

new Promise(() => {
    Promise.reject('ok');
}).catch(() => {
    console.log('caught');
});
// uncaught exception: ok
```

The same is true for `async` functions:

```js
(async () => {
    throw new Error('ok');
})().catch(() => {
    console.log('caught');
});
// caught

(async () => {
    Promise.reject('ok');
})().catch(() => {
    console.log('caught');
});
// uncaught exception: ok
```

## Another `catch` intricacy

Let's master catching `Promise` rejections!

In the following example, Promise rejections in lines `(*)` and `(**)` will not be caught:

```js
const val1 = Promise.reject(1);
const val2 = Promise.reject(2); // (*)
const val3 = Promise.reject(3); // (**)
const out = Promise.resolve()
  .then(() => val1)
  .then(() => val2)
  .then(() => val3);

out.catch((err1) => {
  console.log('caught err 1', err1);
});
```

Writing multtiple `catch`es doesn't help:

```js
out.catch((err1) => {
    console.log('caught err 1', err1);
}).catch((err2) => {
    console.log('caught err 2', err2);
});
```

there are still going to be uncaught exceptions in the same places as in the previous example.

It doesn't even matter if the promise above rejects synchronously, here is an asynchrous example:

```js
const createAsyncRejectedPromise = (val) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            rej(val);
        }, 400);
    });
};

const val1 = createAsyncRejectedPromise(1);
const val2 = createAsyncRejectedPromise(2);
const val3 = createAsyncRejectedPromise(3);
const out = Promise.resolve()
    .then(() => {
        return val1;
    })
    .then(() => {
        return val2;
    })
    .then(() => {
        return val3;
    });

out.catch((err1) => {
  console.log('caught err 1', err1);
});
```

The output will be:

```
caught err 1 1
uncaught exception: 2
uncaught exception: 3
```

Even more confusing is that this code:

```js
const out = Promise.resolve()
  .then(() => Promise.reject(1))
  .then(() => Promise.reject(2))
  .then(() => Promise.reject(3));

out.catch((err1) => {
  console.log('caught err 1', err1);
});
```

doesn't fail!

So what is going on here? Let's look into that!

First let's look at an example below:

```js
const val1 = Promise.reject(1);
const val2 = Promise.reject(2);
const val3 = Promise.reject(3);
const out = Promise.resolve()
    .then(() => { // (*)
        console.log('first then');
        return val1;
    })
    .then(() => { // (**)
        console.log('second then');
        return val2;
    })
    .then(() => { // (***)
        console.log('third then');
        return val3;
    });

out.catch((err1) => { // (****)
  console.log('caught err 1', err1);
});
```

The output is going to be:

```
first then
caught err 1 1
uncaught exception: 2
uncaught exception: 3
```

What happens is: we go to the first `then` in line `(*)`, after that we wait for the promise `val1` to resolve / reject,
then the promise `val1` rejects and we go to the `catch` block in line `(****)`. As you can see, we never even go into
`then`s in lines `(**)` and `(***)`. But if we never go into them, then who catches the rejected promises `val2` and `val3`?
No one! And this is why there are 2 uncaught exceptions in the console:

```
uncaught exception: 2
uncaught exception: 3
```

There are 2 workarounds to this.

__first:__

```js
const val1 = Promise.reject(1);
const val2 = Promise.reject(2);
const val3 = Promise.reject(3);
const out = Promise.resolve()
    .then(() => {
        console.log('first then');
        return val1;
    })
    .catch((err1) => {
        console.log('caught 1', err1);
    })
    .then(() => {
        console.log('second then');
        return val2;
    })
    .catch((err2) => {
        console.log('caught 2', err2);
    })
    .then(() => {
        console.log('third then');
        return val3;
    })
    .catch((err3) => {
        console.log('caught err 3', err3);
    });
```

__second:__

```js
const val1 = Promise.reject(1).catch((err1) => {
    console.log('caught 1', err1);
});
const val2 = Promise.reject(2).catch((err2) => {
    console.log('caught 2', err2);
});
const val3 = Promise.reject(3).catch((err3) => {
    console.log('caught 3', err3);
});
const out = Promise.resolve()
    .then(() => {
        console.log('first then');
        return val1;
    })
    .then(() => {
        console.log('second then');
        return val2;
    })
    .then(() => {
        console.log('third then');
        return val3;
    });
```

In this example:

```js
const out = Promise.resolve()
    .then(() => {
        console.log('first then');
        return Promise.reject(1); // (*)
    })
    .then(() => {
        console.log('second then');
        return Promise.reject(2); // (**)
    })
    .then(() => {
        console.log('third then');
        return Promise.reject(3); // (***)
    })
    .catch((err) => {
        console.log('caught', err);
    });
```

All errors get caught because the `Promise.reject(...)` doesn't get created until we go into `then`. As a result,
after the `Promise` in line `(*)` rejects, we don't even create `Promise`s in lines `(**)` and `(***)`.

Thus you should always create `Promise`s only in `then`s instead of first creating them somewhere else and after that
returning them from `then` ( like in the very first example ).

But here is an even better example of why you should never do like in the very first example.
Look at this code:

```js
const createAsyncRejectedPromise = (val, timeout) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            rej(val);
        }, timeout);
    });
};
const val1 = createAsyncRejectedPromise(1, 1000);
const val2 = createAsyncRejectedPromise(2, 400);
const val3 = createAsyncRejectedPromise(3);
const out = Promise.resolve()
    .then(() => val1)
    .catch((err1) => {
        console.log("caught 1", err1);
    })
    .then(() => val2)
    .catch((err2) => {
        console.log("caught 2", err2);
    })
    .then(() => val3)
    .catch((err3) => {
        console.log("caught 3", err3);
    });
```

Now we have written the code in such a way that it looks like it _should_ catch all errors. But instead
the following happens: errors show up in the console and after that also get caught.

Here is why: `val2` and `val3` will reject _before_ `val1` rejects. As a result, `val2` and `val3` get rejected
and throw an error to the console while `Promise` is waiting for `val1` to `resolve()`, after that all errors
from both `val1`, `val2` and `val3` get caught but by the time they are caught they have also been thrown into
the console.

__Note:__ if you apply the logic from above to the following example:

```js
const val1 = Promise.reject(1);
const val2 = Promise.reject(2);
const val3 = Promise.reject(3);
const out = Promise.resolve()
    .then(() => val2) // (*)
    .catch((err1) => {
        console.log('caught 1', err1);
    })
    .then(() => val3)
    .catch((err2) => {
        console.log('caught 2', err2);
    })
    .then(() => val1)
    .catch((err3) => {
        console.log('caught 3', err3);
    });
```

it might seem that since `val1` was rejected first, then its error should be thrown to the console while
we are waiting for `val2` to resolve in line `(*)`. But in reality all errors will be caught. Most likely,
all uncaught `Promise` rejections get thrown to the console once the Microtask queue is empty.

## Callback inside `new Promise(...)` is _synchronous_

The callback passed inside `Promise` constructor is _synchronous_, here is proof:

```js
new Promise(() => {
  console.log('one');
});
console.log('two');
```

The output is going to run thus:

```
one
two
```

The reason is the callback passed to the `Promise` contructor is executed immediately, at the same time the promise is created. The pseudocode
for a Promise constructor may look like this:

```
class Promise {
  constructor(cb) {
    cb(resolve, reject);
  }
}
```

A function passed to `.then(..)`, however, is executed _asynchronously_, after the code on the main thread has finished executing, even if the `resolve` function is
called synchronously, while the main thread code is executing. Here is example:

```js
console.log('one');

new Promise((resolve) => {
  resolve('three'); // calling resolve synchronously during main thread execution
}).then((value) => {
  console.log(value); // called only after main thread is finished executing
});

console.log('two');
```

The reason it happens this way is because a callback passed to `.then(..)` is first added to the Microtask Queue, and it will be dequeued only after the main thread
code has finished executing.

## Which runs first? (classic)

Which will run first: timeout or promise?

```js
setTimeout(() => { // (*)
  console.log('timeout');
});

new Promise((resolve) => {
  resolve('promise');
}).then((value) => { // (**)
  console.log(value);
});
```

The answer is: promise. Here is the log:

```
promise
timeout
```

The reason it happens is because `setTimeout` puts a callback to the Macrotask Queue while `Promise` puts a callback to the Microtask Queue, doesn't matter that `setTimeout`
put the callback to the Mactotask Queue before `Promise` put the callback to the Microtask Queue: the JS engine will start executing callbacks from the Mactotask Queue only
once the Microtask Queue is empty. By the time the main thread is finished executing, the JS engine will find one task in the Microtask Queue (from line `(**)`) and another
from the Macrotask Queue (from line `(*)`), and prefer the task from the Microtask Queue thus executing the callback that logs the word `'promise'` to the console.

__Note:__ bear in mind that `.then(...)` puts a callback to the macrotask queue once `resolve()` is called.

Here are some more examples for contemplation: comments `// microtask` mean that the callback will be put to the Microtask Queue (Promise), and comments `// macrotask` mean
that the callback is put to the Macrotask Queue (Event Queue). They highlight the priority of Microtask Queue over Macrotask Queue in the order of code execution:

1)

```js
setTimeout(() => { // microtask
  console.log('three');
});

new Promise((resolve) => {
  resolve('one');
}).then((value) => { // macrotask
  console.log(value);
  return 'two';
}).then((value) => { // macrotask
  console.log(value);
});
```

2)

```js
setTimeout(() => { // microtask /* put microtask synchronously */
  console.log('two');
});

new Promise((resolve) => {
  resolve('one'); /* call .then synchronously, thus put macrotask synchronously */
}).then((value) => { // macrotask
  console.log(value);
  return new Promise((resolve) => {
    setTimeout(() => { // microtask /* put microtask asynchronously (during execution of a macrotask) */
      console.log('three');
      resolve('four'); /* call .then asynchronously (during execution of a microtask) */
    });
  });
}).then((value) => { // macrotask
  console.log(value);
});
```

__Also note:__ by mere accident I put down and described this point and the one before though they have already been discussed in great detail
in the [earlier article](./promise.md#macrotask-queue-vs-microtask-queue).
