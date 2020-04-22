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

The output is:

```
1
2
3
```

## Spread operators and params

If you have an array and you want to pass its 1st element as 1st argument, its 2nd element as 2nd argument and so on,
then you can literally spread it into a function call:

```js
const params = [1, 'a', true, 'wow', 2, NaN, null];

logParams(params);
logParams(...params);

function logParams(a, b, c) {
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);
}
```

The log would be:

```
first call:
a: [1, 'a', true, 'wow', 2, NaN, null]
b: undefined
c: undefined

second call:
a: 1, 'wow', 2, NaN, null]
b: 'a'
c: true
..and so on
```

If `logParams` had 4th param, then in the 2nd call, it would be `'wow'`, 5th parameter would be `2`, 6th and 7th
would be `NaN` and `null` correspondingly.
