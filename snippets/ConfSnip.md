# Confusing Snippets

## Another ASI Trick

Here, first we create an object `{goodbye: [1,2,3]}` after which the interpreter evaluates the following array
( because of the missing semicolon ) as bracket-accessing a property. What property? Comma operator :) Everything is
a mess, yet we are able to find a property at `{goodbye: [1,2,3]}['goodbye']` and indeed it is an array. After that we
do `forEach` for this array and assign the Return Value of `forEach` to `name`. The rest is predictory but in this case
ASI simply takes the code in a completely different direction.

```javascript
var name = { goodbye: [1,2,3] }
['hello','goodbye'].forEach(val => {
    console.log(val + ' - ' + name);
})
// output:
// log: 1 - undefined
// log: 2 - undefined
// log: 3 - undefined
```

## Class Expression

Here is an unorthodox way of defining a class:
```javascript
const App = class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
};
```

## async Plus static

The order matters here:
```javascript
class SomeClass {
    constructor(name) {
        this.name = name;
    }

    static async method() {
        return 'Hello World';
    }
}
```

## await Plus return

Do note that there is no need to write `await` something if we return an asynchronous function call
in an `async` function:
```javascript
// this:
async function fun() {
    return await fetch(url);
}

// is the same as this:
async function fun2() {
    return fetch(url);
}
```
But the latter variant is preferred.

## Reference type in the prototype

The code below has the output as indicated:
```javascript
const User = function() {};
User.prototype.attributes = { isAdmin: false };

const admin = new User('Sam');
const guest = new User('Bob');

admin.attributes.isAdmin = true;
admin.attributes.isAdmin; // true
guest.attributes.isAdmin; // true
```
because the `attributes` property is the _reference_ type of value. If it were a usual value we would have both
a property on the `admin.attributes` with one value and another property with the same name on
`admin.prototype.attributes` but with a different value.

## Invoking a function with null context

Such an action will make the context default to the `window` object:
```javascript
function foo() { console.log(this) }
foo.call(null); // Window
```

However that isn't the case in strict mode where the function will get as its context exactly the value we pass
even if this value is null:
```javascript
"use strict";
function man() { console.log(this) }
man.call(null); // null
```

## Accidentally replacing parameters

In the following code, we can see that if we replace a value in the `arguments` object, we also replace the parameter
itself along with it:
```javascript
function foo(a) {
  console.log(a);
  arguments[0] = ':)';
  console.log(a);
}

foo(12);
// output:
// log: 12
// log: :)
```

## Fractions as indexes in arrays

We can use fractions as indexes for arrays, however everything that isn't an integer will be coerced to a string and
stored as a usual object property, that will also render it invisible if we log an array or try to iterate it:
```javascript
const arr = [1,2,3,4];
arr[1.5] = ':)';
arr; // [1, 2, 3, 4, 1.5: ":)"]
[...arr]; // [1, 2, 3, 4]
```

## Wrapper objects for Functions

Functions just like literals don't have most of their properties directly editable. Instead just like with the
literals wrapper objects are created and suspended:
```javascript
function foo() {};
foo.name; // "foo"
foo.name = 'other name';
foo.name; // "foo"
foo.length; // 0
delete foo.length; // true
foo.length; // 0
```

## Weird Lookahead

In RegExp we can actually specify the end of the line as a value that something should be followed with:
```js
// the following RegExp look for the last letters of words:
const regExp1 = /\w(?=\s|$)/g;
```

## Is primitive an instance of anything?

Primitives are actually not instances of their corresponding classes, they only are
when wrapped with corresponding wrapper objects:
```js
Number.prototype.checkIt = function() {
  console.log(this instanceof Number);
};

12..checkIt(); // true
12 instanceof Number; // false
```

## Object.keys for a string

Calling this method with string as an argument will first convert the string into its corresponding
wrapper object ( an array of chars ) and then return the indexes:
```js
Object.keys('fun'); // [ "0", "1", "2" ]
```

## What does immutable mean?

