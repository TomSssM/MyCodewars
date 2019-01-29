const ball = document.querySelector('#ball');

ball.onmousedown = function(event) {
  // (1)
  // correct positioning:
  const shiftX = event.clientX - ball.getBoundingClientRect().left;
  const shiftY = event.clientY - ball.getBoundingClientRect().top;

  // get the ball outside:
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  // position it under the cursor
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }
  moveAt(event.pageX, event.pageY);

  // (2)
  // use the same moveAt function to
  // move the ball along with the cursor
  // see the Docs for why we add event handler to document
  // and not to ball
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener('mousemove', onMouseMove);

  // on drop (mouseup) it's better to clear event hadnlers
  // for mousemove and mouseup
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};

// making sure that the native dragstart event
// doesn't cause fanky behavior
ball.ondragstart = function() {
  return false;
};