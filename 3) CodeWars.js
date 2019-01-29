//Task 21
// Another example of recursion
function doNTimes(n, fun) {
  function recursionFun(x) {
    if(x >= 1) {
       fun();
       recursionFun(x - 1);
    }	  
  }
  recursionFun(n);	
}

//Task 22
// In JavaScript we can create objects using the new operator.
// For example, if you have this constructor function:

// function Greeting(name) {
//   this.name = name;
// }

// Greeting.prototype.sayHello = function() {
//   return "Hello " + this.name;
// };

// Greeting.prototype.sayBye = function() {
//   return "Bye " + this.name;
// };

// You can create a Greeting object in this way:

//   var greeting = new Greeting('John');

// new operator is evil because it produces a highly coupled code, difficult to maintain and test.
// Some patterns to reduce coupling are object factories or dependency injection.
// These patterns can benefit of the construct() function.
// This function receives a constructor function and possibly some arguments and it returns a new 
// object constructed with the function and the passed arguments.
// This is another way to create the greeting object:

// var greeting = construct(Greeting, 'John');

function construct(Class, ...args) {
  return new Class(...args);
}

//alternative completely without new

function construct(Class, ...args) {
  const obj = Object.create(Class.prototype);
  Class.apply(obj, args);
  return obj;
}

//Task 23
// You are given a complex object that has many deeply nested variables.
// You don't want to go the usual if obj.property == null route.
// Create a prototype method that given a nested path, either return the value or undefined.

// var obj = {
//   person: {
//     name: 'joe',
//     history: {
//       hometown: 'bratislava',
//       bio: {
//         funFact: 'I like fishing.'
//       }
//     }
//   }
// };

// obj.hash('person.name'); // 'joe'
// obj.hash('person.history.bio'); // { funFact: 'I like fishing.' }
// obj.hash('person.history.homeStreet'); // undefined
// obj.hash('person.animal.pet.needNoseAntEater'); // undefined

Object.prototype.hash = function(string) {
  const hashes = string.split(".");
  let reference = this;
  hashes.forEach(element => {
    if(reference === undefined) {return};
    reference = reference[element] ? reference[element] : undefined;
  });
  return reference;
}

//alternatives
//one
Object.prototype.hash = function(string) {
  var obj = this;
  string.split(".").forEach(function(el) { 
    try {
      obj = obj[el];
    }
    catch(e) { 
      obj = undefined;
    }
  });
  return obj;
}

//two
Object.prototype.hash = function(string) {
  var arr = string.split('.');
  return arr.reduce(function(t, v){ 
    return t ? t[v] : t;
  }, this);
}

//Task 24
// In object-oriented programming, it is sometimes useful to have private shared state among all instances of a class;
// in other languages, like ruby, this shared state would be tracked with a class variable.
// In javascript we achieve this through closures and immediately-invoked function expressions.

// In this kata, I want you to write make a Cat constructor that takes arguments name and weight to instantiate a new cat object.
// The constructor should also have an averageWeight method that returns the average weight of cats created with the constructor.

// garfield = new Cat('garfield', 25);
// Cat.averageWeight(); // 25
// felix = new Cat('felix', 15);
// Cat.averageWeight();   // now 20

// But that's not all. Cats can change weight.
// Use Object.defineProperty to write custom setters and getters for the weight property 
// so that the following works properly even as instances change their weight value:

// felix.weight = 25;
// felix.weight // 25
// Cat.averageWeight(); // now 25

// Object.defineProperty must be used to pass all tests.
// Storing a reference to all instances and recalculating the average weight each time is easier,
// but would prevent garbage collection from working properly if used in a production environment.

// Finally, since average weight is an aggregate statistic it's important that we validate constructor arguments
// so that no cats are created without a specified weight;
// so, make sure to throw an error if both arguments are not recieved by the constructor.

// Summary of requirements:
// Cat constructor, requiring arguments for name and weight
// Throw an error if name or weight not specified when invoking the constructor.
// Cat.averageWeight() method should give the average weight
//   of all cat instances created with Cat, even after if the instance's properties have changed.
// Must use Object.defineProperty

// Let's make a Cat constructor!
var Cat = (function () {
  let tWei = 0;
  let catCount = 0;
  const retF = function(name, weight) {
    if(name === undefined || weight === undefined) throw new Error("I need more parameters!!!");
    this.name = name;
    Object.defineProperty(this, "weight", {
      get() {
        return this.Cweight;
      },
      set(val) {
        if(this.Cweight !== undefined) {
          tWei -= this.Cweight;
        }
        tWei += val;
        this.Cweight = val;
      }
    });
    this.weight = weight;
    catCount++;
  };

  retF.averageWeight = function() {
    return tWei / catCount;
  };
  return retF;
 }());

