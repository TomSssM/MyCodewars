# Partial Application
[*original source*](http://benalman.com/news/2012/09/partial-application-in-javascript/)
## Partial Application
Partial application can be described as taking a function that accepts some number of arguments, binding values to one or more of those arguments, and returning a new function that only accepts the remaining, un-bound arguments.

What this means is that, given any arbitrary function, a new function can be generated that has one or more arguments "bound," or partially applied. And if you've been paying attention, you've realized by now that the previous examples have demonstrated partial application in a practical, albeit somewhat limited way.

If you've ever used the ECMAScript 5 Function#bind method, which allows a function to have both its this value and some of its arguments bound, you're already familiar with partial application. Although with Function#bind, it might help to think of the this value as an implicit 0th argument--see the Extra Credit section at the end for a few Function#bind examples.
Partial Application: From the Left
This example is significantly more flexible than the previous examples, because it uses the arguments object to dynamically determine the number of arguments to be bound.

Note that the arguments object is an array-like object created when a function is invoked, accessible only inside that function, containing all of the arguments passed into that function. While arguments is array-like, it is not an array. This means that while it has a .length property and numerically-indexed values, it doesn't have any of the Array methods, like .concat or .slice. In order to convert the arguments object into an array, the native Array#slice method is invoked on arguments using call invocation.

The following partial function returns a function ƒ that, when invoked, invokes the fn function with the originally-specified (bound) arguments, followed by all arguments passed to ƒ.

```javascript
  function partial(fn /*, args...*/) {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;
    // Convert arguments object to an array, removing the first argument.
    var args = slice.call(arguments, 1);

    return function() {
      // Invoke the originally-specified function, passing in all originally-
      // specified arguments, followed by any just-specified arguments.
      return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }
```
And here's an example of partial application, using the partial function:
```javascript
  // Add all arguments passed in by iterating over the `arguments` object.
  function addAllTheThings() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }

  addAllTheThings(1, 2);            // 3
  addAllTheThings(1, 2, 3);         // 6
  addAllTheThings(1, 4, 9, 16, 25); // 55

  // More specific functions.
  var addOne = partial(addAllTheThings, 1);
  addOne()                          // 1
  addOne(2);                        // 3
  addOne(2, 3);                     // 6
  addOne(4, 9, 16, 25);             // 55

  var addTen = partial(addAllTheThings, 1, 2, 3, 4);
  addTen();                         // 10
  addTen(2);                        // 12
  addTen(2, 3);                     // 15
  addTen(4, 9, 16, 25);             // 64
```
This works because the originally passed arguments, minus the first fn argument (which is sliced off), are stored as the args array, which is created when the partial function is invoked. Each time the returned function is invoked, it invokes the originally-passed fn function using apply invocation. And because .apply() accepts an array of arguments-to-be-passed and concat joins two arrays, it is possible to invoke the fn function with the just-passed arguments appended to the originally-specified (bound) arguments.
## "Full" Application?
It's worth noting that partial application is typically most useful when only partially applying a function's arguments. If you choose to satisfy all the function arguments by specifying them all up-front, you'll just end up with a function that behaves as if all of its arguments had been hard-coded.
```javascript
  function add(a, b) {
    return a + b;
  }

  var alwaysNine = partial(add, 4, 5);
  alwaysNine();     // 9
  alwaysNine(1);    // 9 - this is just like calling add(4, 5, 1)
  alwaysNine(9001); // 9 - this is just like calling add(4, 5, 9001)
```
In JavaScript, if you specify more arguments than what a function expects, they will be ignored (unless they are accessed via the arguments object). Because of this, no matter how many arguments are passed into the fully bound alwaysNine function, the result will never change.
## Partial Application: From the Right
Until this point, all examples of partial application have only shown one specific variation of partial application, in which the leftmost function arguments are bound. And while this is the most commonly seen variation of partial application, it's not the only one.

Using very similar code as with the partial function, it's easy to make a partialRight function that binds the rightmost function arguments. In fact, all that needs to be changed is the order in which the originally-specified arguments are concatenated with the just-specified arguments.

The following partialRight function returns a function ƒ that, when invoked, invokes the fn function with the arguments passed to ƒ, followed by all the originally-specified (bound) arguments.
```javascript
  function partialRight(fn /*, args...*/) {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;
    // Convert arguments object to an array, removing the first argument.
    var args = slice.call(arguments, 1);

    return function() {
      // Invoke the originally-specified function, passing in all just-
      // specified arguments, followed by any originally-specified arguments.
      return fn.apply(this, slice.call(arguments, 0).concat(args));
    };
  }
```
And here's a somewhat silly example of partial application, highlighting the differences between the partial and partialRight functions:
```javascript
  function wedgie(a, b) {
    return a + ' gives ' + b + ' a wedgie.';
  }

  var joeGivesWedgie = partial(wedgie, 'Joe');
  joeGivesWedgie('Ron');    // "Joe gives Ron a wedgie."
  joeGivesWedgie('Bob');    // "Joe gives Bob a wedgie."

  var joeReceivesWedgie = partialRight(wedgie, 'Joe');
  joeReceivesWedgie('Ron'); // "Ron gives Joe a wedgie."
  joeReceivesWedgie('Bob'); // "Bob gives Joe a wedgie."
```
The only problem with this partialRight implementation is that if too many arguments are passed into the partially applied function, the originally-specified (bound) arguments will be displaced, thus rendering them useless.
```javascript
  joeReceivesWedgie('Bob', 'Fred'); // "Bob gives Fred a wedgie."
```
While a more robust example could be written to take the function's arity (the number of arguments a function takes) into consideration, it will add additional complexity.

*In JavaScript, partially applying from the left will always be simpler and more robust than partially applying from the right.*
## Partial Application: From Anywhere
While the partial and partialRight functions partially apply arguments from either the left or right, there's nothing stopping you from going one step further and creating a function that allows you to cherry-pick arguments to be partially applied. The wu.js and Functional Javascript libraries both have a method called partial that allows one to accomplish this using a placeholder value. In the following example, I'm going to name this function partialAny and the placeholder value will be an arbitrary property on that function called partialAny._.

The following partialAny function returns a function ƒ that, when invoked, invokes the fn function with the originally-specified (bound) arguments. However, any "placeholder" originally-specified arguments will be replaced, in-order, with arguments passed to ƒ as it is invoked. Any remaining arguments passed to ƒ will be added to the end.

Note that if you're unfamiliar with the (function(){ /* code */ }()); pattern, read my article on IIFEs aka. Immediately-Invoked Function Expressions.
```javascript
  var partialAny = (function() {
    // A reference to the Array#slice method.
    var slice = Array.prototype.slice;

    // This function will be returned as a result of the IIFE and assigned
    // to the external `partialAny` var.
    function partialAny(fn /*, args...*/) {
      // Convert arguments object to an array, removing the first argument.
      var orig = slice.call(arguments, 1);

      return function() {
        // Convert arguments object to an array.
        var partial = slice.call(arguments, 0);
        var args = [];

        // Iterate over the originally-specified arguments. If the argument
        // was the `partialAny._` placeholder, use the next just-passed-in
        // argument, otherwise use the originally-specified argument.
        for (var i = 0; i < orig.length; i++) {
          args[i] = orig[i] === partialAny._ ? partial.shift() : orig[i];
        }

        // Invoke the originally-specified function, passing in interleaved
        // originally- and just-specified arguments, followed by any remaining
        // just-specified arguments.
        return fn.apply(this, args.concat(partial));
      };
    }

    // This is used as the placeholder argument.
    partialAny._ = {};

    return partialAny;
  }());
```
And here's a slightly more legitimate example of partial application, using the partialAny function.

Note that because partialAny._ is a bit verbose, a variable called __ is used instead, to make the example look nicer. The variable name could just as well be foo or PLACEHOLDER instead of __.
```javascript
  function hex(r, g, b) {
    return '#' + r + g + b;
  }

  hex('11', '22', '33'); // "#112233"

  // A more visually-appealing placeholder.
  var __ = partialAny._;

  var redMax = partialAny(hex, 'ff', __, __);
  redMax('11', '22');    // "#ff1122"

  var greenMax = partialAny(hex, __, 'ff');
  greenMax('33', '44');  // "#33ff44"

  var blueMax = partialAny(hex, __, __, 'ff');
  blueMax('55', '66');   // "#5566ff"

  var magentaMax = partialAny(hex, 'ff', __, 'ff');
  magentaMax('77');      // "#ff77ff"
```
While some libraries expose this partialAny functionality as partial, they are only able to use that name because they don't already have another function called partial. Which is because they call their partial-application-from-the-left function curry.

This is an unfortunate--but very common--cause of confusion, because partial application and currying, while related, are two different things.

Note that the remainder of this article describes currying, which is somewhat academic and has limited practical use in JavaScript. While you're encouraged to continue reading, if your brain is on fire, you may want to skip to the article's Final Words. That being said, if you do skip the the end, you'll miss the crazy stuff.

*Addendum: there's now even more crazy stuff at the very end, in the Extra Credit section. Good luck.*

## Another Implementation of Arbitary Partial Application

[*Original Source*](http://raganwald.com/2015/04/01/partial-application.html)

What if you want to apply some, but not all of the arguments, and they may not be neatly lined up at the beginning or end? This is also possible, provided we define a placeholder of some kind, and then write some code to “fill in the blanks”.

This implementation takes a “template” of values, you insert placeholder values (traditionally `_`, but anything will do) where you want values to be supplied later.

```javascript
const div = (verbed, numerator, denominator) =>
  `${numerator} ${verbed} ${denominator} is ${numerator/denominator}`
  
div('divided by', 1, 3)
  //=> 1 divided by 3 is 0.3333333333333333
  
const arbitraryPartialApply = (() => {
  const placeholder = {},
        arbitraryPartialApply = (fn, ...template) => {
          let remainingArgIndex = 0;
          const mapper = template.map((templateArg) =>
                           templateArg === placeholder
                             ? ((i) => (args) => args[i])(remainingArgIndex++)
                             : (args) => templateArg);
          
          return function (...remainingArgs) {
            const composedArgs = mapper.map(f => f(remainingArgs));
            
            return fn.apply(this, composedArgs);
          }
          
        };
        
  arbitraryPartialApply._ = placeholder;
  return arbitraryPartialApply;
})();

const _ = arbitraryPartialApply._;

const dividedByThree =
  arbitraryPartialApply(div, 'divided by', _, 3);
```

## Currying
Currying can be described as transforming a function of N arguments in such a way that it can be called as a chain of N functions each with a single argument.

What this means is that, once a function has been curried, it is effectively "primed" for partial application, because as soon as you pass an argument into a curried function, you are partially applying that argument. Unlike partial application, however, a curried function will keep returning curried functions until all arguments have been specified.

The following curry function returns a function ƒ that expects one argument. When invoked, it checks to see if all of the expected fn function arguments have been satisfied. If so, fn is invoked with those arguments. Otherwise, another function ƒ1 is returned that behaves like function ƒ. Recursion is used to maintain an array of already-specified arguments. Once all the expected fn function arguments are satisfied, fn is invoked.

Note that while JavaScript functions have a .length property that reflects that function's arity, in certain circumstances JavaScript cannot determine the number of expected arguments (for example, when a function internally uses the arguments object instead of specifying individual arguments).

In cases where the function's arity cannot be automatically determined, you can specify a numeric argument n that will be used instead of the fn.length property.
```javascript
  function curry(fn, n) {
    // If `n` argument was omitted, use the function .length property.
    if (typeof n !== 'number') {
      n = fn.length;
    }

    function getCurriedFn(prev) {
      return function(arg) {
        // Concat the just-specified argument with the array of
        // previously-specified arguments.
        var args = prev.concat(arg);
        if (args.length < n) {
          // Not all arguments have been satisfied yet, so return a curried
          // version of the original function.
          return getCurriedFn(args);
        } else {
          // Otherwise, invoke the original function with the arguments and
          // return its value.
          return fn.apply(this, args);
        }
      };
    }

    // Return a curried version of the original function.
    return getCurriedFn([]);
  }
```
And here's a completely contrived example of currying, using the curry function:
```javascript
  var i = 0;
  function a(arg1, arg2, arg3) {
    return ++i + ': ' + arg1 + ', ' + arg2 + ', ' + arg3;
  }

  // Normal function invocation.

  a('x', 'y', 'z'); // "1: x, y, z"
  a('x', 'y');      // "2: x, y, undefined"
  a('x');           // "3: x, undefined, undefined"
  a();              // "4: undefined, undefined, undefined"

  // Curried function invocation.

  var b = curry(a);
  b();              // `a` not invoked, curried function returned
  b('x');           // `a` not invoked, curried function returned
  b('x')('y');      // `a` not invoked, curried function returned
  b('x')('y')('z'); // "5: x, y, z"
  b('x')('y')();    // "6: x, y, undefined"
  b('x')()();       // "7: x, undefined, undefined"
  b()('y')();       // "8: undefined, y, undefined"
  b()()('z');       // "9: undefined, undefined, z"
  b()()();          // "10: undefined, undefined, undefined"

  var c = b('x');
  c();              // `a` not invoked, curried function returned
  c('y');           // `a` not invoked, curried function returned
  c('y')('z');      // "11: x, y, z"
  c('y')();         // "12: x, y, undefined"
  c()('z');         // "13: x, undefined, z"
  c()();            // "14: x, undefined, undefined"

  var d = c('y');
  d('z');           // "15: x, y, z"
  d();              // "16: x, y, undefined"

  var e = d('z');
  e;                // "17: x, y, z"
  ```
## Manually Specifying Function Arity
In the following example, you need to specify an n value when currying a1 since a1.length is 0. This is because an arguments list wasn't specified at the time a1 was defined, and JavaScript is unable to determine how many arguments are actually being used internally.
```javascript
  var i = 0;
  function a1() {
    var arg1 = arguments[0];
    var arg2 = arguments[1];
    var arg3 = arguments[2];
    return ++i + ': ' + arg1 + ', ' + arg2 + ', ' + arg3;
  }

  // Normal function invocation.

  a1('x', 'y', 'z'); // "1: x, y, z"
  a1('x', 'y');      // "2: x, y, undefined"
  a1('x');           // "3: x, undefined, undefined"
  a1();              // "4: undefined, undefined, undefined"

  // Curried function invocation.

  var b1 = curry(a1, 3);
  b1();              // `a` not invoked, curried function returned
  b1('x');           // `a` not invoked, curried function returned
  b1('x')('y');      // `a` not invoked, curried function returned
  b1('x')('y')('z'); // "5: x, y, z"
  b1('x')('y')();    // "6: x, y, undefined"
  b1('x')()();       // "7: x, undefined, undefined"
  b1()('y')();       // "8: undefined, y, undefined"
  b1()()('z');       // "9: undefined, undefined, z"
  b1()()();          // "10: undefined, undefined, undefined"

  var c1 = b1('x');
  c1();              // `a` not invoked, curried function returned
  c1('y');           // `a` not invoked, curried function returned
  c1('y')('z');      // "11: x, y, z"
  c1('y')();         // "12: x, y, undefined"
  c1()('z');         // "13: x, undefined, z"
  c1()();            // "14: x, undefined, undefined"
```
If a different value for n is specified, the curried function will simply expect that many arguments, regardless of the original function's arity.
## Partial Application vs Currying
So, what's the difference between partial application and currying? Compare how partially applied functions and curried functions behave:
```javascript
  function add(a, b, c) {
    var sum = a + b + c;
    return a + ' + ' + b + ' + ' + c + ' = ' + sum;
  }

  add(1, 2, 3); // "1 + 2 + 3 = 6"

  // Partial application.

  var addOnePartial = partial(add, 1);
  addOnePartial(2, 3); // "1 + 2 + 3 = 6"
  addOnePartial(2);    // "1 + 2 + undefined = NaN"

  // Currying.

  var addOneCurried = curry(add)(1);
  addOneCurried(2)(3); // "1 + 2 + 3 = 6"
  addOneCurried(2);    // `add` not invoked, curried function returned
```
A partially applied function doesn't care about the number of arguments passed into it; when invoked, it will invoke the original function, merging just-passed arguments and originally-passed (bound) arguments as appropriate.

A curried function is, indeed, a chain of N functions, each one accepting a single argument; only once all N functions have been called will the original function be invoked with all specified arguments.

## Partial Applicurrying: Frankenstein's Monster
Currying is conceptually difficult to understand. It's so often conflated with Partial Application that even after substantial research, I got it wrong in the original version of this article. The curry function I actually wrote was an odd hybrid between partial application and currying. That being said, I want to show you, roughly, the abomination that I had created.

This example is almost exactly the same as the previous curry example, but with one key difference: Instead of each curried function requiring one argument, the argument are parsed dynamically from the arguments object (see the bold text in the next paragraph).

So, the following frankenCurry function returns a function ƒ that expects zero or more arguments. When invoked, it checks to see if all of the expected fn function arguments have been satisfied. If so, fn is invoked with those arguments. Otherwise, another function ƒ1 is returned that behaves like function ƒ. Recursion is used to maintain an array of already-specified arguments. Once all the expected fn function arguments are satisfied, fn is invoked.

Instead of the curried function being a chain of N functions, it's a chain of as many functions as is damn well necessary, until all arguments are satisfied.
```javascript
  function frankenCurry(fn, n) {
    // If `n` argument was omitted, use the function .length property.
    if (typeof n !== 'number') {
      n = fn.length;
    }

    function getFrankenCurriedFn(prev) {
      return function() {
        // Concat all just-specified arguments with the array of
        // previously-specified arguments. Madness!
        var args = prev.concat(Array.prototype.slice.call(arguments, 0));
        if (args.length < n) {
          // Not all arguments have been satisfied yet, so return a
          // franken-curried version of the original function.
          return getFrankenCurriedFn(args);
        } else {
          // Otherwise, invoke the original function with the arguments and
          // return its value.
          return fn.apply(this, args);
        }
      };
    }

    // Return a franken-curried version of the original function.
    return getFrankenCurriedFn([]);
  }
```
While the frankenCurry function behaves exactly the same way as curry if you always pass just one argument in to each franken-curried function, it behaves very differently if you don't pass just one argument into any franken-curried function.
```javascript
  var i = 0;
  function a(arg1, arg2, arg3) {
    return ++i + ': ' + arg1 + ', ' + arg2 + ', ' + arg3;
  }

  // Curried function invocation.

  var b = curry(a);
  b();              // `a` not invoked, curried function returned
  b('x');           // `a` not invoked, curried function returned
  b('x')('y');      // `a` not invoked, curried function returned
  b('x')('y')('z'); // "1: x, y, z"
  b('x')('y')();    // "2: x, y, undefined"
  b('x')()();       // "3: x, undefined, undefined"
  b()('y')();       // "4: undefined, y, undefined"
  b()()('z');       // "5: undefined, undefined, z"
  b()()();          // "6: undefined, undefined, undefined"

  // Franken-curried function invocation.

  var c = frankenCurry(a);
  c();              // `a` not invoked, curried function returned
  c('x');           // `a` not invoked, curried function returned
  c('x')('y');      // `a` not invoked, curried function returned
  c('x')('y')('z'); // "7: x, y, z"
  c('x')('y')();    // `a` not invoked, curried function returned
  c('x')()();       // `a` not invoked, curried function returned
  c()('y')();       // `a` not invoked, curried function returned
  c()()('z');       // `a` not invoked, curried function returned
  c()()();          // `a` not invoked, curried function returned
  c('x')('y', 'z'); // "8: x, y, z"
  c('x', 'y')('z'); // "9: x, y, z"
  c('x', 'y', 'z'); // "10: x, y, z"
```
If you read the IIFE article, you'll know that function expressions don't need to be assigned to a named variable to be invoked; all you need to do is put parens after them. And since franken-curried functions (Franken-Curried Function Expressions? FCFEs, anyone?!) keep returning a function until all their arguments have been satisfied, you can write some pretty crazy looking, yet totally valid, JavaScript.
```javascript
  function add(a, b, c) {
    var sum = a + b + c;
    return a + ' + ' + b + ' + ' + c + ' = ' + sum;
  }

  frankenCurry(add)(1)(2)(3);             // "1 + 2 + 3 = 6"
  frankenCurry(add)(1, 2)(3);             // "1 + 2 + 3 = 6"
  frankenCurry(add)(1, 2, 3);             // "1 + 2 + 3 = 6"
  frankenCurry(add)(1)(2, 3);             // "1 + 2 + 3 = 6"
  frankenCurry(add)(1)()(2)()(3);         // "1 + 2 + 3 = 6"
  frankenCurry(add)()(1)()()(2)()()()(3); // "1 + 2 + 3 = 6"
  frankenCurry(add)()()()()()(1)()()()()()(2)()()()()()(3); // "1 + 2 + 3 = 6"
```
I'll be the first to admit that franken-currying has limited real-world appeal, but then again, in JavaScript, so does currying. Besides, I'm not going for real-world appeal with this particular example. I'm going for crazy-looking JavaScript.

# Partial Application vs Currying 2

[*Original Source*](http://2ality.com/2011/09/currying-vs-part-eval.html)

## Currying
Currying takes a function:
```
f: X × Y → R
```
and turns it into a function:
```
f': X → (Y → R)
```
Instead of calling f with two arguments, we invoke f' with the first argument. The result is a function that we then call with the second argument to produce the result. Thus, if the uncurried f is invoked as:
```
f(3, 5)
```
then the curried f' is invoked as:
```
f'(3)(5)
```
**JavaScript example.** The following is the uncurried binary function add().
```javascript
    function add(x, y) {
        return x + y;
    }
```
Calling it:
```
    > add(3, 5)
    8
```
The curried version of add looks as follows.
```javascript
    function addC(x) {
        return function (y) {
            return x + y;
        }
    }
```
Calling it:
```
    > addC(3)(5)
    8
```
**The algorithm for currying.** The function curry curries a given binary function. It has the signature:
```
curry: (X × Y → R) → (X → (Y → R))
```
Explanation: curry takes a binary function and returns a unary function that returns a unary function. Its JavaScript code is:
```javascript
    function curry(f) {
        return function(x) {
            return function(y) {
                return f(x, y);
            }
        }
    }
```
## Partial application
Partial application takes a function
```
f: X × Y → R
```
and a fixed value x for the first argument to produce a new function
```
f': Y → R
```
f' does the same as f, but only has to fill in the second parameter which is why its arity is one less than the arity of f. One says that the first argument is bound to x.
**JavaScript example.** Binding the first argument of function `add` to 5 produces the function `plus5`. Compare their definitions to see that we have simply filled in the first argument.
```javascript
    function plus5(y) {
        return 5 + y;
    }
```    
**The algorithm for partial application.** The function partApply partially applies binary functions. It has the signature:
```
partApply : ((X × Y → R) × X) → (Y → R)
```
Explanation: partApply takes a binary function and a value and produces a unary function. Its JavaScript code is:
```javascript
    function partApply(f, x) {
        return function(y) {
            return f(x, y);
        }
    }
```
## Currying versus partial application
The difference between the two is:
- Currying always produces nested unary (1-ary) functions. The transformed function is still largely the same as the original.
- Partial application produces functions of arbitrary arity. The transformed function is different from the original – it needs less arguments.

Interestingly, with a curried function and curried invocation, it is easy to achieve the same effect as binding one argument (performing this operation several times yields the general case): To bind the first argument to a value, you simply apply the outer-most of the nested functions to that value, which returns the desired new function.
