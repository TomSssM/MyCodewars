/* Heaps: MinHeap */

// left child: i * 2
// right child: i * 2 + 1
// parent: i / 2

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  insert(num) {
    this.heap.push(num);
    if(this.heap.length > 2) {
      let i = this.heap.length - 1;
      while(this.heap[i] < this.heap[Math.floor(i / 2)]) {
        [this.heap[i], this.heap[Math.floor(i / 2)]] = [this.heap[Math.floor(i / 2)], this.heap[i]];
        i = Math.floor(i / 2);
        if(i === 1) break;
      }
    }
  }

  remove() {
    if(this.heap.length < 2) return null;
    const smallest = this.heap[1];
    this.heap[1] = this.heap.pop();
    if(this.heap.length === 2) return smallest;

    let i = 1;
    let left = i * 2;
    let right = left + 1;

    while(this.heap[left] < this.heap[i] || this.heap[right] < this.heap[i]) {
      if(this.heap[left] < this.heap[right] || 
        (this.heap[right] === undefined && this.heap[left] < this.heap[i])) 
      {
        [this.heap[i], this.heap[left]] = [this.heap[left], this.heap[i]];
        i = left;
      } else {
        [this.heap[i], this.heap[right]] = [this.heap[right], this.heap[i]];
        i = right;
      }
      left = i * 2;
      right = left + 1;
    }

    return smallest;
  }

  sort() {
    const arr = [];
    while(this.heap.length > 1) {
      arr.push(this.remove());
    }
    return arr;
  }
}

const heap = new MinHeap();
heap.insert(7);
heap.insert(3);
heap.insert(1);
heap.insert(2);
heap.insert(10); 
console.log(...heap.heap);
// [null, 1, 2, 3, 7, 10]

//     1
//    / \
//   2   3
//  / \
// 7  10

console.log(heap.remove()); // 1
console.log(...heap.heap);
// [null, 2, 7, 3, 10]

//     2
//    / \
//   7   3
//  / 
// 10

const heap2 = new MinHeap();
heap2.insert(1);
heap2.insert(2);
heap2.insert(3);
heap2.insert(7);
heap2.insert(4);

console.log(heap2.heap);
// [null, 1, 2, 3, 7, 4]

console.log(heap2.remove()); // 1
console.log(...heap2.heap);
// [null, 2, 4, 3, 7]

const heap3 = new MinHeap();
heap3.insert(12);
heap3.insert(30);
heap3.insert(20);
heap3.insert(40);
heap3.insert(100);
heap3.remove();
console.log(...heap3.heap);
// [null, 20, 30, 100, 40]