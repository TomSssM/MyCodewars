# Confusing Snippets 2

## Static Properties in inheritance

You see, when we _extend_ one class from another, the child class is going to have all the **static** properties
and methods of its parent class directly accessible on it. Here is an example:

```javascript
class Laboratory {
    static explode() {
        return 'laboratory exploded!';
    }

    static address() {
        return '123';
    }

    method() {
        return 'lab';
    }
}

class Scientist extends Laboratory {
    static address() {
        return 'human';
    }

    method() {
        return 'scientist';
    }
}

const l = new Laboratory();
const s = new Scientist();

l.method(); // "lab"
s.method(); // "scientist"

Scientist.explode(); // "laboratory exploded!"
Scientist.address(); // "human"
Laboratory.explode(); // "laboratory exploded!"
Laboratory.address(); // "123"
```

As you can see, we can easily access the `explode` method _directly_ on the `Scientist` class _even thou_
we never defined it on the `Scientist` class ( only on the `Laboratory` class, then when we extended the
`Scientist` class from the `Laboratory` class, the `Scientist` class simply inherited the `explode` property ).

It may not be so obvious at first because if we were to extend non-ES2015 functions from each other using our
good old algorithm:

```javascript
function extend(Child, Parent) {
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
    Child.prototype.constructor = Child;
}
```

We would not get such a behavior. In other words, `Scientist.explode` would be `undefined`, obviously.
We only get this behavior that static methods of the parent class are also available as static methods
on the child class if we use ES2015 classes. For this reason, you may be thinking that it is simply some
ES2015 classes magic. But it is actually NOT!

You see what ES2015 classes do is they not only set the `__proto__` property of the child's `prototype`
to equal the parent's `prototype` but they also set the `__proto__` property of the child class itself
to equal to the parent class. Here is proof:

```javascript
Scientist.__proto__ === Laboratory; // true
Scientist.prototype.__proto__ === Laboratory.prototype; // true
```

Thus we can see that the `explode` property really doesn't exist on the `Scientist` object **but** then JS
engine goes to whatever the `__proto__` property points to ( on the `Scientist` object it
points to the `Laboratory` object ) and then it finds the `explode` property on  the `Laboratory` object
and calls it!

The situation with regular JavaScript functions is that they don't set `Scientist.__proto__` to `Laboratory`.

Thus the role of the `__proto__` property ( or in other words, the internal `[[Prototype]]` property )
can be described as follows: when we try to get some property `a` of an object, if there is no property `a`
that exists on it, then JavaScript engine will also search for that property on whatever `__proto__` points to,
or in other words, on the `__proto__` object ( if there is any ).

We can also achieve the same behavior for the usual JavaScript functions by properly rewriting
the `extend()` function used for inheritance of non-ES2015 functions:

```javascript
function extend(Child, Parent) {
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
    Object.setPrototypeOf(Child, Parent);
    Child.prototype.constructor = Child;
}
```

**Note:** for static methods, `this` is going to be the class / function itself, just like for a usual
JavaScript object, if we create a method on it, then `this` for this method is going to be the object itself:

```javascript
function extend(Child, Parent) {
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
    Object.setPrototypeOf(Child, Parent);
    Child.prototype.constructor = Child;
    Child.prototype.super = Parent;
}

function Laboratory(name) {
    this.name = name;
}

Laboratory.statYall = function () {
    return this;
};

function Scientist(name) {
    this.super(name);
}

extend(Scientist, Laboratory);

Scientist.statYall() === Scientist; // true
```

**Note:** `Scientist.statYall()` is going to be equal to `Scientist` **not** `Laboratory`!
That happens because `statYall()` was called on `Scientist` and `statYall` is a regular, non-arrow function.

The concept explained above can help us understand many confusing things about JavaScript. For example,
contemplate the following code:

```javascript
TypeError.__proto__ === Function.prototype; // false
TypeError.__proto__.constructor === Function; // true
TypeError.__proto__ === Error; // true
```

