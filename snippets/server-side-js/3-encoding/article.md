# Encoding

## Urlencoded

This one is the most common type of encoding. If we have a form:
```html
<form action="/submit" method="GET">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>
```
It will be submitted as `?` followed by several `name=value` pairs separated via `&`.
All characters except English letters will be replaced with `%` + corresponding UTF8 code of the char.
Space is `%20`, `/` is `%2F`. Cirilic letters are encoded via 2 bytes, for example: `%D0%A6`;
In JS `encodeURIComponent` function does just that:
```javascript
encodeURIComponent(' '); // %20
encodeURIComponent('/'); // %2F
```
Urlencoded is mostly used with GET. Here is how we would use it to send a form manually with JS:
```javascript
const xhr = new XMLHttpRequest();

const params = 'name=' + encodeURIComponent(name) + '&surname=' + encodeURIComponent(surname);

xhr.open("GET", '/submit?' + params, true);

xhr.onreadystatechange = ...;

xhr.send();
```
The browser will set the right headers itself. However since this request is no different from the default
sending of the form, some frameworks let the server know it is AJAX via setting this header:
```javascript
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
```
Also we can use urlencoded with POST like so:
```javascript
const xhr = new XMLHttpRequest();

const body = 'name=' + encodeURIComponent(name) + '&surname=' + encodeURIComponent(surname);

xhr.open("POST", '/submit', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

xhr.onreadystatechange = ...;

xhr.send(body);
```
As you can see we need to explicitly set the type of encoding via a header. It is done because POST
also supports the following encodings:

- `text-plain` ( self explanatory :) )
- `application/x-www-form-urlencoded`
- `multipart/form-data`

Normally the type of encoding can also be set via the `encoding` attribute in HTML forms:
```html
<form action='/submit' method='POST' enctype="multipart/form-data">
</form>
```
Let's look into `multipart/form-data`.
__Do note__ that `application/x-www-form-urlencoded` is the only encoding that can be used with GET.

---

## multipart/form-data

Data encoded via `application/x-www-form-urlencoded` might be huge especially if it isn't in English.
Thus we can use `multipart/form-data`:
```html
<form action="/submit" method="POST" enctype="multipart/form-data">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>
```
The data encoded with it will look like this:
```
...some headers come here...
Content-Type: multipart/form-data; boundary=RaNdOmDeLiMiTeR

--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="name"

John
--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="surname"

Smith
--RaNdOmDeLiMiTeR--
```
`RaNdOmDeLiMiTeR` is a random number. This encoding is also used to exchange files as encoding
every bit with a UTF-8 index would increase the size of data too much.
Here is how we would encode things this way manually:
```javascript
const data = {
  name: 'John',
  surname: 'Smith'
};

const boundary = String(Math.random()).slice(2);
const boundaryMiddle = '--' + boundary + '\r\n';
const boundaryLast = '--' + boundary + '--\r\n'

let body = ['\r\n'];
for (let key in data) {
  // add a field
  body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
}

body = body.join(boundaryMiddle) + boundaryLast;

var xhr = new XMLHttpRequest();
xhr.open('POST', '/submit', true);

xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  alert( this.responseText );
}

xhr.send(body);
```
But that looks tedious. That is why we could use the built-in `FormData` object that allows us to encode
the form data with `multipart/form-data`:
```html
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  const formData = new FormData(document.forms.person);
  //                            ^
  //                            form element reference

  // let's add another name=value pair
  formData.append("middle-name", "Dude");
  //               ^              ^
  //               name           value

  // send
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/url");
  xhr.send(formData);
</script>
```
However the most convenient and widely used exchanged format remains `JSON`:
```javascript
const xhr = new XMLHttpRequest();
const json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit', true);

// it is recommended to set a header:
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.onreadystatechange = ...;
xhr.send(json);
```

Do note that since all the JSON we send is string, by default the `Content-type` is set as `text/plain` which we
would want to change to `application/json` if the sting we send is _in JSON format_.