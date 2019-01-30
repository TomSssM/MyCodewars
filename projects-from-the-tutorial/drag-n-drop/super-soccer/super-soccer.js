class DragManager {
  constructor() {

    let dragObject = {};

    const getCoords = function(elem) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    };
  
    const startDrag = function(elem) {
      dragObject.htmlMaxHeight = document.documentElement.scrollHeight;
      dragObject.htmlMaxWidth = document.documentElement.scrollWidth;

      dragObject.htmlHeight = document.documentElement.clientHeight;
      dragObject.htmlWidth = document.documentElement.clientWidth;

      dragObject.maxTop = dragObject.htmlHeight - dragObject.elem.offsetHeight;
      dragObject.maxLeft = dragObject.htmlWidth - dragObject.elem.offsetWidth;

      dragObject.isDragging = true;
      document.body.appendChild(elem);
      elem.style.zIndex = 9999;
      elem.style.position = 'absolute';
    };

    const onMouseDown = function(e) {
      if (e.which != 1) return;
  
      const elem = e.target.closest('.draggable');
      
      if (!elem) return;
  
      dragObject.elem = elem;

      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
    };
  
    const onMouseMove = function(e) {
      if (!dragObject.elem) return;

      if(!dragObject.isDragging) {
        const moveX = e.pageX - dragObject.downX;
        const moveY = e.pageY - dragObject.downY;

        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        } else {
          const coords = getCoords(dragObject.elem);
          dragObject.shiftX = dragObject.downX - coords.left;
          dragObject.shiftY = dragObject.downY - coords.top;
          startDrag(dragObject.elem);
        }
      }

      dragObject.elem.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.elem.style.top = e.pageY - dragObject.shiftY + 'px';

      const coords = dragObject.elem.getBoundingClientRect();

      if(coords.top < 0) {
        if(window.pageYOffset) {
          window.scrollBy(0, coords.top);
        }
        dragObject.elem.style.top = `${window.pageYOffset}px`;
      }

      if(coords.left < 0) {
        if(window.pageXOffset) {
          window.scrollBy(coords.left, 0);
        }
        dragObject.elem.style.left = `${window.pageXOffset}px`;
      }

      if(coords.right > dragObject.htmlWidth) {
        if((window.pageXOffset + dragObject.htmlWidth) < dragObject.htmlMaxWidth) {
          window.scrollBy(coords.right - dragObject.htmlWidth, 0);
        }
        dragObject.elem.style.left = `${dragObject.maxLeft + window.pageXOffset}px`;
      }

      if(coords.bottom > dragObject.htmlHeight) {
        if((window.pageYOffset + dragObject.htmlHeight) < dragObject.htmlMaxHeight) {
          window.scrollBy(0, coords.bottom - dragObject.htmlHeight);
        }
        dragObject.elem.style.top = `${dragObject.maxTop + window.pageYOffset}px`;
      }
    };
  
    const onMouseUp = function() {      
      dragObject = {};
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  }
}

new DragManager();