If an object is _immutable_ it means that we cannot change its properties or its value in general. To understand it
one needs to forget about variables as it is confusing in this context. And let's also refer to the assemblage of
key / value pairs inside an object as its _value_, OK? Now immutable then simply means we cannot change that value.
For instance we can modify values stored under certain keys within an object, if we look back at the comparison
above, then what we do is we simply change the _value_ of an object in this case. But we can never change the value
of any number. For instance 2 is always 2. This here is important to forget about variables. We can write 3 into
a variable if we do `let x = 2 + 1` but writing like that into a variable changes neither the value of 2 nor the value
of 3. And since we cannot say something like: `3 = ':)'` and then have JS do this: `1 + 3 === "1:)"` we say that 3
is immutable. But we can, on the other hand, change the value of any object by simply modifying its key / value pairs:
```javascript
const obj1 = {
    name: "Tom",
    method: code(),
};
obj1; // initial value is: { name: "Tom", method: code() }
obj1.name = "NewName";
obj1; // we just changed the value of an object from { name: "Tom", method: code() } to { name: "NewName", method: code() }
// no way to do so with numbers:
2 = 'blaBlaBla'; // ReferenceError: invalid assignment left-hand side
```
Since it is so obvious it may seem like it isn't important but here this term can be used to answer
why, for instance, `String` data type is actually immutable, because we cannot change the value
of a string like so `'man' = 'bob'` just like with the numbers. Here is an example showing that an array is mutable
and a string is immutable:
```js
const str = 'man';
const arr = [1,2];

// can modify the value of an array:
arr[0] = ':)';
arr; // [ ":)", 2 ]
// hence Array is mutable ( possible to mutate / change / modify / etc. )

// yet cannot modify the value of a string:
str[0] = 'c';
str; // "man"
// hence String is immutable
```

## Constructor vs Factory Functions

In JS we the name of a Constructor function to the function which we invoke with `new` and which returns an
instance of itself. A Factory function is just a usual function which we invoke without `new`. However to be
called a Factory function, a function actually needs to return an object. Consider the following code:

```js
function ConstructorFunction() {
    this.someProp = 1;
    this.someOtherProp = 2;
}
ConstructorFunction.prototype.method = function () { /* ... */ };

new ConstructorFunction(); // ConstructorFunction { }

function factoryFunction() {
    return {
        someProp: 1,
        someOtherProp: 2,
        method() { /* ... */ },
    };
}

factoryFunction(); // Object { }
```

## Class Declarations are not Hoisted

```js
const p = new Rectangle(2);

class Rectangle {
    constructor(val) {
        this.sides = val;
    }
}

// ReferenceError: Cannot access 'Rectangle' before initialization
```

## Class methods in the Wrong Context

If we take one method of the ES2015 Class and try to use it on its own ( like `method` instead
of `instance.method` ) most other functions will just dynamically replace this with `widnow`.
But if we lend a method from ES2015 Class like this, the method lent will not dynamically replace `this`
with `window`, instead `this` will be `undefined` in the global context:

```js
class Laboratory {
    constructor(name) {
        this.laboratoryName = name;
    }

    speak() {
        return this;
    }

    static someMethod() {
        return this;
    }
}

const lab = new Laboratory('c');
lab.speak(); // this -> Laboratory { }

// lend method:
const speak = lab.speak;
speak(); // undefined( because this -> undefined; usual functions would return window )

const someStaticMethd = Laboratory.someMethod;
someStaticMethd(); // undefined
```

An important detail is that `this === undefined` because these methods behave as though in `strict mode` but
they will have `this` as whatever if we pass them as method to an object:

```js
const someStaticMethd = Laboratory.someMethod;
const object = {};
object.usualFun = function () { return this };
object.staticMethod = someStaticMethd;

object.usualFun(); // this -> object
object.staticMethod(); // this -> object
object.usualFun() === object.staticMethod(); // true
```

## Extend Class From Object

Normally we can't do it:

```js
const objecto = {
    sayName() {
        return `My Name is ${this.name}`;
    }
};

class Person extends objecto {
    constructor(name) {
        this.name = name;
    }
}

// TypeError: Class extends value #<Object> is not a constructor or null
```

Because there is no `constructor`.

But here is a workaround ( gotta use good old Constructor Functions ):

```js
const objecto = {
    sayName() {
        return `My Name is ${this.name}`;
    }
};

function Person(name) {
    this.name = name;
}

Object.setPrototypeOf(Person.prototype, objecto);

const john = new Person('John');
john.sayName(); // My Name is John
```

Do note though that we _can_ inherit one Class A from Class B even if Class B has no `constructor`:

```js
class JustMethods {
    sayHi() {
        console.log(`${this.name} says Hi!`);
    }
}

class SomeOtherClass extends JustMethods {
    constructor(name) {
        super(name);
        this.name = name;
    }

    makeNoise() {
        console.log(`${this.name} makes noise`);
    }
}

const man = new SomeOtherClass('John');
man.sayHi(); // John says Hi!
man.makeNoise(); // John makes noise

// no errors :)
```

In fact with ES2015 `class`es we can do even this:

```js
class JustMethods {
    sayHi() {
        console.log(`${this.name} says Hi!`);
    }
}

class SomeOtherClass extends JustMethods {
    makeNoise() {
        console.log(`${this.name} makes noise`);
    }
}

const man = new SomeOtherClass('John');
man.sayHi(); // undefined says Hi!
man.makeNoise(); // undefined makes noise

// no errors :)
```

