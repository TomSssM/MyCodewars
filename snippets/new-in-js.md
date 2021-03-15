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

## `Rest` should be last argument

Guess what, this code throws an error:

```js
function test (
  arg1,
  arg2,
  ...rest,
) {
  console.log('arg1:', arg1);
  console.log('arg2:', arg2);
  console.log('rest:', ...rest);
}

test(
  'a',
  'b',
  'c',
  'd',
);
```

The error is going to be: `Uncaught SyntaxError: Rest parameter must be last formal parameter`. The reason it happens is
because the rest parameter `...rest` cannot be followed by a comma. Now everything works correctly:

```js
function test (
  arg1,
  arg2,
  ...rest
) {
  console.log('arg1:', arg1);
  console.log('arg2:', arg2);
  console.log('rest:', ...rest);
}

test(
  'a',
  'b',
  'c',
  'd',
);
```

## Generators confusion

### `yield*` with iterables

Beware writing `yield*` if the value you are yielding is iterable. For example, here we yield an array:

```js
function* test1() {
    yield [1, 2, 3];
}

const gen1 = test1();

console.log(gen1.next());
console.log(gen1.next());

/*
  output:
  { value: [ 1, 2, 3 ], done: false }
  { value: undefined, done: true }
*/
```

But here, since we spread an iterable with a `*` we already yield each element of an array:

```js
function* test2() {
    yield* [1, 2, 3];
}

const gen2 = test2();

console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());

/*
  output:
  { value: 1, done: false }
  { value: 2, done: false }
  { value: 3, done: false }
  { value: undefined, done: true }
*/
```

The same story goes for Generators. For example if we forget to put a `*`:

```js
function* inner() {
    yield 'Good morning';
    yield 'Good evening';
    yield 'Good night';
}

function* test1() {
    yield inner();
}

const gen1 = test1();

console.log(gen1.next());
console.log(gen1.next());
/*
  output:
  { value: Object [Generator] {}, done: false }
  { value: undefined, done: true }
*/
```

But here we already yield all values of a generator one by one:

```js
function* inner() {
    yield 'Good morning';
    yield 'Good evening';
    yield 'Good night';
}

function* test1() {
    yield* inner();
}

const gen1 = test1();

console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());
console.log(gen1.next());

/*
  output:
  { value: 'Good morning', done: false }
  { value: 'Good evening', done: false }
  { value: 'Good night', done: false }
  { value: undefined, done: true }
*/
```

Because `*` spreads another Generator, or you could also think of it as delegating work to that another Generator.

### `const val = yield` vs `const val = yield*`

We know that if inside a Generator, we write the result of calling `yield` into a variable:

```js
const value = yield 3;
```

Then the calling code that uses that Generator can pass a value that should be saved into that variable:

```js
gen.next(...);
```

We know that. But here is an interesting thing: the calling code will not be able to pass a value to save into
a variable like that if the generator writes `yield*` ( with a `*` ) after the variable name:

```js
const value = yield* 'abc';
```

Here is an example:

```js
function* test1 () {
    const value = yield 'abc';
    console.log('value from 1st generator', value);
}

function* test2 () {
    const value = yield* 'abc';
    console.log('value from 2nd generator', value);
}

const gen1 = test1();
const gen2 = test2();

console.log();
console.log('/// 1st generator:');
console.log(gen1.next());
console.log(gen1.next('outer 1'));
console.log();
console.log('/// 2nd generator:');
console.log();
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next('outer 2'));
console.log(gen2.next());
console.log();
```

Output is going to be:

```
/// 1st generator:
{ value: 'abc', done: false }
value from 1st generator outer 1
{ value: undefined, done: true }

/// 2nd generator:

{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: 'c', done: false }
value from 2nd generator undefined
{ value: undefined, done: true }
```

The reason that `yield*` doesn't allow you to pass a value into the generator is because `yield*` supposes
that you are going to be `yield*`-ing not just any iterable, but another generator (which is also an iterable).
In such a scenario `yield*` is going to produce the return value of the generator that follows it. Here is an example:

```js
function* inner () {
    yield 'Hi! I am a Generator too!'
    return 'inner return';
}

function* test () {
    yield 'Outer Generator start';
    const value = yield* inner();
    console.log('value from 2nd generator', value);
    yield 'Outer Generator end';
}

const gen = test();

console.log(gen.next());
console.log(gen.next());
console.log(gen.next('lol'));
console.log(gen.next());
```

The output is going to be:

```
{ value: 'Outer Generator start', done: false }
{ value: 'Hi! I am a Generator too!', done: false }
value from 2nd generator inner return
{ value: 'Outer Generator end', done: false }
{ value: undefined, done: true }
```

### `return yield`

Sometimes you may see such an expression as in line `(*)` in the code below:

