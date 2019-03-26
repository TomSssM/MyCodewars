function mergeSort(arr) {
  const len = arr.length;
  if(len < 2) return arr;

  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  const lLen = left.length;
  const rLen = right.length;

  let l = 0;
  let r = 0;
  
  while(l < lLen && r < rLen) {
    if(left[l] < right[r]) {
      result.push(left[l++]);
    } else result.push(right[r++]);
  }
  return [...result, ...left.slice(l), ...right.slice(r)];
}

console.log(mergeSort([7,5,2,4,3,9])); // [2, 3, 4, 5, 7, 9]
console.log(mergeSort([9,7,5,4,3,1])); // [1, 3, 4, 5, 7, 9]
console.log(mergeSort([1,2,3,4,5,6])); // [1, 2, 3, 4, 5, 6]