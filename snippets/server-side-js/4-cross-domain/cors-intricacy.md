# CORS Drawback

When we make an AJAX request, the communication between the client ( the browser in our case, the user agent )
and the server is usually the following ( let's for the sake of this example imagine it to be a simple cors request ):

- the browser sends the request
- the server processes the request, sets the `Access-Control-Allow-Origin` HTTP header etc.
- the browser gets back the server response and processes the HTTP headers of the response
- if the `Access-Control-Allow-Origin` HTTP header matches our origin, the request is not blocked by CORS,
  otherwise blocked

The problem is: the server _first_ processes the request and only after that does the browser verify whether or not
to block the request by CORS ( by looking at the HTTP `Access-Control-Allow-Origin`
header of the server's _response_ ).

This can actually be a very HUGE problem if you don't understand how CORS works.
Imagine you have a website called `https://example.com` and you have a route on the server
like this one:

```js
const db = require('./super-protected-db');
// more stuff here...
app.post('/api', (req, res) => {
    const user = req.body.user;
    db.addUser(user);
    res.set('Access-Control-Allow-Origin', 'https://example.com');
    res.json({ isSuccess: true });
});
```

So this route adds a user to our Data Base and then notifies the client of the success of the operation.
Also, we set the `Access-Control-Allow-Origin` HTTP Header indicating that we trust _only_ our own origin.

Now the point is: if you think that it is safe to do what is written above because the attacker's POST
AJAX request will be blocked by CORS, it is actually not true.

In the case above, an attacker will be able to add a user to the Data Base thru an AJAX request ( even though
it will be blocked by CORS ). You see, when the attacker makes an AJAX request like this ( on his own origin ):

```js
// on https://evil.dude.com:
fetch('https://example.com', {
    method: 'post',
    body: { name: 'Mr. Evildude' },
});
```

the browser will in fact send that request to our server at `https://example.com`, our server will execute that
request adding the user to the Data Base and setting the `Access-Control-Allow-Origin` HTTP Header, after that
the browser will see the `Access-Control-Allow-Origin` HTTP Header and block `https://evil.dude.com` from seeing
our server's response. But the user that an attacker sent in the body of the POST request will already be added
to the Data Base!

In other words, CORS only forbids third party AJAX request from seeing the server's _response_
( in the example above the `{ "isSuccess": true }` JSON ), but it doesn't prevent the browser from sending that
request and our server from consequently processing that request. It cannot be otherwise because the browser
cannot know the _response_ headers until the server has fully processed the request and answered with the right headers.
For state mutating methods like POST this drawback can be very dangerous: what if the attacker knows how our app works
and has just now added his own account to the list of admins?

But such an emergency can be easily prevented if you supply the appropriate security headers
( `Access-Control-Allow-Origin`, `Access-Control-Expose-Headers` etc. ) in response to the preflight `OPTIONS` request
instead of to the `POST` request. This way, the browser will see the headers and forbid the website to
make the `POST` request.

So long as `GET` requests don't mutate state of your application everything is going to be OK.
