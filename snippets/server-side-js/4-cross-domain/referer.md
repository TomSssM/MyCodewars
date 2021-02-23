# Referer

## Overview

The HTTP `referer` ( a misspelling of "referrer" ) is an optional HTTP header field that identifies the URL
of the web page which is linked to the resource being requested. By checking the `referer`, the new web page
can see where the request originated.

In the most common situation this means that when a user clicks a hyperlink in a web browser, the browser
sends a request to the server holding the destination web page. The request may include the `referer` field,
which indicates the last page the user was on ( the one where they clicked the link ).

Thus as you can see, `referer` is the URL where the request was made _from_. Imagine we are on Page A.
Page A has a hyperlink to Page B. When we click the hyperlink on Page A, we make a request to the server of
Page B _from_ Page A. Thus when Page B gets a request like `GET https://page.b.com/index.html`, the `referer`
HTTP Header of the request is going to equal to the URL of Page A because, as we said, the request to Page B
was made from Page A and the `referer` HTTP header is the URL pointing to the address where the request came from.

Of course, if we go to Page B _directly_, that is by typing the address of Page B into the address bar,
the `referer` header is going to be missing, because we simply didn't come from anywhere, we came from the browser.

Once the user goes to Page B, let's think what is going to happen: there are probably images and other assets on Page B.
To load them, the browser is going to be making requests to the server of Page B for those assets ( like these:
`GET https://page.b.com/cool-image.png`, `GET https://page.b.com/styles.css` etc. ). Thus while Page B is loading
the browser is going to be making these requests. But guess what the `referer` header is going to be this time?
This time, the `referer` header is going to be the URL of Page B ( not Page A, or blank ) because this time
the user is already on Page B and all the requests for the assets of Page B are being made _from_ Page B itself.
Likewise if we send an XHR request to the server of Page B, from inside the script that belongs to Page B,
the `referer` header is going to be once again the URL of Page B, because just like last time the XHR request was
made while we were visiting Page B, thus from Page B itself.

Thus, as you can see, `referer` HTTP header is the URL of the web page from which the request was made, which is
going to be the address of either our page or some other web page.

## Referrer Policy

This policy controls how much referrer information is to be sent. For instance, this policy can say:
don't send `referer` HTTP header at all, or it can say: when you send the URL of the page in the `referer` HTTP header,
send not the full URL of the page but only part of the URL.

Referrer Policy can have one of the following values:

- `no-referrer`
- `no-referrer-when-downgrade` ( default )
- `origin`
- `origin-when-cross-origin`
- `same-origin`
- `strict-origin`
- `strict-origin-when-cross-origin`
- `unsafe-url`

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) has a pretty good explanation
of each of these options. These options are also called _directives_ just like in Content Security Policy
( can learn about that in `learnTom` ).

As you remember in the last example when we followed the hyperlink from Page A to Page B, the browser sent
the URL of Page A in the `referer` HTTP header. If we were to set Referrer Policy to `no-referrer` for instance,
then the browser wouldn't send the `referer` HTTP header at all. In case of the `same-origin` Referrer Policy,
browser would send the `referer` HTTP header only if both Page A and Page B are the same origin
( remember what that is? ).

There are 2 ways to enable Referrer Policy:

- thru the response HTTP header
- thru HTML

If you want to enable Referrer Policy thru the HTTP Header, then your server must add the
`Referrer-Policy` **response** Header when answering the request. For instance, when the user
boots up the browser and looks up the address of Page A, the server of Page A must provide the
`Referrer-Policy` HTTP response header. For example, if Page A adds the response header like this:

```
Referrer-Policy: no-referrer
```

Then whenever the user follows a hyperlink on Page A, the browser won't add the `referer` HTTP header with the URL
of Page A to the request for Page B. Thus Page B will never know where the request came from.

You can likewise enable this policy for only a specific link by using either the `referrerpolicy`
or `rel` attributes:

```html
<a href="http://example.com" referrerpolicy="origin">
```

or:

```html
<a href="http://example.com" rel="noreferrer">
```

The values for these attributes are the same as would be used for the `Referrer-Policy` HTTP Response Header.

You can likewise use the HTML `<meta />` tag:

```html
<meta name="referrer" content="origin">
```

In the case of the `<meta />` tag, _all_ the links on the page with the `<meta />` tag will adhere to the
Referrer Policy stated in `<meta />` tag.
