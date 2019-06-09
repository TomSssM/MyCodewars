import Tool from './Tool.js';

export default class extends Tool {
  init() {
    this.isErasing = false;
    this.events.mousedown = (e) => {
      this.onMouseDown(e);
    };
    this.events.mousemove = (e) => {
      this.onMouseMove(e);
    };
    this.events.mouseup = () => {
      this.onMouseUp();
    };
    this.events.mouseleave = () => {
      this.onMouseUp();
    };
    this.events.dragstart = (e) => {
      e.preventDefault();
    };
  }

  onMouseDown(e) {
    this.isErasing = true;
    this.startPainting();
    const elm = e.target;
    this.erase(elm);
  }

  onMouseMove(e) {
    if (!this.isErasing) return;
    const elm = document.elementFromPoint(e.clientX, e.clientY);
    this.erase(elm);
  }

  onMouseUp() {
    if (!this.isErasing) return;
    this.isErasing = false;
    this.stopPainting();
  }

  erase(elm) {
    if (elm === this.paint.canvas) return;
    this.changeElementAt(elm.dataset.i, elm.dataset.y);
    this.paint.setColor(elm, null);
  }
}
