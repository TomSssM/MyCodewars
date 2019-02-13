class Node {
  constructor(data, prev) {
    this.data = data;
    this.prev = prev;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data) {
    const node = new Node(data, this.tail);

    if (!this.head) this.head = node;
    if (this.tail) this.tail.next = node;

    this.tail = node;
  }

  remove(data) {
    if (!this.head) return null;

    let currentNode = this.head;

    if (currentNode.data === data) {
      this.head = this.head.next;
      if (this.head) this.head.prev = null;

      // if both head and tail were pointing to the same node....
      if (this.tail.data === data) this.tail = null;

      return currentNode.data;
    }

    while (currentNode.data !== data) {
      currentNode = currentNode.next;
    }
    if (currentNode.next) {
      currentNode.next.prev = currentNode.prev;
    } else {
      // then we are looking at tail...
      this.tail = this.tail.prev;
    }
    currentNode.prev.next = currentNode.next;

    return currentNode.data;
  }

  reverse() {
    if (!this.head) return null;

    let currentNode = this.head;
    let temp;

    while (currentNode) {
      temp = currentNode.next;
      currentNode.next = currentNode.prev;
      currentNode.prev = temp;
      currentNode = currentNode.prev;
    }

    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
}

const dbl = new DoublyLinkedList();

dbl.add('Cat');
dbl.remove('Cat'); // => 'Cat'
dbl.add('Cat');
dbl.add('Dog');
dbl.add('Robert');
dbl.add('Markdown');
dbl.reverse(); // => 'Markdown' -> 'Robert' -> 'Dog' -> 'Cat' -> null
// we can also remove tail safely
dbl.remove("Cat"); // => 'Cat'
console.log(dbl); // => 'Markdown' -> 'Robert' -> 'Dog' -> null