// this functions prevents scrolling of the document
// if we can't scroll inside textarea anymore (if we scrolled all the way down / up)

document.addEventListener('wheel', function(e) {
  if(e.target.tagName !== 'TEXTAREA') return;
  const textarea = e.target;
  if((e.deltaY < 0 && !textarea.scrollTop) || (e.deltaY > 0 && (textarea.scrollTop + textarea.clientHeight + textarea.clientTop) >= textarea.scrollHeight)) {
    e.preventDefault();
  }
});