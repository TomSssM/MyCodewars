// console.log("Hello\nWorld");
function prefill(n, v) {
  if(typeof n === 'boolean' || ~~n != n || +n < 0) throw new TypeError(n + " is invalid");
  n = +n;
  let arr = [];
  arr.length = n;
  return arr.fill(v);
}