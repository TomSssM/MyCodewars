# New in JS

## Data Type of Keys

We used to say that keys of objects can be only of type `string` and we also argued that they cannot be of 
type `number`. Well, now we also have a new primitive type - symbol. And guess what it is the second of the
2 data types that object keys can be.

```js
const str = 'clear';
const symb = Symbol.iterator;

typeof symb; // "symbol"
typeof str; // "string"

Map.prototype[symb]; // ƒ entries() { [native code] }
Map.prototype[str]; // ƒ clear() { [native code] }
```

## Asynchronous Iteration

What is it? Consider the following code:

```js
let j = 0;

const genPromise = () => {
    return new Promise((res) => {
        setTimeout(() => {
            j += 1;
            res(j);
        }, 1000);
    });
};

const fun = async () => {
    const arr = [genPromise(), genPromise(), genPromise()];

    for (const val of arr) {
        console.log(val);
    }
};

fun();
```

So we have an array `arr` of Promises but if we try to itterate it with a `for in` loop we get 
the following output:

```
Promise {<pending>}
Promise {<pending>}
Promise {<pending>}
```

Because the `next` method returns the Return Value of `genPromise()` which is a Promise. But what if we
want instead the value that the Promise resolves to instead? One way out is to use something like this:
```js
const arr = [await genPromise(), await genPromise(), await genPromise()];
```

Obviously this approach isn't ideal. Fortunately _asynchronous iteration_ does exactly the same as we did above
except we have to write the `await` keyword only once:
```js
const fun = async () => {
    const arr = [genPromise(), genPromise(), genPromise()];

    for await (const val of arr) {
        console.log(val);
    }
};
```
