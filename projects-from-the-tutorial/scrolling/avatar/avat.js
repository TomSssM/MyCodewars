const avatar = document.querySelector('#avatar');
let currentBottom = avatar.getBoundingClientRect().bottom + window.pageYOffset;
let takenOut = false;
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