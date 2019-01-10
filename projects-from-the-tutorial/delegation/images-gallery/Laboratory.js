const largeImg = document.querySelector('#largeImg');
document.addEventListener('click', function(e) {
  if(!document.querySelector('#thumbs').contains(e.target)) return;
  e.preventDefault();
  let link = e.target;
  // let img = e.target.tagName === 'IMG' ? e.target : null;
  while(link.tagName !== 'A') {
    link = link.parentElement;
  }
  // img = img ? img : link.querySelector('img');
  largeImg.src = link.getAttribute('href');
  largeImg.alt = link.getAttribute('title');
});