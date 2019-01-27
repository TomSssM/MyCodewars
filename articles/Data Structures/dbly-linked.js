var Node = function(data, prev) {
  this.data = data;
  this.prev = prev;
  this.next = null;
};

var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  
  this.add = function(data) {
    var node = new Node(data, this.tail);

    if(!this.head) this.head = node;
    if(this.tail) this.tail.next = node;

    this.tail = node;
  };

  this.remove = function(data) {
    if(!this.head) return null;

    var currentNode = this.head;

    if(currentNode.data === data) {
      this.head = this.head.next;
      if(this.head) this.head.prev = null;
      return currentNode.data;
    }

    while(currentNode.data !== data) {
      currentNode = currentNode.next;
    }

    if(currentNode.next) currentNode.next.prev = currentNode.prev;
    currentNode.prev.next = currentNode.next;
    return currentNode.data;
  };
};

const dbl = new DoublyLinkedList();

dbl.add('Cat');
dbl.remove('Cat');

console.dir(dbl);