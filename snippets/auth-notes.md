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

Above, we said that the server creates a temporary user _session_ but what is a session? Normally it is actually
going to be just a simple JavaScript object ( in a NodeJS app ). It might have some data in it like
_session ID_ ( all such session objects are going to be stored in some sort of DB or Cache, thus we can use the
session ID attribute as a key for that storage ). Also a Session Object might have the user id attribute in it
so that we know whose session it is.

So as you can see, while there are, for instance, 20 users logged in to our application, there are going to be
20 Session Objects like these: `{ sessionID: ..., userID: ... }` stored in some Session Storage DB or Cache
on the server. That is _exactly_ what people talk about when saying, pretty fancy in my opinion,
_using sessions for auth_.

Since HTTP is a stateless protocol, how to store the user's `sessionID` between requests ( so that the server may know
it is the same user as entered the password and email )? That is right, we can store the `sessionID` in cookies!

Now in this case such a cookie as the session ID one mentioned above is called an **opaque** reference. It means that
the cookie doesn't carry any meaningful information about the user, like his credentials, and it is only the server
who will be able to refer from that cookie who the user really is.

But, as we talked a lot in the Cookies article, it would still be a huge security flow if some malicious website
were to be able to get the value of that cookie and somehow send it along with a request to the server,
thus pretending to be a user.

For this reason, there are ways that such a cookie is going to be protected.

First of all it can be protected with different cookie flags ( `HttpOnly`, `SameSite`, `Secure` etc. ).

The value that the cookie contains ( the session ID ) is also sometimes signed with a SECRET. This way, if the
client side modifies a cookie ( for instance change the expiration date, or insert a different user's session ID ),
the server will know that and not allow such a request to pass.

Such a type of Authentication is used mostly in Server Side Rendered apps because each request is first passed through
the server before the client's page refreshes ( not so much the case with Single Page Apps ).

This kind of Authentication is very much afraid of a CSRF Attack, but not so much of the XXS attack.


Note: There is a NodeJS SSR project ( in _LibDocs_ ) called _Simple Auth With Sessions_ that is a very good example
of Authentication done using Sessions.

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

However, there are drawbacks to JWT as well, security being the most notable one. You see cookies are a lot more secure.
With cookies we are at least somewhat protected against XSS attacks as the client doesn't have access to
`HTTP Only` cookies. Plus, even if an attacker were to get hold of the secret session id to send as a cookie,
he won't be able to do it as cookies are not sent from different origins than our own. With the `Authentication` header,
there is no way to tell the browser: please, don't send this HTTP header; as soon as the attacker gets his hands on the
JWT token ( which is not super difficult considering most JWT tokens are stored in `localstorage` and an XSS attack
can compromise that ) he can send this token in `Authentication` header even from his own website. The drawback that
the cookies themselves suffer from is an XSRF attack, but this one is much more easily mitigated than an XSS attack.
You would say then, store JWTs in cookies! Well, that might help a little but the very nature of JWT makes them
insecure in yet another way.

Imagine you spotted a user that has an `admin` role. He started abusing his privileges and thus his role need be
immediately taken away. With session based auth this would be quite easily: update the database and the session id
of the user will at once map directly to his roles when he makes an evil request and disallow all admin privileges.
But what to do if we are using JWT? With JWT all the user's roles are stored in the token itself ( and not in the
database like with session based auth ). The token might expire only after a week, or a day, and who knows what an
evil user with admin privileges can do in a day! One solution would be to store on the server a list of revoked
tokens but that looks a lot like session-based-auth approach to this dilemma and kind of begs the question whether
it wasn't easier to use session based auth in the first place.

The conclusion seems to be that it is actually better to use session based auth over JWTs for authentication purposes.
Besides, the main advantage offered by JWTs is kind of dubious anyways as in real life you would extremely rarely
need the sort of horizontal scaling as was shown in the bank and retirement home example. Thus they're just not suitable
as a session mechanism.

But here is one thing that JWTs are really good for! The use cases where JWT is particularly effective are typically
use cases where they are used as a single-use authorization token. From the JSON Web Token specification:

```
JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be
transferred between two parties [...] enabling the claims to be digitally signed or
integrity protected with a Message Authentication Code (MAC) and/or encrypted.
```
                                                     
In this context, _claim_ can be something like a _command_, a one-time authorization, or basically any other scenario
that you can word as:

> Hello Server B, Server A told me that I could \<claim goes here\>, and here's the ( cryptographic ) proof

For example, you might run a file-hosting service where the user has to authenticate to download their files, but the
files themselves are served by a separate, stateless ( stateless means no session id to user mappings are stored
server side ), are served by a separate, stateless _download server_. In this case, you might want to have your
application server ( Server A ) issue single-use _download tokens_, that the client can then use to download the file
from a download server ( Server B ).

When using JWT in this manner, there are a few specific properties:

- The tokens are short-lived. They only need to be valid for a few minutes, to allow a client to initiate the download.
- The token is only expected to be used once. The application server would issue a new token for every download,
 so any one token is just used to request a file once, and then thrown away. There's no persistent state, at all
- The application server still uses sessions. It's just the download server that uses tokens to authorize individual
 downloads, because it doesn't need persistent state

As you can see here, it's completely reasonable to combine sessions and JWT tokens - they each have their own purpose,
and sometimes you need both.
