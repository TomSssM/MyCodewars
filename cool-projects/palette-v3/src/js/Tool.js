export default class Tool {
  constructor(data) {
    this.paint = data.paint;
    this.classNameCanvas = data.classNameCanvas;
    this.button = data.button;
    this.classNameButton = data.classNameButton;
    this.events = {};
    this.changedSquares = null;

    this.button.addEventListener('click', () => {
      this.paint.replaceCurrentTool(this);
    });
  }

  start() {
    this.button.classList.add(this.classNameButton);
    this.paint.canvas.classList.add(this.classNameCanvas);
    const keys = Object.keys(this.events);
    keys.forEach((key) => {
      this.paint.canvas.addEventListener(key, this.events[key]);
    });
  }

  stop() {
    this.button.classList.remove(this.classNameButton);
    this.paint.canvas.classList.remove(this.classNameCanvas);
    const keys = Object.keys(this.events);
    keys.forEach((key) => {
      this.paint.canvas.removeEventListener(key, this.events[key]);
    });
  }

  genEvent(type = 'update-active-frame', detail) {
    const event = new CustomEvent(type, {
      bubbles: true,
      detail,
    });
    this.paint.canvas.dispatchEvent(event);
  }

  startPainting() {
    this.changedSquares = [];
  }

  changeElementAt(x, y) {
    this.changedSquares.push({
      x,
      y,
    });
  }

  stopPainting() {
    this.genEvent('update-active-frame', this.changedSquares);
    this.changedSquares = null;
  }
}
