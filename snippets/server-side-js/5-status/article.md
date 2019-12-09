# Upload Status

`XMLHttpRequest` consists of 2 phases:

- __upload__ - the data is uploading from the request to the server
- __download__ - the browser is downloading the data that the server returned

Since servers are huge and have lots of data the server response can be huge too, which means
`download` may be as long as `upload`.
In order to work with `upload` we can use an instance of the class `XMLHttpRequestUpload`. This instance
lives in `xhr.upload`. The events that happen on `xhr.upload` is similar to those that happen on `xhr` itself.
Here they are:

- loadstart
- progress
- abort
- error
- load
- timeout
- loadend

And here is how we could listen for them:
```javascript
xhr.upload.onprogress = function(event) {
    alert( 'We have loaded to the server ' + event.loaded + ' bytes out of ' + event.total );
}

xhr.upload.onload = function() {
    alert( 'Data has been completely uploaded to the server!' );
}

xhr.upload.onerror = function() {
  alert( 'Tar tar sauce!' );
}
```
The `progress` event that happens during the `download` part is completely the same as
the one for the `upload` part:
```javascript
xhr.onprogress = function(event) {
    alert( 'We have received from the server ' + event.loaded + ' bytes out of ' + event.total );
}
```
So how does it work really? First of all do note that this event fires for each byte we
upload/receive but no more frequently than once every 50ms. Also here are these two properties:
- `total` - if known, represents the entire quantity of bytes to send/receive
- `lengthComputable` - if true, the quantity of bytes we need to upload / download is known and thus the `total` value correctly represents the quantity of data

It is confusing because the quantity of data may be unknown. It may be unknown only during the `download`
part as during the `upload` part the browser always knows the quantity of data it uploads from
the local machine. Yet during `download` part this info may be unknown if the server doesn't supply the
HTTP header `Content-Length` (in this case the server itself doesn't know the amount of data it is going to give).
In this case `event.lengthComputable` will be `false` and `event.total` will be 0. Do note that 
if `lengthComputable` is `true` and `total` is 0 it means that the amount of data is actually zero :)

Thus with this info the more accurate download-tracking function will look like this:
```javascript
xhr.onprogress = e => {
    if(e.lengthComputable) {
        alert(`Received ${e.loaded} of ${e.total} bytes`);
    } else {
        alert(`Received ${e.loaded} bytes`)
    }
};
```

Also it is important to understand that the `xhr.upload.onprogress` guarantees that the data was _sent_ to
the server but it doesn't guarantee that the server processed and wrote the data to the drive. So the upload
indicator may not always be the thing to rely on. Speaking of which, [here](./code-1/) it is.

So as a summary: the Upload Status is sending files from the client to the server. The files come to the client from 
file inputs or drag-n-drop and coming from these places they are not limited in size at all and since request 
( in NodeJS ) is also a stream we are not limited in sending files of _any_ size ( even 5GB+ no problem )

---

## The More Accurate File Upload

Even the demo clearly shows how inaccurate the `onprogress` event really is. It only shows how many bytes the
_browser_ has been able to send to the server (whilst the server could have died long ago). That is why its primary
function may remain relegated to creating beautiful progress bars :)

But how do we go about carefully getting the status of the uploaded data? As you may have guessed the
server is by far the only thing that knows for sure how much data was received or failed.
But before we begin here is how we would handle a similar situation via Frontend:
listen to the whole process in the `onprogress` event and if something fail, get the amount of the loaded
bytes from `event.loaded` and send all the bytes starting from the last loaded byte till the end.
Here is how you would split the bytes via the `File` API:

```javascript
const slice = file.slice(10, 100); // read the bytes 10 - 99 (included)
xhr.send(slice); // and send them
```

## Download Status

__Note:__ [Here](./code-2/index.js) is a demo allowing to track the process of either downloading a file 
or uploading a file

__Also Note:__ [Here](../11-down-stat/article.md) is an article telling everything about implementing the 
tracking of the Download status with _fetch_

OK, let's see what the Download Status is. The download status shows how many bytes of the response of the server 
have been downloaded. All too often the response isn't very huge so we manage to download it in one chunk. But if
the response is very huge then it needs to be conveyed over the Web from the server to the client chunk by chunk.
The `xhr.onprocess` event listener fires whenever we get a new chunk of data from the server.

It is a little bit abstract let's take a look at an example. NodeJS allows us to very efficiently track when we
send a chunk. You see when we call the `write()` method on any stream, it means that we send a chunk:

```js
response.write(val); // sent 1st chunk called 'val'
response.write(dude); // sent 2nd chunk called 'dude'
response.write(bob); // sent 3rd chunk called 'bob'
...
```

So let's create a server that would write one chunk every second:

```js
const http = require('http');
let i = 0;
let id;

const server = http.createServer((req, res) => {
    clearInterval(id);
    i = 0;
    res.setHeader('Access-Control-Allow-Origin', '*');
    id = setInterval(() => {
        i += 1;
        const message = `hi ${i}`;
        console.log(message);
        res.write(message);
    }, 1000);
});

server.listen(3000, () => console.log('listening on 3000...'));
```

And that is how we can track down the download process from the server ( do note though that the download process
is going to be perpetual since server never stops writing to the response stream ):

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000', true);

xhr.onprogress = e => {
    console.log('response', xhr.response); // (*)
};

xhr.send(null);
```

The code in line `(*)` is going to be triggered every second, just almost as soon as we call `res.write(message)`
on the server. The same way we could have done by listening to the `readyStateChange` event:

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000', true);

xhr.onreadystatechange = () => {
    if (xhr.readyState === 3) {
        console.log('received new chunk');
        console.log(xhr.responseText);
    }
};

xhr.send(null);
```

Last but not least you can start the same server and run this code below:

```js
let message = '';
const decorder = new TextDecoder();

(async () => {
    try {
        const res = await fetch('http://localhost:3000'); // (*) 

        console.log('res', res);

        const reader = res.body.getReader();

        console.log('git the reader');

        while(true) {
            const {done, value} = await reader.read();

            if (done) {
                break;
            }

            message += decorder.decode(value);

            console.log(message);
        }

    } catch (e) {
        console.log('error', e);
    }
})();
```

It only goes to show that the `fetch` download status tracking behaves _almost_ the same way as `xhr`.
But there seems to be a tiny difference. You see in the example above we never finished a response on the server.
Instead we would write into it as into a stream but the response was left _hanging_. But here is a problem: 
some browsers like Firefox wait for the server to finish the response ( call `res.end()` ) before they allow to move 
past line `(*)` in the example above and thus call `res.body.getReader()`. So while Chrome would allow to get a reader 
even for a _hanging_ response and read the chunks out of it as soon as the server decides to write them on its side 
( kind of how we would write a chink at a time only every second in the example above ), while Chrome behaves this way
some other browsers don't and will instead wait perpetually for the server to `.end()` the response. 
