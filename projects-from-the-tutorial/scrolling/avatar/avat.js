const avatar = document.querySelector('#avatar');
let currentBottom = avatar.getBoundingClientRect().bottom + window.pageYOffset;
let takenOut = false;
// if the page is already scrolled during loading
// (that is if you refresh having scrolled a little)
// the scroll event is triggered automatically
// on the document element as soon as the page is loaded
document.addEventListener('scroll', function() {

  if(window.pageYOffset >= currentBottom && !takenOut) {
    avatar.classList.add('taken-out');
    takenOut = true;
    return;
  }
  
  if(window.pageYOffset <= currentBottom && takenOut) {
    avatar.classList.remove('taken-out');
    takenOut = false;
    return;
  }
});