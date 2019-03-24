function binarySearch(arr = [], elm) {
  let start = 0;
  let end = arr.length - 1;
  function rec(start, end) {
    if(start > end) return -1;
    const middle = Math.floor((start + end) / 2);
    if(arr[middle] === elm) {
      return middle;
    } else if(elm < arr[middle]) {
      return rec(start, middle - 1);
    } else {
      return rec(middle + 1, end);
    }
  }
  return rec(start, end);
}

console.log(binarySearch([1,2,3,4,5,6,7], 4)); // 3
console.log(binarySearch([1,1,2,4,5,17,40,100], 4)); // 3
console.log(binarySearch([1,2,3], 4)); // -1
console.log(binarySearch([1,2,3,7,20,30,43,800], 4)); // -1
console.log(binarySearch([1,2,3,4,5], 1)); // 0