# Promise

## Pyramid of Doom

### Callback-Based Style of Asynchronous Programming

This style of programming is applied for functions if the functions we use are _asynchronous_.
Here is an example of such a function:
```javascript
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;

    script.onload = () => callback(script);

    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
```

### Error-First Callback Style of Asynchronous Programming

In the above example we didn’t consider errors. What if the script loading fails? Our callback
should be able to react on that. Here is an improved version of loadScript that tracks loading errors:
```javascript
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));

    document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
    if (error) {
        // handle error
    } else {
        // script loaded successfully
    }
});
```

### Callback in Callback

But how should we be able to load script `b.js` after `a.js` loads? We would need to put a callback
inside a callback. It sounds complicated but is better illustrated with code:
```javascript
loadScript('./a.js', function(err, script) {
    if (err) {
        // handle error
    } else {
        // some code...
        loadScript('./b.js', function(err, script) {
            if (err) {
                // handle error...
            } else {
                // some code...
                // ^ this code will be executed after a.js is loaded and executed
            }
        });
    }
});
```

That doesn't look too bad for 2 function calls but what if we want to load asynchronously 3 and more
scripts? Then our code would grow immensely ( especially to the right ):
```javascript
loadScript('1.js', function(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', function(error, script) {
            if (error) {
                handleError(error);
            } else {
                // ...
                loadScript('3.js', function(error, script) {
                    if (error) {
                        handleError(error);
                    } else {
                        // ...continue after all scripts are loaded (*)
                    }
                });
            }
        });
    }
});
```
In the code above:
1. We load 1.js, then if there’s no error
2. We load 2.js, then if there’s no error
3. We load 3.js, then if there’s no error – do something else (*)
This is called _a pyramid of doom_ sometimes.

To fix this we can try to make every action a standalone function, like this:
```javascript
function step1(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('2.js', step2);
    }
}

function step2(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...
        loadScript('3.js', step3);
    }
}

function step3(error, script) {
    if (error) {
        handleError(error);
    } else {
        // ...continue after all scripts are loaded (*)
    }
}

loadScript('1.js', step1);
```

[Here](./1-circle-standalone/index.js) is an example of such an implementation.

An alternative approach would be to use Promise

---

## Promise Overview
_This is a somewhat limited overview of the concept mayhap lacking the usual detailed approach to it
(for which I heartily apologize) and withal is requisite of understanding of asynchronous code. The
reason for this is merely the presence of a much more detailed overview in the `Exploring ES6` book.
Also a great attribute, as always, is to be addressed to `javascript.info` for a much more successful
tutorial of the topic._

