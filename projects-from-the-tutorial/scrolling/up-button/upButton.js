const arrow = document.querySelector('#arrowTop');
let isShowing = false;
document.addEventListener('scroll', function() {
  if(window.pageYOffset > document.documentElement.clientHeight) {
    !isShowing && (arrow.style.opacity = '1');
    isShowing = true;
  } else {
    isShowing && (arrow.style.opacity = '0');
    isShowing = false;
  }
  // or
  // arrow.hidden = (window.pageYOffset < document.documentElement.clientHeight); // $$$$
});
arrow.addEventListener('click', function() {
  window.scroll({
    top: 0,
    left: window.pageXOffset, // $$
    behavior: 'smooth'
  });
});

// forcing the browser to always check whether or
// not to show the button (the reason for this is
// probably a bug in the browser itself,   
// don't worry about it :) 
document.dispatchEvent(new Event('scroll'));