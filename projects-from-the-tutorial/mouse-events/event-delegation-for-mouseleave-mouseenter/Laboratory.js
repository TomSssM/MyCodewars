const table = document.querySelector('table');
let currentElement = null;

table.addEventListener('mouseover', function(e) {
  // if the currentElement is still filled
  // with a td then we haven't left it yet
  // and can't transition any further
  if(currentElement) return;

  // make sure we are entering a td
  if(e.target.tagName === 'TD') {
    // at this point we assume that we can safely
    // fill up the currentElement variable and
    // change the background

    currentElement = e.target;
    e.target.style.background = 'pink';
  }
});

table.addEventListener('mouseout', function(e) {
  // we can't execute mouseout if we haven't entered
  // (and thus also filled currentElement) a td yet
  if(!currentElement) return;

  // we are going to check now what element
  // we are leaving for via relatedTarget
  let relatedTarget = e.relatedTarget;
  if(!relatedTarget) return;

  while(relatedTarget) {
    relatedTarget = relatedTarget.parentElement;
    if(relatedTarget === e.target) return;
  }

  // it is necessary to specify exactly the currentElement and not
  // e.target because if we move the mouse too fast, the mouseout is
  // going to be triggered on the wrong e.target, thus not clearing the
  // background of the currently highlighted element (remember that not every pixel triggers events)
  currentElement.style.background = '';

  currentElement = null;
});