const elms = Array.from(document.querySelectorAll('.focusable'));
let i = 0;
let firstTime = true;
document.addEventListener('keydown', function(e) {
  if(e.code === 'Tab') {
    e.preventDefault();
    if(firstTime) {
      elms[0].focus();
      firstTime = false;
      return;
    }
    if(!e.shiftKey) {
      i++;
      i %= elms.length;
    } else {
      i--;
      if(i < 0) i = elms.length - 1;
    }
    elms[i].focus();
  }
});