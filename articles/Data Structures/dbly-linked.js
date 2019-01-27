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
      if(this.tail.data === data) this.tail = null;
      return currentNode.data;
    }

    while(currentNode.data !== data) {
      currentNode = currentNode.next;
    }

    if(currentNode.next) currentNode.next.prev = currentNode.prev;
    currentNode.prev.next = currentNode.next;
    return currentNode.data;
  };

  this.reverse = function() {
    if(!this.head) return null;

    var currentNode = this.head;
    var temp;

    while(currentNode) {
      temp = currentNode.next;
      currentNode.next = currentNode.prev;
      currentNode.prev = temp;
      currentNode = currentNode.prev;
    }

    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
  }
};

const dbl = new DoublyLinkedList();

dbl.add('Cat');
dbl.remove('Cat');
dbl.add('Cat');
dbl.add('Dog');
dbl.add('Robert');
dbl.add('Markdown');
dbl.reverse();