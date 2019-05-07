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