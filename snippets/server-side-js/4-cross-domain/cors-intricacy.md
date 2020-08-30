# CORS Intricacies

## Setting CORS Headers to the Wrong Request

When we make an AJAX request, the communication between the client ( the browser in our case, the user agent )
and the server is usually the following ( let's for the sake of this example imagine it to be a simple CORS request ):

- the browser sends the request
- the server processes the request, sets the `Access-Control-Allow-Origin` HTTP header etc.
- the browser gets back the server response and processes the HTTP headers of the response
- if the `Access-Control-Allow-Origin` HTTP header matches our origin, the request is not blocked by CORS,
  otherwise blocked

The problem is: the server _first_ processes the request and only after that does the browser verify whether or not
to block the request by CORS ( by looking at the HTTP `Access-Control-Allow-Origin`
header of the server's _response_ ). And by "block the request" I mean forbid client side JavaScript from seeing
the response of the server.

This can actually be a very HUGE problem if you don't understand how CORS works. Imagine you have a website called
`https://example.com` and you have a route on the server like this one:

```js
const db = require('./super-protected-db');
// more stuff here...
app.put('/api', (req, res) => { // HTTP method PUT
    const user = req.body.user;
    db.addUser(user);
    res.set('Access-Control-Allow-Origin', 'https://example.com');
    res.json({ isSuccess: true });
});
```

So this route adds a user to our Data Base and then notifies the client of the success of the operation.
Also, we set the `Access-Control-Allow-Origin` HTTP Header indicating that we trust _only_ our own origin.

Now the point is: if you think that it is safe to do what is written above because the attacker's `PUT`
AJAX request will be blocked by CORS, it is actually not true.

In the case above, an attacker will be able to add a user to the Data Base thru an AJAX request ( even though
the AJAX request will be blocked by CORS ). You see, when the attacker makes an AJAX request like this
( on his own origin with the name `https://evil.dude.com` ):

```js
// window.location.href === https://evil.dude.com:
fetch('https://example.com', {
    method: 'put',
    body: { name: 'Mr. Evildude' },
});
```

the browser will in fact send that request to our server at `https://example.com`, our server will execute that
request adding the user to the Data Base and setting the `Access-Control-Allow-Origin` HTTP Header, after that
the browser will see the `Access-Control-Allow-Origin` HTTP Header and block `https://evil.dude.com` from seeing
our server's response. But the user that an attacker sent in the body of the `PUT` request will already be added
to the Data Base!

In other words, CORS only forbids third party AJAX request from seeing the server's _response_
( in the example above the `{ "isSuccess": true }` JSON ), but it doesn't prevent the browser from sending that
request and our server from consequently processing that request. It cannot be otherwise because the browser
cannot know the HTTP headers of the server's response ahead of time, not until the server has fully processed
the request and answered with the right headers. For state-mutating HTTP methods like `PUT` this drawback
can be very dangerous: what if the attacker knows how our app works and has just now added his own account to the list
of admins?

But such an emergency can be easily prevented if you supply the appropriate security headers
( `Access-Control-Allow-Origin`, `Access-Control-Expose-Headers` etc. ) in response to _the preflight
`OPTIONS` request_ instead of to the `PUT` request ( like in the example above ). Here is what is going to
happen in this situation:

- client side JavaScript wants to make a CORS request to our server at `https://example.com`
  in order to add a new user to the data base ( method `PUT` )
- since the CORS request is not a simple one, the browser will send the preflight `OPTIONS` request
- our server sets the `Access-Control-Allow-Origin` HTTP header with the value of `https://example.com`
  in response to the preflight `OPTIONS` request, thus telling the browser that it trusts CORS requests
  _only_ from `https://example.com`, its own origin
- the browser sees this header in the response, which came to the preflight `OPTIONS` request, and if the origin
 is not `https://example.com`, then the browser forbids AJAX to send the `PUT` request, which would otherwise
 follow the `OPTIONS` request

As you can see, the browser will see the headers and forbid the website to make the subsequent `PUT` request.
Only simple HTTP requests like `GET` don't require a preflight request, but so long as `GET` requests don't mutate
the state of your application everything is going to be OK.

In the very first example the mistake was that we set the CORS headers in response to the `PUT` request itself, instead of
the preflight request. As a result, the browser didn't see the CORS headers when it received the response to the
preflight request, and as a result allowed the attacker to make the `PUT` request, which added the harmful user to the database.
The right code would look something like this:

```js
const db = require('./super-protected-db');
// set the CORS headers to every request:
app.use((req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://example.com');
    // ...
});
// process the PUT request:
app.put('/api', (req, res) => {
    const user = req.body.user;
    db.addUser(user);
    res.json({ isSuccess: true });
});
```

Now we set the CORS headers to _every_ request, not just the `PUT` request. As a result, the browser sees the CORS headers on
the response to the preflight request and forbids the JS at `https://evil.dude.com` to send the subsequent harmful `PUT` request.

The reason that `GET` requests don't need the preflight request is very simple: the only harm that
`GET` requests can do is if they _show_ the server's response to the attacker. But so long as the `Access-Control-Allow-Origin`
HTTP header is present, the browser will not show the response on an unintended origin. But state-mutating requests
with methods like `POST`, `PUT`, `DELETE` etc. are a whole different story. The harm that they do is make changes to
the state of the server like adding a user to the database, giving admin privileges to some users,
deleting users' information and so on. As you can see, unlike with `GET` requests, the harm of state-mutating HTTP requests
( methods `PUT`, `DELETE` etc. ) is not in _showing the server's response_ but in _being able to make a request
to the server._ That is why they are considered complex CORS requests and the browser needs to make a preflight request:
first the browser gives the server a chance to set the necessary HTTP headers ( in response to the preflight request,
without processing a state-mutating `PUT` / `POST` / `DELETE` request ) and only after that does the browser allow / deny
sending the state-mutating HTTP request. So the preflight request is a way to set the CORS headers _without_ processing the actual
`PUT` / `POST` / `DELETE` request because if this actual request is processed, then the harm is already done.

## Preflight Request is not always sent

As you can read in [the article](./article.md) `POST` requests are _not_ considered complex requests. What this means is
the browser doesn't send the preflight request for `POST` and, as a result, _even if your server sets the CORS headers
to preflight requests,_ the browser will still allow an attacker to send the harmful `POST` request to your server because
it would not even send that preflight request: the browser will only block the client side JavaScript from seeing the
response to the `POST` request just like for simple `GET` requests ( and unlike with the `PUT` request because HTTP method `PUT`
is considered complex by default and requires a preflight request ).

But you will ask: hold on a second, are not `POST` requests the _primary_ way that we change the state of our server?
For example, if we need to add a user to the database, the usual flow is: send the user information in the body of
the `POST` request, then parse the body of the `POST` request on the server, and finally, add this user to the database.
The answer is: yes, and this is why `POST` requests represent an extra significant threat if you don't know how CORS works!

So if your server side code for adding the user to the database looks like this:

```js
// set the CORS headers
app.use((req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://example.com');
    // ...
});
// ...
app.post('/api', (req, res) => { // method POST
    const user = req.body.user;
    db.addUser(user);
    res.json({ isSuccess: true });
});
```

The attacker will be able to run on his origin:
```js
// window.location.href === https://evil.dude.com:
fetch('https://example.com', {
    method: 'post',
    body: { name: 'Mr. Evildude' },
});
```

and the attacker's user will be in the database! Worse still, unless you provide the `Access-Control-Allow-Credentials` HTTP header,
the attacker will even be able to send the cookies along with the request!

## Forcing Preflight Request for `POST` CORS Requests

Before we can answer this question, let's see why and how preflight request is not always sent.

There are a few requests that won't trigger a preflight request, for example `GET` requests, __or `POST` request with
with a `Content-Type` header set to either `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`__
( thus `POST` requests with `Content-Type` set to `application/json` for example will trigger a preflight request ).

But why are there a few certain types of requests:

- `GET`
- `POST` with `Content-Type: application/x-www-form-urlencoded`
- `POST` with `Content-Type: multipart/form-data`
- `POST` with `Content-Type: text/plain`
- there are others, [full list](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests)

that won't trigger a preflight request? Would not it, at least for `POST`, be a lot more logical to require a preflight request?
The answer is: HTML forms. What can HTML forms do? That is right: HTML forms can make HTTP requests from client to server,
just like AJAX. HTML forms support `GET` and `POST` HTTP methods and can set the `Content-Type` HTTP header to one of the following:
`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`. See the connection? Simple CORS requests are also
the same HTTP requests that HTML forms can make. OK but what is the problem? You see HTML forms have existed since ancient times,
even before CORS existed, and the problem is: HTML forms can make aforementioned HTTP requests __from any domain and to
any domain.__ CORS doesn't apply to HTML forms ( the browser doesn't block HTML forms from making HTTP request to origins different
from their own ). This happens because when HTML forms were invented, browser vendors didn't consider it a threat that HTML forms can
make requests to third party origins, it was only later on that they realized this threat and, as a result, CORS was invented,
but no, CORS still doesn't affect HTML forms even to this day. As a result, a hacker can trick the user into submitting an HTML form on
his own origin, the form will make a request to your origin without the browser blocking it, and your server will happily process
this request ( unless you take certain measures, which we will discuss in a moment ). That is a potential security threat because the
hacker can make the unsuspecting user submit an HTML form whose method will be `POST` for example and whose body will be carrying the
harmful information ( for adding the attacker to the list of admins for example, you get the drift, if an attacker can send a `POST`
request with any request body he wants he will be able to do harm ).

So back to the question of why no preflight request is made for simple CORS requests, the answer is: if browser vendors chose to
force a preflight request even for simple requests, then web developers would forget about the fact that the same simple requests
can be made from HTML forms and be under bigger threat.

This is why you need to always remember: __`POST` requests with `Content-Type` set to `application/x-www-form-urlencoded`,
`multipart/form-data` or `text/plain` will not trigger a preflight request but will be processed by your server.__
Doesn't matter that you set the CORS headers in response to the preflight request, the preflight request is not going to
be made and only the _response_ to the `POST` request will be blocked. The same story for `GET` requests.

Here are 3 rules to remember in order to prevent this threat:

- on your server, don't process `POST` requests with `Content-Type` other than `application/json`
  ( because `Content-Type: application/json` requires a preflight request )
- always answer with CORS headers to all requests
- don't allow `GET` requests to mutate the state of your app ( e.g. add / delete data from the data base or persist data
in other ways, `GET` requests should _take_ some data from the server and return it to the client, not _modify_ or _delete_
data on the server )