Promises are used to run asynchronous code and work with functions that come from the Event Queue
a promise instance is instantiated via calling a `Promise` constructor. The point here is the
kind of argument we need to pass to it: it is a callback! This callback has a name of `executor`.
```javascript
let promise;
if(Math.random() < 0.5) {
    promise = new Promise(function(resolve, reject) {
        //                ^ I am talking about this callback :)
        setTimeout(() => resolve("done"), 1000);
    //  ^ asynchronous code
    });
} else {
    // this here is an example of an unsuccessful promise
    // because in real life we might be using promises do to stuff
    // when data comes from the server for instance and it may or
    // may not arrive :)
    promise = new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error('tar-tar sauce')), 2000);
    });
}
```
Now where in the world do we look for a function `resolve` or `reject`? We call function `then` and
provide 2 more callbacks:
```javascript
promise.then(
    (successString) => alert(`success: ${successString}`),
    (err) => alert(`promise failed: ${err.message}`)
);
```
The first callback (let's call it `callback a`) is going to be assigned to `resolve` and the
second callback (`callback b`) is going to be assigned to `reject`. Internally it might look like this:
```
function(res, rej) {
    res();
    rej();
}
then() -> res = <actual function>
          rej = <actual function>
```
So the arguments we pass to `then` are actually going to become the values (function bodies) of the
parameters `resolve` and `reject` correspondingly.

`then` is actually called `consumer` (there are many of them). Thus it is as though in the
constructor (in the `executor`) we call some function called `reject` and then in the `consumer` we
define this function. Here is another example:
```javascript
const promise = new Promise((success) => {
    setTimeout(() => success(12), 2000);
});
promise.then(
    (number) => {
        console.log('2 seconds passed already');
        console.log(number * 2);
    },
    // here should be an error handler
    // but we don't need it as only resolve is ever called :)
);

// 2 seconds pass...
// log: 2 seconds passed already
// log: 24
```

So in summary the point of `Promise` is that it calls `resolve` even in asynchronous code assuming
control of the Event Queue and ( we were able to do that before ) most importantly promises save
us from the Node.js `tree of doom`

---

## Promise Chaining

### How to implement Promise Chaining

It looks like this:
```javascript
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);

}).then(function(result) {

    console.log(result); // 1
    return result * 2; // (*)

}).then(function(result) { // (**)

    console.log(result); // 2
    return result * 2;

}).then(function(result) { // (***)

    console.log(result); // 4
    return result * 2;

});

// after one second:
// log: 1
// log: 2
// log: 4
```
Everything is as usual until line `(*)`: we make a Promise then call function `resolve` which is defined
in the following `then` call. Nice and easy ( if not read the prev section ). But what happens to the
return value of any function `then`? Turns out whenever `then` returns a value ( in line `(*)` ),
this value will become the parameter of the function in line `(**)` ( of the function passed as the
first argument to the following call to `then` ). Here is a somewhat diagram:
```
promise
    .then(
        resolve <- Pass as an argument our data
        resolve()
        -> Return Value 1
    )
    .then(
        resolve <- Return Value 1
        resolve()
        -> Return Value 2
    )
    .then(
        resolve <- Return Value 2
        resolve()
        -> Return Value 3
    )
    ...
    .then(
        resolve <- Return Value n - 1
        resolve()
        -> Return Value n
    )
    ...
```

### Chaining vs multiple .then()

It is a common error because we can add many `then()` handlers to a single `Promise` like this:
```javascript
// not chaining:
const promise1 = new Promise(res => {
    setTimeout(() => res(2), 1000);
});

promise1.then(val => {
    console.log(`Handler 1 same value: ${val}`);
    return ':)'; // ignored
});
promise1.then(val => {
    console.log(`Handler 2 same value: ${val}`);
    return ':-)'; // ignored
});
promise1.then(val => {
    console.log(`Handler 3 same value: ${val}`);
    return '>0'; // ignored
});

// chaining
const promise2 = new Promise(res => {
    setTimeout(() => res(12), 1000);
});
promise2
    .then(val => {
        console.log(`Handler 1 init value: ${val}`);
        return ':)'; // not ignored
    })
    .then(val => {
        console.log(`Handler 2 smile value: ${val}`);
        return ':-)'; // not ignored
    })
    .then(val => {
        console.log(`Handler 3 nose-smile value: ${val}`);
        return '>0'; // ignored
    });

// after one second:
// log: Handler 1 same value: 2
// log: Handler 2 same value: 2
// log: Handler 3 same value: 2
// log: Handler 1 init value: 12
// log: Handler 2 smile value: :)
// log: Handler 3 nose-smile value: :-)
```
But this is not chaining ( though it looks like it ) because in `promise1` we do not in any way use
the Return Value of `then`. Why use it at all you may ask? Well, read on to find out what
happens if this value is a Promise :)

### How to use Promise Chaining

We still haven't unriddled how to fix the `tree of doom`. Even if we rewrite a previous function with
Promises it still grows to the right:
```javascript
// let's pretend that the server needs 1 second to load a script
// and instead of creating a server just do a setTimeout()
function loadScript(url) {
    return new Promise(res => {
        setTimeout(() => res(url), 1000);
    });
}

loadScript('./a.js').then(data1 => {
    console.log(data1);
    loadScript('./b.js').then(data2 => {
        console.log(data2);
        loadScript('./c.js').then(data3 => {
            console.log(data3);
            // done, all 3 scripts are loaded
        });
    });
});

// after 1 second:
// log: './a.js'

// after another second:
// log: './b.js'

// after yet another second:
// log: './c.js'
```
To fix this let's see what happens when we return a promise in a `then()` function:
```javascript
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);

}).then(function(result) {

    alert(result); // 1

    return new Promise((resolve, reject) => { // (*)
        setTimeout(() => resolve(result * 2), 1000);
    });

}).then(function(result) { // (**)

    alert(result); // 2

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });

}).then(function(result) {

    alert(result); // 4

});
```

