document.addEventListener('mousedown', function(e) {
  const target = e.target.closest('.draggable');

  if(!target) return;

  const coords = target.parentElement.getBoundingClientRect();

  let dragData = {
    elem: target,
    shiftX: e.clientX - target.getBoundingClientRect().left,
    clickX: e.clientX,
    maxRight: coords.left + target.parentElement.offsetWidth - target.offsetWidth,
    maxLeft: coords.left,
    dragging: false,
  };

  const onMouseMove = function(e) {
    if(!dragData.dragging) {
      const moveX = Math.abs(dragData.clickX - e.clientX);
      if(moveX < 3) return;
      dragData.dragging = true;
    }

    let moveTo = e.clientX - dragData.shiftX;
    if(moveTo >= dragData.maxRight) moveTo = dragData.maxRight;
    if(moveTo <= dragData.maxLeft) moveTo = dragData.maxLeft;

    dragData.elem.style.left = `${moveTo - dragData.maxLeft}px`;
  };
  
  const onMouseUp = function() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    dragData = {};
  };

  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });
});