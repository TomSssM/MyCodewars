// with closures
const Person = (function() {
  let _name;

  const Person = function(name) {
    _name = name;
  };

  Person.prototype.getName = function() {
    return _name;
  };

  return Person;
}());

const john = new Person('John');
console.log(john.getName());
delete john._name;
console.log(`can't be modified from outside: ${john.getName()}`);

// with Symbols
// we only closure a light value returned by Symbol (and not
// the whole value stored in 'name' like in the closures implementation )
const PersonSymb = (function() {
  const ageSymbol = Symbol('asdasdsad');

  function Person(age) {
      this[ageSymbol] = age;
  }

  Person.prototype.getage = function() {
      return this[ageSymbol];
  };

  return Person;
}());

const p = new PersonSymb(12);
console.log('Person 3 name: ' + p.getage());
delete p[Symbol('asdasdsad')];
console.log('Person 3 name: ' + p.getage() + ' — stays private.');
console.log('Person 3 properties: ' + Object.getOwnPropertyNames(p));

// with WeakMaps
const PersonMap = (function() {
  // we use weakmaps so that if we delete an instance the reference
  // to that instance is deleted from a WeakMap stored in private
  // garbage collector can only collect values if they are weakly referenced
  // here is how the instances of PersonMap are referenced:
  // PersonMap closures (strong reference) -> Person;
  // Person closures -> private
  // private weakly references -> an isntance (see we set it as a key in
  // private.set(this, privateProperties) )
  // garbage collector can only remove those keys from a WeakMap if those keys
  // are weakly referenced; if we were to use a usual Map ( which references its keys and
  // values strongly garbage collector would fail ) because there would be no weak ref:
  // PersonMap -> Person -> private strongly references a key;
  // all arrows '->; are closures that are strong references too
  // since there is not a single weak ref farbage collector would skip an instance (a key)

  const private = new WeakMap();


  function Person(name) {
      const privateProperties = {
          name: name,
      };
      private.set(this, privateProperties);
  }


  Person.prototype.getName = function() {
      return private.get(this).name;
  };

  // if you can access another instance in this closure
  // functions that can access private can also access the privateProperties
  // of that instance:
  Person.prototype.compareTo = function(other) {
    const thisName = private.get(this).name;
    const otherName = private.get(other).name;
    return thisName.localeCompare(otherName);
  };

  Person.prototype.toString = function() {
    return private.get(this).name;
  };
  return Person;
}());

const pMap = new PersonMap('John');
console.log('Person 4 name: ' + pMap.getName());
delete pMap.name;
console.log('Person 4 name: ' + pMap.getName() + ' — stays private.');
console.log('Person 4 properties: ' + Object.getOwnPropertyNames(pMap));

// let's also leverage the compareTo method:
const people = [
  new PersonMap('Paul'),
  new PersonMap('John'),
  new PersonMap('George'),
  new PersonMap('Ringo'),
];
people.sort(function(personA, personB) {
  return personA.compareTo(personB);
});
console.log(`Sorted people: ${people.join(', ')}`);