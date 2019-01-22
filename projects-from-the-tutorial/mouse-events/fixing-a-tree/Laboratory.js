// Now here is a thing: How to catch clicks only on text nodes of li elemetns
// of our menu without using span to wrap the text into. Well the solution is
// as follows:

const ul = document.querySelector('.tree');

ul.addEventListener('click', function(e) {
  const target = e.target;

  if(!(target.tagName === 'LI')) return;

  const ul = e.target.querySelector('ul');

  if(!ul) return; // do the magic only if there is an ul to hide / show

  // wrap the text into a temporary span element
  const span = document.createElement('span');
  const liText = target.firstChild.nodeType === 3 ? target.firstChild : '';

  target.prepend(span);
  span.append(liText);

  // thus the solution in a nutshell is: create a temporary span, use the event's object
  // clientX / Y coordinates to check if the deepest element is indeed span ( meaning that the user clicked exactly
  // on text and not the block level li) and if so do the same as in ../../delegation/tree/Laboratory.js
  
  if(document.elementFromPoint(e.clientX, e.clientY).tagName === 'SPAN') {
    ul.style.display = ul.style.display ? '' : 'none'; // clever right :)
  }

  // and don't forget to delete the temporary span
  span.before(liText);
  span.remove();
});