Here is an example of a more secure code:

```js
// set the CORS headers
app.use((req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://example.com');
    // ...
});
// ...
app.post('/addUser', (req, res) => { // method POST
    if (req.header('Content-Type') !== 'application/json;charset=utf-8') {
        throw new SecurityError();
    } else {
        db.addUser({ id: db.length, name: `John Number ${db.length}` });
        res.end('added user');
    }
});
```

The only drawback to this is that now all `POST` requests to your server need to be in JSON format. But since JSON is the most
common data exchange format anyways, this drawback is not significant.

## More Details

### All Responses should contain the CORS headers

You might think that if your server answers to the `OPTIONS` request with a 200 and the right headers you're in the clear.
But in reality you'll see the browser send the `OPTIONS` request, then send your actual request ( because the preflight request
allowed it ), but then it will block the request by CORS ( block the response to the actual request ). That's because every request
( `GET`, `POST`, `PUT` or otherwise ) should also contain the same `Access-Control-Allow-Headers` header. The browser forbids
seeing the response of the complex request like `PUT` _even if the response to the preflight request had the right headers._

### Include the protocol

You can't just put `mydomain.com` as a domain, it needs to include the protocol ( e.g. `https://mydomain.com` ). The fun part is
you can't really accept both HTTP and HTTPS because...

### You can only allow one domain

You can either allow every domain with `Access-Control-Allow-Origin: *`, or only one. This means that if you need several domains
to access your API, you'll need to handle it yourself.

The easiest way to handle this is to maintain a list of allowed domains on your server, and change the content of the header dynamically
if the domain is in that list. Here's how it would look in EXPRESS for example:

```js
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://www.mydomain.com',
    'https://www.mydomain.com',
    'http://www.myotherdomain.com',
    'http://www.myotherdomain.com',
  ];
  const { origin } = req.headers;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});
```