## Default Values in Destructuring

We can asign default values when doing destructuring ( don't forget about it :) ):

```js
// arrays:
const [a='one', b='two', c='three'] = [1, 2];
a; // 1
b; // 2
c; // three

// objects:
const o = {
    propOne: '>0',
};
const { propOne, propTwo = 'man' } = o;
propOne; // >0
propTwo; // man

// Assigning to new variables names and providing default values
const o2 = {
    code: 'JS',
};
const { code: language = 'not provided', fw: framework = 'not provided either' } = o2;
language; // JS
framework; // not provided either
```

Also note that while by using default values we can cover cases when the value we want to destructure
is `undefined`, but an error is going to be thrown if that which we destructure ( usually an object or
an array ) is `undefined` itelf like so:

```js
const { radius = 0 } = { radius: 12 };
radius; // 12

const { radiusTwo = 0 } = { radiusTwo: undefined };
radiusTwo; // 0

const weirdObj = undefined;
const { radiusThree = 0 } = weirdObj;
// TypeError: Cannot destructure property `radiusThree`
// of 'undefined' or 'null'.
```

The way you can workaround this limitation ( in functions ) is by providing default parameters:

```js
function drawES2015Chart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
}

drawES2015Chart({
    coords: {x: 18, y: 30},
    radius: 30
});

drawES2015Chart(); // doesn't fail though arguments[0] === undefined
```

## Import Confusion

The second ( `<two>` ) thing in `import <one>, <two> from ...` is actually the _whole_ module
( don't forget about it ):

```js
// someModule1.js:
export default 12;
export const notDefault1 = ':)';
export const notDefault2 = '>0';

// some other file:
import defVal, * as smth from './someModule1.js';

defVal; // 12
smth; // Module { default: ..., notDefault1: ..., notDefault2: ... }
```

Sometimes we want to import a module only for its side-effects:

```js
// someModule1.js:
(function () {
    console.log('Hi! From Module');
}());

// Laboratory.js:
import './someModule1.js';
console.log('Hi! From Laboratory');

// output:
// Hi! From Module
// Hi! From Laboratory
```

There is also a Promise-based _dynamic_ import. _Dynamic_ simply means that we import a module based on some user
action rather than as soon as the page has been loaded. An example:

```js
// someModule1.js:
export default 12;

// Laboratory.js:
const btn = document.querySelector('#our-button');
btn.addEventListener('click', async () => {
    const module1 = await import('./someModule1.js');
    console.log(module1.default); // 12
});
```

## Export Confusion

We cannot do this:

```js
export default const val = 12;
```

Instead we should do this:

```js
export default 12;
```

But we cannot do this:

```js
const val = 12;
export val;
```

So why can we do `export default 'val'` but not `export 12`? Because if you think of module as an object literal,
in the first situation we make it like so: `{ default: 'val' }` and in the second JS doesn't know which key name
to use: `{ default: 'val', ???: 12 }`. Thus:

```js
const val = 12;

// instead of this:
export val;

// do this:
export { val };

// or this:
export { val as newName };
```

And why cannot we do `export default const a = 12` you ask? Because the syntax is: `export default <expression>`
and `const` is a `statement` :)

We cannot have duplicate `export default`s:

```js
export default class SomeClass {};
export { default } from './someModule2.js';
```

The Code above will give an error!

However either this:

```js
export { default } from './someModule2.js';
```

Or this:

```js
export default class SomeClass {};
```

will give no error.

It is also no secret that we can export variable declarations:

```js
export const name = 'Tom';
```

It also means that we can export _destructuring_:

```js
const person = {
    name: 'tom',
    smth: 'smth',
};

export const { name, smth } = person;
```

Now our module will have 2 exported members: `name` and `smth`.

## getters/setters and syntax

Remember that we can never use an accessor as though it were a method. Here is what I mean:

```js
// ok:
const o1 = {
  get name() {
    return 'Tom';
  }
};

// error:
const o2 = {
    get surname: function() {
      return 'Smith';
    },
};
```

## Arrow Functions really shouldn't be used as methods

```js
const o = {
    name: 'Tom',
    bound: () => {
        return this.name;
    },
    notBound() {
        return this.name;
    },
};

o.bound(); // "" ( or undefined )
o.notBound(); // "Tom"
```

Since `bound` is an arrow function it uses the `this` defined by the nearest regular function or the one
that lies in the global scope ( out in the open if you do: `console.log(this)` it returns the window object ).
In our case since we didn't _define_ ( define cause Lexical `this` remember ) `bound` inside another function
its `this` is going to be the same `this` as the one in the global scope. Thus it is going to be the window object.

## Default Parameters Functions have separate Scope

If we assign a callback as a default parameter this callback will refer to Global Scope and not to Scope of the
function wherein it was declared:

```js
var b = ':)';

function test() {
    return (function(a = function() {
        return b;
    }) {
        var b = 1;
        return a();
    }());
}

test(); // :)
```

## ![]

Don't forget that if we apply the `!` operator to some value: `!<value>` we check whether `<value>` is _truthy_
or _falsey_ and convert it to either `true` or `false` ( to the opposite ). Don't get confused if the `<value>`
is an `object` as we don't first convert `<value>` to a primitive and then see whether it is truthy or falsey;
if `<value>` is an object we see whether it is truthy ( without calling `toPrimitive()` and yeap even empty objects
are truthy ) and then convert it to either `true` or `false`. Here is proof:

```js
!![] // true ( since [] is truthy )
![] // false ( since !<truthy> is false )
```

If we were to first convert `[]` to a primitive, the result would be the opposite:

```js
!!'' // false ( cause '' is falsy )
!'' // true
```

## HTML Comments are Valid in JS

It is true! For instance the following code runs OK:

```js
const dude = {
    name: 'Tom',
    age: 12,
};

<!-- dude is Tom -->

console.log(dude);
```

## undefined properties revealed by in

You are not going to believe it but the following code is self explanatory:

```js
const obj = {};

'o' in obj; // false

obj.o = undefined;

'o' in obj; // true
```

## Interesting feature of labels

The execution of code inside a label is interrupted by the `break` keyword. Literally, just
take a look at the following code:

```js
dude: {
    console.log('tsup');
    break dude;
    console.log('how are you doing');
}
```

## How JS comparison algorithm works under the hood

Here is the explanation in the extract of one out of the few fathomable entries in the spec:

---

Else, both px and py are Strings
    a. If *py* is a prefix of *px*, return **false**. ( A String value *p* is a prefix of String value *q* if *q*
       can be the result of concatenating *p* and some other String *r*. Note that any String is a prefix of itself,
       because *r* may be the empty String. )
    b. If *px* is a prefix of *py*, return **true**.
    c. Let *k* be the smallest non-negative integer such that the character at position *k* within *px* is different
       from the character at position *k* within *py*. ( There must be such a *k*, for neither String is a prefix
       of the other. )
    d. Let *m* be the integer that is the code unit value for the character at position *k* within *px*.
    e. Let *n* be the integer that is the code unit value for the character at position *k* within *py*.
    f. If *m < n*, return **true**. Otherwise, return **false**.

---

## The return statement in finally is favored over try

Believe it or not but the result of executing this function:

```js
(() => {
  try {
    return 2;
  } finally {
    return 3;
  }
})();
```

is going to be `3`.

Even if no error is thrown in the `try` block, since `finally` is always executed and since `finally` _is executed
right before the return statement inside `try` or `catch` block,_ for this very reason if we return something inside
`finally` then this return statement will become the final return statement of the function ( just like in the
example above ).

## RegEx is always an object

When we create a primitive like so:

```js
12; // number primitive
'ok'; // string primitive
```

then those primitives are not going to be an object ( plus the `typeof` proves that ):

```js
typeof 12; // "number" 12 is a primitive
typeof new Number(12); // "object" object wrapper for the primitive 12
```

As is known, `new Number(...)` is an object wrapper, not a primitive. In fact in devtools we can see
the primitive value of the `new Number(...)` object via the `[[PrimitiveValue]]` property.

Also primitives like `12` or `"ok"` are not considered to be an instance of their classes like `Number` or `String`,
because they are not objects, but primitive values. Only object wrappers of the primitives are instances of
their corresponding classes, here is proof:

```js
12 instanceof Number; // false
new Number(12) instanceof Number; // true
```

But what about RegEx? Clearly we get an object in this case:

```js
new RegExp('\d', 'g');
```

But what about this case?

```js
/\d/g;
```

Do we get back an object wrapper for a regex or the primitive value of a regex.

In reality, we also get back an object, and there is no primitive value that exists for regex.
The two slashes `/.../` are just a syntactic sugar for doing `new RegEx(...)`. Thus `/\d/g` is not a primitive.
In other words, if regex were a number, then doing this: `/.../g` would be the same as doing this: `new Number(...)`.
We can verify that, when we do this `/.../g` we get back an object wrapper and not a primitive value via
the following checks:

```js
typeof /d/g; // "object"
/d/g instanceof RegExp; // true
```

So regex is always an object, there is no primitive value for it.

[Part 2](./ConfSnip2.md)
