'use strict';

/**********************************************************************************************
 *                                                                                            *
 * Plese read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions                    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments      *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures                           *
 *                                                                                            *
 **********************************************************************************************/


/**
 * Returns the functions composition of two specified functions f(x) and g(x).
 * The result of compose is to be a function of one argument, (lets call the argument x),
 * which works like applying function f to the result of applying function g to x, i.e.
 *  getComposition(f,g)(x) = f(g(x))
 *
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 *
 * @example
 *   getComposition(Math.sin, Math.asin)(x) => Math.sin(Math.acos(x))
 *
 */
function getComposition(f,g) {
    return function(arg) {
        return f(g(arg));
    }
}


/**
 * Returns the math power function with the specified exponent
 *
 * @param {number} exponent
 * @return {Function}
 *
 * @example
 *   var power2 = getPowerFunction(2); // => x^2
 *   power2(2) => 4
 *   power2(4) => 16
 *
 *   var power05 = getPowerFunction(0.5); // => x^0.5
 *   power05(4) => 2
 *   power05(16) => 4
 *
 */
function getPowerFunction(exponent) {
    return function(num) {
        return num ** exponent;
    }
}


/**
 * Returns the polynom function of one argument based on specified coefficients.
 * See: https://en.wikipedia.org/wiki/Polynomial#Definition
 *
 * @params {integer}
 * @return {Function}
 *
 * @example
 *   getPolynom(2,3,5) => y = 2*x^2 + 3*x + 5
 *   getPolynom(1,-3)  => y = x - 3
 *   getPolynom(8)     => y = 8
 *   getPolynom()      => null
 */
function getPolynom() {
    throw new Error('Not implemented');
}


/**
 * Memoizes passed function and returns function
 * which invoked first time calls the passed function and then always returns cached result.
 *
 * @params {Function} func - function to memoize
 * @return {Function} memoized function
 *
 * @example
 *   var memoizer = memoize(() => Math.random());
 *   memoizer() => some random number  (first run, evaluates the result of Math.random())
 *   memoizer() => the same random number  (second run, returns the previous cached result)
 *   ...
 *   memoizer() => the same random number  (next run, returns the previous cached result)
 */
function memoize(fun) {
    fun.memory = {};
    return function(...args) {
      const key = JSON.stringify(args);
      return fun.memory[key] ? fun.memory[key] : fun.memory[key] = fun(...args);
    }
}


/**
 * Returns the function trying to call the passed function and if it throws,
 * retrying it specified number of attempts.
 *
 * @param {Function} func
 * @param {number} attempts
 * @return {Function}
 *
 * @example
 * var attempt = 0, retryer = retry(() => {
 *      if (++attempt % 2) throw new Error('test');
 *      else return attempt;
 * }, 2);
 * retryer() => 2
 */
function retry(func, attempts) {
    return function() {
        let res;
        function name() {
            if(attempts <= 0) return;
            try {
                res = func();
            } catch(err) {
                attempts--;
                name();
            }
        }
        name();
        return res;
    }
}


/**
 * Returns the logging wrapper for the specified method,
 * Logger has to log the start and end of calling the specified function.
 * Logger has to log the arguments of invoked function.
 * The fromat of output log is:
 * <function name>(<arg1>, <arg2>,...,<argN>) starts
 * <function name>(<arg1>, <arg2>,...,<argN>) ends
 *
 *
 * @param {Function} func
 * @param {Function} logFunc - function to output log with single string argument
 * @return {Function}
 *
 * @example
 *
 * var cosLogger = logger(Math.cos, console.log);
 * var result = cosLogger(Math.PI));     // -1
 *
 * log from console.log:
 * cos(3.141592653589793) starts
 * cos(3.141592653589793) ends
 *
 */
function logger(func, logFunc) {
    throw new Error('Not implemented');
    // return function(...args) {
    //     logFunc(`${func.name}(${args}) starts`);
    //     const res = func(...args);
    //     logFunc(`${func.name}(${args}) ends`);
    //     return res;
    // }
}


/**
 * Return the function with partial applied arguments
 *
 * @param {Function} fn
 * @return {Function}
 *
 * @example
 *   var fn = function(x1,x2,x3,x4) { return  x1 + x2 + x3 + x4; };
 *   partialUsingArguments(fn, 'a')('b','c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b')('c','d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c')('d') => 'abcd'
 *   partialUsingArguments(fn, 'a','b','c','d')() => 'abcd'
 */
function partialUsingArguments(fn, ...args1) {
    return function(...args2) {
        return fn(...args1, ...args2);
    } 
}


/**
 * Returns the id generator function that returns next integer starting from specified number every time when invoking.
 *
 * @param {Number} startFrom
 * @return {Function}
 *
 * @example
 *   var getId4 = getIdGenerator(4);
 *   var getId10 = gerIdGenerator(10);
 *   getId4() => 4
 *   getId10() => 10
 *   getId4() => 5
 *   getId4() => 6
 *   getId4() => 7
 *   getId10() => 11
 */
function getIdGeneratorFunction(startFrom) {
    function callback() {
        return startFrom++;
    }
    return callback;
}


module.exports = {
    getComposition: getComposition,
    getPowerFunction: getPowerFunction,
    getPolynom: getPolynom,
    memoize: memoize,
    retry: retry,
    logger: logger,
    partialUsingArguments: partialUsingArguments,
    getIdGeneratorFunction: getIdGeneratorFunction,
};
