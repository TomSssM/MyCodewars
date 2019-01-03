const ul = document.querySelector('ul.tree');
const lis = Array.from(document.querySelectorAll('.tree li'));
lis.forEach(li => {
  const span = document.createElement('span');
  li.insertBefore(span, li.firstChild);
  span.appendChild(span.nextSibling);
})

ul.addEventListener('click', function(e) {
  if(e.target.tagName === 'SPAN') {
    // now you could write code like below

    // const li = e.target.parentElement;
    // if(li.lastElementChild.tagName === 'UL') li.lastElementChild.classList.toggle('display-none');

    // but why would you?
    // I mean seriously
    // why?
    // here is a way way way better solution
    // ALWAYS remember that you can use getElementsByClassName and even querySelector
    // with element nodes
    const ul = e.target.parentElement.querySelector('ul');
    if(ul) ul.classList.toggle('display-none');
    // and there you have it duders
  }
});