If `TypeError.__proto__` is not equal to `Function.prototype` then how come `TypeError.__proto__.constructor`
is equal to `Function`? The answer is the _third_ line.

You see, `Error` is a usual constructor function. It's `__proto__` is `Function.prototype` and its `prototype`
has all the properties of the future error instance ( like `name` set to default value , `message` and so on ).

As you can see, creators of the `TypeError` constructor function used the same technique
of reassigning `TypeError.__proto__` to achieve the effect with static methods. When we did
`TypeError.__proto__.constructor === Function;`, the answer was `true` not because `TypeError.__proto__`
was equal to `Function.prototype` but because it was equal to `Error`. You see, `constructor` property
doesn't exist on `Error`, thus JS engine goes to its `__proto__` property, the `__proto__` property
of the `Error` function points to `Function.prototype` and that is where JS engine found the `constructor`
property and it was equal to `Function`.

## `1 + + "1"`

The result of evaluating `1 + + "1"` is going to be `2`.
The reason that it happens is because there is a unary operator `+` which converts strings to numbers
as in `+"2" === 2`. In the example above the unary `+` operator has higher precedence than addition.
Thus it first converts `"1"` to a number literal `1` and after that addition happens evaluating the
expression to `2`.

## `Object.prototype.toString.call`

Don't get confused when you see code like this:

```js
const someValue = ...;

...

Object.prototype.toString.call(someValue);
```

So why do we need to call `Object.prototype.toString` on `someValue`? The reason for that is we need to be
100% sure that the `toString` method we are calling is the _native_ one.

If we were to check that `someValue` is an instance of `Date` like so:

```js
const isDate = someValue.toString() === '[object Date]';
```

For example, `someValue` may be something like this:

```js
const someValue = {
    toString() {
        return '[object Date]';
    }
};
```

A writing like above gives `someValue` an opportunity to masquerade like the native date object while it is not.
The reason it would be successful is because when we do `someValue.toString()` the _own_ `toString` method will
be called, which has been specifically hacked to allow `someValue` mask itself as a date object.

`Object.prototype.toString.call(someValue)` calls the _native_ `toString` method of the `Object` class with
`someValue` as its _context_. When we do `someValue.toString()` the `toString` method is called with
`someValue` as its context as well, however in this case we cannot tell _which_ `toString` method is called.
Is it a native one or the one that has been hacked? When writing `Object.prototype.toString.call` we don't have
to think about those things as we are explicitly calling the native `Object.prototype.toString` with `someValue`
as its context.

The only thing left to be worried about when doing check like above is that `Object.prototype.toString`
itself should not be hacked.

## Object Property Descriptors are inherited

If you set a property on the `<ClassName>.prototype` using a property descriptor like this one:

```js
function MyClass() {
    this.name = 'wow';
}

Object.defineProperty(MyClass.prototype, 'what', {
    value: '12',
    writable: false,
});
```

and then try to do something with that property on the _instance_ of the class, then the rules specified by the
property descriptor do apply:

```js
'use strict';
const m = new MyClass();
m.what = 'wow'; // TypeError: Cannot assign to read only property 'what' of object '#<MyClass>'
```