```js
function* inner () {
    yield 'a';
    yield 'b';
    yield 'c';
    return yield 'd'; // (*)
}

function* test () {
    yield 1;
    const value = yield* inner();
    console.log('value from generator:');
    console.log(value);
    yield 2;
    yield 3;
}

// log
((gen) => {
    let value;
    do {
        value = gen.next();
        console.log(value);
    } while (!value.done);
})(test());
```

But aparent from the log, `return yield ...` makes the generator return `undefined` so why even bother
writing return then, might as well have written:

```js
yield 'd';
return
```

or even:

```js
yield 'd'
```

Is there any difference then between writing `yield ...; return;` and `return yield ...`?

The answer is: yes, there is difference. You see in our example the expression with `yield` evaluates
to `undefined` and thus the Generator `inner` returns `undefined`. But in reality `yield` evaluates to
whatever you pass to `.next(...)` method of the Generator, remember? This way, if we pass some value
to the right `next(...)` call, then the `yield` in line `(*)` will evaluate to that value and the Generator
`inner` will therefore return it. Here is a modified example:

```js
function* inner () {
    yield 'a';
    yield 'b';
    yield 'c';
    return yield 'd';
}

function* test () {
    yield 1;
    const value = yield* inner();
    console.log('value from generator:');
    console.log(value);
    yield 2;
    yield 3;
}

const gen = test();

console.log(gen.next()); // 1
console.log(gen.next()); // 'a'
console.log(gen.next()); // 'b'
console.log(gen.next()); // 'c'
console.log(gen.next()); // 'd'
console.log(gen.next('outer')); // 2
console.log(gen.next()); // 3
```

The output is going to be:

```
{ value: 1, done: false }
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: 'c', done: false }
{ value: 'd', done: false }
value from generator:
outer
{ value: 2, done: false }
{ value: 3, done: false }
```

Thus writing `return yield` allows the calling code to influence the return value of a Generator.

### When to pass a value into `next()`

Take a look at the following code and tell into which `next()` call to pass a value so that the Generator
called `test` will log it in line `(*)`?

```js
function* test () {
    yield 1;
    yield 2;
    const value = yield 3; // (**)
    console.log('value from generator:');
    console.log(value); // (*)
    yield 4;
}

const gen = test();

console.log(gen.next()); // 1
console.log(gen.next()); // 2
console.log(gen.next()); // 3
console.log(gen.next()); // 4
console.log(gen.next()); // done: true
```

If you are having difficulty figuring it out, then simply remember one golden rule: pass the value that you want
`yield` to evaluate into after you received the value which that `yield` gave you.

In our case it means passing whatever we want `yield 3` to evaluae into in line `(**)` _after_ a call to `next()`
returned `3`. Thus the right answer is:

```js
/* ...same as above */

console.log(gen.next()); // 1
console.log(gen.next()); // 2
console.log(gen.next()); // 3
console.log(gen.next('here')); // 4
console.log(gen.next()); // done: true
```

Output:

```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
value from generator:
ok
{ value: 4, done: false }
{ value: undefined, done: true }
```

This is why Generators are so convenient for writing chat bots: a bot can `yield` a guestion, then we can show
that question to the user and write the user's answer into `.next()` and vice versa. Usually infinite generators
are used for that:

```js
function* bot () {
    while (true) {
        let answer;
        let question = yield 'Good day! Ask me something!';
        switch (question) {
            case '/add':
                answer = yield* handleAddition();
                break;
            case '/concat':
                answer = yield* handleConcat();
                break;
            default:
                answer = 'I don\'t know';
        }
        yield answer;
    }
}

function* handleAddition () {
    const a = yield 'give me 1st number';
    const b = yield 'give me 2nd number';
    return a + b;
}

function* handleConcat () {
    const a = yield '1st value please';
    const b = yield '2nd value please';
    return String(a) + String(b);
}

const gen = bot();
let message;

({ value: message } = gen.next());
console.log(message); // // Good day! Ask me something!

({ value: message } = gen.next('/add'));
console.log(message); // give me 1st number

({ value: message } = gen.next(1));
console.log(message); // give me 2nd number

({ value: message } = gen.next(2));
console.log(message); // 3

({ value: message } = gen.next());
console.log(message); // Good day! Ask me something

({ value: message } = gen.next('/concat'));
console.log(message); // 1st value please

({ value: message } = gen.next('I love '));
console.log(message); // 2nd value please

({ value: message } = gen.next('JS'));
console.log(message); // I love JS
```

## `constructor` vs class fields

What if we have both class fields and `constructor` syntax, which one is executed first: `constructor` or class fields?

The answer is: 1st class fields are assigned, then the `constructor` is called. Here is proof:

```js
class Laboratory {
    name = 'field';
    constructor() {
        console.log('name from constructor:');
        console.log(this.name);
        this.name = 'constuctor';
    }
}

const lab = new Laboratory();

console.log('name:');
console.log(lab.name);
```

Output:

```
name from constructor:
field
name:
constuctor
```

__Note:__ the order in which we write class fields and `constructor` keyword doesn't matter here.
