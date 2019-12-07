# Authentication Overview

## Authentication vs Authorization

Authentication means verifying user's identity, sending credentials, login, password etc., so the user can
enter the website.

Authorization, on the other hand, means checking the permissions of the already authenticated user. Even if the
user has been authenticated, passed his credentials OK, he may still not have permission ( not be authorized ) to access
certain resources of our app.

The HTTP status codes are different as well:

- `401` - Unauthorized ( failed Authentication )
- `403` Forbidden ( failed Authorization )

So let's look at different types of authorization on the web.

## Session Based Authentication

Here is the flow:

- user submits login _credentials_, e.g. email & password
- server verifies the credentials against the DB
- server creates a temporary user **session**
- sever issues a cookie with a **session ID**
- user sends the cookie with each request
- server validates it against the session store & grants access
- when user logs out, server destroys the session & clears the cookie

Now in this case such a cookie as the session ID one mentioned above is called an **opaque** reference. It means that
the cookie doesn't carry any meaningful information about the user, like his credentials, and it is only the server
who will be able to refer from that cookie who the user really is.

But, as we talked a lot in the Cookies article, it would still be a huge security flow if some malicious website
were to be able to get the value of that cookie and somehow send it along with a request to the server,
thus pretending to be a user.

For this reason, there are ways that such a cookie is going to be protected.

First of all it can be protected with different cookie flags ( `HttpOnly`, `SameSite`, `Secure` etc. ).

The value that the cookie contains ( the session ID ) is also sometimes signed with a SECRET. This way, if the
client side modifies a cookie ( for instance change the expiration date ), the server will know that and not allow
such a request to pass.

Such a type of Authentication is used mostly in Server Side Rendered apps because each request is first passed through
the server before the client's page refreshes ( not so much the case with Single Page Apps ).

This kind of Authentication is very much afraid of a CSRF Attack, but not so much of the XXS attack.

## Token Based Authentication ( JWT )

Here is the flow:

- user submits login _credentials_, e.g. email & password
- server verifies the credentials against the DB
- sever generates a JSON **token** and embeds user data into it ( like user name and so on )
- server encodes and serializes the token
- server signs the token with its own secret key ( so that if the client side changes the token in any way
 the server will know that, more on that in a moment )
- server responds back with the token ( in body or header )
- client side stores the token in `localStorage` for instance
- client side sends the token along with each request
- server verifies the token & grants access
- when user logs out, token is cleared from client storage

One type of such tokens is called **JSON Web Token** or **JWT**.

This is what `JWT` might look like ( in the `Authentication` Header ):

```
HTTP/1.1 200 OK
Content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0.WDKey8WGO6LENkHWJRy8S0QOCbdGwFFoH5XCAR49g4k
```

As you can see there are dots among the jibberish letters in the token. They are there because the structure of
a JWT token is as follows:

```
Bearer <header>.<payload>.<signature>
```

The token looks like jibberish because it is actually Base64Url encoded, symmetrically. What it means is, it can be
decoded on the client using the JavaScript function `atob` to see what is in it. Let's do that by decoding the
`header` part of the token:

```js
atob('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'); // JSON: '{"alg":"HS256","typ":"JWT"}'
```

We have just decoded the `header`!

Do note though that `JWT` tokens are Base64Url encoded not for security reasons but for transport.

`header` typically includes some meta information about the token. For instance, `typ` stands for `type`, which is `JWT`.

We can likewise decode the payload:

```js
atob('eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0')
// "{"sub":"5bd61aa1bb43f7243a29316d","name":"John Smith","iat":1541276060}"
//     ↑ subject ( e.g. user ID )       ↑ claim(s)          ↑ issued at ( in seconds )
```

`sub` might be a User ID for MongoDB for instance.

Now that we saw what JWTs look like, let's see how JWT signs its tokens with a secret.

The last part of JWT ( JWT: `Bearer <header>.<payload>.<signature>` ) is a signature. It is exactly signature that
helps us to make sure that malicious websites don't modify our tokens. Let's see how this signature is created.
In the `header` part of the token, we saw this field: `"alg":"HS256"`. It tells that in order to create the signature,
we need to use the `HMACSHA256` algorithm. A function implementing this algorithm is going to take in as arguments:
the token Base64Url encoded `header` part ( this one: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` ), the token Base64Url
encoded `payload` part and lastly, your 256 bit secret. The 256 bit secret is going to be some random string, like
a password. Thus here is how we could generate a token signature on a NodeJS server for example:

```js
const header = JSON.stringify({
    alg: 'HS256',
    typ: 'JWT',
});
const payload = JSON.stringify({
    sub: '5bd61aa1bb43f7243a29316d',
    name: 'John Smith',
    iat: 1541276060
});
const signature = jwt.HMACSHA256(
    base64UrlEncode(header) + '.' + base64UrlEncode(payload),
    your256BitSecret,
);
```

The thing is, the 256 bit secret is known only to the server, thus, if the evil website needs to change the payload
of the token ( modify the permissions to a super user or increase the expiration date for instance ), then the evil
website also needs to change the `signature` of the token ( or else it will be invalid ), and that
is where the evil website is going to find a problem because it doesn't know the 256 bit secret, only your server does,
and thus the evil website cannot modify the JWT token ( because should it modify it, the server will see that
the token actually should have a different signature and won't let such a token pass ).

On the server, upon receiving an encoded JWT token alongside the request, you would want to take its `header`
and `payload` sections and re-generate the signature using your 256 bit secret and then compare the re-generated
signature with the actual `signature` part of the token to make sure that nobody modified the token.

As we said before, a significant advantage of JWT compared to Session based authentication is that the server
no longer has to store the session ids to actual users mappings in its memory, all that data is part of the token
( like `{ "name": "John": permissions: [...] etc... }` ). It is also pretty secure because no evil website can
create the same token.

One of the most powerful advantages of JWT is that horizontal scaling of servers is easier. What I mean by that.
Imagine we have 2 servers, the 1st server runs the bank app, the 2nd server runs the retirement home app:

<img src="../data/jwtservers.png" width="400px" alt="jwt servers" />

Imagine that one day we want people who have gotten authorized on the bank server to also become
automatically authorized when they visit the retirement home app. If we were using Session Based authentication,
then we would need to copy the database that stores the session id to user mappings from the bank server to the
retirement server. Such a waste of space! But with JWT, all we need to share between the 2 servers is only the tiny
256 bit secret so that they both should be able to validate the JWT tokens.

Thus, as you can see, no matter how many servers you have, imagine if bank had 5 servers that would need to be
authenticating the same users that use the bank app, with session based authentication we would need to copy
the session id to user mappings 5 times to each and every server! With JWT there is no such a problem because the
user is stored on the client!

I would like to note though that the fact that the JWT is stored on the client makes us very vulnerable to XSS attacks.
The way we can terminate those in session based authentication is by using `http-only` cookies but with JWT we cannot
send tokens as cookies because, if we go back to our bank and retirement example, the cookie of the bank server
is not going to be sent to the retirement server, thus the JWT token needs to be sent not as a cookie but as a usual
HTTP header in order for the retirement server to be able to read it. Thus the client actually
*needs* access to JWT. This way any maliciously injected script can steal the JWT token and attach it with every request
as a usual HTTP header and thus be able to take actions on user's behalf.
