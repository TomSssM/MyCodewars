const arr = document.querySelector('.arrow');
let prevScroll = 0;
let scrollingUp = false;
document.addEventListener('scroll', function() {

  // if the button points up and we can't show it
  if((window.pageYOffset < document.documentElement.clientHeight) && arr.classList.contains('up')) {
    arr.hidden = true;

    // if we should either show button or change up-button to down-button
  } else if(window.pageYOffset >= document.documentElement.clientHeight) {
    if(arr.classList.contains('up')) arr.hidden = false;

    // we want to change the down button to up as soon as
    // it so happens that we are scrolling down and 
    // the upper scroll gets bigger than the viewport

    // however when we are scrolling up (after pressing the up arrow) 
    // the scroll event is triggered many times (because of
    // bevavior: 'smooth') and many of those times
    // the upper scroll is going to be bigger than the viewport but we
    // shouldn't change the down button to up
    // so we won't enter the following if statement to do so if
    // we are actually scrolling up

    if(arr.classList.contains('down') && !scrollingUp) {
      arr.classList.remove('down');
      arr.classList.add('up');
    }
  }
});

// good ole bug :)
document.dispatchEvent(new Event('scroll'));

arr.addEventListener('click', function() {
  if(arr.classList.contains('up')) {
    prevScroll = window.pageYOffset;
    window.scroll({
      top: 0,
      left: window.pageXOffset,
      behavior: 'smooth'
    });

    // yeap we are going to be scrolling up now
    // so that the arrow doesn't suddenly change
    // direction again as soon as we hit the up-button
    scrollingUp = true;

    // change the direction of the arrow (button whatever :))
    arr.classList.remove('up');
    arr.classList.add('down');
  } else if(arr.classList.contains('down')) {
    window.scroll({
      top: prevScroll,
      left: window.pageXOffset,
      behavior: 'smooth'
    });

    // now here is the magic: no need to change the
    // direction of the arrow now; look above, it is
    // actually going to happen automatically once the upper scroll
    // gets bigger than the viewport
    // however in order for us to enter the if statement to do so
    // we should make sure that we are not scrolling up,
    // that is why scrollingUp = false
    scrollingUp = false;
  }
});

document.addEventListener('wheel', function(e) {

  // here is another cheveat: imagine we hit the up button,
  // arrow changed direction and that is it
  // then instead of hitting the down button the user simply starts
  // scrolling down with like the mouse wheel or something
  // seems all right, however, when the time comes for the arrow
  // to change direction it doesn't cause scrollingUp is still true!!
  // that is why we should set it to false whenever the user scrolls
  // on his own so we can enter the if statement to change the direction of the arrow :)
  if(e.deltaY > 0) scrollingUp = false;
})