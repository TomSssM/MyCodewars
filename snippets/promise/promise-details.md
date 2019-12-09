# Promise Details

## States

Naturally a Promise has two states: `pending` and `fulfilled` / `rejected`. `pending` is when the
asynchronous code is being executed and `fulfilled` / `rejected` is when either `resolve` or
`reject` is called upon the completion of the execution of the asynchronous code. The result of the
promise is also always only one: either what is passed into `resolve` (some data usually) or what is
passed into `reject` (usually an error).

## Only a Single Result or a Single Error

We call either `resolve` or `reject` (whichever executes first) and the promise is done:
```javascript
const promise = new Promise((res, rej) => {
    setTimeout(() => res(1), 0); // ignored
    res(2);
    rej(1); // ignored
    setTimeout(() => rej(2), 0); // ignored
    res(3); // ignored
});
promise.then(
    (num) => console.log(`success: ${num}`),
    (num) => console.log(`fail: ${num}`)
);
// log: success: 2
```
As you might have guessed in reality the code inside a `Promise` doesn't have to be asynchronous :)

## Not calling .then() for too long

Imagine we write this:

```javascript
const promise = new Promise(function(resolve) {

    setTimeout(() => {
        console.log('one second passed');
        resolve('OK');
    }, 1000);

});
```

And then we wait for __2__ seconds doing nothing. What is going to happen is: the setTimeout will in
fact execute but the promise will be pending and waiting for you to pass in the value of the `resolve`
and at the same moment as you do so it will be resolved:
```javascript
const promise = new Promise(function(resolve) {

    setTimeout(() => {
        console.log('one second passed');
        resolve('OK');
    }, 1000);

});

// one second passed...
// log: 'one second passed'

// we wait an hour...

// after an hour:
promise.then(
    data => console.log(data)
);
// log: 'OK' (instantly cause the promise got resolved ages ago)

// a little note here:  upon termination of the timeout, Promise will call resolve
// function, except since we haven't defined it yet it is as though this function is
// just (() => {}) before we call then. What is important to note is that as soon as
// the promise does that it is considered resolved
```

Check out this curious example (do note that we call `resolve()` before the log):
```javascript
const then = Date.now();
const promise = new Promise((res) => {
    setTimeout(() => {
        res(12);
        console.log(`async code - time elapsed: ${Date.now() - then}`);
    }, 1000);
});
setTimeout(() => {
    console.log(`resolve - time elapsed: ${Date.now() - then}`);
    promise.then(
        (data) => console.log(data)
    );
}, 3000);

// after 1 second:
// log: async code - time elapsed: ~1000

// after 3 seconds:
// log: resolve - time elapsed: ~3000
// log: 12
```

## .finally() intricacies

This method cannot have any arguments as it is used similar to `finally` in `try catch`: for
cleanup purposes and all. Also do note that it can be executed before `then`:
```javascript
new Promise((resolve) => {
    setTimeout(() => resolve('success'), 2000);
}).finally(() => console.log('finally 1'))
  .then(result => console.log(result))
  .finally(() => console.log('finally 2'))
  .finally(() => console.log('finally 3'))
// after 2 seconds:
// finally 1
// success
// finally 2
// finally 3
```

## Thenables

When we return a Promise in a `then` function it actually doesn't have to be an instance of the Promise
constructor. It should be any interface that implements its own `then` method:
```javascript
class Thenable {
    constructor(num) {
        this.num = num;
    }

    then(fun) {
        // fun === callback is false
        // I know it is confusing the browser
        // creates some sort of wrapper around it
        // yet doesn't matter, when fun() is called
        // callback is also going to be called
        fun(this.num);
    }
}

const callback = (num) => {
    console.log(num);
    return ':)';
}

new Promise(res => {
        setTimeout(() => res(2), 1000);
    })
    .then(
        data => new Thenable(data)
    )
    .then(callback)
    .then(
        val => console.log(`< ${val} />`)
    );

// after one second:
// log: 2
// log: < :) />
```
The idea is that external libraries may need this functionality.

## catch vs second callback

