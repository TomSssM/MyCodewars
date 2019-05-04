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

---

## Promise Projects

- Delay with a Promise
- Next