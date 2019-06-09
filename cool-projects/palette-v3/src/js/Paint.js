export default class Paint {
  constructor(data) {
    this.colorToolbox = data.colorToolbox;
    this.canvas = data.canvas;
    this.currentTool = null;
    window.onbeforeunload = () => false;
  }

  setColor(elm, color) {
    this.colorToolbox.setColor(elm, color);
  }

  getColor(elm) {
    return this.colorToolbox.getColor(elm);
  }

  get currentColor() {
    return this.colorToolbox.currentColor;
  }

  set currentColor(color) {
    this.colorToolbox.currentColor = color;
  }

  setCurrentTool(tool) {
    if (this.currentTool) return;
    const changeToolEvent = new CustomEvent('change-tool', {
      bubbles: true,
      detail: {
        tool,
      },
    });
    this.canvas.dispatchEvent(changeToolEvent);
    this.currentTool = tool;
    this.currentTool.start();
  }

  removeCurrentTool() {
    if (this.currentTool) this.currentTool.stop();
    this.currentTool = null;
  }

  replaceCurrentTool(tool) {
    if (this.currentTool === tool) return;
    this.removeCurrentTool();
    this.setCurrentTool(tool);
  }

  createCanvas(elmsInRow) {
    if (this.elmsArray) this.deleteCanvas();
    this.elmsInRow = elmsInRow;
    this.elmsArray = [];
    let elmCount = elmsInRow ** 2;
    this.canvas.style.gridTemplateColumns = `repeat(${elmsInRow}, 1fr)`;

    let elm;
    let i = 0;
    let y = 0;
    while (elmCount) {
      if (!this.elmsArray[y]) this.elmsArray[y] = [];
      elm = Paint.createElem();
      elm.dataset.i = i;
      elm.dataset.y = y;
      this.elmsArray[y][i] = elm;
      this.canvas.append(elm);
      i += 1;
      elmCount -= 1;
      if (i === elmsInRow) {
        i = 0;
        y += 1;
      }
    }
    this.genEvt('recreate-frames');
  }

  deleteCanvas() {
    while (this.canvas.children.length) {
      this.canvas.lastChild.remove();
    }
  }

  replaceCanvas(elmsInRow) {
    this.deleteCanvas();
    this.createCanvas(elmsInRow);
  }

  static createElem() {
    const elem = document.createElement('div');
    elem.classList.add('canvas__elem');
    elem.dataset.color = null;
    elem.dataset.transformed = false;
    return elem;
  }

  get SIZE() {
    if (!this.canvas.firstChild) return null;
    return this.canvas.firstChild.offsetWidth;
  }

  genEvt(name, detail) {
    const event = new CustomEvent(name, {
      bubbles: true,
      detail,
    });
    this.canvas.dispatchEvent(event);
  }
}
