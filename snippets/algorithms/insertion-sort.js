function insertionSort(arr) {
  const len = arr.length;
  let j;
  for(let i = 1; i < len; i++) {
    j = i;
    while(j > 0 && arr[j-1] > arr[j]) {
      [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
      j--;
    }
  }
  return arr;
}

console.log(insertionSort([7,5,2,4,3,9])); // [2, 3, 4, 5, 7, 9]
console.log(insertionSort([9,7,5,4,3,1])); // [1, 3, 4, 5, 7, 9]
console.log(insertionSort([1,2,3,4,5,6])); // [1, 2, 3, 4, 5, 6]