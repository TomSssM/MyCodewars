function linearSearch(arr = [], elm) {
  const l = arr.length;
  for(let i = 0; i < l; i++) {
    if(arr[i] === elm) return i;
  }
  return -1;
}

const arr = [1,2,3,5,6,7,8];
console.log(linearSearch(arr, 3)); // 2
console.log(linearSearch(arr, 10)); // -1