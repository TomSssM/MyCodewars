# fetch

## Overview

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

- init promise resolves if server responded with headers but we don't have body yet
    - reject === no such site or network errors
    - http errors === resolve()
    - HTTP ERRORS MEAN RESOLVE!!!! (thus we check for them + mention `.ok`)
- Calling methods like `.json()`, `text()` etc. only once
- setting and getting headers
- Example of how to use a different method and sending a body
    - With JSON
    - With Form
    - Image With Blob
    - Image as Part of the Form
- Exercise: Try responding with a JSON on the server yet reading the data as text is it simply a string in
  valid JSON format??