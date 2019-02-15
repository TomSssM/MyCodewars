const put = document.getElementById('special');
const warn = document.querySelector('.warn');

let capsOn = null;

document.addEventListener('keydown', function(e) {
  // we can't toggle capsOn if we haven't initiaized the
  // state of capsOn yet as the user might already have
  // had capsLock on when he came to the website
  if(capsOn === null && e.code === 'CapsLock') return;

  // also if the key we press is either a number or space which
  // produces a special character then we can't tell anything about
  // capsLock so we should return
  if(e.key.toUpperCase() === e.key.toLowerCase()) return;

  // we deduce that the user has capsLock on if the letter he entered is uppercase and shift was off
  // or maybe we have already initialized capsOn before (ensuring that capslock is indeed off; false 
  // and not null means we have already set capsOn at some point before) and it so happens that the
  // key the user pressed is indeed capsLock
  if(((e.key === e.key.toUpperCase()) && !e.shiftKey) || (capsOn === false && e.code === 'CapsLock')) {
    capsOn = true;
  } else {
    capsOn = false;
  }
}, true);

put.onfocus = put.onkeydown = (() => toggleWarn(capsOn));

put.onblur = function() {
  toggleWarn(false);
};

const toggleWarn = function(on) {
  if(on) {
    warn.hidden = false;
  } else {
    warn.hidden = true;
  }
};