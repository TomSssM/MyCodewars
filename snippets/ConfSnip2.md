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