Are these code fragments equal? In other words, do they behave the same way in any
circumstances, for any handler functions?
```javascript
promise.then(f1).catch(f2);
```
Versus:
```javascript
promise.then(f1, f2);
```
The short answer is: no, they are not the equal:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:
```javascript
promise
  .then(f1)
  .catch(f2);
```
…But not here:
```javascript
promise
  .then(f1, f2);
```
That’s because an error is passed down the chain, and in the second code piece there’s
no chain below `f1`.

In other words, `.then` passes results / errors to the next `.then/catch`. So in
the first example, there’s a catch below, and in the second one – there isn’t, so the error
is unhandled:

```javascript
// error handled:
function one() {

    const promise = new Promise(res => {
        setTimeout(() => {

            res(12);

        }, 1000);
    });
    promise
        .then(
            data => {
                throw new Error('tar-tar sauce')
            }
        )
        .catch(err => {
            console.log(err);
        });
}

// error unhandled:
function two() {
    const promise2 = new Promise((res, rej) => {
        setTimeout(() => {
            res(12);
        }, 1000);
    });

    promise2.then(
        data => {
            throw new Error('tar-tar sauce');
        },
        err => {
            console.log(`warning error: ${err.message}`);
        }
    );
}

one();
// after a second:
// log: Error

two();
// after a second:
// throw: Error
```

## Consumers returning Promises

The asynchcronous code isn't waited for to be completed. If one of `then`s launches a `setTimeout` for
3 seconds the next `then` won't wait till 3 seconds are up, instead it is going to be executed straight
away. Take a look at the following code:

```javascript
new Promise(res => {
    console.log('enter 1st async');
    setTimeout(() => {
        console.log('one second passed');
        res(12);
    }, 1000);
}).finally(
    () => {
        new Promise(res => {
            console.log('enter 2nd async');
            setTimeout(() => {
                console.log('four seconds passed');
                res('finally');
            }, 3000);
        }).then(finallyData => console.log(`log from finally: ${finallyData}`));
    }
).then(
    data => {
        console.log(`enter 3rd async: ${data}`);
        setTimeout(() => {
            console.log('five seconds passed');
        }, 1000);
    }
).then(
    data => {
        console.log(`enter 4th async: ${data}`);
        setTimeout(() => {
            console.log('seven seconds passed');
        }, 2000);
    }
)
```
The engine will wait for the `setTimeout` in the initial promise and log:
```
enter 1st async
one second passed
```
After no more `setTimeout`s are waited for, at first the engine executes all `then`s and `finally` and
deals with asynchronous code as it arrives from the Event Queue. Thus the output is going to be:
```
enter 2nd async
enter 3rd async: 12
enter 4th async: undefined
...
after some time:
...
five seconds passed
seven seconds passed
four seconds passed
log from finally: finally
```
However there are exceptions: if we return a promise - then the other `then`s actually do
wait for it to finish async code. Remember? That is how chaining works. Executing asynchronous
code _sequentially_. That is OK. But here is another exception: you see `finally`, too, can
return a Promise, but this one won't affect arguments of the other `then`s ( thus it won't be part
of the chain so to speak ) but just like with the promises returned by `then`s, this one
( returned by `finally` ) will be waited for until it resolves before all the other `then`s
may continue executing. Here is the same code as above except there is a return statement in line `(*)`:

```javascript
new Promise(res => {
    console.log('enter 1st async');
    setTimeout(() => {
        console.log('one second passed');
        res(12);
    }, 1000);
}).finally(
    () => {
        // because here is a return we wait for
        // the async code in the promise below
        // before executing the other then()s
        // if we didn't return the other then()s
        // would be executed immediately ( not after 3 seconds )
        return new Promise(res => { // (*)
            console.log('enter 2nd async');
            setTimeout(() => {
                console.log('four seconds passed');
                res('finally');
            }, 3000);
        }).then(finallyData => console.log(`log from finally: ${finallyData}`));
    }
).then(
    data => { // (**)
        console.log(`enter 3rd async: ${data}`);
        setTimeout(() => {
            console.log('five seconds passed');
        }, 1000);
    }
).then(
    data => { // (***)
        console.log(`enter 4th async: ${data}`);
        setTimeout(() => {
            console.log('seven seconds passed');
        }, 500);
    }
)
```

