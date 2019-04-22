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

Also it is important to understand that the `xhr.upload.onprogress` guarantees that the data was _sent_ to
the server but it doesn't guarantee that the server processed and wrote the data to the drive. So the upload
indicator may not always be the thing to rely on. Speaking of which, [here](./code-1/) it is.