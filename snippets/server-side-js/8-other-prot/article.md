# JSONP Protocol

JSONP is a way of making server requests via a script tag. We create a script element and write the url of the
request into the `src` attribute. When we append it to the document two things happen:

- the browser is going to make a request to the server
- execute the text returned by the server

Let's look into this process. Imagine we want from the server the following object:
```javascript
{
    name: 'Tom',
    age: 18
}
```

Let's first of all create a global variable `CallbackRegistry`:
```javascript
const CallbackRegistry = {};
```

We are going to retrieve data via callbacks (later we will see why). Callback names don't really matter so much
we only need to insure that they don't collide so let's do this to name a callback:
```javascript
const callbackName = `cb${String(Math.random()).slice(-5)}`;
```

Then we add it to our `CallbackRegistry`:
```javascript
CallbackRegistry[callbackName] = function(data) {
    handleData(data);
};
```

All we need is the `data` itself. Well, here is the interesting part. When we request a script from the server
thr server can write as a string the body of the response and that body is going to be executed in the broswer
when the script response comes back to the client:
```javascript
if(req.url === './someScript.js') {
    res.end('console.log(window)');
}
```

Thus when `someScript.js` loads, the `window` object is going to be logged. What we want to do with JSONP is
invoke our callback function `` and pass to it the right data:
```javascript
callbackName; // get it from the url somehow === CallbackRegistry[randomId]
const theRigthData = JSON.stringify(
    {
        name: 'Tom',
        age: 18,
    }
);
res.end(callbackName + '(' + theRigthData + ');'); // CallbackRegistry[randomId]({"name":"Tom","age":18});
```

So that when such a response script arrives the callback is going to be invoked with just the right data.

[Here](./code-1/) is the complete task.

---

# Server Sent Events

## Basics

Before we get into it [here](../../sse/server-evts.js) is the old original code.

So yeah SSE is almost the same as WebSocket except it works over HTTP and is less powerful. Good examples of its being
less powerful are that it allows communication only in one direction ( server -> client ), doesn't allow sending
binary data and so on. Also SSE suppose that the server sends messages to the browser but can't close the connection 
and the browser ( while listening for server messages ) can't send its messages to the server but should be able to 
close the connection. They should be preferred when simplicity and one-direction communication from the server to the 
client are priorities ( WebSocket is vice versa: different protocol plus communication both ways ). 

Let's take a closer look at what happens under the hood.

When we do `new EventSource('some-url')` the browser establishes a connection between itself and the server whose
url is specified. Until the server closes a connection ( for instance via `response.end()` in Node.js ) it remains
open and the client fires an `onmessage` event whenever a server sends a message, for instance in Node.js
it means doing `res.write()`. However here is a peculiarity: when the server does close a connection via `res.end()`
the `onerror` event is triggered on the client and the browser will try to reconnect again, and again... The few ways
that a server can force-close such a connection is via a response with a status other than 200 or via a response
whose `Content-Type` header isn't `text/event-stream`. If we put the details aside here is the algorithm:
```
new EventSource()  -------------> res
eventSource.onopen()    <-------- res
eventSource.onmessage() <-------- res.write()
eventSource.onmessage() <-------- res.write()
eventSource.onmessage() <-------- res.write()
eventSource.onerror()   <-------- res.end()
eventSource  -------------------> res
...
```

## Details

In order for a connection to a server to be a success the server needs to give a response with a header:
`Content-Type: text/event-stream`. After that the server has to keep such a request pending and write messages to it
However the content that a server needs to write into the response is very specific. First of all it has to be a string
second of all it should be written in a special format like so:
```
data: Message 1

data: Message 2

data: Message 3
data: is multi line
```

Here is the algorithm of this format:
- the contents of each messgae is after `data:\s?` (the \s? means that if there is a space it is ignored)
- each 2 messages ( `data:` lines ) are separated via `\n\n`
- if one message is multiline ( meaning it contains '\n' inside of it ) two `data:\s?` are created
(for instance if a message is `Message 3\nis multi line` then the response would be like above) Do note that
such parts of the response are separated with only one `\n` (it is actually the one in the message itself)

Because of the inconvenience described above it is a lot easier to use JSON. Here is an example of how it
would be encoded:
```
data: {"user":"Tom","message":"Message 3\nis multi line"}
```

Also as was mentioned earlier if the server tries to close the connection the browser will try to reconnect. The
time after which the browser would attempt such a try is in most browsers around 1-3 seconds. The server can
change it via specifying a special header in the response ( when it does `response.end()` ):
```
retry: 15000
data: I set a 15-second delay
```

