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

## Promise Details

### States

Naturally a Promise has two states: `pending` and `fulfilled` / `rejected`. `pending` is when the
asynchronous code is being executed and `fulfilled` / `rejected` is when either `resolve` or
`reject` is called upon the completion of the execution of the asynchronous code. The result of the
promise is also always only one: either what is passed into `resolve` (some data usually) or what is
passed into `reject` (usually an error).

### Only a Single Result or a Single Error

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

### Not calling .then() for too long

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
// instantly the promise is resolved:
// log: 'OK' (instantly cause it should have been resolved ages ago)
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

### .finally() intricacies

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

### Thenables

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

---

## Promise Projects

- [Delay with a Promise](./2-delay/index.js)
- [Animated Circle with a Promise](./3-anim-promise/index.js)
- [first ever fetch + Promise example](./4-fetch-plus-promise/index.js)