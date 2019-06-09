export default class HoverManager {
  constructor(data) {
    this.colorToolbox = data.colorToolbox;
    this.paint = data.paint;
    this.brush = data.brush;
    this.toolEnabled = false;
    this.currentElement = null;
    this.defaultColor = '#00000025';
  }

  init() {
    this.paint.canvas.addEventListener('mousedown', () => {
      this.onMouseDown();
    });
    this.paint.canvas.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });
    this.paint.canvas.addEventListener('mouseup', (e) => {
      this.onMouseUp(e);
    });
    this.paint.canvas.addEventListener('mouseleave', (e) => {
      this.onMouseUp(e);
    });
  }

  onMouseDown() {
    this.toolEnabled = true;
    this.blurCurrent();
  }

  onMouseUp(e) {
    const { target } = e;
    this.toolEnabled = false;
    this.highlightTarget(target);
  }

  onMouseMove(event) {
    if (this.toolEnabled) return;
    this.highlightTarget(event.target);
  }

  highlightTarget(target) {
    this.blurCurrent();
    if (!target.classList.contains('canvas__elem')) return;
    if (target === this.currentElement) return;
    this.currentElement = target;
    this.highlightCurrent();
  }

  highlightCurrent() {
    if (!this.currentElement) return;
    const originalColor = this.currentElement.dataset.color;
    if (originalColor === 'null') {
      this.currentElement.style.backgroundColor = this.defaultColor;
      return;
    }
    const lightness = this.colorToolbox.constructor.getLightness(originalColor);
    let color;
    if (lightness > 50) {
      color = this.colorToolbox.constructor.darkenColor(originalColor);
    } else {
      color = this.colorToolbox.constructor.lightenColor(originalColor);
    }
    this.currentElement.style.backgroundColor = color;
  }

  blurCurrent() {
    if (!this.currentElement) return;
    const originalColor = this.currentElement.dataset.color;
    this.currentElement.style.backgroundColor = originalColor === 'null' ? '' : originalColor;
    this.currentElement = null;
  }
}