When we return a Promise in line `(*)` the function in line `(**)` doesn't have `result` set to the
returned promise as it was with primitives. What happens is the function in line `(**)` is instead
set to be the `resolve` function of the promise returned in `(*)`. And guess what, because the function
passed as an argument to second `then` in line `(**)` is `resolve` function of the promise returned
in line `(*)` it (function) will be called only when the promise (the one on line `(*)`) will call it,
which is in a second. Thus in the example above the output is: one second -> `1`,
another second -> `2` and after yet another second -> `4`. Here is a somewhat algorithm:
```
promise
    .then(
        resolve <- Pass as an argument our data
        resolve()
        -> promise 1
    )
    .then(
        resolve <- value defined in promise 1
        [promise 1].resolve()
        -> promise 2
    )
    .then(
        resolve <- value defined in promise 2
        [promise 2].resolve()
        -> promise 3
    )
    ...
    .then(
        resolve <- value defined in promise n - 1
        [promise n - 1].resolve()
        -> promise n
    )
    ...
```

Thus it lets us at long last get rid of the `tree of doom` and kind of perform asynchronous
actions sequentially:
```javascript
function loadScript(url) {
    return new Promise(res => {
        setTimeout(() => res(url), 1000);
    });
}

loadScript('./a.js')
    .then(data1 => {
        console.log(data1);
        return loadScript('./b.js');
    }).then(data2 => {
        console.log(data2);
        return loadScript('./c.js');
    }).then(data3 => {
        console.log(data3);
        // we are done all 3 scripts are loaded
    });

// same output: one url per second
```
So we when a is loaded we load b, after b has finished loading we load c and no matter how
many resources we have to load the code isn't going to grow to the right, only down :)

This approach has but one disadvantage: we don't have a closure of all variables like we did when
we built the `tree of doom`:
```javascript
loadScript("/article/promise-chaining/one.js").then(script1 => {
    loadScript("/article/promise-chaining/two.js").then(script2 => {
        loadScript("/article/promise-chaining/three.js").then(script3 => {
            // this function has access to variables script1, script2 and script3
            one();
            two();
            three();
        });
    });
});
```

In the example above the most nested callback has access to all variables `script1`, `script2`,
`script3`. But that’s an exception rather than a rule.

Look for a project called `first ever fetch + Promise example` in the `projects` section where we use
this very technique when working with `fetch`.

---

## Error Handling

Whenever any error ( actual error or an explicit `throw` ) occurs the control goes to
any error handler
( whichever is first ) of our promise. For instance here we have two error handlers and only the
first one ( `reject` argument ) is called:
```javascript
new Promise((res, rej) => {
    setTimeout(() => {
        rej(new Error('tar-tar sauce'));
    }, 1000);
})
.then(
    () => console.log('everything is OK'),
    (err) => console.log(`reject - ${err}`)
)
.catch(err => console.log(`catch - ${err}`));

// after one second:
// log: reject - Error: tar-tar sauce
// that's it .catch() isn't called
```
Here the `reject` argument handler isn't defined and thus `catch` is called:
```javascript
new Promise((res, rej) => {
    // we could throw new Error here and either
    // reject or catch would be called
    setTimeout(() => {
        rej(new Error('tar-tar sauce'));
    }, 1000);
})
.then(
    () => console.log('everything is OK'),
    // (err) => console.log(`reject - ${err}`)
)
.catch(err => console.log(`catch - ${err}`));

// after one second:
// log: catch - Error: tar-tar sauce
```
Only `catch` would be called if an error occurred and `catch` came before `reject` handler
( however resolve() would be called ):
```javascript
new Promise((res, rej) => {
    throw new Error('wow');
    setTimeout(() => {
        res('text');
    }, 1000);
})
.catch(err => console.log(`catch - ${err}`))
.then(
    () => console.log('everything is OK'),
    (err) => console.log(`reject - ${err}`)
)

// after one second:
// log: catch - Error: tar-tar sauce
// log: everything is OK

// here the only difference between reject and catch is that after handling error as
// you can see Promise calls resolve(), however, if catch were to come after then(),
// we would call either resolve() or reject() ( we would call reject() obviously ) and
// thus resolve() would never be called ( unlike with catch() )
```

