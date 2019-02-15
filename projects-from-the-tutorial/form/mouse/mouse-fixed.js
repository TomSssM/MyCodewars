const mouse = document.querySelector('#mouse');

mouse.addEventListener('focus', function(e) {
  const coords = mouse.getBoundingClientRect();
  mouse.style.position = 'absolute';
  mouse.style.top = `${coords.top + window.pageYOffset}px`;
  mouse.style.left = `${coords.left + window.pageXOffset}px`;
});

mouse.addEventListener('keydown', function(e) {
  let currentTop = parseInt(mouse.style.top, 10);
  let currentLeft = parseInt(mouse.style.left, 10);
  // we forgot to do e.preventDefault() but through mere
  // experiment i found out scrolling along to be a useful feature
  
  switch(e.code) {
    case 'ArrowUp':
      mouse.style.top = `${Math.max(currentTop - mouse.offsetHeight, 0)}px`;
      break;
    case 'ArrowDown':
      mouse.style.top = `${Math.min(currentTop + mouse.offsetHeight, document.documentElement.scrollHeight - mouse.offsetHeight)}px`;
      break;
    case 'ArrowLeft':
      mouse.style.left = `${Math.max(currentLeft - mouse.offsetWidth, 0)}px`;
      break;
    case 'ArrowRight':
      mouse.style.left = `${Math.min(currentLeft + mouse.offsetHeight, document.documentElement.scrollWidth - mouse.offsetWidth)}px`;
      break;
  }
});