While it is difficult for the server to close a connection ( though not entirely impossible see above ) it is
incredibly ease for the browser because SSE supposes that the server sends messages to the browser but can't close
the connection and the browser ( while listening for server messages ) can't send its messages to the server but
should be able to close the connection. This can be done on the Frontend via:
```javascript
const eventSource = new EventSource(...);
eventSource.close();
```

When the connection does interrupt the browser keeps track of all the messages that the server sends and will
request the next message after the last successful one. To do that it uses `id`s. In responses `id`s follow
the `data` like so:
```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: is multi line
id: 3
```

Do note that `id`s come right _after_ `data` so we can be sure that upon reading `id` we have compeltely read the
message that it is the id of. Also we can always access the last read id in `event.lastEventId`

## readyState property and its usage

There are in all 3 `readyState`s for Server Sent Events:
```
const unsigned short CONNECTING = 0; // connecting / reconnecting
const unsigned short OPEN = 1;       // connected
const unsigned short CLOSED = 2;     // closed (by the browser)
```

We can use these for instance in the `onerror` event to determine whether a real error occured or whether
the server simply decreed to close the connection:
```javascript
const eventSource = new EventSource('digits');
eventSource.onerror = function(e) {
  if (this.readyState == EventSource.CONNECTING) {
    console.log("reconnecting...");
  } else {
    console.log("an error indeed: " + this.readyState);
  }
};
```

## Custom Events

We can generate ( on the server ) our custom Server Sent Events if we add an extra detail to the response:
`event:\s?` followed by the name of the event:
```
event: join
data: Tom

data: Hi!

data: My

data: Good

data: Man

event: leave
data: Tom
```

Do note that all `data:` where `event:` is missing is considered default. Such messages will arrive to the `onmessage`
event listener. In order to listen for custom events we need to assign event listeners on the event source like so:

```javascript
eventSource.addEventListener('join', function(e) {
  alert( 'Here comes ' + e.data );
});

eventSource.addEventListener('message', function(e) {
  alert( 'Message is ' + e.data );
});

eventSource.addEventListener('leave', function(e) {
  alert( 'Out went ' + e.data );
});
```

An interesting detail is that even though we omitted the `event` for default messages, this property does exist for
them and it is implicit:
```
event: message
data: Good
```
which is why we can also set the `onmessage` event listener like so:
```javascript
eventSource.addEventListener('message', function(e) {
  alert( 'Message is ' + e.data );
});
```
That is exactly what we did above see? :)

## Cross Domain SSE

Since SSE work over HTTP the cross domain rules ( and the entire system really ) are the same as for XML Request.
The server needs to mention our domain or `*` in `Access-Control-Allow-Origin` before we can start getting
messages from it. If we want to also send cookies we need to add to a request the `withCredentials` header.
This can be accomplished with SSE if we provide a second argument:
```javascript
const source = new EventSource("http://some-website.com/stream", {
    withCredentials: true
});
```
Also whenever we do a cross-browser SSE request and get a cross-browser SSE response we can get the origin of the
server from which the response can in the `origin` property. We can use it on the Frontend for validation:
```javascript
eventSource.addEventListener('message', function(e) {
    if (e.origin != 'http://trustedServer.com') return;
    alert( 'Message ' + e.data );
});
```

[Here](./code-2/index.html) is the demo of the stuff we just talked about and [here](./code-4/index.js) is a chat made with SSE :)

---

# Request Almost Without XHR

In the past we have looked at fetching data from the server via creating `script` tags and having
the server write the arguments to functions and those arguments were data from the server. Well nowadays
it is irrelevant but in the past an approach such as we will take a quick peek at was used in old IE
to exchange data with the server ( even with COMET! Despite the fact no WebSocket existed ).
For that we would create an iframe and send some
data to it via the proper use of a form. All we have to do in order for such a form to write stuff into
iframe is specify the `id` of the iframe in the form's `target` attribute and have the server correctly
handle such a request by writing the info that should go into that iframe ( for example `<script>` tag ).
[Here](./code-3/) is the demo of this approach ( although as of now it is almost obsolete ).

__Note:__ you might think that since we _post_ data to an iframe we should always use `POST` method but this
isn't in fact necessary. With `POST` we can simply send info in a more elegant way ( `text/plain` as JSON )
or via some other encoding, but we can also send all the input data in `application/x-www-form-urlencoded`
as part of the request url if we use 'GET'. Doesn't matter because so long as we have `target` set to an
iframe on the form element whatever response the server gives will become the HTML of an iframe.