# Download Status

___Warning:__ before reading this chapter make sure you know how `fetch` works_ :)

With `fetch` we can track the _download_ status of the response from the server. 
However not vice versa, unfortunately `fetch` provides as of now no way to track upload.
As of now only `XMLHttpRequest` is capable of tracking both upload and download status.

Here is how to track the download process with `fetch`. We need to use the `response.body`
property and get a reader to read the data from the server manually:

```javascript
const response = await fetch(url);
// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while(true) {
    // done is true for the last chunk
    // value is Uint8Array of the chunk bytes
    const {done, value} = await reader.read();

    if (done) {
        break;
    }

    console.log(`Received ${value.length} bytes`)
}
```

The `reader.read()` method returns a _chuck_. Now a chunk's `done` property is `true` if this chuck
is the last one. The `value` property is `Unit8Array` of bytes. In reality we would need to save
all chunks somewhere ( for instance into a new usual array ) and then merge them all together into
a bunch of bytes and interpret them as a certain type of data.

Also we would need to get the total amount of bytes we are going to download. One way of doing so
is look at the value of the `Content-Length` header. Do note however that it may sometimes be
missing for cross-domain requests as the server doesn't really have to provide it. The full code
for tracking the download process is [here](./code-1-download/index.js)
So basically to track down the download status of a response we need to read it manually.