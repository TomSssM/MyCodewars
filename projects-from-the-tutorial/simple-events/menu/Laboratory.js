const span = document.querySelector('span');
const i = document.querySelector('i');
const ul = document.querySelector('#drink-list');
span.addEventListener('click', function(){
  if(ul.style.display === 'none') {
    ul.style.display = 'block';
    i.classList.remove('fa-angle-right');
    i.classList.add('fa-angle-down');
  } else {
    ul.style.display = 'none';
    i.classList.add('fa-angle-right');
    i.classList.remove('fa-angle-down');
  }
});