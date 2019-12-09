# So here is the complicated MDN Polyfill for Function.prototype.bind

[*Original Source*](https://www.reddit.com/r/javascript/comments/5ovl09/understanding_functionprototypebind_polyfill/#ampf=undefined)
```javascript
// check to see if the native implementation of bind already
// exists in this version of JavaScript. We only define the
// polyfill if it doesn't yet exist.

if (!Function.prototype.bind) {

  // creating the bind function for all Function instances by 
  // assigning it to the `Function.prototype` object. Normally 
  // you would avoid assigning to builtin prototypes because you
  // may cause a conflict with new features, but here this is a
  // known feature that is already in the spec that we're adding
  // to a JavaScript runtime that is not up to spec, so its ok

  Function.prototype.bind = function (oThis) {

    // if you attempt to call this function from a non-function object
    // for example if you assign this bind function to a normal object
    // or use `call`/`apply` to change the context of this function call to
    // a non function value (e.g. `Function.prototype.bind.call({})`), we
    // throw an error because bind can only work on functions, and we
    // require that `this` in this call is a function

    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    // bind does two things, it binds a context (`this` value) to a
    // function for when its called, and it provides a way to bake in
    // some pre-defined arguments that are automatically passed into 
    // that function when called. Those arguments can be passed into
    // the bind call and get picked up here as `aArgs` pulling them
    // from `arguments` making sure to lop off the `oThis` value

    var aArgs = Array.prototype.slice.call(arguments, 1),

      fToBind = this, // this is the function we're binding
      fNOP = function () {}, // a constructor used for `new` usage (see below)

      // `fBound` is the bound function - the result that bind is going to
      // return to represent the current function (`this` or `fToBind`) with
      // a new context.  The idea behind this function is that it will simply
      // take the original function and call it through `apply` with the
      // new context specified.

      fBound = function () {

        // call the original function with a new context using `apply`.
        // however if the function is called with `new`, it needs to be called
        // with the context of, and return, a new object instance and not the
        // bound version of this.  In that case, binding gets ignored in favor
        // of using the `this` of the new instance rather than the `oThis` binding.

        // new object instances inherit from the prototype of their constructors.
        // Our `fBound` function is supposed to mimic the original with the
        // exception of a change in context.  So if new objects are created with
        // it, they should behave as though they were created from the original.
        // But at the same time, we can't simply carry over the prototype of the
        // original into `fBound` because it is a separate function and needs its
        // own prototype, just one that also inherits from the original. To
        // accommodate this, the `fNOP` function (constructor) above is used as
        // an intermediary for creating `fBound`'s prototype while allowing it to
        // be unique but also inherit the original.  And because that becomes part
        // of the bound function's prototype chain, it can be used to determine
        // whether `this` in `fBound` is an instance created by `new` or not since
        // `instanceof` works through a prototype chain lookup.

        return fToBind.apply(this instanceof fNOP
               ? this
               : oThis,

               // call the function with arguments that include the added 
               // arguments specified from the original bind call plus
               // the arguments this function was called with

               aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    // `fNOP`'s use to provide an intermediary prototype between `fBound` and
    // the current function instance mimics `Object.create`. But we're assuming
    // if you don't have `bind`, you probably don't have `create` either, so do
    // it the old fashioned way with a constructor.  This works by setting the
    // constructor's prototype to the to-inherit-from constructor's (this)
    // prototype. A check is needed to prevent assinging that prototype to null
    // if it doesn't exist on this function (Function.prototype is technically
    // a valid target for `bind()` because it is a function but one that does not
    // have its own prototype).

    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }

    // here the inheritance is made.  As a new function, `fBound` has no existing
    // inheritance chain to worry about, so we can easily replace it with a new
    // one - that of a new instance `fNOP`.  Since `fNOP`'s prototype is the original
    // function's prototype, `fBound` has a prototype which directly inherits from
    // that, one level between new instances and the original prototype. So
    // `fBound.prototype.__proto__ === this.prototype` and new instances of `fBound`
    // created with `new fBound()` will inherit from `fBound.prototype` as well as
    // the original function's prototype.

    fBound.prototype = new fNOP();

    // return the bound version of the function as
    // the result of the bind call

    return fBound;
  };
}
```

Here is the code without comments
```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```