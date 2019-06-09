import Tool from './Tool.js';

export default class extends Tool {
  init() {
    this.isDrawing = false;
    this.events.mousedown = (e) => {
      this.onMouseDown(e);
    };
    this.events.mouseup = () => {
      this.onMouseUp();
    };
    this.events.mouseleave = () => {
      this.onMouseout();
    };
    this.events.mousemove = (e) => {
      this.onMouseMove(e);
    };
    this.events.dragstart = (e) => {
      e.preventDefault();
    };
  }

  onMouseDown(e) {
    this.isDrawing = true;
    this.startPainting();
    this.drawColor = this.paint.currentColor;
    this.colorElm(e.target);
  }

  onMouseMove(e) {
    if (!this.isDrawing) return;
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (target === this.currElm) return;
    this.colorElm(target);
  }

  onMouseUp() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.stopPainting();
  }

  onMouseout() {
    this.onMouseUp();
  }

  colorElm(elem) {
    if (elem === this.paint.canvas) return;
    this.currElm = elem;
    this.paint.setColor(
      this.currElm,
      this.drawColor,
    );
    this.changeElementAt(elem.dataset.i, elem.dataset.y);
  }
}