The functions on lines `(**)` and `(***)` aren't chaining ( don't return anything ) and thus are
both executed at the same time and their asynchronous code is dealt as it arrives from the Event
Queue instead of _sequentially_ here is the output:
```
log: enter 1st async
...
after one second:
log: one second passed
log: enter 2nd async
...
after four seconds:
log: four seconds passed
log: log from finally: finally
log: enter 3rd async: 12
log: enter 4th async: undefined
...
after 500 ms:
seven seconds passed
...
after 1 second:
five seconds passed
```

This trick is used in [this](./5-error-handle-promise/index.js) project

## Promise.all(...) Intricacies

### How Promise.all(...) Works

`vals` ( code below ) is an array of the values which each of the Promises in the `promises` array
passes to their corresponding `res` function or the return value of `.catch()` or `rej()` of the
corresponding Promise. This feature to include either an argument to `res()` or the Return value of
`.catch()` / `rej()` is used in [this](./7-fault-promise-json/index.js) project, thus saving the day.
Here is the sample code:

```javascript
const promises = [
    new Promise(res => {
        setTimeout(() => {
            console.log('three seconds passed');
            res(12);
        }, 3000);
    }),
    new Promise(res => {
        setTimeout(() => {
            console.log('two seconds passed');
            res('man');
        }, 2000);
    }),
    new Promise(res => {
        setTimeout(() => {
            console.log('one second passed');
            res(true);
        }, 1000);
    }),
];

const promise = Promise.all(promises);
promise.then(vals => {
    // do note that the order of the values is the
    // same as in the initial array 'promises' and not the
    // same as the order in which these promises got resolved
    console.log(vals); // [12, 'man', true]
});

// with Promise.all() either then() or catch() is ever executed, not both:

promises.push(new Promise((res, rej) => {
    // an error could be thrown here as well,
    // then catch would be executed at once
    // ( not after 4 seconds )
    setTimeout(() => {
        console.log('four seconds passed');
        rej(new Error('tar tar sauce'));
    }, 4000);
}));

// only catch will be executed:
Promise.all(promises)
    .then(vals => { // ignored
            console.log('running then');
            console.log(vals);
    })
    .catch(err => {
        console.log('running catch');
        console.log(err);
    });

// here is proof that 'vals' is going to be either an argument passed to 'res'
// or the return value of '.catch()' / 'rej()':
const variousPromises = [
    new Promise(res => {
        setTimeout(() => {
            res('I don\'t fail');
        }, 1000);
    }),
    new Promise(res => {
        throw new Error('I have en error in code');
        setTimeout(() => {
            res('this value doesn\'t get passed');
        }, 2000);
    }).catch(err => err),
    new Promise((res, rej) => {
        setTimeout(() => {
            rej(new Error('I get rejected'));
        }, 3000);
    }).then(
        null,
        err => err
    )
];

Promise.all(variousPromises).then(vals => {
    console.log(vals);
    // vals: [
    //     0: "I don't fail",
    //     1: Error: "I have en error in code",
    //     2: Error: "I get rejected",
    // ]
});
```

### Promise.all(...) allows non-promise items in iterable

Normally, Promise.all(...) accepts an iterable (in most cases an array) of promises. But if any
of those objects is not a promise, it’s wrapped in Promise.resolve. For instance, here the
results are [1, 2, 3]:
```javascript
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```
So we are able to pass non-promise values to Promise.all where convenient.

## catch() in the Promise chain

`catch` ( when an error occurs and it is triggered ) may legimately return a value
( like an error instance ) and it will be piped successfully through a Promise chain:

```javascript
new Promise((res, rej) => {
    throw new Error('tar-tar sauce');
    setTimeout(() => {
        res(new Error('tar-tar sauce'));
    }, 1000);
}).then(
    data => console.log(`log from 1 ${data}`),
).catch(
    err => {
        console.log(`log from catch ${err}`);
        return err;
    }
).then(
    data => console.log(`log from 2: ${data}`),
);
```

In the code above 1st `then` is never executed but the 2nd ( following the rules of chaining )
gets as an argument the value returned by `catch`.

But do note that 2nd `then` will be called even if `.catch()` isn't.

## Promisification

