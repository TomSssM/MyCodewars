// prioruty queue is only different in the way it implements the
// enqueue method, which takes the value and priority and
// inserts it according to the priority in the queue
// note: priority 1 comes before priority 3 (3 is last)

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  printCollection() {
    console.log(this.collection);
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;

      for (let i = 0; i < this.collection.length; i++) {
        if (element[1] < this.collection[i][1]) { //checking priorities
          this.collection.splice(i, 0, element);
          added = true;
          break;
        }
      }

      if (!added) {
        this.collection.push(element);
      }
    }
  }

  dequeue() {
    const value = this.collection.shift();
    return value[0];
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

const pq = new PriorityQueue(); 
pq.enqueue(['Beau Carnes', 2]); 
pq.enqueue(['Quincy Larson', 3]);
pq.enqueue(['Ewa Mitulska-Wójcik', 1]);
pq.enqueue(['Briana Swift', 2]);
pq.printCollection(); // this one might be the same as the last do put a breakpoint in our debugger :)
console.log(pq.dequeue()); // => 'Ewa Mitulska-Wójcik'
console.log(pq.front); // => ['Beau Carnes', 2]
pq.printCollection(); // => ['Beau Carnes', 'Briana Swift', 'Quincy Larson'