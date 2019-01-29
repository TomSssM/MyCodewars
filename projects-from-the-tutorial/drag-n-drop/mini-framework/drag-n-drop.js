class DragManager {
  constructor(onDragEnd, onDragCancel) {
    let dragObject = {};

    // let's define helper functions first
    // do check out these last if you are trying to
    // either learn or how this mini-framework works
    // underneath the hood

    const getCoords = function(elem) {
      const box = elem.getBoundingClientRect();
    
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    };

    const createAvatar = function() {
      // in our case we choose to move the original element
      // we could also make a copy of (clone) the original element instead
      const avatar = dragObject.elem;

      // let's memorize the original element's properties so the
      // avatar can fall back on them (when we do onDragCancel)
      const old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.style.position,
        left: avatar.style.left,
        top: avatar.style.top,
        zIndex: avatar.style.zIndex,
      };
  
      // here is the function that will
      // default all of avatar's currrent properties to those
      // of the original element (in case of onDragCancel)
      avatar.rollback = function() {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
      };
  
      return avatar;
    };

    const findDroppable = function(event) {
      // it's the default function for finding droppables
      // don't forget t ouse viewport relative coordinates
      // for elementFromPoint

      dragObject.avatar.hidden = true;

      const elem = document.elementFromPoint(event.clientX, event.clientY);

      dragObject.avatar.hidden = false;
  
      if (elem == null) {
        // if the cursor is outside the browser window
        return null;
      }
  
      return elem.closest('.droppable');
    };

    const finishDrag = (event) => {
      const dropElem = findDroppable(event);

      // if we released the mouse button over a droppable:
      // success (do dragEnd); otherwise cancel the
      // side effects of dragging  
      if (!dropElem) {
        this.onDragCancel(dragObject);
      } else {
        this.onDragEnd(dragObject, dropElem);
      }
    };
  
    const startDrag = function() {
      const avatar = dragObject.avatar;
      // recall that the element (in our case avatar) will be suitable
      // for dragging only if it's the child of body and absolutely positioned

      document.body.appendChild(avatar);
      avatar.style.zIndex = 9999;
      avatar.style.position = 'absolute';
    };

    // here come the onMouseDown, onMouseUp and onMouseMove functions

    const onMouseDown = function(e) {
      // the wrong mouse button was pressed
      if (e.which != 1) return;
  
      const elem = e.target.closest('.draggable');
      // we clicked on not a draggable obj
      if (!elem) return;
  
      dragObject.elem = elem;
  
      // memorize the coordinates (pageX/Y) where the draggable was clicked
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;

      // yet another way to cancel default drag-n-drop events
      // see over why it's futile in our case
      // return false;
      // also do note that return false in either mousedown or mousemove (only one nit both)
      // seems to suffice for canceling default dragstart
    };
  
    const onMouseMove = function(e) {
      // the mousemove event is going to be document wide
      // the following line checks if the draggable was clicked on
      if (!dragObject.elem) return;
  
      // if the dragging proccess hasn't beem started yet...
      if (!dragObject.avatar) {
        const moveX = e.pageX - dragObject.downX;
        const moveY = e.pageY - dragObject.downY;
  
        // if the mouse was clicked but didn't move 
        // far enough in a pressed-on state (no farther than 3px)
        // (for instance if a user's hand shivers)
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }
  
        // all right let's start the dragging process
        dragObject.avatar = createAvatar(e);

        // if avatar failed to initialize... (see the createAvatar function for why)

        if (!dragObject.avatar) {
          dragObject = {};
          return;
        }
  
        // let's create the famous shiftX / Y (document relative)
        const coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;
  
        // the draggable jumps out into the body...
        startDrag(e);
      }
  
      // the rest is the commands of the default mousemove function
      dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

      // yet another way to cancel default drag-n-drop events
      // return false;
      // however do note that it's going to fail as we add all these event handlers via addEventlistener
      // at the end of the class; because of addEventListener and not on* the browser doesn't considers our
      // mouse event to be an additional one ( not the only possible mousedown or mousemove event ) and 
      // in addition fires up another mousemove or mousedown event which does trigger
      // the dragstart event and then the mess happens :)
    };
  
    const onMouseUp = function(e) {
      // if the dragging process is still going on
      if (dragObject.avatar) {
        finishDrag(e);
      }
  
      // if the dragging process either didn't start or didn't end
      // do clear dragObj
      dragObject = {};
    };

    // assigning event hanlers like in the comments would allow us to use
    // return false in mousedown / mousemove event handlers to cancel dragStart

    // document.onmousemove = onMouseMove;
    document.addEventListener('mousemove', onMouseMove);

    // document.onmouseup = onMouseUp;
    document.addEventListener('mouseup', onMouseUp);

    // document.onmousedown = onMouseDown;
    document.addEventListener('mousedown', onMouseDown);

    // because we used addEventListener for our mouseEvents we need
    // to explicitly cancel the default dragstart
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  
    this.onDragEnd = onDragEnd;
    this.onDragCancel = onDragCancel;
  }
}