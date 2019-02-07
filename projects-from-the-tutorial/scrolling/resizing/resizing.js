const elem = document.querySelector('#elem');
let currentScale = 1;

elem.addEventListener('wheel', function(e) {
  currentScale += e.deltaY / 1000;
  e.currentTarget.style.transform = `scale(${Math.max(currentScale, 0.2)})`;
  // or
  // if(currentScale < 0.2) currentScale = 0.2;
  // e.currentTarget.style.transform = `scale(${currentScale})`;
  e.preventDefault();
});