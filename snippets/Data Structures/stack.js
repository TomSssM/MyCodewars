/* Stacks! */

// functions: push, pop, peek, length
// since JS arrays have the crucial functions of a stack they can be used as stacks

const letters = []; // this is our stack

const word = "freeCodeCamp"

let rword = "";

// put letters of word into stack
for (let i = 0; i < word.length; i++) {
  letters.push(word[i]);
}

// pop off the stack in reverse order
for (let i = 0; i < word.length; i++) {
  rword += letters.pop(); 
}

if (rword === word) {
  console.log(word + " is a palindrome.");
}
else {
  console.log(word + " is not a palindrome.");
}

// Creates a stack from the ground up ( no arrays )

class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }
  
  // Adds a value onto the end of the stack
  push(value) {
    this.storage[this.count] = value;
    this.count++;
  }
    
  // Removes and returns the value at the end of the stack
  pop() {
    if (this.count === 0) {
        return undefined;
    }

    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }
    
  get size() {
    return this.count;
  }
    
  // Returns the value at the end of the stack
  peek() {
    return this.storage[this.count-1];
  }
}

const myStack = new Stack();

myStack.push(1);
myStack.push(2);

console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
console.log('_______________');
myStack.push("freeCodeCamp");

console.log(myStack.size);
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());