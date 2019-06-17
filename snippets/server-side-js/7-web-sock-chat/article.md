# WebSocket

## Introduction

### Setting the Connection

WebSocket is a protocol: `ws://server.example.com/chat`. As you know HTTP is stateless. What the word _stateless_ means
in this context is that once an HTTP request is made, the connection between the server and the client is lost as well
as all the data associated with that request. WebSocket, on the other hand, isn't stateless meaning that a connection
is always maintained between the two sides. It is good for real-time applications.

Before a WebSocket connection can be established the browser, over HTTP, asks the server whether the server has
support for WebSocket. If it does we switch from `HTTP -> WS`.
Here is an example of a request to the server inquiring about the WebSocket support:
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://javascript.com
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```
`GET` and `Host` are the default HTTP headers while `Upgrade` and `Connection` tell that the browser 
wants to use WebSocket. Do note that we can't make such a request to the server artificially via 
`XMLHttpRequest` since the browser forbids setting the headers above (except `GET` and `Host`).
Thus it simply means that WebSocket handshake can’t be emulated.

So the `Connection: Upgrade` header tells the server that the client wants to change protocol. The 
`Upgrade: websocket` header tells that the protocol the client wants to change to is going to be `websocket`.
`Sec-WebSocket-Key` is a random browser-generated key for security. `Sec-WebSocket-Version` is WebSocket protocol 
version, 13 is the current one.

Here is what a response of a server that does understand WebSocket might look like:
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```
Here `Sec-WebSocket-Accept` is `Sec-WebSocket-Key` recoded using a special algorithm. 
The browser uses it to make sure that the response corresponds to the request.

### WSS

In addition to the `ws://` connection we have `wss://` connection which is WebSocket over TLS 
( same as HTTPS is HTTP over TLS ). Whilst security is One Advantage using `WWS` also considerably increases 
chances that a connection is going to be established. You see if there is a proxy between a client and a server 
and we have an HTTP  connection all the stuff we transmit isn't encoded which means that proxy can access the 
request internals and delete some headers (that request WebSocket connection) or forbid a request altogether. 
With HTTPS (and thus WWS) proxy doesn't have access to the request's internals and its headers, which 
request WebSocket connection, will pass and the connection will be established.

### Extensions and Protocols

Also when we use websocket we can use extensions and subprotocols. What are these? Well if we set the header
`Sec-WebSocket-Extensions: deflate-frame` we tell the browser to shrink data, which improves the speed of
data exchange. Also we can set another type of  header `Sec-WebSocket-Protocol: soap, wamp` which tells the
browser that we want to exchange data either `SOAP` or `WAMP` protocols. Whilst the browser sets the header 
`Sec-WebSocket-Extensions` automatically the other header `Sec-WebSocket-Protocol` can be set via JS: 
```javascript
const socket = new WebSocket("ws://javascript.com/ws", ["soap", "wamp"]);
```
Here is what the request and response might look like:

Request:
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://javascript.ru
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
```
It tells use the `deflate-frame` extension and subprotocols `soap` or `wamp`.

Response:
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
```
It tells that the client that the server has support for `deflate-frame` but supports only `soap` out of 
requested subprotocols

---

## WebSocket Frames

### General Structure

All the information that travels along a WebSocket connection is represented by frames. Frames are just
a bunch of bits. All the bits can be separated into rows of 32 bits. Here is the structure of a frame:
```
    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1

   +-+-+-+-+-------+-+-------------+-------------------------------+
   |F|R|R|R| opcode|M| Body Length |     Extended Body Length      |
   |I|S|S|S|(4bits)|A|   (7bits)   |            (1 byte)           |
   |N|V|V|V|       |S|             |(if Body Length === 126 or 127)|
   | |1|2|3|       |K|             |                               |
   | | | | |       | |             |                               |
   +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
   | continuation of Extended Body Length, if Body Length === 127  |
   + - - - - - - - - - - - - - - - +-------------------------------+
   |                               |  MASK Key, if MASK === 1      |
   +-------------------------------+-------------------------------+
   | MASK Key (continuation)       |         frame data (body)     |
   +-------------------------------- - - - - - - - - - - - - - - - +
   :                         more frame data...                    :
   + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
   |                         more frame data...                    |
   +---------------------------------------------------------------+
```
Also all frames can be divided into `data frames` and `control frames`. `data frames` transmit data whilst
`control frames` are used to check connection (via PING/PONG more on this in a sec) or close connection.

### FIN

It is the first bit of the first row of 32 bits of the frame. Why is it used? One WebSocket message may be 
composed of a number of such frames as above. In this case all frames but the last one have FIN set to 0, 
the last one has FIN set to 1.

### RSV1, RSV2, RSV3

They are each composed of 1 bit. These guys are used by extensions, which can write stuff into these bits.