If we rethrow an error in one catch it goes straight to the next one ignoring all
than along the way:
```
catch {
    throw ------
}               |
then() {        |
    // ignored  |
}               |
catch {         |
    handle ? <--|
}
then() {
    // happy ever after :)
}
```

Here is an example:

```javascript
// the execution: catch -> catch -> then
new Promise((resolve, reject) => {

    throw new Error("Whoops!");

}).catch(function(error) { // (*)

    if (error instanceof URIError) {
        // handle it
        return 'man';
    } else {
        alert("Can't handle such error");
        throw error; // throwing this or another error jumps to the next catch
    }

}).then(function() {

    /* never runs here */
    alert('I won\'t be alerted'); // (***)
    return '>0'; // ignored ( obviously )

}).catch(error => { // (**)

    alert(`The unknown error has occurred: ${error}`);

    // after this line => execution goes the normal way
    return ':)';

}).then(
    data => {
        alert(`I will be alrted ${data}`);
    }
);

// instantly:
// alert: Can't handle such error
// alert: The unknown error has occurred
// alert: I will be alrted :)
// do note that this ------^ isn't '0<' because
// line (***) is ignored
```

Do note as well that only errors inside `Promise` and `resolve` or `reject` trigger `catch`. For
instance the following code won't trigger catch as an error is thrown on the `window` level:
```javascript
new Promise(function(resolve, reject) {
    setTimeout(() => {
        throw new Error("Whoops!");
    }, 1000);
}).catch(alert);
```

It should be added that if an error happens inside any of `then()`s all the further `then`s until
`catch` are going to be ignored. Take a look at the following code:
```javascript
new Promise(
    res => res(12),
).then(
    data => console.log(data), // 12
).then(
    data => {
        throw new Error('tar-tar sauce');
    }
).then(
    data => console.log(data), // NOT: :)
).catch(err => ':)');
```
Here is a scheme:
```
then -> OK
then -> OK
then -> Error ---
then // ignored  |
then // ignored  |
then // ignored  |
catch <----------|
then // NOT ignored
then // NOT ignored
...
```

Do note that `then`s after `catch` are not ignored and we can even implement _chaining_ if
we return smth from `catch`:

```javascript
new Promise(res => res(12))
    .then(
        data => console.log(data), // 12
    )
    .then(
        data => {
            console.log(data); // undefined !!!
            throw new Error('tar-tar sauce');
        }
    )
    .then(
        () => console.log('I will be ignred'), // ignored
    )
    .catch(
        err => console.log(err), // Error: tar-tar sauce
    )
    .then(
        () => console.log('I wont \'t be ignored'), // NOT ignored
    )
    .then(
        () => console.log('Me too!'), // NOT ignored
    );

// we can also have Chaining:
new Promise(res => res(12))
    .then(
        data => console.log(data), // 12
    )
    .then(
        data => {
            console.log(data); // undefined
            throw new Error('tar-tar sauce');
        }
    )
    .then(
        () => console.log('I will be ignred'), // ignored
    )
    .catch(
        err => {
            console.log(err); // Error: tar-tar sauce
            return ':)';
        }
    )
    .then(
        data => {
            console.log(data); // :)
            return 'man';
        }
    )
    .then(console.log); // 'man'
```

## Macrotask Queue vs Microtask Queue

