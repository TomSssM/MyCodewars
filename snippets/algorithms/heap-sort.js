// all right here is how heapSort works:
// imagine we have an array: [15, 19, 10, 7, 17, 16]
// let's imagine it as a heap:
//              15
//            /    \
//           19     10
//          /  \   /
//         7   17 16
// it is a right but it isn't sorted
// we will need a MaxHeap ( later I explain why )
// we create a function to swap an element with the bigger
// of its children. Once that is done we can start swapping sifting
// down each element starting from the last parent. But how do we get that last
// parent's index? Well you will, if you plug in the number of all 
// elements into the formula:
// lastParent = Math.floor((numOfAllElem - 2) / 2);
// just look to the right of the array: 7, 17 and 16 are all leaves!
// thus it only makes sense to consider the parentNodes starting from the
// one at 2 (Math.floor((6 - 2) / 2); after sifting them down as appropriate our
// heap is going to be built:
// [19, 17, 16, 7, 15, 10]
//              19
//            /    \
//           17     16
//          /  \   /
//         7   15 10
// now we are going to consider one part of the array as heap
// ( instead of the whole array ) and the other part as the sorted
// portion of an array. What does that mean?
// When we remove the item from the heap we normally just dispose of it
// and instead put the last item ( rightmost leaf or last item of the array ) in
// its place. So why not simply swap the root with the last item and claim that
// everything but the last element is the heap (everything over ^ is a heap):
// [10, 17, 16, 7, 15, 19]
//  ^   ^   ^   ^  ^
//              10
//            /    \
//           17     16
//          /  \  
//         7   15
// however our heap needs to be sorted now. Luckily it is
// super easy if we siftDown the current Root (it's 10)
// [17, 15, 16, 7, 10, 19]
//  ^   ^   ^   ^  ^
//              17
//            /    \
//           15     16
//          /  \  
//         7   10
// now let's once again remove the root ( in reality just swap it with the
// last element of the heap ( it's 10 ))
// [10, 15, 16, 7, 17, 19] ( remember what ^ means? )
//  ^   ^   ^   ^
// eventually the array is going to be sorted

function heapSort(arr) {
  let end = arr.length - 1;

  heapify();

  while(end > 0) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    end--;
    siftDown(0, end);
  }
    
  function siftDown(ind, end) {
    let left = ind * 2;
    let right = left + 1;
    while(arr[left] > arr[ind] || arr[right] > arr[ind]) {
      if(arr[left] > arr[right]) {
        if(left > end) break;
        [arr[left], arr[ind]] = [arr[ind], arr[left]];
        ind = left;
      } else {
        if(right > end) break;
        [arr[right], arr[ind]] = [arr[ind], arr[right]];
        ind = right;
      }
      left = ind * 2;
      right = left + 1;
    }
  }

  function heapify() {
    let lastPar = Math.floor((arr.length - 2) / 2);
    while(lastPar >= 0) siftDown(lastPar--, end);
  }

  return arr;
}

console.log(heapSort([15,19,10,7,17,16])); // [7, 10, 15, 16, 17, 19]
console.log(heapSort([7,5,2,4,3,9])); // [2, 3, 4, 5, 7, 9]
console.log(heapSort([9,7,5,4,3,1])); // [1, 3, 4, 5, 7, 9]
console.log(heapSort([1,2,3,4,5,6])); // [1, 2, 3, 4, 5, 6]

// the same complexity as Merge Sort:
// this way it gets pretty close to linear, here is the time complexity:
// ╔══════════════════════════════════╦══════════════════╗
// ║          Average / Best          ║    Worst Case    ║
// ╠══════════════════════════════════╬══════════════════╣
// ║           Same as Worst          ║    O(n log(n))   ║
// ╚══════════════════════════════════╩══════════════════╝
// however if asked which is better: Heap Sort or Quick Sort
// Quick Sort is better cause it almost doesn't do unnecessary swaps
// whist both HeapSort and MergeSort go over 100% of elements doing something
// MergeSort involves writing to new arrays and after that writing back to the
// original array; (with QuickSort you don't swap what is already ordered)