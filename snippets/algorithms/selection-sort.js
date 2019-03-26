function selectionSort(arr) {
  const len = arr.length;
  let minIdx;
  for(let i = 0; i < len; i++) {
    minIdx = i;
    for(var  j = i+1; j<len; j++) {
       if(arr[j] < arr[minIdx]){
          minIdx = j;
       }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

console.log(selectionSort([7,5,2,4,3,9])); // [2, 3, 4, 5, 7, 9]
console.log(selectionSort([9,7,5,4,3,1])); // [1, 3, 4, 5, 7, 9]
console.log(selectionSort([1,2,3,4,5,6])); // [1, 2, 3, 4, 5, 6]