You should remember at all times that Promises in fact are asynchronous. It means that the
code inside the `resolve` ( and so on ) functions is put on the `Event Queue` ( even when a Promise
is resolved instantly ). But do note that the code inside the promise itself is __synchronous__. Here
is proof of that:
```javascript
new Promise(res => {
    alert('Hello'); // synchronous
    res(); // asynchronous
}).then(() => alert('!'));
alert('World'); // synchronous

// output:
// alerts: Hello -> World -> !
```

Oh, did I say that the asynchronous code of the Promises is put on the `Event Queue`? I meant it is
put on the `Microtask Queue`. Well, you see all the Web API like `setTimeout` and all are put on the
regular `Event Queue` and the asynchronous code of the Promises is processed in the same order as it
is enqueued on the `Microtask Queue`. And the regular `Event Queue` is also sometimes referred to as
`Macrotask Queue`. What does it mean for us you ask? Well, here is the thing:
__Microtask queue has a higher priority than the Macrotask Queue.__
What it means is that the asynchronous code of the Promises is resolved before any other asynchronous
code _no matter what!_ Here is the proof of that:
```javascript
setTimeout(() => {
    console.log('timeout');
}, 0);

new Promise(res => res('promise')).then(
    data => console.log(data)
);

// output:
// log: promise
// log: timeout
```
In other words first the browser does the synchronous code, which puts functions both on the
`Microtask Queue` and the `Event Queue`, then it executes everything from the `Microtask Queue`
and goes on to dequeue things from the good old `Event Queue`. Also I can't help but adduce a self
drawn scheme:
```
 Call Stack
 __________
|__________|
|__________|
|__________|
|__________|
|__________|
|__________|
|          |   __________       ________________       _____________
         <--- (Event Loop) <-- | Microtask Queue| <-- | Event Queue |
```
So we cannot oftentimes guarantee that one asynchrnous action will be done right after the other
because for instance `setTimeout` may make a Promise and it will be next like here:

```javascript
// compare this:
setTimeout(() => {
    console.log('one');
    new Promise(res => res('two')).then(
        data => console.log(data),
    );
}, 0);
setTimeout(() => {
    console.log('three');
}, 0);

// vs this one:
setTimeout(() => {
    console.log('one');
    setTimeout(() => {
        console.log('three');
    }, 0);
}, 0);
setTimeout(() => {
    console.log('two');
}, 0);
```

In the first one by all means the second `setTimeout` ought to be next after the 1st
`setTimeout` finished working but since the 1st `setTimeout` puts a task on the `Microtask Queue`
the browser cannot go on to the next task on the `Event Queue` ( which is 2nd setTimeout ) until
the `Microtask Queue` is empty ( so it executes the asynchronous code of the `Promise` next instead )

If the order does matter to us we could do smth like this:
```javascript
Promise.resolve()
    .then(() => alert('one'))
    .then(() => alert('two'))
    .then(() => alert('three'));
```

Now, with the understanding of microtasks, we can formalize the `unhandledrejection` event:
__"Unhandled rejection" is when a promise error is not handled at the end of the microtask queue.__

For instance, consider this code:
```javascript
const promise = Promise.reject(new Error("Promise Failed!"));

window.addEventListener('unhandledrejection', event => {
  alert(event.reason); // Promise Failed!
});
```

We wouldn’t have it if we added .catch, like this:
```javascript
const promise = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));

// no error, all quiet
window.addEventListener('unhandledrejection', event => alert(event.reason));
```
Now let’s say, we’ll be catching the error, but after `setTimeout`:
```javascript
const promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')));

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```
Now the unhandled rejection appears again. Why? Because `unhandledrejection` triggers when the
`Microtask Queue` is empty. The engine examines promises and, if any of them is in _rejected_ state,
then the event is generated.

In the example, the `.catch` added by `setTimeout` triggers too, of course it does, but later, after
`unhandledrejection` has already occurred. Thus the output is going to be:

```
...
nothing on the event queue, generate the event:
alert: error
...
now that we are done with the Microtask Queue let's see
if there is anything on the Event Queue and execute it:
alert: caught
```

## Async / Await

### Async

