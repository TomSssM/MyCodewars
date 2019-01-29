const ball = document.querySelector('#ball');

ball.onmousedown = function(event) {
  const shiftX = event.clientX - ball.getBoundingClientRect().left;
  const shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  const moveAt = function(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }
  moveAt(event.pageX, event.pageY);

  let currentDroppable = null; // potential droppable that we're flying over right now

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  
    ball.hidden = true;

    // we should use e.clientX / Y ( relative to the viewport ) as the elementFromPoint
    // function works with viewport relative coordinates
    // let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    // upgraded elemBelow:
    const elemBelow = document.elementFromPoint((event.clientX - shiftX), (event.clientY - shiftY));
    ball.hidden = false;
    
    // mousemove events may trigger out of the window (when the ball is dragged off-screen)
    // if clientX/clientY are out of the window, then elementfromPoint returns null
    if (!elemBelow) return;
  
    // potential droppables are labeled with the class "droppable" (can be other logic)
    let droppableBelow = elemBelow.closest('.droppable');
  
    if (currentDroppable != droppableBelow) { // if there are any changes
      // we're flying in or out...
      // note: both values can be null
      // currentDroppable=null if we were not over a droppable (e.g over an empty space)
      // droppableBelow=null if we're not over a droppable now, during this event
  
      if (currentDroppable) {
        // the logic to process "flying out" of the droppable (remove highlight)
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        // the logic to process "flying in" of the droppable
        enterDroppable(currentDroppable);
      }
    }
  }
  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};

ball.ondragstart = function(e) {
  e.preventDefault();
};

const enterDroppable = function(elem) {
  elem.style.background = 'yellow';
};

const leaveDroppable = function(elem) {
  elem.style.background = '';
};