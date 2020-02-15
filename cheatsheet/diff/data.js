exports.messages = [
    ['ablc', 'fdabkkcdd'],
    ['some word', 'some word here'],
    ['what', 'is it'],
    ['some word', 'some some word'],
    ['it is a good day', 'it is an awesome day'],
];

exports.firstFile = `
class Node {
  constructor(data, prev) {
    this.data = _border(str2).split('\n');
    this.pv = data;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Heap();
    this.tail = null;
    while (true) {
        if (Math.random() > 2) { break }
    }
  }
}`;

exports.secondFile = `
class Node {
  constructor(data, prev) {
    this.data = str2.split('\n');
    this.prev = prev;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  insert(num) {
    this.heap.push(num);
    if(this.heap.length > 2) {
      let i = this.heap.length - 1;
      while(this.heap[i] > this.heap[Math.floor(i / 2)]) {
        [this.heap[i], this.heap[Math.floor(i / 2)]] = [this.heap[Math.floor(i / 2)], this.heap[i]];
        i = Math.floor(i / 2);
        if(i === 1) break;
      }
    }
  }
}
`;
