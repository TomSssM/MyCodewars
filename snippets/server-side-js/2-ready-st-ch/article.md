# readyStateChange and Other Events

## readyStateChange and readyState

The `readyStateChange` event fires when the `readyState` property changes from 0 - 4:

- `0`: initial state
- `1`: we call `open()`
- `2`: we have received headers (more on them in a sec)
- `3`: we get a new package (fires multiple times)
- `4`: the last package arrived so the request is complete

Do note that `3` might happen multiple times:

`1 -> 2 -> 3 -> ... -> 3 -> 4`

Take a look at this [demo](./code-1/). Here we get multiple packages because the
amount of info is really big! However do note that even though in this example each package
contains around 1000 symbols we shouldn't rely on this in real life.
You see each package contains some amount of bytes. But certain things like Cyrilic letters 
are stored as 2 bytes. Thus it may so happen that the 1st byte is in one package and the 2nd is in the
other package. Thus if we look into `textContent` property during the loading process the data may be
confusing and any operation on it should be avoided. It makes symbols that are represented as 1 byte the
only reliable data to be checked during the load process.

Another thing to take into serious consideration is that the `onerror` event listener fires only in 2 cases;

- if the internet connection is broken
- the url is invalid

Otherwise everything is OK. What this means is __even if the server responds with 404 onerror isn't triggered.__
Here is proof of that:
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', "./non-existent.json", true);
xhr.onreadystatechange = e => {
    if (xhr.readyState !== 4) return;
    alert(`status: ${xhr.status}`);
};
xhr.send(null);

// when the response arrives:
// alert: status: 404
```

And the same thing with modern methods ( more on these later ):
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', "./non-existent.json", true);
xhr.onerror = () => alert('onerror');
xhr.onload = () => alert('onload');
xhr.send(null);

// when the response arrives:
// alert: onload
```

And that is why in the future we always check that `xhr.status` is 200 :)

---

## Headers

We can set headers of the _request_ with the  `setRequestHeader` method like so: 
`xhr.setRequestHeader('Content-Type', 'application/json');`
However, you can't unset the set header:
```javascript
xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');
// the header is X-Auth: 123, 456
```
Also you can get the header of the _response_. You can either get the value of one type of header:
```javascript
xhr.getResponseHeader('Content-Type')
// => 'application/json'
```
Or the value of _all_ headers with `getAllResponseHeaders()`. Do note that this function
returns all headers as one string in the specific format:
```
Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: image/png
Date: Sat, 08 Sep 2012 16:53:16 GMT
```
At the end of each line is `\r\n` and the value of the header is separated with `:`.

---

## Timeout
You can specify a `timeout` property other than `0` in which case after the amount of time (in ms)
that you specify the request will _time out_ and the `ontimeout` event will be triggered. Do take a look
at the demo [here](./code-2).

---

## Other Events

Here are all the other events that can be triggered when we do an `XMLHttpRequest` in JS:
- `loadstart` - we started a request
- `progress` - the browser received another data package (its value is stored in `responseText`)
- `abort` - triggered via calling `xhr.abort()`
- `error` - error occurred on the server
- `load` - the request was successfully handled (we can use this event instead of the usual check)
- `timeout` - the request timed out
- `loadend` - either an unsuccessful or successful loading of a request

Last but not least here is another [task](./code-3) done well.