// alt this has many clever workarounds marked with // $
var Cat = (function () {
  var cats = { // $
    count: 0,
    totalWeight: 0,
    avgWeight: 0
  }
  
  function Cat (name, weight) {
    if (!name || !weight) { // $
      throw new Error('Both `name` and `weight` should be provided');
    }
    cats.count++;
    this.name = name;

    Object.defineProperty(this, 'weight', {
      get: function () {
        return this._weight || 0; // $$$
      },
      set: function (val) {
        cats.totalWeight = cats.totalWeight - this.weight + val;
        cats.avgWeight =  cats.totalWeight / cats.count;
        return this._weight = val;
      }
    });

    this.weight = weight;
  }
  
  Cat.averageWeight = function () {
    return cats.avgWeight;
  }
  
  return Cat;
  
}());

// IMPORTANT:
// Instead of specifying smth like .Cweight we could have used a variable like _weight 
// or we could simply have stored cat's weight value in a separate variable inside the constructor
// like so:

// but do note that the weight value in the example below seems to be a parameter
var Cat = (function () {
  var catCount = 0, catAggWeight = 0;
  var constr = function(name, weight) {
    if(!name || !weight) {throw 'Must provide a name and a weight!';}
    catCount++;
    catAggWeight += weight;
    Object.defineProperty(this, 'weight', {set: function(v) {
      catAggWeight += v - weight;
      weight = v;
    }, get: function() {return weight;}});
  }
  constr.averageWeight = function() {
    return catAggWeight / catCount;
  }
  return constr;
}());

// yet another alternative this one using class syntax and prototype

class Cat {
  constructor(name, weight) {
    this.name = name;
    this._weight = 0;

    Object.defineProperty(this, 'weight', {
      get() {
        return this._weight;
      },
      set(newWei) {
        this.__proto__.totalWeight -= this.weight;
        this.__proto__.totalWeight += newWei;
        this._weight = newWei;
      },
    });

    this.weight = weight;
    this.__proto__.catCount++;
    
    Object.defineProperty(this, 'averageWeight', {
      get() {
        return this.__proto__.totalWeight / this.__proto__.catCount;
      }
    });
  }
}

Cat.prototype.totalWeight = 0;
Cat.prototype.catCount = 0;

// Task 25
// You probably know, that in Javascript (and also Ruby) there is no concept of interfaces. There is only a concept of inheritance,
// but you can't assume that a certain method or property exists, just because it exists in the parent prototype / class.
// We want to find out, whether a given object fulfils the requirements to implement the "SantaClausable" interface.
// We need to implement a method which checks for this interface.

// Rules
// The SantaClausable interface is implemented, if all of the following methods are defined on an object:
// sayHoHoHo() / say_ho_ho_ho
// distributeGifts() / distribute_gifts
// goDownTheChimney() / go_down_the_chimney

// Example
// var santa = {
//     sayHoHoHo: function() { console.log('Ho Ho Ho!') },
//     distributeGifts: function() { console.log('Gifts for all!'); },
//     goDownTheChimney: function() { console.log('*whoosh*'); }
// };

// var notSanta = {
//     sayHoHoHo: function() { console.log('Oink Oink!') }
//     // no distributeGifts() and no goDownTheChimney()
// };

// isSantaClausable(santa); // must return TRUE
// isSantaClausable(notSanta); // must return FALSE
// Additional Information on this Topic
// Duck Typing (Wikipedia)

// Info that I wrote myself and that cannot be read as it solves this Kata:
// Do note that all the properties om the left are functions ( quite possibly data accessors ) so we don't really need
// to check the properties on the right. But how to determine that the properties on the right really are the setters and getters
// they are supposed to be ha???

function isSantaClausable(obj) {
  const allKeys = ["sayHoHoHo","distributeGifts", "goDownTheChimney"];
  return (typeof obj[allKeys[0]] === "function") && (typeof obj[allKeys[1]] === "function") && (typeof obj[allKeys[2]] === "function");
}

// Better Implementation
function isSantaClausable(obj) {
  return ['sayHoHoHo', 'distributeGifts', 'goDownTheChimney'].every(function(methodName) {
    return typeof obj[methodName] === 'function';
  });
}

// Task 26
// my own contrived task
// here I reverse the difits of any safe integer
// with my hands completely off arrays
// only once do I use .toString().lenght

