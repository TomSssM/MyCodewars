export default class ClearCanvasButton {
  constructor(data) {
    this.paint = data.paint;
    this.button = data.button;
  }

  handleClick() {
    this.paint.createCanvas(this.paint.elmsArray.length);
  }
}
