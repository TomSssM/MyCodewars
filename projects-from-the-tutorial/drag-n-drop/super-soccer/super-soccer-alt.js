let isDragging = false;

document.addEventListener('mousedown', function(event) {
  let dragElement = event.target.closest('.draggable');

  if (!dragElement) return;

  event.preventDefault(); // $$

  // dragElement.ondragstart = function() {
  //     return false;
  // };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  // on drag start:
  //   remember the initial shift
  //   move the element position:fixed and a direct child of body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';
    element.style.zIndex = '9999';

    moveAt(clientX, clientY);
  };

  // switch to absolute coordinates at the end, to fix the element in the document
  function finishDrag() {
    if(!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.position = 'absolute';
    dragElement.style.zIndex = '0';

    dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
    dragElement.style.left = parseInt(dragElement.style.left) + pageXOffset + 'px';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
    // new window-relative coordinates
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // check if the new coordinates are below the bottom window edge
    let newBottom = newY + dragElement.offsetHeight; // new bottom

    // below the window? let's scroll the page
    if (newBottom > document.documentElement.clientHeight) {
      // window-relative coordinate of document end
      // seems like the docBottom is going to be the length from viewport's top
      // to the bottom of the document
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // scroll the document down by 10px has a problem
      // it can scroll beyond the end of the document
      // Math.min(how much left to the end, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // calculations are imprecise, there may be rounding errors that lead to scrolling up
      
      // I'm not sure about precision errors but the next line
      // exists only so that the page won't get scrolled by a negative
      // value (thus up) in case docBottom - newBottom is less than 0 
      // that should be impossible, fix that here
      
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // a swift mouse move make put the cursor beyond the document end
      // if that happens -
      // limit the new Y by the maximally possible (right at the bottom of the document)
      // newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight); 
      newY = document.documentElement.clientHeight - dragElement.offsetHeight; 
    }

    // check if the new coordinates are above the top window edge (similar logic)
    if (newY < 0) {
      // scroll up no more than 10
      let scrollY = Math.min(-newY, 10);

      window.scrollBy(0, -scrollY);
      // a swift mouse move can put the cursor beyond the document start
      newY = 0;
    }

    // similar algorithm for x:
    if(newX < 0) {
      let scrollX = Math.min(-newX, 10);
      if(document.documentElement.getBoundingClientRect().left === 0) scrollX  = 0; // TODO
      window.scrollBy(-scrollX, 0);
      newX = 0;
    }
    
    let newRight = newX + dragElement.offsetWidth;
    if (newRight > document.documentElement.clientWidth) {
      // normally we would use getBoundingRect().right but for some
      // reason it doesn't return the entire width of the document
      // so we use good ole scrollWidth instead

      const docRight = document.documentElement.scrollWidth - window.scrollX;
      let scrollX = Math.min(docRight - newRight, 10);
      
      if(scrollX < 0) scrollX = 0;
      window.scrollBy(scrollX, 0);
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + 'px';
    dragElement.style.top = newY + 'px';
  }
});