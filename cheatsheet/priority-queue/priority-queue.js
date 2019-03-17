const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
    this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.size() === this.maxSize) throw new Error('tar-tar sauce');
    this.heap.push(data, priority);
	}

	shift() {
		if(this.isEmpty()) throw new Error('tar-tar sauce');
    return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

const q = new PriorityQueue();

const nodes = [
  { priority: 10, data: 1 },
  { priority: 20, data: 2 },
  { priority:  5, data: 3 },
  { priority:  0, data: 4 },
  { priority:  8, data: 5 },
  { priority: 12, data: 6 },
  { priority: 17, data: 7 },
  { priority: 15, data: 8 },
];

const expectedData = [2, 7, 8, 6, 1, 5, 3, 4]
nodes.forEach(node => q.push(node.data, node.priority));
expectedData.forEach(exp => console.log(exp === q.shift()));
module.exports = PriorityQueue;