Basically `async / await` allow us not to use `.then()` with Promises, it is simply more convenient
sometimes to use them instead.
In a nutshell `async` makes a function return a Promise and allows us to use `await` inside a function
preceeded by `async`. Even if a primitive is returned by an `async` function it gets wrapped into
`Promise.resolve()`:
```javascript
// this:
async function one() {
    return 1;
}

// is the same as this:
function two() {
    return Promise.resolve(1);
}

one().then(alert); // 1
two().then(alert); // 1

// can't use await in a non-async function:
function usual() {
    await new Promise();
}
async function asyncFun() {
    await new Promise(res => res(12));
}

usual(); // SyntaxError: await is only valid in async function
asyncFun(); // OK
```
Just so you don't get confused if we don't return anything from an `async` function, it still
implicitly returns a Promise except it is tantamount to `Promise.resolve(undefined)`:
```javascript
async function explicit() {
    return ':)';
}

explicit().then(data => {
    alert(data); // :)
});

async function implicit() {
    12 + 12;
    // implicitly: return Promise.resolve(Return Value);
    // - what is Return Value?
    // - undefined!
}

implicit().then(
    data => {
        alert(data); // undefined
    }
);
```

So, once again, `async function` is just a usual _synchronous_ function that can resolve Promises
via `await` keyword and always returns a Promise ( in addition ). However, a rather important detail
is how it processes multiple `await` statements. Before we get into it here is proof that an
`async function` is synchronous:

```javascript
(async () => {
    console.log('async');
})();

console.log('main stream');

// output:
// log: async
// log: main stream
```
OK, here is the workflow of how such a function processes multiple `await` statements:
- Do everything synchronously until encountering the 1st `await`
- Run the synchronous part of the Promise:
    - Until encountering Web API like `setTimeout`
    - Until encountering a call of `resolve` / `reject`
- Put the asynchronous part of that 1st Promise into the `Microtask Queue`
- Run the rest of the Main code
- Resolve that 1st Promise
    - It basically means returning an argument passed to `resolve`
- Usual Workflow:
    - Go to the next `await`
    - Wait till both synchronous and asynchronous parts of it are done
    - Resolve a Promise
    - Go to the next `await`
- Finish Executing

That is quite a handful and here is an example of that:
```javascript
async function f() {
    console.log('enter async');
    await new Promise(res => {
        console.log('enter first promise');
        res();
    }).then(() => {
        console.log('resolve 1st promise');
    });
    console.log('in between');
    await new Promise(res => {
        console.log('enter second promise');
        setTimeout(() => {
            res();
        }, 3000);
    }).then(
        () => console.log('resolve 2nd promise')
    );
    console.log(`in between 2`);
    await new Promise(res => {
        console.log('enter third promise');
        setTimeout(() => {
            res();
        }, 3000);
    }).then(
        () => console.log('resolve third promise')
    );
    console.log('leaving async');
}

f();

console.log('main stream');
```
The output is going to be:
```
log: enter async
log: enter first promise
now go ahead and do the rest of the main script
log: main stream
after the main script is done resolve that pending promise
log: resolve 1st promise
log: in between
log: enter second promise
while second promise is pending stop execution of the function
...
after 3 seconds:
log: resolve 2nd promise
log: in between 2
log: enter third promise
while third promise is pending stop execution of the function
...
after 3 seconds:
log: resolve third promise
log: leaving async
```

### Await

Then there is the `await` keyword, what it does is wait for a promise to call `resolve` function
and then it returns the argument which Promise passed to `resolve`:
```javascript
async function name() {
    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(':)');
        }, 1000);
    });
    const res = await promise;
    console.log(res);
}
name();

// output:
// after 1 second:
// log: ':)'
```

### Errors and Async / Await

