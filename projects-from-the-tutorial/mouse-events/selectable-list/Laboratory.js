const ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function(e) {
  e.preventDefault();
});

ul.addEventListener('click', function(e) {
  if(e.target.tagName !== 'LI') return;

  const currentLi = e.target;

  if(currentLi.classList.contains('selected')) {
    if(e.ctrlKey || e.metaKey) {
      currentLi.classList.remove('selected');
      return;
    } else {
      return;
    }
  }

  Array.from(e.currentTarget.querySelectorAll('.selected')).forEach(li => li.classList.remove('selected'));
  currentLi.classList.add('selected');
});