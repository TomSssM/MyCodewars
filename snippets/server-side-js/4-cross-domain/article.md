# Cross Domain Communication

## Simple vs Complex Requests

We didn't use to be able to use XHR to make a request 
to a different domain/port/protocol ( the browser would throw an error ). 
For security reasons requests are put into 2 categories:

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

---

## Cookies and Authorization

In order to send cookies and HTTP authorization along with a request we need to
set `withCredentials ` to true:
```javascript
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('POST', 'http://anywhere.com/request', true)
...
```
In this case server needs to give a response with a yet another type of header 
`Access-Control-Allow-Credentials` for such a response to be considered 
successful (otherwise fail of course):
```
HTTP/1.1 200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: http://javascript.com
Access-Control-Allow-Credentials: true
```
An important detail is that in this case `Access-Control-Allow-Origin` can't be `*`.

---

## Complex requests