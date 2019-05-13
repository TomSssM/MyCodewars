# fetch

## Overview

### Basics

Calling the `fetch` function:
```javascript
const promise = fetch(url, { options });
```
returns a promise. This promise is in fact a server response. It resolves as soon as the server responded with
headers but do note that __we don't have the body yet!__ Here is a quick diagram:
```
fetch() === new Promise(resolve => {
    resolve( <response without a body> );
});
```
The promise ( returned by `fetch` ) will only reject for mainly 2 reasons:
- Network Problems
- No Such Website

You see, the promise doesn't reject if we get an _HTTP Error._ It means that even if the server responds with 404
( or any status other than 200-299 ) the Promise still resolves and we get back a normal response. That is why
we need to check whether the request was correctly processed by the server. Luckily doing so is just a piece of
cake because we can use certain properties of the `response` object:
```javascript
// here is the response obj:
const response = await fetch(url);
```

Particularly these ones:
- `response.status` - the status code returned in the response by the server ( called HTTP Status Code )
- `response.ok` - `true` if the status code is 200-299, otherwise `false`

Thus here is how we could check for a successful response:
```javascript
const response = await fetch(url);
if (response.ok) { // if HTTP-status is 200-299
    // get the response body (see below)
    const json = await response.json();
} else {
    // HTTP Error
}
```
It is also a normal practice to inherit an `HTTPError` class from `Error` and throw it in the `else` statement:
```javascript
else {
    throw new HTTPError(response.status);
}
```
Then we could catch errors in the `catch` block and do something if it is an HTTPError or rethrow otherwise.

Response body can also be attained in any format via calling:
- `response.json()` – parse the response as JSON object
- `response.text()` – return the response as text
- `response.formData()` – return the response as FormData object ( form/multipart encoding )
- `response.blob()` – return the response as Blob ( binary data with type )
- `response.arrayBuffer()` – return the response as ArrayBuffer ( pure binary data )
- `response.body` is a `ReadableStream` object, it allows to read the body chunk-by-chunk

These methods return another Promise whose `[[value]]` is going to be the body of the response in the
corresponding format.

Also here are a few things to note. First, if the server responds with JSON and we choose to get the body
of the response as `text()`, then we get a text in valid JSON format. Thus as you can see we need to know what
server needs to respond with before we process the response. Second, do note that once the `response` Promise
has been resolved ( we called methods like `.json()`, `.text()`, `blob()` etc. ) we cannot get the body of the
response in yet another format. Thus the following code will produce an error:
```javascript
const res = await fetch(url);
const json = await res.json();
const text = await res.text(); // error
```

### Setting and Getting Headers

Headers are contained in a `headers` property of the `response` object and are a Map like object:
```javascript
const res = await fetch('./sampleJSON.json');
[...res.headers] //  [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
```
We can get the value of each header like so:
```javascript
response.headers.get('Content-Type'); // application/json; charset=utf-8
```
Or we could iterate all headers like so:
```javascript
for (let [key, value] of response.headers) {
    alert(`${key} = ${value}`);
}
```
And we can set a header ( of the request on the client side ) like so:
```javascript
const response = fetch(protectedUrl, {
    headers: {
        Authentication: 'abcdefgh'
    }
});
```
But remember that not all headers can be set for security reasons. For instance we cannot tell the server
that we are a different website by changing the `referer` header:
```javascript
// will have no effect:
const res = await fetch('./sampleJSON.json', {
    headers: {
        referer: "https://google.com",
    }
});
```

### Complex Requests

Also via defining aright the second argument to `fetch()` we can get to use other methods ( f.e POST ) and
specify the body of the request. `body` property of this second argument object may be one of the following:
- a string ( e.g. JSON )
- `FormData` object ( to submit the data as `form / multipart` )
- `Blob` or `BufferSource` to send binary data
- `URLSearchParams`, to submit the data as `x-www-form-urlencoded` ( rarely used )

