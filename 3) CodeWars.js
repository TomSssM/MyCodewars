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
