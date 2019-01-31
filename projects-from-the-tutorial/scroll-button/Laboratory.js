const button = document.querySelector('#button');

// old crutch solution:
// button.addEventListener('click', function() {
//   const int = setInterval(() => {
//     if(window.pageYOffset === 0) clearInterval(int);
//     window.scrollBy(0, -40);
//   }, 4);
// });

// cool stuff:
button.addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});