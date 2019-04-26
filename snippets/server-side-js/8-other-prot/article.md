# JSONP Protocol

JSONP is a way of making server requests via a script tag. We create a script element and write the url of the
request into the `src` attribute. When we append it to the document two things happen:

- the browser is going to make a request to the server
- execute the text returned by the server

Let's look into this process. Imagine we want from the server the following object:
```javascript
{
    name: 'Tom',
    age: 18
}
```

Let's first of all create a global variable `CallbackRegistry`:
```javascript
const CallbackRegistry = {};
```

We are going to retrieve data via callbacks (later we will see why). Callback names don't relly matter so much
we only need to insure that they don't collide so let's do this to name a callback:
```javascript
const callbackName = `cb${String(Math.random()).slice(-5)}`;
```

Then we add it to our `CallbackRegistry`:
```javascript
CallbackRegistry[callbackName] = function(data) {
    handleData(data);
};
```

All we need is the `data` itself. Well, here is the interesting part. When we request a script from the server
thr server can write as a string the body of the response and that body is going to be executed in the broswer
when the script response comes back to the client:
```javascript
if(req.url === './someScript.js') {
    res.end('console.log(window)');
}
```

Thus when `someScript.js` loads, the `window` object is going to be logged. What we want to do with JSONP is 
invoke our callback function `` and pass to it the right data:
```javascript
callbackName; // get it from the url somehow === CallbackRegistry[randomId]
const theRigthData = JSON.stringify(
    {
        name: 'Tom',
        age: 18,
    }
);
res.end(callbackName + '(' + theRigthData + ');'); // CallbackRegistry[randomId]({"name":"Tom","age":18});
```

So that when such a response script arrives the callback is going to be invoked with just the right data.

[Here](./code-1/) is the complete task.

---

# Next