`Promisification` is a process of turning an asynchronous function that takes an error-first
callback into a Promise like the `loadScript` function we saw in the beginning. Usually a helper
function is used for that:
```javascript
function promisify(f) {
    return function (...args) { // return a wrapper-function
        return new Promise((resolve, reject) => {
            function callback(err, result) { // our custom callback for f
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback); // append our custom callback to the end of arguments

            f.call(this, ...args); // call the original function
        });
    };
};

// usage:

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

const loadScriptPromise = promisify(loadScript);
loadScriptPromise('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js').then(
    () => console.log(_),
    err => alert(`wow: ${err}`)
);
```

Here is an improved version to promisify a function whose callback that might expect
over 2 arguments:
```javascript
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // our custom callback for f
                if (err) {
                    return reject(err);
                } else {
                    // resolve with all callback results if manyArgs is specified
                    resolve(manyArgs ? results : results[0]);
                }
            }

            args.push(callback);

            f.call(this, ...args);
        });
    };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```
Please note that promisification is a great approach, especially when you use async/await
but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.
So promisification is only meant for functions that call the callback once.
Further calls will be ignored.

## PromiseState and PromiseResult

The internal `PromiseState` property is pretty straightforward: when we create a Promise, it equals
to `pending` and as soon as the Promise calls either `reject` or `resolve`, `PromiseState` becomes
either `resolved` or `rejected` depending on whichever one of the two functions was called.

`PromsieResult` property is `undefined` until the Promise has gotten settled. Then this property
becomes the argument passed either to `resolve` or `reject`. Here is an example:
```javascript
const promise1 = new Promise(res => {
    setTimeout(() => {
        res(':)');
    }, 2000);
});

// promise1[[PromiseState]]: "pending"
// promise1[[PromsieResult]]: undefined

// after 2 second promise1 calls res() with the argument ":)"
// thus after 2 seconds:
// promise1[[PromiseState]]: "resolved"
// promise1[[PromsieResult]]: ":)"
```

## PromiseFullfilReactions and PromiseRejectReactions
Whenever we call `then()` what happens internally is it puts the callbacks ( for error
and success ) into the internal array property called `PromiseFullfilReactions` for
callbacks to be called when the Promsie calls `resolve` ( first argument to `then` ) and
it puts callbacks to be called when the Promsie calls `reject` ( second argument to `then` )
into the internal array property called `PromiseRejectReactions`. Here is an example:
```javascript
const promise1 = new Promise(res => {
    setTimeout(() => {
        res(':)');
    }, 2000);
});
promise1.then(
    foo,
    err => console.log(new InheritedError(err))
);
promise1.then(
    console.log,
    alert
);

// promise1[[PromiseFullfilReactions]]: [f, console.log]
// promise1[[PromiseRejectReactions]]: [anonymous, alert]
```
Do note that if we don't pass either of the arguments to `then`, there will still be a function put
either into `PromiseFullfilReactions` or `PromiseRejectReactions`. If we omit 1st function
`val => val` is put into `PromiseFullfilReactions` and if we omit 2nd argument,
`arg => { throw arg }` is put into `PromiseRejectReactions`.

## A Note on the Order in which Tasks are Processed on the Microtask Queue

It is not so crucial in which order the tasks were put on the `Microtask Queue` via calling
`then()` method. What I mean by that is if we have 2+ Promises each of which put their tasks
via their own `then` method the order that those tasks are going to be handled is as follows:
first handle the task put by the uppermost `then` of the 1st Promise, after that the one put by the
uppermose `then` of the 2nd Promsie, then the one put by the uppermost `then` of the 3rd Promise.
After all that is done, handle the task put by the second `then` of the 1st Promise, second `then`
of the 2nd Promise, second `then` of the 3rd Promise and so on.
Here is the code as an example:

```javascript
console.log(1);

setTimeout(() => console.log(2), 0);

Promise.resolve(3)
    .then(a => {
        console.log(a); // 3
        return a + 1; // 4
    })
    .then(a => {
        console.log(a); // 4
        return Promise.resolve(a + 1) // 5
    })
    .then(a => console.log(a)); // 5

Promise.resolve(6)
    .then(a => console.log(a));

console.log(7);
```

Here is a scheme:
```
The Order in which tasks are going to be handled is ( 1 - 9 ):
promsie1
    .then <-- 1
    .then <-- 4
    .then <-- 7
    .then <-- 9

promise2
    .then <-- 2
    .then <-- 5
    .then <-- 8

promise3
    .then <-- 3
    .then <-- 6
...
```
Here is the same code as the scheme above:
```javascript
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(4);
    })
    .then(() => {
        console.log(7);
    })
    .then(() => {
        console.log(9);
    });

Promise.resolve()
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(8);
    });

Promise.resolve()
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(6);
    });
```

