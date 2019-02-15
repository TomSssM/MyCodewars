/**
  Focus on the mouse. Then use arrow keys to move it
  P.S. Don’t put event handlers anywhere except the #mouse element.
  P.P.S. Don’t modify HTML/CSS, the approach should be generic and 
  work with any element.
*/

const mouse = document.querySelector('#mouse');
const p = document.querySelector('p');

// try setting hidden to true in HTML for #mouse
// and then disabling it here to alleviate the
// unpleasant flickering
// mouse.hidden = false;

let currentScrollY = window.pageYOffset;
let currentScrollX = window.pageXOffset;

// let's scroll the window for a split second (the user
// won't be too bothered) so we can calculate the metrics
// aright even if there is a scroll
window.scroll(0, 0);

let coords = p.getBoundingClientRect();
let minoffsettop = coords.top + coords.bottom;
let minoffsetleft = coords.left + window.pageXOffset;

coords = document.body.getBoundingClientRect();
let maxoffsetleft = document.body.offsetWidth - mouse.offsetWidth;
let maxoffsettop = coords.bottom - mouse.offsetHeight;

let currentOffsetLeft = 0;
let currentOffsetTop = 0;

// scrolling it back
// (there are also some genious implementations in
// the alternative tutorial version)
window.scroll(currentScrollX, currentScrollY);

// we could do that:

// let isFocused = false;

// mouse.addEventListener('focus', function() {
//   isFocused = true;
// });

// mouse.addEventListener('blur', function() {
//   isFocused = false;
// });

// and then do this: if(!isFocused) return; inside
// the document.onkeydown event
// but what is the point?
// keydown events are triggered only on the one
// currently focused event (document.activeElement)
// so all we should do is set a keydown event on #mouse

mouse.addEventListener('keydown', function(e) {
  // we can't do return false for this function as
  // returning false works onlyfor on + eventtype events
  // remember? when an additional event (set via addEventListener)
  // is triggered a wrapper on + eventType event is created and
  // obviously it doesn't return false, so the default isn't prevented
  //  e.preventDefault makes sure that on + eventType is powerless in this case
  e.preventDefault();

  switch(e.code) {
    case 'ArrowUp':
      changeMarginVert(-40);
      break;
    case 'ArrowDown':
      changeMarginVert(40);
      break;
    case 'ArrowLeft':
      changeMarginHor(-40);
      break;
    case 'ArrowRight':
      changeMarginHor(40);
      break;
  }
});

const changeMarginHor = function(val) {
  currentOffsetLeft += val;
  currentOffsetLeft = Math.max(currentOffsetLeft, minoffsetleft);
  currentOffsetLeft = Math.min(currentOffsetLeft, maxoffsetleft);
  mouse.style.left = `${currentOffsetLeft}px`;
};

const changeMarginVert = function(val) {
  currentOffsetTop += val;
  currentOffsetTop = Math.max(currentOffsetTop, minoffsettop);
  currentOffsetTop = Math.min(currentOffsetTop, maxoffsettop);
  mouse.style.top = `${currentOffsetTop}px`;
};

changeMarginHor(minoffsetleft);
changeMarginVert(minoffsettop);