import Tool from './Tool.js';

export default class extends Tool {
  constructor(data) {
    super(data);
    this.classNameTransformed = data.classNameTransformed;
    this.classNameDefault = data.classNameDefault;
  }

  init() {
    this.events.click = (e) => {
      this.onClick(e);
    };
    this.paint.canvas.addEventListener('transform-squares', (e) => {
      const elements = e.detail;
      let square;
      elements.forEach((element) => {
        square = this.paint.elmsArray[element.y][element.x];
        this.transform(square);
      });
    });
  }

  onClick(e) {
    const elem = e.target;
    if (elem.classList.contains(this.classNameDefault)) {
      this.transform(elem);
      this.genEvent(elem.dataset.i, elem.dataset.y);
    }
  }

  transform(element) {
    const elem = element;
    if (elem.classList.contains(this.classNameTransformed)) {
      elem.classList.remove(this.classNameTransformed);
      elem.dataset.transformed = false;
    } else {
      elem.classList.add(this.classNameTransformed);
      elem.dataset.transformed = true;
    }
  }

  genEvent(x, y) {
    const event = new CustomEvent('transform-at', {
      bubbles: true,
      detail: {
        x,
        y,
      },
    });
    this.paint.canvas.dispatchEvent(event);
  }
}