## Real Life Example of Running two async Functions at the same time

```javascript
console.log('start running');

async function fun1() {
    console.log('enter fun1');
    const val = await new Promise(res => {
        // console.log('fun1 one sync code');
        res('fun1 one executed');
    });
    console.log(val);

    const val2 = await new Promise(res => {
        // console.log('fun1 two sync code');
        res('fun1 two executed');
    });
    console.log(val2);
    console.log('leaving fun1');
}

fun1();

console.log('between functions');

async function fun2() {
    console.log('enter fun2');
    const val = await new Promise(res => {
        // console.log('fun2 one sync code');
        res('fun2 one executed');
    });
    console.log(val);

    const val2 = await new Promise(res => {
        // console.log('fun2 two sync code');
        res('fun2 two executed');
    }).then(data => {
        return data;
    });
    console.log(val2);
    console.log('leaving fun2');
}

fun2();

console.log('finishing main thread');
```

As you can see in the code above the engine first executes the 1st `await` of the first function. then
the 1st `await` of the 2nd function, after that the two 2nd `await`s first of the first function, then
of the second function. Here is a scheme:
```
fun1() {
    await <-- 1
    await <-- 4
    await <-- 7
    await <-- 9
}

fun2() {
    await <-- 2
    await <-- 5
    await <-- 8
}

fun3() {
    await <-- 3
    await <-- 6
}
...
```

Here is proof:
```javascript
async function fun1() {
    const val1 = await Promise.resolve(1);
    console.log(val1);

    const val2 = await Promise.resolve(4);
    console.log(val2);

    const val3 = await Promise.resolve(7);
    console.log(val3);

    const val4 = await Promise.resolve(9);
    console.log(val4);
}

async function fun2() {
    const val1 = await Promise.resolve(2);
    console.log(val1);

    const val2 = await Promise.resolve(5);
    console.log(val2);

    const val3 = await Promise.resolve(8);
    console.log(val3);
}

async function fun3() {
    const val1 = await Promise.resolve(3);
    console.log(val1);

    const val2 = await Promise.resolve(6);
    console.log(val2);
}

fun1();
fun2();
fun3();
```

So the moral is: the order of executing asynchronous functions is obscure in any case which is why
it is a bad idea to rely on it and, if have to, one should avoid invoking over one `async` function
at the same time or calling `then` on over two different Promises at the same time.

## Promise.resolve(\<another promise\>) ( amazing !! )

Have you ever wondered what this code would do:

```js
(async () => {
    const val = await Promise.resolve(Promise.resolve(Promise.resolve(':)')));
    console.log('---->', val);
})();
```

What would be printed to the `console`?

Well, let's think, a call to `Promise.resolve` returns another Promise so logically the value inside the `val` variable
should be `Promise { "fulfilled" }`, shouldn't it? Well, believe it or not but no.

As we have once discussed Promises are _Monads_. And what is a Monad? It is something that is supposed to flatten the
value of the Promise if this value is another promise. Remember? That is, we said, exactly why in the line `(*)` below:

```js
Promise.resolve()
    .then(() => {
        return new Promise(res => { // (**)
            setTimeout(() => res(':)'), 2000);
        });
    })
    .then(value => { // (*)
        console.log(value);
    });
```

We get the value which the Promise in line `(**)` evaluates to ( the value `:)` ) instead of the
Promise in line `(**)` itself.

Just take a look at it. If, in the console in the developer's tools, you write something like this:

```js
Promise.resolve(Promise.resolve(Promise.resolve(':)')));
```

Take a look at the output:

```
Promise { "fulfilled" }
  <state>: "fulfilled"
  <value>: ":)"
```

