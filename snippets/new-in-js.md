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

## First confusion with new fields syntax

We have to use an arrow function as a field instead of a usual method only if it is an event
listener( I apologize for JSX in this repo ):

```jsx harmony
class App extends Component {
  validateField = 'validation succeeded';

  eventListener = () => {
    this.helperFunction('Hello World'); // (*)
  };

  helperFunction(message) {
    console.log(message, this.validateField);
    console.log(this);
  }

  render() {
    return (
        <h1
            style={{backgroundColor: 'yellow'}}
            onClick={this.eventListener}
        >
          Hello Redux
        </h1>
    );
  }
}
```

You see since the context was already bound when we called `helperFunction` in line `(*)` we don't need to
write `helperFunction` as arrow function like that:

```jsx harmony
class App extends Component {
  // ...

  helperFunction = (message) => {
    console.log(message, this.validateField);
    console.log(this);
  };

  // ...
}
```

Thus if we write as arrow-functions-fields only those methods that serve as event listeners
( like `this.eventListener` in `App` ) we should be alright not redefining context for the rest
of the methods ( like `this.helperFunction` in `App` ).

## Class Fields

Normally, you would create instance properties inside the `constructor` like this:

```js
class Laboratory {
    constructor() {
        this.name = 'Tom';
        this.surname = 'Surnames';
    }
}

const l = new Laboratory();

l.name; // 'Tom'
l.surname; // 'Surnames'
```

But _class fields_ syntax allows you to do the same outside the `constructor`:

```js
class Laboratory {
    name = 'Tom'
    surname = 'Surnames'

    constructor() {
    }
}

const l = new Laboratory();

l.name; // 'Tom'
l.surname; // 'Surnames'
```

The same is true for static fields:

```js
class Laboratory {
    static name = 'Tom'
    static surname = 'Surnames'

    constructor() {
        this.name = 'Wat';
        this.surname = 'Dude';
    }
}

const l = new Laboratory();

Laboratory.name; // 'Tom'
Laboratory.surname; // 'Surnames'
l.name; // 'Wat'
l.surname; // 'Dude'
```

**Note:** this syntax always creates an _own_ property on the instance ( lines `(*)` and `(**)` ), NOT on the prototype,
while the syntax for definining methods ( line `(***)` ) always creates a method on the prototype:

```js
class Laboratory {
    name = 'Tom' // (*)
    surname = 'Surnames' // (**)
    methodName() { // (***)
        return `${this.name} is ok`;
    }
}

const l = new Laboratory();

l.hasOwnProperty('name'); // true
l.hasOwnProperty('methodName'); // false
```

**Also note:** the `this` keyword is going to refer to the class itself for _static_ class fields:

```js
class Laboratory {
    static StaticName = 'Tom'
    static StaticFullName = this.StaticName + ' is OK' // this === Laboratory
}

Laboratory.StaticName; // 'Tom'
Laboratory.StaticFullName; // 'Tom is OK'
```

and the `this` keyword is going to refer to the instance itself for non-static class fields:

```js
class Laboratory {
    name = 'Tom'
    surname = this.name + ' ' + 'Surnames' // this === new Laboratory()
}
```

## 3rd argument to `Reflect`

You might get an erroneous feeling that the 3rd argument to `Reflect` is a context, which should be used to look up
any property but in reality it is not:

```js
const o1 = { name: 'Tom' };
const o2 = { name: 'Dude' };
const out = Reflect.get(o1, 'name', o2); // Tom
```

In the example above `Reflect` still looked up the property `name` on `o1`, not on `o2`.
So when does `Reflect` use the 3rd argument as a context then? The answer is: when the property is a __getter__.
Here is an example:

```js
const o1 = {
    name: 'Tom',
    get surname() {
        return this.name; // (*)
    },
};
const o2 = { name: 'Dude' };

const out = Reflect.get(o1, 'surname', o2); // Dude
```

Now `Reflect` used `o2` as `this` but only in line `(*)`. And that is what the 3rd argument is for. `Reflect` passes it
as `this` whenever a __getter__ is invoked, not to a usual property.
