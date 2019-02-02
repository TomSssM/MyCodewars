/* LinkedList */
/* A lil' Note: in Linked Lists we don't really
   ever delete or add anything, we only work
   with links and change where those point to */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  get size() {
    return this.length;
  }

  add(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    }
    else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.length++;
  }

  remove(element) {
    let currentNode = this.head;
    let previousNode;
    if (currentNode.element === element) {
      this.head = currentNode.next;
    }
    else {
      while (currentNode.element !== element) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
  }

  isEmpty() {
    return this.length === 0;
  }

  indexOf(element) {
    let currentNode = this.head;
    let index = -1;
    while (currentNode) {
      index++;
      if (currentNode.element === element) {
        return index;
      }
      currentNode = currentNode.next;
    }
    return -1;
  }

  elementAt(index) {
    let currentNode = this.head;
    let count = 0;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.element;
  }

  addAt(index, element) {
    const node = new Node(element);
    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;

    if (index > this.length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      this.head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    this.length++;
  }

  removeAt(index) {
    let currentNode = this.head;
    let previousNode;
    let currentIndex = 0;

    if (index < 0 || index >= this.length) {
      return null;
    }

    if (index === 0) {
      this.head = currentNode.next;
    }
    else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    this.length--;
    return currentNode.element;
  }
}
  
  const conga = new LinkedList();
  conga.add('Kitten');
  conga.add('Puppy');
  conga.add('Dog');
  conga.add('Cat');
  conga.add('Fish');

  console.log(conga.size); // => 5
  console.log(conga.removeAt(3)); // => 'Cat'
  console.log(conga.elementAt(3)); // => 'Fish'
  console.log(conga.indexOf('Puppy')); // => 1
  console.log(conga.size); // => 4