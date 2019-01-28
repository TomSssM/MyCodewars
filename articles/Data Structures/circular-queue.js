class CircularQueue {
  constructor(size) {
    this.queue = [];
    this.read = 0;
    this.write = 0;
    this.size = size;

    while (size > 0) {
      this.queue.push(null);
      size--;
    }
  }

  print() {
    console.log(this.queue);
  }

  enqueue(item) {
    if(this.queue[this.write] !== null) return null;
    this.queue[this.write] = item;
    this.write = (this.write + 1) % this.size;
    return item;
  }

  dequeue() {
    const item = this.queue[this.read];
    if(item === null) return null;
    this.queue[this.read] = null;
    this.read = (this.read + 1) % this.size;
    return item;
  }
}

const cirQ = new CircularQueue(4);

cirQ.enqueue('hi!');
cirQ.enqueue(':)');
cirQ.enqueue('>0');
cirQ.dequeue();