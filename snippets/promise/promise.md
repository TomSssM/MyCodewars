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