# Cross Domain Communication

## Simple vs Complex Requests

We didn't use to be able to use XHR to make a request to a different Origin ( the browser would throw an error ).

Origin is a domain/port/protocol triplet. Thus the same origin is when domain, port and protocol are the same.
The policy that a website cannot fetch data ( even the `index.html` page ) from a different origin 
without extra headers is called `CORS` ( Cross-Origin Resource Sharing )

For this reason requests are put into 2 categories:

- Simple if:
    - Simple Methods:
        - `GET`
        - `POST`
        - `HEAD`
    - Simple Headers:
        - `Accept`
        - `Accept-Language`
        - `Content-Language`
        - `Content-Type` only with the values:
            - `application/x-www-form-urlencoded`
            - `multipart/form-data`
            - `text/plain`
- Complex otherwise

While the fact that `http://example.com:8080` and `http://example.com:5500` are going to be different origins
is pretty straightforward ( says above ports must be the same ) do note that `http://example.com` and 
`http://www.example.com` are also going to be different origins because we need an _exact match_ for everything
( and here domains differ )

---

## Making Simple Requests

When we do a cross browser request, doesn't matter if it is simple, the server to which
we make a request still needs to grant permission. For all following examples let's assume the
page we are making a request from is called `http://javascript.com/page`. And we are always going to be
making a request to the following domain: `http://anywhere.com/request`.
These cross domain requests (since they are simple) are going to be little different from the usual ones.
The only difference is that when a browser makes a request it adds the `Origin` header with our own domain:
```
GET /request
Host:anywhere.com
Origin:http://javascript.com
...
```
The only way that a server response is going to be different from the non-cross-domain response is that
it is also going to include a new header: `Access-Control-Allow-Origin`. If this header equals to either
`*` or `javascript.com` then it means the server grants access and the request is a
success (`onload`), otherwise fail and naturally the `onerror` event triggers in the Frontend.
Here is the algorithm:
```
 __________________________________________________________________________________
|    javascript.com   |                    browser                  | anywhere.com |
|_____________________|_____________________________________________|______________|
|      xhr.send() --> | HTTP request                               -->             |
|                     | ^                                           |              |
|                     | (Origin: origin)                            |              |
|_____________________|_____________________________________________|______________|
|                     |                                             |              |
| onload / onerror  <-- HTTP Response                               <-- response   |
| ^ if origin or *    | ^                                           |              |
|                     | (Access-Control-Allow-Origin: origin or *)  |              |
|                     |                                             |              |
 __________________________________________________________________________________
```
Here is what the server response might look like:
```
HTTP/1.1 200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: http://javascript.com
```

If `Access-Control-Allow-Origin` were missing the request fails.

Also note that when we make a cross-origin request, we can read with JavaScript only simple header, which include:
- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

If we want to read any other response headers ( take a good look, it means even `Content-Length` :) ) the server needs
to explicitly enlist those in the `Access-Control-Expose-Headers` header like so:
```
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key
```

With such `Access-Control-Expose-Headers` header, the script is allowed to access `Content-Length` and 
`API-Key` headers of the response.

---

## Cookies and Credentials

In order to send cookies and HTTP authorization along with a request we need to
set `withCredentials ` to true:
```javascript
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('POST', 'http://anywhere.com/request', true)
...
```
In this case server needs to give a response with yet another type of header
`Access-Control-Allow-Credentials` for such a response to be considered
successful (otherwise fail of course):
```
HTTP/1.1 200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: http://javascript.com
Access-Control-Allow-Credentials: true
```
An important detail is that in this case `Access-Control-Allow-Origin` can't be `*`. 
That’s an additional safety measure, to ensure that the server really knows who it trusts.

---

## Complex requests