Despite the fact that by looking at: `Promise.resolve(Promise.resolve(...))` we logically infer that such an expression
is supposed to produce a Promise which evaluates to another Promise, despite that, just because Promises are Monads if
you take a look at the `<value>` field ( in the output in the developer's tools ) you are going to see that all the
further Promises got flattened to `":)"`.

That is also the reason why, if you run the code below:

```js
(async () => {
    const val = await Promise.resolve( // (*)
            new Promise(res => { // (**)
                setTimeout(() => {res(':)')}, 2000);
            })
         );
    console.log('---->', val);
})();
```

after 2 seconds you are going to see the following `console.log`:

```
----> :)
```

first the JS compiler sees that the Promise in line `(*)` evaluates to another promise, thus because Promises are Monads
it waits then for what the Promise in line `(**)` evaluates to and if the Promise in line `(**)` should have evaluated
to yet another Promise it would even wait for that 3rd Promise to evaluate to something and so on ( luckily the Promise
in line `(**)` evaluated instead to `":)"` so that is what we get, after 2 seconds, in the variable called `val` ).

The same logic is the reason why in this code:

```js
Promise.resolve(new Promise((res) => { // (**)
      setTimeout(() => {
          res(':)');
      }, 2000);
    }))
    .then(data => { // (*)
        console.log('---->', data);
    });
```

the value of the variable `data` in line `(*)` is going to be _not_ the Promise created in line `(**)` but instead
the value that this Promise in line `(**)` evaluates to ( the value `":)"` ).

In all other cases the value that the Promise resolves to is going to be passed to the `then` method:

```js
Promise.resolve(12).then(data => { // the value of data is going to be === 12
    console.log('---->', data);
});
```

## then() inside then()

So here in the 1st `then` we return a Promise that has its own `then` functions being called:

```js
Promise.resolve(1)
    .then(data => {
        console.log('first one', data);
        return new Promise((res) => {
            setTimeout(() => {
                res(2);
            }, 2000);
        })
            .then((data) => { // (*)
                console.log('after2 seconds', data);
                return 4;
            });
    })
    .then((data) => { // data === 4
        console.log('last one', data); // (**)
    });
```

In reality the output is going to be:

```
first one 1

...2 seconds passed

after2 seconds 2 
last one 4
```

It is no secret that if we _return_ a Promise in the `then` function, then JS will wait till the Promise resolves
and after that it will pass the value that the Promise resolves to to the next `then` function ( in our case to the
one in line `(*)` ).

**Note:** that wouldn't happen if we were _not_ to return a Promise but simply create it like this:

```js
Promise.resolve(1)
    .then(data => {
        console.log('first one', data);
        new Promise((res) => { // no return
            setTimeout(() => {
                res(2);
            }, 2000);
        })
            .then((data) => {
                console.log('after2 seconds', data);
                return 4;
            });
    })
    .then((data) => {
        ...
    });
```

But look at the `then` function in line `(*)` again: it returns a value. And the thing is: because Promises are Monads,
this value actually gets passed to the _outer_ then in line `(**)`.

**Note:** the `finally` function behaves differently thou. Take a look at the following code:

```js
Promise.resolve(1) // (**)
    .finally(data => { // data === undefined (*)
        console.log('first one', data);
        return new Promise((res) => { // (****)
            setTimeout(() => {
                res(2);
            }, 2000);
        })
            .then((data) => { // (*****)
                console.log('after2 seconds', data);
                return 4; // *ignored (**here**)
            });
    })
    .then((data) => { // data === 1 (***)
        console.log('last one', data); // data === 1
    });
```

The output is going to be:

```
first one undefined

... after 2 seconds

after2 seconds 2
last one 1
```

Look, in line `(*)` the value of `data` is going to be `undefined`, so as we can see the value that the Promise in 
line `(**)` resolved to didn't get passed to `finally`, but instead this value was passed to the _next `then`
in the chain,_ thus in line `(***)` the value of `data` is `1`.

Also there are 2 more things to note here. First of all, because we _return_ the `Promise` in line `(****)`, the
execution of all the next `then` in the chain ( the ones in lines `(*****)` and `(***)` ) will wait for it to resolve
( thus will wait for 2 seconds ); again, wouldn't happen should we not have returned the Promise in line `(****)`.
Second of all, since the value passed to the `then` in line `(***)` is the value, which the Promise in line `(**)`
got resolved to, because of that the value returned from the last `then` of the finally method in line `(**here**)`
is actually ignored. It would be ignored anyways, actually, even if the Promise in line `(**)` were to resolve to
`undefined`, then the value of `data` in line `(***)` would be `undefined` too.
