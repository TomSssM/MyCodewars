# URL Class

## Syntax

The built-in `URL` class provides an easy way to parse and manipulate urls and can be passed anywhere where a url 
string is expected as it is automatically coerced to a string representing a full url. Here is the syntax:
```javascript
const url = new URL('https://baconipsum.com/api/?type=meat-and-filler');
url.protocol; // https:
url.host; // baconipsum.com
url.pathname; // /api/

// we can specify URL base as 2nd argument:
const url2 = new URL('api/?type=meat-and-filler', 'https://baconipsum.com');
```

## URL Structure

In order to better understand the properties of a URL object here is a diagramm:
```
|                                                                    |
|                               href                                 |
|____________________________________________________________________|
|         origin          |          |                        |      |
|_________________________|          |                        |      |
|      |  |      host     |          |                        |      |
|      |  |_______________|__________|________________________|______|
|protoc|  |  host  | |port| pathname |         search         |      |
|  ol  |  |  name  | |    |          |                        | hash |
|https:|//|site.com|:|8080|/path/page|?param1=val1&param2=val2|#here |
|      |  |        | |    |          |                        |      |
```
Thus the link `https://site.com:8080/path/page?param1=val1&param2=val2#here` can be parsed as follows:
```javascript
const url = new URL('https://site.com:8080/path/page?param1=val1&param2=val2#here');
url.protocol; // https:
url.hostname; // site.com
url.port; // 8080
url.host; // site.com:8080
url.origin; // https://site.com:8080
url.pathname; // /path/page
url.search; // ?param1=val1&param2=val2
url.hash; // #here
url.href; // https://site.com:8080/path/page?param1=val1&param2=val2#here
```

## Parameters

Before we start working with parameters do keep in mind that they need to be correctly encoded according to `urlencode`
we used to have to use `encodeURIComponent` function for each parameter. Luckily the `URL` object methods do it all
automatically for us. Here is the API:
```javascript
const url = new URL('https://google.com/search');

// params API:
// set/replace param:
url.searchParams.set('test', 'abc123!'); // https://google.com/search?test=abc123%21
url.searchParams.set('test', 'cat'); // https://google.com/search?test=cat

// append a param:
url.searchParams.append('test', 'newVal'); // https://google.com/search?test=cat&test=newVal

// get a param:
url.searchParams.get('test'); // cat

// get many if there are 2+ of the same name:
url.searchParams.getAll('test'); // ["cat", "newVal"]

// delete a param:
url.searchParams.delete('test'); // https://google.com/search

// check if a param exists:
url.searchParams.has('test'); // false

// sorting params:
url.searchParams.append('zzz', 'aaa');
url.searchParams.append('aaa', 'zzz'); // https://google.com/search?zzz=aaa&aaa=zzz
url.searchParams.sort(); // https://google.com/search?aaa=zzz&zzz=aaa

// plus it has an iterator:
[...url.searchParams]; // [ ["aaa", "zzz"], ["zzz", "aaa"] ]
```