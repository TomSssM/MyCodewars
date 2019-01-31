/* Sets */

// since the Set class exists since ES2015 we
// are going to call our implementation mySet

class mySet {
  constructor() {
    // the collection will hold the set
    this.collection = [];
  }

  // this method will check for the presence of an element and return true or false
  has(element) {
    return (this.collection.indexOf(element) !== -1);
  };

  // this method will return all the values in the set
  get values() {
    return this.collection;
  }

  // this method will add an element to the set
  add(element) {
    if (!this.has(element)) {
      this.collection.push(element);
      return true;
    }
    return false;
  }

  // this method will remove an element from a set
  remove(element) {
    if (this.has(element)) {
      const index = this.collection.indexOf(element);
      this.collection.splice(index, 1);
      return true;
    }
    return false;
  }

  // this method will return the size of the collection
  get size() {
    return collection.length;
  }

  // this method will return the union of two sets
  union(otherSet) {
    const unionSet = new mySet();
    const firstSet = this.values;
    const secondSet = otherSet.values;
    
    firstSet.forEach((e) => unionSet.add(e));
    secondSet.forEach((e) => unionSet.add(e));
    return unionSet;
  }

  // this method will return the intersection of two sets as a new set
  intersection(otherSet) {
    const intersectionSet = new mySet();
    const firstSet = this.values;
    firstSet.forEach((e) => {
      if (otherSet.has(e)) {
        intersectionSet.add(e);
      }
    });
    return intersectionSet;
  }

  // this method will return the difference of two sets as a new set
  difference(otherSet) {
    const differenceSet = new mySet();
    const firstSet = this.values;
    firstSet.forEach((e) => {
      if (!otherSet.has(e)) {
        differenceSet.add(e);
      }
    });
    return differenceSet;
  };

  // this method will test if the set is a subset of a different set
  subset(otherSet) {
    const firstSet = this.values;
    return firstSet.every(value => otherSet.has(value));
  };
}

const setA = new mySet();  
const setB = new mySet();

setA.add("a");
setA.add("c");

setB.add("a");
setB.add("b");  
setB.add("c");  
setB.add("d");

console.log(setA.subset(setB)); // => true

setA.add(true);
setA.add(12);
console.log(setA.intersection(setB).values); // => [a, c]
console.log(setB.difference(setA).values); // => [b, d]

// built-in ES2015 Set:
const setC = new Set();  
const setD = new Set();

setC.add("a");  
setC.add(true);

setD.add("a");  
setD.add("b");  
setD.add("c");  
setD.add("d");

console.log(setD.values()) // => {a,b,c,d}
setD.delete("a");
setD.delete("c");

console.log(setD.has("a")); // => false
console.log(setD.add("d")); // not gonna add it