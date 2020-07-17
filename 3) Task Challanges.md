# 41) `new F === F`

Actually we wrote about it a long time ago as "A Nice Alternative to IIFE" ( JavaScript volume 1 ). Let's now
explain that!

The thing is, if we call a `Function` with `new`, then we do not have to write the parenthesis:

```js
function F() {
    this.name = 'Tom';
}
const t = new F; // same as new F();
t; // { name: 'Tom' }
```

Also, there is a popuplar interview task to write `F` in such a way that the following expression evaluates
to `true`:

```js
new F === F;
```

For this, we simply need to return `F` inside `F`:

```js
function F() {
    return F;
}
new F === F; // true
```

Also think for a moment what is `F`? It is an expression. If you take a look at MDN, you will see that
there are 2 operators, which use the `new` keyword:

- `new` (with argument list): `new … ( … )`
- `new` (without argument list, evaluated right-to-left ): `new …`

In other words:

```js
new F(); // first case
new F; // second case
```

Second case is actually very interesting: what we provide after `new` is an expression because `F` is an expression.

The fact that we can invoke any _function expression_ with `new` allows us to write IIFEs in an awesome style:

```js
// IIFE:
(function() {
    console.log('Hi!');
})();
// also IIFE:
new function() {
    console.log('Hi!');
}
```

because `function() { console.log('Hi!'); }` is the same expression as `F`.

But the first use case is more preferred :)

# 42) A deep dive into `Array.prototype.sort`

Write a sort function, which given a value, would be passed to `Array.prototype.sort` and sort the array in
such a way that this value will be last. Here is an example:

```js
const compareFunction = (val) => (a, b) => {
    // ...
};
const arr = [3, 2, 1, 4, 8, 5, 6, 7];
const result = arr.sort(compareFunction(3)); // [ 1, 2, 4, 5, 6, 7, 8, 3 ]
```

We tell `compareFunction` to move the value `3` to the end of the array and sort all the rest.
How to do that?

Well, the answer to that lies in studying how the compare function works ( from MDN ):

```
If compareFunction is supplied, all non-undefined array elements are sorted according to the return
value of the compare function ( all undefined elements are sorted to the end of the array, with no call
to compareFunction ).

If a and b are two elements being compared, then:
  If compareFunction(a, b) returns less than 0, sort a to an index lower than b (i.e. a comes first).
  If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, but sorted with
    respect to all different elements. Note: the ECMAscript standard does not guarantee this behavior,
    thus, not all browsers ( e.g. Mozilla versions dating back to at least 2003 ) respect this.
  If compareFunction(a, b) returns greater than 0, sort b to an index lower than a (i.e. b comes first).

compareFunction(a, b) must always return the same value when given a specific pair of elements a and b
as its two arguments. If inconsistent results are returned, then the sort order is undefined.
```

Thus our compare function will look like this:

```js
const compareFunction = (val) => (a, b) => {
    /**
     * -1 - a comes first
     * 1 - b comes first
     */

    if (a === val) {
        return 1;
    }

    if (b === val) {
        return -1;
    }

    return a - b;
};
```

So the solution is really simple: if `a` equals the necessary value, then make `a` come last and `b` come first,
if `b` equals the necessary value, then make `b` come last and `a` come first. This way the necessary value will
propagate all the way to the right ( or we could have as well made it go to the left in this manner ).

An important point to make is that we need to check not only that `a` equals the necessary value but also `b` as well
because once the `Array.prototype.sort` is invoked with our callback, our callback is going to be passed all kinds of
elements from the array in an unsorted order and the necessary value can be `b` just as likely as `a`.
Thus we check both.

# 43)
