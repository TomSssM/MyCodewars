export default class ColorToolbox {
  constructor(data) {
    this.currColorButton = data.currColor;
    this.prevColorButton = data.prevColor;
    this.colorContainer = data.colorContainer;
    this.buttonClassName = data.buttonClassName;
    this.colorCircleClassName = data.colorCircleClass;
    data.colors.forEach((colorCirc) => {
      this.setColor(
        colorCirc,
        this.getColor(colorCirc),
      );
    });
  }

  init() {
    this.currColorButton.addEventListener('click', () => {
      this.handleCurrColor();
    });
    this.prevColorButton.addEventListener('click', () => {
      this.handlePrevColor();
    });
    this.colorContainer.addEventListener('click', (e) => {
      this.handleCont(e.target);
    });

    this.nativeColorPicker = document.createElement('input');
    this.nativeColorPicker.type = 'color';
    this.nativeColorPicker.addEventListener('change', (e) => {
      this.currentColor = e.currentTarget.value;
    });
  }

  handleCurrColor() {
    this.nativeColorPicker.click();
  }

  handlePrevColor() {
    this.currentColor = this.getColor(this.prevColorButton);
  }

  handleCont(eventTarget) {
    const target = eventTarget.closest(this.buttonClassName);
    if (target && target.dataset.suggColors) {
      const color = this.getColor(target);
      if (this.currentColor === color) return;
      this.currentColor = color;
    }
  }

  set currentColor(color) {
    if (this.currentColor === color) return;
    this.setColor(
      this.prevColorButton,
      this.currentColor,
    );
    this.setColor(
      this.currColorButton,
      color,
    );
  }

  get currentColor() {
    return this.getColor(this.currColorButton);
  }

  setColor(element, color) {
    let elm = element;
    if (!elm.dataset.color) elm = this.getCircle(elm);
    if (!elm) return;
    if (color === null) {
      elm.dataset.color = 'null';
      elm.style.backgroundColor = '';
    } else {
      elm.dataset.color = color;
      elm.style.backgroundColor = color;
    }
  }

  getColor(element) {
    let elm = element;
    if (!elm.dataset.color) elm = this.getCircle(elm);
    if (!elm) return null;
    return elm.dataset.color;
  }

  getCircle(elem) {
    return elem.querySelector(this.colorCircleClassName);
  }

  static getLightness(color) {
    const colors = ColorToolbox.splitColor(color).map(rgbVal => rgbVal / 255);
    const max = Math.max(...colors);
    const min = Math.min(...colors);
    return Math.floor((max + min) / 2 * 100);
  }

  static splitColor(color) {
    const colorVal = color.slice(1);
    const red = parseInt(colorVal.slice(0, 2), 16);
    const green = parseInt(colorVal.slice(2, 4), 16);
    const blue = parseInt(colorVal.slice(4), 16);
    return [red, green, blue];
  }

  static darkenColor(color, val = 40) {
    const colors = ColorToolbox.splitColor(color);
    colors[0] = Math.max(colors[0] - val, 0);
    colors[1] = Math.max(colors[1] - val, 0);
    colors[2] = Math.max(colors[2] - val, 0);
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
  }

  static lightenColor(color, val = 40) {
    const colors = ColorToolbox.splitColor(color);
    colors[0] = Math.min(colors[0] + val, 255);
    colors[1] = Math.min(colors[1] + val, 255);
    colors[2] = Math.min(colors[2] + val, 255);
    return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
  }
}
