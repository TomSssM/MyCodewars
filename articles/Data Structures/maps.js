/* Maps */

class myMap {
  constructor() {
    this.collection = {};
    this.count = 0;
  }

  get size() {
    return this.count;
  }

  set(key, value) {
    this.collection[key] = value;
    this.count++;
  }

  has(key) {
    return (key in this.collection);
  }

  get(key) {
    return (key in this.collection) ? this.collection[key] : null;
  }

  delete(key) {
    if (key in this.collection) {
      delete this.collection[key];
      this.count--;
    }
  }

  get values() {
    const result = [];

    // for (let key of Object.keys(this.collection)) {
    //   result.push(this.collection[key]);
    // }

    Object.keys(this.collection).forEach(key => result.push(this.collection[key]));
    return (result.length > 0) ? result : null;
  }

  clear() {
    this.collection = {};
    this.count = 0;
  }
}

const map = new myMap();
map.set('arms', 2);
map.set('fingers', 10);
map.set('eyes', 2);
map.set('belley button', 1);

console.log(map.get('fingers')); // => 10
console.log(map.size); // => 4
console.log(map.values); // => [2, 10, 2, 1]

// ES6 built-in Map class implementation:
const map2 = new Map();
map2.has('hands'); // => false
map2.entries(); // MapIterator

const keyObj1 = {};
const keyObj2 = {};
const keyFunc1 = function() {};
const keyFunc2 = function() {};

map2.set('hello', 'string value');

map2.set(keyObj1, 'obj one value');
map2.set(keyObj2, 'obj two value');

map2.set(keyFunc1, 'func one value');
map2.set(keyFunc2, 'func two value');

map2.set(12, 'numeric value');

map2.set(NaN, 'NaN value');

console.log(map2.size); // => 7
console.log(map2.get('hello')); // => 'string value

console.log(map2.get(keyObj1)); // => 'obj one value'
console.log(map2.get(keyObj2)); // => 'obj two value'

console.log(map2.get(keyFunc1)); // => 'func one value'
console.log(map2.get(keyFunc2)); // => 'func two value'

console.log(map2.get(12)); // => 'numeric value'
console.log(map2.get(NaN)); // => 'NaN value'