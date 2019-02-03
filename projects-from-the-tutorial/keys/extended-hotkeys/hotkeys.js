const pressed = new Set();

const runOnKeys = function(fn, ...keys) {
  for(let code of keys) {
    if(!pressed.has(code)) return;
  }
  // during the alert, if the visitor releases the keys, JavaScript does not get the "keyup" event
  // and pressed set will keep assuming that the key is pressed
  // so, to evade "sticky" keys, we reset the status
  // if the user wants to run the hotkey again - let them press all keys again
  pressed.clear();
  fn();
}

document.addEventListener('keydown', function(e) {
  if(e.repeat) return;
  pressed.add(e.code);
  runOnKeys(() => alert('success'), 'KeyD', 'Digit3');
});

document.addEventListener('keyup', function(e) {
  pressed.delete(e.code);
});