### opcode

With 4 bits we can represent numbers up to 15. So each digit of base 16:

- 0x0 means that this frame is the _continuation frame_ in a sequence of frames, so look at the first one
- 0x1 means it is a text frame
- 0x2 means a binary frame
- 0x3-7 values are reserved for future `data frames`
- 0x8 means this frame closes a connection
- 0x9 means PING (later on this one)
- 0xA means PONG (same here)
- 0xB-F values are reserved for future `control frames`

### MASK

If set to 1 the data is masked. More on masking in a sec.

### Body Length

With 7 bits we can represent number up to and including 127 if Body Length exceed we use another byte 
(Extended Body Length) and for incredibly big lengths we use yet another four bytes (continuation of Extended 
Body Length).

### MASK Key

If MASK is 0 this guy is missing. Otherwise it is used to _mask_ the body

### Frame Data (Body)

The actual data we transmit over WebSocket.

### Examples

If a message consists of only 1 frame it's called non-fragmented. If it is represented by a bunch of frames
it is called fragmented.

If we were to send `'Hello'` as a non-fragmented message over WebSocket it would look like this:
```
0x81 0x05 0x48 0x65 0x6c 0x6c 0x6F
```
Do note that we split all bits into groups of 8 (thus into bytes) and write those as 16 base integers 
(from 0x00-0xFF). For instance the first integer is `10000001` in binary (thus FIN is 1; RSV1, RSV2, RSV3
are all 0's and opcode is `0001`) and so on.

Representing the value 'Hello World' as a fragmented message would look like this (note several frames):
```
0x01 0x05 0x48 0x65 0x6c 0x6c 0x6f (contains "Hello")
0x00 0x01 0x20 (contains " ")
0x80 0x05 0x57 0x6f 0x72 0x6c 0x64 (contains "World")
```
Do note that only the 3rd frame has a FIN of 1. And since we have a fragmented message only the opcode of the
first frame is defined. The opcode of the rest of the frames is 0x00. Sending fragmented messages allows us to
send a stream of data if we don't know yet how much info we are going to gibe to a client. As an example we 
could be searching for something in a data base and we don't know yet how much more stuff we are going to find.

### PING/PONG

This technique is another advantage of WebSocket. Whenever either side (client or server) wants to check the
status of a connection they use it. The side that wants to check a connection sends a __control frame__ with 
opcode signalling it is PING. This frame will have a random body. The other side has to respond with a 
PONG Control Frame that has to have the same body as PING. If the PONG has the same body as PING we have
confirmed the stability of a connection. The browser can automatically answer the PING of the server, however
we can't do it with JavaScript. An important detail is that in WebSocket connection both sides always have
equal rights! What it means is that for example either side can close the connection. All it has to do, after 
all is send a `close connection` frame (opcode 0x8). In this case we can say that the connection was closed
cleanly. On the frontend we can check for it via the `event.wasClean` property during the `onclose` event. 
Otherwise it means that a connection was interrupted. Also if the connection was closed we can get some more
info regarding this occurrence: `event.code` and `event.reason` properties. Do note that WebSocket codes are
different from the HTTP codes and are compose of 4 digits: 1000, 1001, 1002, 1003.

### Masking

Long time ago hackers tweaked the body of a WebSocket request and used the inability of the proxy between the
client and the server, its inability to distinguish between WebSocket and HTTP, to do bad things. That is why 
MASK was invented.
The way it works is the following: at first the browser creates a MASK Key which is a random
32 bit integer and may be different for each package; then we do the XOR `^` binary operation
for the body (body ^ MASK Key); then when the other side wants to read the body it does the same
operation with the same Mask Key: `masked body ^ MASK Key` because `(x ^ a) ^ a === x`. It helps because now
the hacker cannot tweak the message body because he doesn't know what data it is (the body data is masked) 
and now that the body is very weird masked value the proxy between one side and the other can clearly differ this type of WebSocket message from HTTP. 
However if two sides that communicate over the WebSocket protocol trust each 
other they don't have to use MASKs. Since masking requires resources its application is not compulsory.

---

## API

Making a connection:
```javascript
const socket = new WebSocket("ws://javascript.com/ws");
```
Now the instance `socket` kind of represents the _connection_ between two sides (server and client).

The WebSocket connection instance has four primary events:
```javascript
socket.onopen = function() {
    alert("Connection Established");
};

socket.onclose = function(event) {
    if (event.wasClean) {
        alert('Connection closed cleanly');
    } else {
        alert('Connection Interrupted');
    }
    alert('Code: ' + event.code + ' reason: ' + event.reason);
};

socket.onmessage = function(event) {
  alert("Getting data from the server " + event.data);
};

socket.onerror = function(error) {
  alert("Error " + error.message);
};
```
Here is how we would send data _to_ a server:
```javascript
// sending a string:
socket.send("Hi!");

// sending a file (either form or drag-n-drop):
socket.send(form.elements[0].file);
```
Yes we can send and receive binary data. That is cool. The binary data itself that we are sending or receiving
should be either `Blob` or `ArrayBuffer` format. So here is the workflow: when the data comes from the server and
it is text we automatically get back text. If the incoming data is binary, by default, we get back a `Blob`. We can 
change this default if we change the value of the `bufferType` property from `blob` -> `arraybuffer`. Here is 
an example:
```javascript
socket.bufferType = "arraybuffer";
socket.onmessage = event => {
    // now the incoming data is a string if it is text or 
    // ArrayBuffer ( not Blob ) if it comes back and it is binary
};
```

Just like receiving we can send too either binary ( `Blob` / `ArrayBuffer` ) or textual ( `String` ) data:
```javascript
// text:
socket.send('man');

// binary
socket.send(new Blob(...));
```

Imagine, our app is generating a lot of data to send. But network connection is not that fast. The user may be 
on a mobile, in rural area. We can call `socket.send(data)` again and again. But the data will be buffered in 
memory and sent out only as fast as network speed allows. The `socket.bufferedAmount` property stores how many 
bytes are buffered at this moment, waiting to be sent over the network. 

We can examine it to see whether the socket is actually available for transmission:
```javascript
// every 100ms examine the socket and send more data only if no data buffered
setInterval(() => {
    if (socket.bufferedAmount === 0) {
        socket.send( moreData() );
    }
}, 100);
```

Another method is `socket.close()`. We can use it to close the connection. Once again do remember that WebSocket means
message flow either way ( from the client to the server and vice versa ) and equal rights for both sides. Thus we can
close the connection both on the Frontend and on the Backend. In fact, some libraries for Node.js even have the same
syntax as the built-in `WebSocket`s on the Frontend JS.

Anyways, on the Frontend the `socket.close` method takes two arguments: status code and status text. When we call 
it like this, one side ( either client or server ) is going to send a _connection close frame_ with a numeric code 
and a textual reason. Here is the syntax:
```javascript
// one party ( client ):
socket.close(1000, "Work complete");
```
Since the Node.js WebSocket library might have the same syntax here is how the other party might react to a connection
getting closed:
```javascript
// the other party ( server ):
socket.onclose = event => {
    // event.code === 1000
    // event.reason === "Work complete"
    // event.wasClean === true (clean close)
};
```
The code is not just any number, but a special WebSocket closing code.

In addition a WebSocket instance is also going to have a state of the WebSocket connection in the
`readyState` property. The valid values are:
- `0` - connecting ( hasn't connected to each other yet )
- `1` - open ( the two sides are communicating )
- `2` - closing ( the two sides are in the process of shutting the connection between each other )
- `3` - closed ( the connection has been closed 

---

## Chat

Here is how we could tweak our previous chat demo to use WebSocket:
```javascript
const socket = new WebSocket("ws://localhost:8081");

document.forms.publish.onsubmit = function() {
    const outgoingMessage = this.message.value;

    socket.send(outgoingMessage);
    return false;
};

socket.onmessage = function(event) {
    const incomingMessage = event.data;
    showMessage(incomingMessage);
};

function showMessage(message) {
    const messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
}
```
You see? Here we have eliminated the necessity to simulate the open connection by constantly keeping
some requests pending. So there is no abrupt stop of the communication between the server and the client like 
there used to be when we resent the `subscribe` request. On the server all we should have to do is keep 
references to all the socket connections of all users and when message arrives to the server from any of these 
socket connections (users) send this message to all of them (via their socket connections). Here is the 
implementation of a WebSocket server (not an HTTP server :) ) on Node.js:
```javascript
// here we need to download a package for WebSocket (npm i ws)
const WebSocketServer = new require('ws');

// connected clients
const clients = {};

// WebSocket-server on port 8081, DO NOTE NO HTTP Server here
const webSocketServer = new WebSocketServer.Server({
    port: 8081
});

webSocketServer.on('connection', function(ws) {
    // it is better to think of ws as the connection
    // kind of how the socket instance is on the frontend
    const id = Math.random();
    clients[id] = ws;
    console.log("new connection " + id);

    // message from frontend
    ws.on('message', function(message) {
        console.log('message received ' + message);

        for (let key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('connection closed ' + id);
        delete clients[id];
    });
});
```

So each page is going to establish a WebSocket connection. We are going to store these connections in
the `clients` object. Whenever each of the connections sends a message to the server we re going to go
through the `clients` object and send it back to all the connected clients. Do note that the arcitechture
of the WebSocket connection (`ws` backend and `websocket` frontend) is completely the same. As was said in
WebSocket both sides are equal. Check out the chat on WebSockets [here](./code-1) 