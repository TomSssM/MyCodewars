const doSomeHeaveStuff = function() {
  for(let y = 0; y < 7e5; y++) {
    y + 1;
  }
};

for(let i = 0; i <= 7e3; i++) {
  doSomeHeaveStuff();
  // setTimeout(() => postMessage(i / 10), 4 * (i + 1));
  postMessage(i / 10);
}