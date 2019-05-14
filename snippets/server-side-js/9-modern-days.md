# XHR - Modern Days

Nowadays it is a lot more relevant to use `fetch` instead of `XMLHttpRequest`. However you may still want to use
for the following reasons:

- you need to support old browsers / legacy code with no Polyfill for `fetch` ( to keep script tiny )
- you need to do something `fetch` can't ( for example track `upload` process )

Also if you do use XHR it is important to take into consideration that the new events for XHR deprecate the old ones:
- `load` event
- `error` event
- `progress` event
- `content` property

Let's take a look at them.

Use `load`:
```javascript
// old school:
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        alert(`XHR Loaded`);
    }
};

// new:
xhr.onload = () => alert('XHR Loaded');
```

Use `progress`:
```javascript
// old school:
xhr.onreadystatechange = function() {
    if (this.readyState === 3) {
        alert(`progress...`);
    }
};

// new:
xhr.onprogress = () => alert(`progress...`);
```

Use `error`:
```javascript
// old school:
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status === 0) {
            alert(`Tar-Tar Sauce`);
        }
    }
};

// new:
xhr.onerror = () => alert(`Tar-Tar Sauce`);
```

Nowadays we can also use content property instead of `responseText` / `responseXML`. In order to use 
it set the `xhr.responseType` property of the XHR instance to one of these:
- `""` (default) – get as string
- `"text"` – get as string
- `"arraybuffer"` – get as ArrayBuffer
- `"blob"` – get as Blob
- `"document"` – get as XML document ( can use XPath and other XML methods )
- `"json"` – get as JSON ( parsed automatically )

Here is an example:
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', './sampleJSON.json', true);

xhr.responseType = 'json';
xhr.onload = () => {
    if (xhr.status !== 200) return;
    alert(xhr.response.name); // xhr.response is already an object
};

xhr.send(null);
```