Example of how to use a different method and send a body:

- [With JSON](./1-with-json/index.js)
- [With `FormData`](./2-with-form/index.js)
- [Send an image with `Blob`](./3-with-blob/index.js)
- [Send an image with `FormData`](./4-with-blob-plus-form/index.js)

---

## Aborting

Despite the fact that there is no way to _cancel_ a Promise can use an instance of `AbortController`
to abort a request made with `fetch`.

A controller is an extremely simple object. It has a single method `abort()`, and a single property `signal`.
When `abort()` is called, the `abort` event triggers on `controller.signal`:
```javascript
const controller = new AbortController();
const signal = controller.signal;

// triggers when controller.abort() is called
signal.addEventListener('abort', () => {
    alert('Signal Aborted');
});

setTimeout(() => {
    controller.abort();
    alert(
        signal.aborted // true
    );
}, 2000);
```
We can thus abort `fetch` request if we pass a reference to the `signal` property into `fetch` like so:
```javascript
const controller = new AbortController();
fetch('./someFile', {
    signal: controller.signal
});
```
and then call the `abort()` method on the controller:
```javascript
controller.abort();
```

When a fetch is aborted, its promise rejects with an error named `AbortError`, so we should handle it:
```javascript
fetch('./sampleJSON.json', {
    signal: controller.signal
})
    .then(res => res.json())
    .catch(err => {
        if (err.name == 'AbortError') { // handle abort()
            alert("Aborted!");
        } else {
            throw err;
        }
    });
```

Also we can use the same `signal` of the same `controller` to abort multiple `fetch`es:
```javascript
const controller = new AbortController();
const urls = [
    './many-json/sampleJSON1.json',
    './many-json/sampleJSON2.json',
    './many-json/sampleJSON3.json',
    './many-json/sampleJSON4.json',
].map(url => fetch(url, {
    signal: controller.signal,
}).catch(err => {
    if(err.name === 'AbortError') {
        alert('AbortError happened');
    } else throw err;
}));
Promise.all(urls);
controller.abort();
// output:
// alert: AbortError happened
// alert: AbortError happened
// alert: AbortError happened
// alert: AbortError happened
```

We can also abort our own Promises like so:
```javascript
const controller = new AbortController();
new Promise((res, rej) => {
    controller.signal.addEventListener('abort', rej);
    setTimeout(() => {
        res();
    }, 3000);
}).then(
    () => alert('Promise was resolved'),
    event => {
        if(event.type === 'abort') {
            alert('Promise was aborted');
        }
    }
);
setTimeout(() => {
    controller.abort();
}, 2000);
// output:
// after 2 seconds:
// alert: Promise was aborted
```

In addition [here](./5-abort/index.html) is a little example of canceling `fetch`. A little Note:
once we make a fetch to a certain url and associate it with a certain `signal` and then do `abort()`
then if make another fetch request and bind it to the same `signal` it will be cancelled instantly
as we have already called `abort()` once. Here is an example:
```javascript
// let's suppose that every file takes 3 seconds to fetch

// make one request:
const controller = new AbortController();
fetch('sampleJSON.json', {
    signal: controller.signal,
}).then(res => {
    return res.text();
}).then(alert);

// and cancel it before it is fetched:
setTimeout(() => {
    controller.abort();
}, 1000);

// then if we make another request associated with a previous
// signal that request will be aborted immediately
setTimeout(() => {
    // will be aborted immediately:
    fetch('./sampleJSON.json', {
        signal: controller.signal,
    });
}, 4000);
// because after abort has been called on controller1 all fetches associated with
// controller1.signal will be considered as though they should have been aborted long ago

// in order to escape it we could either not associate a fetch to that url with any signal
// or create a new instance:
fetch('./sampleJSON.json');
// or
fetch('./sampleJSON.json', {
    signal: new AbortController().signal,
});
```