In the example above an error is thrown because, even though there have been no property descriptors applied to
`m` to forbid setting the `what` property, there _have_ been a property descriptor applied to an object that lives
in the prototype chain of `m` ( and `MyClass.prototype` happens to be part of `m`'s prototype chain ):

```js
Object.defineProperty(MyClass.prototype, 'what', { // (*)
    value: '12',
    writable: false,
});
```

and thus all the rules specified by the property descriptor in line `(*)` also affect properties named `what`
that we try to modify on the `m` object.

Here is another example, the code below will execute without errors:

```js
'use strict';
const f = {};
f.name = 'lol';
```

Now let's do this:

```js
'use strict';
const o = {};
const f = {};

Object.defineProperty(o, 'name', { // (*)
    writable: false,
    value: 'Tom',
});

Object.setPrototypeOf(f, o); // f.__proto__ === o // (**)

f.name = 'lol'; // TypeError: Cannot assign to read only property 'name' of object '#<Object>'
```

So we create 2 objects `o` and `f`. Then in line `(*)` we forbid writing a property called `name` on the object `o`,
we also initialize this property to the value `'Tom'`. Then we add the object `o` to the prototype chain of the object
`f` in line `(**)`. Do note that now it is forbidden ( because of the property descriptor in line `(*)` )
to write to the property `name` _not only_ on the object `o` but also on the object `f` because the object `o` with
its property descriptor is in the object's `f` prototype chain.

**Note:** if you are confused about the _prototype chain_, here is an explanation: every object has the `__proto__`
property which stores a reference to some other object or `null`, now the prototype chain of that object is going to
be all the objects we get by following the `__proto__` property. So if there is an object `a`, then we are going to look
at and remember whatever is stored at `a.__proto__`, if it is another object called `b`, then we are going to look
at and remember whatever is stored at `b.__proto__`, if it is an object again, then look at _that_ object's `__proto__`
and so on until we hit `__proto__` with a value of `null`. Now all the objects that we are going to encounter like that
are going to comprise the prototype chain for object `a`.

## `const` / `let` vs global scope vs `var`

It is no secret that every variable created with `var` gets saved into `window`:

```js
var dude = 'ok';
window.dude; // 'ok'
```

`const` / `let` on the other hand don't get saved into `window` but into their own scope:

```js
const dd = 'ok';
window.dd; // undefined
dd; // 'ok'
```

What I mean to point out here is that just because `const` / `let` seem to reside in a different scope, they will
still conflict with variables created by `var` ( and vice versa ). Here is an example:

```js
const foo = 'ok';
var foo = 'okay'; // SyntaxError: redeclaration of const foo

let bar = 11;
var bar = 12; // SyntaxError: redeclaration of let bar

var zz = 'sleeping';
let zz = 'coffee after bed'; // SyntaxError: redeclaration of var zz
```

## `bind`-ing functions several times in a row

If you bind function several times, you can keep on binding arguments but it will the first _bound_ context that
was provided to the 1st call:

```js
function fun (a, b, c) {
    console.log('this:', this);
    console.log('a:', a);
    console.log('b:', b);
    console.log('c:', c);
}

const bound1 = fun.bind({ name: 'John' }, 1);
const bound2 = bound1.bind({ age: 123 }, 2);
bound2(3);
```

Output is going to be:

```
this: { name: 'John' }
a: 1
b: 2
c: 3
```

**Note:** the behavior will be the same for an arrow function except you cannot bind the context even during
the 1st call.

## Function declaration quirks

### Function declarations are function scoped

Just like variables declared with `var`:

```js
function foo() {
    bar(); // ok: logs 'bar'

    function bar() {
        console.log('bar');
    }
}

foo();
bar(); // error: bar is not defined
```


### Function declarations don't hoist sometimes

Function declarations don't hoist if the compiler doesn't parse the code with their declaration:

```js
function test() {
    innerFunc(); // error: innerFunc is not a function
    if (false) {
        function innerFunc() {
            console.log('inner');
        }
    }
}
test();
```

in the example above the compiler never enters the `if` block because of a constant condition. As a result it
never even creates a function `innerFunc`.

What is curious is that the variable `innerFunc` gets _initialized_ to `undefined` just because there exists
that function declaration ( even if the compiler never enters the `if` block ):

```js
function test() {
    console.log(innerFunc); // undefined
    if (false) {
        function innerFunc() {
            console.log('inner');
        }
    }
}
test();
```

Compare it to the situation where there is no function declaration, we don't get `undefined`, instead JavaScript
throws an error that the variable doesn't exist:

```js
function test() {
    console.log(innerFunc); // error: innerFunc is not defined
}
test();
```

### `f` and `ff`

The reason this code:

```js
const arr = [];
for (var i = 0; i < 10; i++) {
    var f = function ff () { // (*)
        return ff.i;
    };
    f.i = i; // (**)
    arr.push(f);
}
console.log(arr[3]()); // 3 ( not 10 )
```

works is not so obvious. You see, because `var f` hoists, then everyhing would fail if we were to write:

```js
var f = function ff () {
  return f.i;
};
```

because at the end of the execution of the `for` block, the variable `f` would hold the value of the last
function that it has been assigned, this last function would have an `i` property equal to `9`, as a result
all functions in the array `arr` would be returning the value `9`.

But our 1st example works, and here is why: in line `(*)` the variable named `ff` refers to a named function
expression whose body looks like: `return ff.i;`. But the variable `ff` is only going to be available inside
the scope of its own self, in other words the name of the function expression `ff` is only going to be available
in the context of its own self. You could think as though something like this happens under the hood:

```js
function () { // (*)
  var ff = __self; // let's imagine __self is a reference to the function we are creaing in line (*)
  // ...more code
}
```

Therefore, the only 2 ways we can refer to `ff` are: 1) from inside the scope of `ff` 2) from the variable `f`
__until__ we write some other value into `f`.