In order to send a complex request to a different domain the browser needs to send a 'preflight' request
to the server. This request is sent not via GET or POST but via another method called OPTIONS. If our request
is complex it means that it uses a non-usual method and/or headers.
That is what the preflight request deals with. It doesn't have a body, only headers. The
`Access-Control-Allow-Method` and `Access-Control-Allow-Headers` headers ask the server whether we can make a
request with a certain method and use certain headers in our request. Here is what it might look like:
```
OPTIONS /~ilya HTTP/1.1
Host: site.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: http://javascript.com
Access-Control-Request-Method: COPY
Access-Control-Request-Headers: Destination
```
We are interested in the last 2 headers. After that the server needs to give a response of 200 with these
two headers set to the headers/methods we request. For instance that is what the response may look like:
```
HTTP/1.1 200 OK
Content-Type: text/plain
Access-Control-Allow-Methods: PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, ...
Access-Control-Allow-Headers: Overwrite, Destination, Content-Type, Depth, User-Agent, ...
Access-Control-Max-Age: 86400
```
Since `Access-Control-Allow-Methods` in the response includes `COPY` (the same for
`Access-Control-Allow-Headers`) the request is success.
Also take a look at the response `header` of `Access-Control-Max-Age` the value (in ms) indicates for
how long to cache the response. During this time that the response is cached the browser doesn't have to
send the additional preflight request each time it needs to send a request to a cross-domain server.
Here is what the algorithm looks like:
```
 __________________________________________________________________________________
|    javascript.com   |                    browser                  | anywhere.com |
|_____________________|_____________________________________________|______________|
|                     |                                             |              |
|                     | Preflight OPTIONS Request                  -->             |
|                     | ^                                           |              |
|                     | (Origin: origin)                            |              |
|                     | (Access-Control-Allow-Methods: <methods>)   |              |
|                     | (Access-Control-Allow-Headers: <headers>)   |              |
|                     |                                             |              |
|_____________________|_____________________________________________|______________|
|                     |                                             |              |
|                     |  Preflight 200 OK Response                  |              |
|                     |  ^                                          |              |
|                     |  (Access-Control-Allow-Methods: <methods>) <-- response    |
|                     |  (Access-Control-Allow-Headers: <headers>)  |              |
|                     |  (Access-Control-Max-Age: <ms>)             |              |
|_____________________|_____________________________________________|______________|
|                     |                                             |              |
|                     |            IF THE ABOVE IS SUCCESS          |              |
|_____________________|_____________________________________________|______________|
|      xhr.send() --> | Main HTTP request                          -->             |
|                     | ^                                           |              |
|                     | (Origin: origin)                            |              |
|_____________________|_____________________________________________|______________|
|                     |                                             |              |
| onload / onerror  <-- Main HTTP Response                          <-- response   |
| ^ if origin or *    | ^                                           |              |
|                     | (Access-Control-Allow-Origin: origin or *)  |              |
|                     |                                             |              |
 __________________________________________________________________________________
```
The part after the preflight request is exactly the same as for other types of cross-domain
requests except we would probably be working with other methods than GET and POST and so on.
Here is what the request and response might look like (based on example above):

__Request__ (after preflight):
```
COPY /~ilya HTTP/1.1
Host: site.com
Content-Type: text/html; charset=UTF-8
Destination: http://site.com/~ilya.bak
Origin: http://javascript.com
```

__Response__ (using COPY method):
```
HTTP/1.1 207 Multi-Status
Content-Type: text/xml; charset="utf-8"
Content-Length: ...
Access-Control-Allow-Origin: http://javascript.com

...body...
```
Also do __note__ that we use `Origin` header when we make any cross-browser request
(for example from our website to google.com):
```
...
Connection:keep-alive
Host:google.com
Origin:http://javascript.com
Referer:http://javascript.com/some/url
```
We use `Origin` _in addition_ to `Referer` because it is more reliable :) Sometimes `Referer` is absent.
Learn more about `Referer` [here](./referer.md).

---

## Cool Example

Go to [this folder](./code-1). Do `npm install` and `npm start` for both `someserver-1`
and `someserver-2`. `someserver-1` will log to the console the json `responseText`. You
see, these two servers are opened on different domains and via setting the right header
in `someserver-2` that gives the response `someserver-1` is able to obtain the json response.
Here is how things happen in a nutshell:

First. `someserver-1` makes a request to `someserver-2`:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8080/file.json', true);
xhr.onload = function() {
    console.log(this.responseText);
};
xhr.send(null);
```

Then `someserver-2` gives this file. However in order for it to be able to give that file cross
domain we set aright the good old `Access-Control-Allow-Origin` header:

```javascript
if(req.url === '/file.json') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.end(json);
}
```

---

## Appendix

The `OPTIONS` method is actually used to ask a server which other methods and headers it can handle. It doesn't
seem to have anything to do with security. Thus we use it only with the complex requests (because they use
non-standard methods and/ro headers). But we also check that the client be authorized to make these complex
requests in addition to the server's ability to handle them when we do the main request after the preflight request
and the way we check that the client is authorized is if the server includes the client's domain in the
`Access-Control-Allow-Origin` header.

**Note:** recently I found a HUGE drawback with CORS, you can read about it [here](./cors-intricacy.md).