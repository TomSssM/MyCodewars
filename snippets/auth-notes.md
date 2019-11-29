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

## Token Based Authentication

Here is the flow:

- user submits login _credentials_, e.g. email & password
- server verifies the credentials against the DB
- sever generates a temporary **token** and embeds user data into it ( like name, but not smth very sensitive
 like password )
- server responds back with the token ( in body or header )
- user stores the token in client storage ( `sessionStorage` is perfect for it )
- user sends the token along with each request
- server verifies the token & grants access
- when user logs out, token is cleared from client storage

Such Tokens are also sometimes signed with a secret to prevent client side from tampering with them.

As you can see, such Tokens are not stored server side. Thus it becomes the responsibility of a client to protect
those tokens from being read.

This kind of Authentication is oftentimes used in SPAs and is very much afraid of XSS attack.

For security reasons, such a token is also sometimes encrypted. It can be encrypted either _symmetrically_
( one key to both encrypt and decrypt data ) or _asymmetrically_ ( a pair of public / private keys like in SSH ).

One type of such tokens is called **JSON Web Token** or **JWT**.

This is what `JWT` might look like ( in the `Authentication` Header ):

```
HTTP/1.1 200 OK
Content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0.WDKey8WGO6LENkHWJRy8S0QOCbdGwFFoH5XCAR49g4k
```

So its structure is as follows:

```
Bearer <header>.<payload>.<signature>
```

The token looks like jibberish because it is actually Base64Url encoded, symmetrically. What it means is, it can be
decoded on the client using the JavaScript function `atob` to see what is in it. Let's do that:

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

`JWT` Tokens are also sometimes signed with a secret to guarantee that the token was not tampered with by the client side
JavaScript because, as we have discussed, any manipulation ( e.g. increasing expiration time ) of the token
invalidates this token because it has been signed with a secret before, and if the token has been modified
then its signature ( the one that is the last part of the token: `Bearer <header>.<payload>.<signature>` ) is not going
to match the `payload` of that token.

Though there is even a spec for how to encrypt `JWT` tokens ( called `JWE` ), they are rarely encrypted because the
client side needs to actually decrypt the tokens, plus `sessionStorage` isn't super secure.

As yet another security measure, `JWT` tokens are usually very often refreshed, so that even if an attacker does steal
the token, he won't be able to use it for a long time because, sure enough, at a short notice the token expires and needs
to be refreshed to become valid again.

The main pros of JWTs are the following:

- server does not need to keep track of user sessions because now we carry all the information about the user in the
 JWT Token itself ( thus no need to waste memory for the session id to user mappings on the server )
- horizontal scaling is easier ( any server can verify the token )
- CORS is not an issue if `Authorization` header is used instead of `Cookie`
- operational even if cookies are disabled

Thou it is worth mentioning that we would need to keep a list of revoked tokens server side ( revoked tokens are tokens
that have gotten outdated and need to be refreshed ) so that if the server gets a request with a revoked token in it
it doesn't grant the access to the website's protected resources for such a request because, well, straight enough,
the token for this request is stale and as we have talked earlier it is best practice to refresh JWT tokens as
often as possible. And as it turns out keeping a blacklist of revoked tokens is a lot harder than keeping a white list
of un-revoked user session ids thus making Session ID authorization a lot more preferable option in most cases.