The trick works because in line `(**)` ( see the 1st example ) `f` and `ff` are still referring to the same function
created in line `(*)`. Therefore we first create a property named `i` on this function via the `f` variable and then
from inside this function we return the value of this property `i` via the `ff` variable.

Pretty clever trick.

__Note:__ everything would still work even if we write something like this:

```js
const arr = [];
for (var i = 0; i < 10; i++) {
    var ff = function ff () {
        return ff.i;
    };
    ff.i = i;
    arr.push(ff);
}
```

The reason for that is: now funcion `ff` has 2 variables called `ff` available to it: the first one in its own
scope and it refers to its own self and the 2nd one in the global scope and it is constantly changing its value
as we go through the `for` loop, function `ff` sees the variable `ff` in its own scope first and uses it thus
producing the right result.

## `export default { ... }` vs `export { ... }`

Is there a difference between this code:

```js
const val1 = 'one';

const val2 = 'two';

export {
  val1,
  val2,
}
```

and this code:

```js
const val1 = 'one';

const val2 = 'two';

export default {
  val1,
  val2,
}
```

The confusing thing is that there would be no difference if we were using CommonJS as both of
the annotations from above would compile to:

```js
module.exports = {
  val1: 'one',
  val2: 'two',
};
```

Though the latter one would probably be something like `module.exports.default = ...` but doesn't matter, semantically they
are equivalent.

But there is a big difference for ES2015 modules. When we write `export { key: 'value' }` or `export const key = 'value'`
we tell that the module has an exported member called `key` with a value equal `'value'`. Later we can import these exported
members like so:

```js
import { key } from './module';

console.log(key); // 'value'
```

And the module in this case looks like this:

```
[Module] { key: 'value' }
```

But what about the `export default { key: 'value' }` syntax? Here we export an _object literal_ with a property
named `key` that has a value equal to `'value'`. In this case we __cannot__ import a module exported this way
like this:

```js
import { key } from './module'; // error
```

The compiler will throw an error ( `SyntaxError: The requested module does not provide an export named 'key'` ).
All because `import { ... } from ...` is not really _destucturing_ like it would be in CommonJS
( `const { ... } = require(...)` ). `import { ... }` is a special syntax that pulls exported members out of modules
( we can even use special key words inside `import { ... }`, think: `import { key as anotherKey } from './module'` ).

Also, if we write `export default`, then our module looks like this:

```
[Module] { default: { key: 'value' } }
```

We can make sure of that by running the following code (`import *` gets you the entire _module object_ and not just
the members thereof remember?):

```js
import * as module from './module';

console.log('module:');
console.log(module);
```

Therefore, if we do `export default { .. }`, then the only way we can use such a module is like this ( with
a default import ):

```js
import module from './module';

/**
 * now it is destructuring because thanks to default export,
 * we get an object literal saved into the 'module' variable
 */
const { key: anotherKey } = module; // cannot use 'as' keyword in destructuring

console.log(anotherKey);
```

Except it is really inconvenient to do that, thus for multiple values it is better to use `export { ... }`
or `export const`.
