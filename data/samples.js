// 1) variables:
let dude;
dude2 = dude + 1;
function fun() {}
fun;
window;
undeclared;

// 2) comment:
// I am a comment :)

// 3) OOP:

// methods:
console.log;
console.log();
history.back;
history.back();
window.console.log();
window.clearTimeout;
window.clearTimeout();

// props:
window.name;
window.doesNtExist;

// class:
Map;
class Man {
    constructor(one, two) {
        // this - prop:
        this.name = 'Tom';
        this.one = one;
        this.two = two;

        // this - method:
        this.method = function() {};

        // this - undeclared:
        this.empty;
    }

    // method:
    drinkCoffee() {
        this.name;
        this.method();
        this.doesNtExist;
    }
}

new Man(1, 'two');
const man = new Man(1, 'two');

// 4) FP
// parameters:
const fun = function name(param1, param2) {
    param1;
}

// spread operator
const funSpread = (man, ...params) => {
    man;
    params.forEach();
}
funSpread('man', 1, true);

// arguments:
fun(true, 'okay');
new fun(true, 'okay');
fun;

// 5) Values
12;
'str';
"str";
true;
false;
undefined;
null;
NaN;
/[1-2]abc(12)*+{1,2}/gi

// 6) Objects:
const obj = {
    prop: 12,
    ['comp' + 'uted']: 11,
    ['man']: '>0',
    'method': fun,
    "method2": function(man, man2) {
        this.prop = man;
    },
    method3: () => {
        return this;
    },
    method4: function fun() {
        return this;
    },
}
obj.prop;
obj.method();
obj['prop'];
obj["prop"];
obj[11 + 1];

const arr = [1,2,'wow', "wow"];
arr[1];

// 7) keywords:
export default 'aa';
import man from './';
man;
"use strict";
break;
continue;
try {
    // here
} catch {
    // here
}
yield;
debugger;
return;
throw ':)';
throw {};