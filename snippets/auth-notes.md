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

TODO: continue from 13:00
