const button = document.querySelector('#button');
button.addEventListener('click', function() {
  const int = setInterval(() => {
    if(window.pageYOffset === 0) clearInterval(int);
    window.scrollBy(0, -40);
  }, 4);
});