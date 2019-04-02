// Task 31
// There's no such thing as private properties on a coffeescript object! 
// But, maybe there is?

// Implement a function createSecretHolder(secret) which accepts any value as 
// secret and returns an object with ONLY two methods:
//   getSecret() which returns the secret
//   setSecret() which sets the secret

// obj = createSecretHolder(5)
// obj.getSecret() # returns 5
// obj.setSecret(2)
// obj.getSecret() # returns 2

function createSecretHolder(secret) {
  const obj = {};
  let secretProp = secret;
  obj.getSecret = () => secretProp;
  obj.setSecret = function(newSecret) {
    secretProp = newSecret;
  };
  return obj;
}

const obj = createSecretHolder(5);
console.log(obj.getSecret()); // 5
console.log(obj.setSecret(2));
console.log(obj.getSecret()); // 2

// Task 32
// In testing, a spy function is one that keeps track of various metadata regarding its invocations. 
// Some examples of properties that a spy might track include:
// Whether it was invoked
// How many times it was invoked
// What arguments it was called with
// What contexts it was called in
// What values it returned
// Whether it threw an error

// For this kata, implement a spyOn function which takes any function func 
// as a parameter and returns a spy for func. The returned spy must be callable in the 
// same manner as the original func, and include the following additional properties/methods:

// .callCount() — returns the number of times spy has been called
// .wasCalledWith(val) – returns true if spy was ever called with val, else returns false.
// .returned(val) — returns true if spy ever returned val, else returns false

const adder = (n1,n2) => n1 + n2;
const adderSpy = spyOn(adder);

function spyOn(func) {
    let callCount = 0;
    const calledWith = [];
    const returnedVals = [];
    const spiedFunc = function(...args) {
        const result = func(...args);
        callCount++;
        calledWith.push(...args);
        returnedVals.push(result);
        return result;
    };
    spiedFunc.wasCalledWith = (arg) => calledWith.includes(arg);
    spiedFunc.returned = (arg) => returnedVals.includes(arg);
    spiedFunc.callCount = () => callCount;
    return spiedFunc;
}

console.log(adderSpy(2, 4)); // returns 6
console.log(adderSpy(3, 5)); // returns 8

console.log(adderSpy.callCount()); // returns 2
console.log(adderSpy.wasCalledWith(4)); // true
console.log(adderSpy.wasCalledWith(0)); // false
console.log(adderSpy.returned(8)); // true
console.log(adderSpy.returned(0)); // false

// Task 33
// This time we want to write calculations using functions and get the results. 
// Let's have a look at some examples:
// JavaScript:

// seven(times(five())); // must return 35
// four(plus(nine())); // must return 13
// eight(minus(three())); // must return 5
// six(dividedBy(two())); // must return 3

// There must be a function for each number from 0 ("zero") to 9 ("nine")
// There must be a function for each of the following mathematical operations: 
// plus, minus, times, dividedBy

// Each calculation consist of exactly one operation and two numbers
// The most outer function represents the left operand, the most inner function represents 
// the right operand
// Division should be integer division, e.g eight(dividedBy(three()))/eight(divided_by(three)) 
// should return 2, not 2.12349812409023490293402324210394023949023940920394191203942...

function zero() {
    if(arguments[0] === undefined) {
        return 0;
    } else {
        return handleOperation(arguments[0].operation, 0, arguments[0].val);
    }
}
function one() {
    if(arguments[0] === undefined) {
        return 1;
    } else {
        return handleOperation(arguments[0].operation, 1, arguments[0].val);
    }
}
function two() {
    if(arguments[0] === undefined) {
        return 2;
    } else {
        return handleOperation(arguments[0].operation, 2, arguments[0].val);
    }
}
function three() {
    if(arguments[0] === undefined) {
        return 3;
    } else {
        return handleOperation(arguments[0].operation, 3, arguments[0].val);
    }
}
function four() {
    if(arguments[0] === undefined) {
        return 4;
    } else {
        return handleOperation(arguments[0].operation, 4, arguments[0].val);
    }
}
function five() {
    if(arguments[0] === undefined) {
        return 5;
    } else {
        return handleOperation(arguments[0].operation, 5, arguments[0].val);
    }
}
function six() {
    if(arguments[0] === undefined) {
        return 6;
    } else {
        return handleOperation(arguments[0].operation, 6, arguments[0].val);
    }
}
function seven() {
    if(arguments[0] === undefined) {
        return 7;
    } else {
        return handleOperation(arguments[0].operation, 7, arguments[0].val);
    }
}
function eight() {
    if(arguments[0] === undefined) {
        return 8;
    } else {
        return handleOperation(arguments[0].operation, 8, arguments[0].val);
    }
}
function nine() {
    if(arguments[0] === undefined) {
        return 9;
    } else {
        return handleOperation(arguments[0].operation, 9, arguments[0].val);
    }
}

function plus() {
    return {
        operation: '+',
        val: arguments[0],
    };
}
function minus() {
    return {
        operation: '-',
        val: arguments[0],
    };
}
function times() {
    return {
        operation: '*',
        val: arguments[0],
    };
}
function dividedBy() {
    return {
        operation: '/',
        val: arguments[0],
    };
}

function handleOperation(oper, a, b) {
    let res;
    switch(oper) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            res = a / b;
            break;
        default:
            throw new Error('illegal operation');
    }
    return Math.floor(res);
}

console.log(seven(times(five()))); // must return 35
console.log(four(plus(nine()))); // must return 13
console.log(eight(minus(three()))); // must return 5
console.log(six(dividedBy(two()))); // must return 3

// Task 34
// This kata is designed to test your ability to extend the functionality of built-in classes. 
// In this case, we want you to extend the built-in Array class with the following methods: 
// square(), cube(), average(), sum(), even() and odd().

// Explanation:

// - square() must return a copy of the array, containing all values squared
// - cube() must return a copy of the array, containing all values cubed
// - average() must return the average of all array values; on an empty array must 
//             return NaN
// - sum() must return the sum of all array values
// - even() must return an array of all even numbers
// - odd() must return an array of all odd numbers
// Note: the original array must not be changed in any case!

const numbers = [1, 2, 3, 4, 5];

Array.prototype.square = function() {
    return this.map(v => v ** 2);
};

Array.prototype.cube = function() {
    return this.map(v => v ** 3);
};

Array.prototype.average = function() {
    if(!this.length) return NaN;
    return this.reduce((t,v) => t + v) / this.length;
};

Array.prototype.sum = function() {
    if(!this.length) return NaN;
    return this.reduce((t,v) => t + v);
};

Array.prototype.even = function() {
    return this.filter(v => !(v % 2));
}

Array.prototype.odd = function() {
    return this.filter(v => v % 2);
}

console.log(numbers.square());  // must return [1, 4, 9, 16, 25]
console.log(numbers.cube());    // must return [1, 8, 27, 64, 125]
console.log(numbers.average()); // must return 3
console.log(numbers.sum());     // must return 15
console.log(numbers.even());    // must return [2, 4]
console.log(numbers.odd());     // must return [1, 3, 5]

// Task 35