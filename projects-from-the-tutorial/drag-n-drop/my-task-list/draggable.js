class DragManager {
  constructor() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  }
  
  onMouseDown(e) {
    const target = e.target.closest('.draggable');
    if(!target) return;

    if(this.dragData && this.dragData.droppable) this.dragData.droppable.style.transition = '';

    this.dragData = {};

    this.dragData.elem = target;
    this.dragData.droppable = null;

    this.dragData.mouseX = e.clientX;
    this.dragData.mouseY = e.clientY;
    this.dragData.isDragging = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    const currX = e.clientX;
    const currY = e.clientY;
    if(!this.dragData.isDragging) {

      // if(Math.abs(this.dragData.mouseX - currX) < 3 || Math.abs(this.dragData.mouseY - currY) < 3) return;

      this.startDrag();
      this.checkDrop(currX, currY);
    }

    this.moveAt(currX, currY);
    this.checkDrop(currX, currY);
  }

  onMouseUp() {
    if(this.dragData.isDragging) this.appendDraggable();

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  startDrag() {
    this.dragData.isDragging = true;

    const coords = this.dragData.elem.getBoundingClientRect();

    this.dragData.shiftX = this.dragData.mouseX - coords.left;
    this.dragData.shiftY = this.dragData.mouseY - coords.top;
    
    this.dragData.nextSib = this.dragData.elem.nextElementSibling || null;
    this.dragData.previousSib = this.dragData.elem.previousElementSibling || null;
    
    const width = this.dragData.elem.offsetWidth;
    const height = this.dragData.elem.offsetHeight;
    
    this.dragData.paddingTop = `${height}px`;

    document.body.append(this.dragData.elem);

    this.dragData.elem.style.width = `${width}px`;
    this.dragData.elem.style.height = `${height}px`;

    this.dragData.elem.classList.add('dragging');
  }

  moveAt(x, y) {
    this.dragData.elem.style.left = `${x - this.dragData.shiftX}px`;
    this.dragData.elem.style.top = `${y - this.dragData.shiftY}px`;
  }

  checkDrop(x, y) {
    this.dragData.elem.style.display = 'none';

    let drop = document.elementFromPoint(x, y);

    this.dragData.elem.style.display = 'block';

    if(drop) {
      drop = drop.closest('.draggable');
    }

    if(this.dragData.droppable === drop) {
      return;
    } else {
      if(this.dragData.droppable) this.deselect(this.dragData.droppable);
      // Array.from(document.querySelectorAll('.over')).forEach(elem => elem.classList.remove('over')); 

      this.dragData.droppable = drop;

      if(this.dragData.droppable) this.select(this.dragData.droppable);
    }
  }

  appendDraggable() {
    if(!this.dragData.droppable) {
      if(this.dragData.nextSib) {
        this.dragData.nextSib.before(this.dragData.elem);
      } else {
        this.dragData.previousSib.after(this.dragData.elem);
      }
    } else {
      const droppable = this.dragData.droppable;

      droppable.style.transition = '0s';
      droppable.before(this.dragData.elem);
      this.deselect(droppable);
    }

    this.dragData.elem.classList.remove('dragging');
    this.dragData.elem.style = '';
  }

  select(elem) {
    elem.style.paddingTop = this.dragData.paddingTop;
  }

  deselect(elem) {
    elem.style.paddingTop = '';
  }
}

new DragManager();