const swap = function(num) {
  let length = 10 ** (num.toString().length - 1);
  const lengthIni = length;
  let res = 0;
  while(length >= 1) {
    let cur = Math.floor(num / length);
    num %= length;
    cur = (cur / length) * lengthIni;
    res += cur;
    length *= 0.1;
  }
  return res;
};

swap(123); // 321

// Task 27
// the caesar task from CS50
// encoding a secret message by shifting each character key spaces to the right

const cipher = function(key = 0, str = '') {
  const charArr = str.split('');
  let res = '';
  charArr.forEach(v => {
    if(v >= 'a' && v <= 'z') {
      const initialPosInAlph = (v.charCodeAt(0) - 97); // lower case a starts at 97 in Unicode
      const posInAlph = (initialPosInAlph + key) % 26; // % 26 ( 26 letters in English alphabet ) is done so that the 
                                                       // letter z corresponds to 2 and not 28 which is a weird character
      res += String.fromCharCode(posInAlph + 97);
    } else if(v >= 'A' && v <= 'Z') {
      const InitialPosInAlph = (v.charCodeAt(0) - 65);
      const posInAlph = (InitialPosInAlph + key) % 26;
      res += String.fromCharCode(posInAlph + 65);
    } else {
      res += v;
    }
  });
  return res;
}

console.log(cipher(2, 'abc | \\ !$ aa XyZ')); // cde | \ !$ cc ZaB

const uncipher = function(key = 0, str) {
  const charArr = str.split('');
  let res = '';
  key *= -1;
  
  charArr.forEach(v => {
    if(v >= 'a' && v <= 'z') {
      const initialPosInAlph = (v.charCodeAt(0) - 97);
      const posInAlph = ((initialPosInAlph + key) + 26) % 26;
      res += String.fromCharCode(posInAlph + 97);
    } else if(v >= 'A' && v <= 'Z') {
      const initialPosInAlph = (v.charCodeAt(0) - 65);
      const posInAlph = ((initialPosInAlph + key) + 26) % 26;
      res += String.fromCharCode(posInAlph + 65);
    } else {
      res += v;
    }
  });
  return res;
}

// here is the cool implementation
const key = 2;
const compose = (...fns) => arg => fns.reduceRight((t,v) => v(t), arg);

const curry = function(fn) {
  const arity = fn.length;
  return (function resolver(...args) {
    const memory = args;
    return function(arg) {
      const local = memory.slice();
      local.push(arg);
      const next = local.length >= arity ? fn : resolver;
      return next(...local);
    };
  }());
};

console.log(compose(curry(uncipher)(key), curry(cipher)(key))('Tom is Cool!!!')); // => 'Tom is Cool!!!'

// Task 28
// the alphabetical position of each letter in the word is now key
// every iteration switches to the next letter

const cipherUpg = function(strKey, str) {
  const arrKey = strKey.toLowerCase().split('').map(v => v.charCodeAt(0) - 97);
  const arrStr = str.split('');
  let res = '';
  let i = 0;
  arrStr.forEach(v => {
    if(v >= 'a' && v <= 'z') {
      const initialPosInAlph = (v.charCodeAt(0) - 97);
      const posInAlph = (initialPosInAlph + arrKey[i++ % arrKey.length]) % 26;
      res += String.fromCharCode(posInAlph + 97);
    } else if(v >= 'A' && v <= 'Z') {
      const InitialPosInAlph = (v.charCodeAt(0) - 65);
      const posInAlph = (InitialPosInAlph + arrKey[i++ % arrKey.length]) % 26;
      res += String.fromCharCode(posInAlph + 65);
    } else {
      res += v;
    }
  });
  return res;
};

console.log(cipherUpg('ABc', 'Robert is sleeping on my backsuck!!!')); // => 'Rpdesv it ulfgpjpg pp mz dadmsvek!!!'

// here is the same implementation except recursive

const cipherUpgrecursive = function(strKey, str) {
  let i = 0;
  let index = 0;
  let result = '';
  const len = str.length;
  strKey = strKey.toLowerCase().split('').map(v => v.charCodeAt(0) - 97);
  const rec = function(key, char) {
    if(!char) return result;
    result += cipher(key, char); // yeap this one is an impure function and does require cipher to work
    i++;
    while(/[^A-Za-z]/.test(str[i]) && i < len) {
      result += str[i];
      i++;
    }
    return rec(strKey[index++ % strKey.length], str[i]);
  };
  return rec(strKey[index++ % strKey.length], str[i]);
};

cipherUpgrecursive('Something', 'Cool Long String Man'); // Ucap Evvt Ylfurz Tia

// Task 29