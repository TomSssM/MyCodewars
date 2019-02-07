const arr = document.querySelector('.arrow');
let prevScroll = 0;

document.addEventListener('scroll', function(e) {
  if((window.pageYOffset < document.documentElement.clientHeight) && arr.classList.contains('up')) {
    arr.hidden = true;
  } else if(window.pageYOffset >= document.documentElement.clientHeight) {
    if(arr.classList.contains('up')) arr.hidden = false;
    if(arr.classList.contains('down')) {
      arr.classList.remove('down');
      arr.classList.add('up');
    }
  }
});

document.dispatchEvent(new Event('scroll'));

arr.addEventListener('click', function() {
  if(arr.classList.contains('up')) {
    prevScroll = window.pageYOffset;
    window.scroll(window.pageXOffset, 0);
    arr.classList.remove('up');
    arr.classList.add('down');
  } else if(arr.classList.contains('down')) {
    window.scroll(window.pageXOffset, prevScroll);
    arr.classList.remove('down');
    arr.classList.add('up');
  }
});