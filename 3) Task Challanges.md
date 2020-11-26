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

# 43) Find a duplicate number in an unsorted array

**Task:**

1. In an array of `n` integers one number will be duplicated
2. The duplicate number can be repeated more than once, but there is going to be only one duplicate number
  ( for example, if the duplicate number is 2, then an array may have several 2's in it, but _not_ several 3's
  because the duplicate number is 2, not 3 )
3. The algorithm should have the following complexity ( `n` is the amount of integers in an array ):
    - **Time:** O(n)
    - **Space:** O(1)
4. Also, the constraint of the task is that the source array cannot be modified ( e.g. sorted )

**Solution:**

Because of the constraints of the task we cannot use a hash map ( or a set ) to find a duplicate number like we
normally would because the algorithm is supposed to have space complexity of O(1). Neither can we sort the array
and check that two adjacent numbers not be the same because the task requires that the array should not be modified
( and the time complexity should be O(n) ).

In order to find the duplicate number we are going to use Floyd's cycle detection algorithm ( with 2 pointers where
one traverses a linked list at twice the speed of the other, also called tortoise and hare ).

Now Floyd's algorithm works with linked lists where each node in a linked list has a reference to its neighbor. But how
do we apply it here? If we think of values within an array as nodes in a linked list, then we can use the value of each
integer in the array as a reference to the next node we are to visit. In our case, we are going to use the value of an
integer as the index of the next node to visit.

Imagine this array:

```
[6, 3, 4, 2, 1, 5, 7, 2]
```

The 1st integer is 6, how do we find out which next value in the array we are to look at? Simple, since the value
of the node we are currently visiting is 6, then the next node we are going to visit is going to be the one at index 6.
As a result, the next node we will visit is going to be 7 ( as 7 is located at index 6 of the array ). The value we will
look at after 7 is going to be 2 because 2 is located at index 7 of the array. And so on.

Since there are always one or more duplicate integers inside an array, the length of the array will always be either more
or equal to the value of the biggest integer in the array. What this means is that we will never go out of bounds of the
array if we traverse it using the algorithm described above ( using the values of the array like pointers in a linked list ).

Now if we take the array from above ( let's redraw it here along with indexes ):

```
[
  6, <- 0
  3, <- 1
  4, <- 2
  2, <- 3
  1, <- 4
  5, <- 5
  7, <- 6
  2, <- 7
]
```

We can now redraw it like a linked list:

```
6 -> 7 -> 2 -> 4 -> 1 -> 3 ┐
          ↑                │
          │                │
          └────────────────┘
```

As a result, in order to find the repeating number we would need to detect the cycle in this linked list representation
of the array.

In Floyd's algorithm, we use two pointers ( tortoise and hare ) and the cycle is detected as soon as the value of one
pointer equals the value of the other pointer ( tortoise === hare ).

Let's apply this algorithm to our linked list representation of the array from above:
- _1st iteration_: tortoise is 6, hare is 6
- _2nd iteration_: tortoise is 7, hare is 2
- _3rd iteration_: tortoise is 2, hare is 1
- _4th iteration_: tortoise is 4, hare is 2
- _5th iteration_: tortoise is 1, hare is 1
- **tortoise === hare**

As you can see, tortoise meets hare at node with the value of 1. Unfortunately for our task this information is
not enough. Floyd's algorithm is good at detecting a cycle, but it doesn't tell us which node in the linked list
causes that cycle. Look at our example, tortoise met hare at 1, but the node with the value of 1 didn't cause that
cycle, 2 did. But how do we find that 2?

That is where the last step of the algorithm comes in, here it is. Once tortoise meets hare at some node we need to
do the following:
- leave tortoise at the node where it currently is
- move hare to the beginning of the linked list ( in our case to 6 )
- now keep on moving _both_ tortoise and hare at the speed of one node at a time until they meet again
- this time the node where they meet is going to be the node which causes the loop ( in our case it is 2 )

Let's apply the last step of the algorithm for our example:
- leave tortoise where it is, at node 1 ( that is where it met hare in the previous step )
- bring hare to the beginning of the linked list, thus to 6
- start moving both tortoise and hare one node at a time
- _1st iteration_: tortoise is 1, hare is 6
- _2nd iteration_: tortoise is 3, hare is 7
- _3rd iteration_: tortoise is 2, hare is 2
- tortoise === hare
- **now we have our answer: integer 2**

If you are wondering why or how the last step works ( with bringing hare to the beginning and moving both tortoise and
hare one node at a time ), there is a mathematical explanation for that but it is somewhat outside the scope of this task =)

Now we can finally put everything said above into code:

```js
const repeatingArr1 = [2, 3, 4, 2, 1, 5, 7, 6];
const repeatingArr2 = [6, 3, 4, 2, 1, 5, 7, 2];
const repeatingArr3 = [6, 3, 2, 2, 1, 5, 7, 4];
const repeatingArr4 = [6, 3, 2, 1, 2, 5, 2, 4];
const findRepeating = (arr) => {
    let [tortoise] = arr;
    let [hare] = arr;
    let i = 0;

    while (i < arr.length) {
        tortoise = arr[tortoise];
        hare = arr[arr[hare]];
        if (tortoise === hare) {
            ([hare] = arr);
            while (tortoise !== hare) {
                tortoise = arr[tortoise];
                hare = arr[hare];
            }
            return tortoise;
        }
        i += 1;
    }
};

console.log('repeating 1:', findRepeating(repeatingArr1));
console.log('repeating 2:', findRepeating(repeatingArr2));
console.log('repeating 3:', findRepeating(repeatingArr3));
console.log('repeating 4:', findRepeating(repeatingArr4));
```

The output should be:

```
repeating 1: 2
repeating 2: 2
repeating 3: 2
repeating 4: 2
```
