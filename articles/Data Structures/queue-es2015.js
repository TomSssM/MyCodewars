/* Queues */

class Queue {
  constructor() {
    this.collection = [];
  }

  print() {
    console.log(this.collection);
  }

  enqueue(element) {
    return this.collection.push(element);
  }

  dequeue() {
    return this.collection.shift();
  }

  get front() {
    return this.collection[0];
  }

  get size() {
    return this.collection.length;
  }

  isEmpty() {
    return (this.collection.length === 0);
  }
}

const q = new Queue(); 
q.enqueue('a'); 
q.enqueue('b');
q.enqueue('c');
q.print(); // => ['a', 'b', 'c']
q.dequeue(); // => 'a' <- ['b', 'c']
console.log(q.front); // => 'b'
q.print(); // => ['b', 'c']