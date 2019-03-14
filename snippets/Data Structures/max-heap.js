/* Heaps: MaxHeap */

// left child: i * 2
// right child: i * 2 + 1
// parent: i / 2

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

  remove() {
    if(this.heap.length < 2) return null;
    const biggest = this.heap[1];
    this.heap[1] = this.heap.pop();
    if(this.heap.length === 2) return biggest;

    let i = 1;
    let left = i * 2;
    let right = left + 1;

    while(this.heap[left] > this.heap[i] || this.heap[right] > this.heap[i]) {
      if(this.heap[left] > this.heap[right] || 
        (this.heap[right] === undefined && this.heap[left] > this.heap[i])) 
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

    return biggest;
  }

  sort() {
    const arr = [];
    while(this.heap.length > 1) {
      arr.push(this.remove());
    }
    return arr;
  }
}

const heap = new MaxHeap();

heap.insert(3);
heap.insert(2);
heap.insert(1);
heap.insert(7);
heap.insert(4);
heap.insert(12);

console.log(...heap.heap);
// [null, 12, 4, 7, 2, 3, 1]

//      12
//    /    \
//   4      7
//  / \    /
// 2   3  1

console.log(heap.remove()); // 12
console.log(heap.remove()); // 7
console.log(...heap.heap);
// [null, 4, 3, 1, 2]

//     4
//    / \
//   3   1
//  /       
// 2       