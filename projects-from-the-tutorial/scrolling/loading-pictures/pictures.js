const isVisible = function(pic) {
  if(!(/placeholder/i.test(pic.getAttribute('src')))) return false;
  const coords = pic.getBoundingClientRect();
  return (coords.bottom > 0 && coords.top < document.documentElement.clientHeight);
};

const showPics = function() {
  const pics = Array.from(document.querySelectorAll('[data-src]')).filter(pic => isVisible(pic));
  pics.forEach(pic => pic.src = pic.dataset.src);
};

document.addEventListener('scroll', function() {
  showPics();
});

showPics();