If the Promise calls `reject` or has some other Error inside it, then `await` is syntactically
tantamount to the `throw` expression:
```javascript
async function name() {
    const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('tar-tar sauce'));
        }, 1000);
    });
    console.log(res); // ignored
}
name();

// output:
// after one second:
// Uncaught (in promise) Error: tar-tar sauce

// or the same if there is simply some error in the Promise itself:
async function two() {
    const res = await new Promise((resolve, reject) => {
        throw new Error('tar-tar sauce');
        setTimeout(() => {
            resolve(':)');
        }, 1000);
    });
    console.log(res); // ignored
}
two();

// output:
// instantly:
// Uncaught (in promise) Error: tar-tar sauce
```

Now how can we catch errors in `async / await`? Well, since this:
```javascript
async function f() {
    await Promise.reject(new Error('tar-tar sauce'));
}
```
is the same as this:
```javascript
async function f() {
    throw new Error('tar-tar sauce');
}
```
we have two options:
- use a `try catch` block ( exception will be caught )
- call `catch()` after an `async` function ( because it does return a Promise )

Here is an example of how we could use a `try catch` block:

```javascript
async function f(url) {
    try {
        const resp = await fetch(url);
        const json = await resp.json();
        alert(json);
    } catch (error) {
        alert(error);
    }
}

f('http://no-such-url');

// after some time:
// alert: TypeError: Failed to fetch
```

Or we could use a `catch` method instead:
```javascript
async function f(url) {
    const resp = await fetch(url);
    const json = await resp.json();
    alert(json);
}

f('http://no-such-url').catch(alert);

// after some time:
// alert: TypeError: Failed to fetch
```
Also do note that when using `async / await` one might get an impression that we don't ever
need to use `then` with them. However we actually do as it is the only way to interact with a promise
outside the function `f()`:
```javascript
async function f() {
    const promise = new Promise(res => {
        setTimeout(() => {
            res(':)');
        }, 1000);
    });
    const smile = await promise;
    console.log(smile);
}

f().finally(
    () => {
        console.log('some cleaning up here');
    }
);

// after one second:
// log: :)
// log: some cleaning up here
```

At the top level of the code, when we are outside of any async function, we are syntactically
unable to use await, so it is a normal practice to add `.then/catch` to handle the final result
or falling-through errors.

Here is an example of how an `async / await` function might look like:
```javascript
async function showAvatar() {
    // read our JSON
    const response = await fetch('./user.json');
    const user = await response.json();

    // read github user
    const githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    const githubUser = await githubResponse.json();

    // show the avatar
    const img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    // wait 3 seconds ( and nothing more )
    await new Promise(resolve => setTimeout(resolve, 3000));

    img.remove();
    return githubUser;
}
showAvatar().catch(alert);
```

Also `await` accepts a 'thenable' object. The `then` method defined on such an object should have
`resolve` / `reject` as parameters and call them with some value. However, since we don't define
this function ( `resolve` for instance ) in the following `then()` invocation the actual `resolve`
function that a 'thenable' instance is going to call will be a function with a native code passed
by the engine. Here is the example:
```javascript
class Thenable {
    constructor(val) {
        this.val = val;
    }

    then(res, rej) {
        alert(res); // function () { [native code] }
        alert(rej); // function () { [native code] }
        setTimeout(() => {
            res(this.val);
        }, 2000);
    }
}

(async () => {
    const value = await new Thenable(':)');
    // after 2 second...
    alert(value); // :)
})();

// output:
// instantly:
// alert: function () { [native code] }
// alert: function () { [native code] }
// after 2 seconds:
// alert: :)
```

In a like manner we can define `async` methods:
```javascript
class SomeClass {
    constructor(name) {
        this.name = name;
    }
    async method() {
        const val = await new Promise(res => {
            setTimeout(() => {
                res(this.name);
            }, 2000);
        });
        alert(val);
    }
}

new SomeClass('John').method();
// after 2 seconds:
// alert: John
```

There would be no error if we call `then()` on the Promise that comes after `await` but the
resulting value will be the Return Value of `then`:
```javascript
(async () => {
    const val = await new Promise(res => {
        setTimeout(() => {
            res(12);
        }, 2000);
    }).then(data => {
        return data + ':)';
    });
    alert(val);
})();

// output:
// after 2 seconds:
// alert: 12:)
```
And there you have it :)