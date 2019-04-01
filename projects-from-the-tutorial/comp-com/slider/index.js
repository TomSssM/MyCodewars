// the slider should emanate the following events:
// slide, upon slide and change upon mouseup

class Slider {
  constructor(data) {
    this.elem = data.elem;
    this.max = data.max;
    this.thumb = this.elem.querySelector('.thumb');

    const coords = this.elem.getBoundingClientRect();
    this.maxLeft = coords.left;
    this.maxRight = coords.left + this.elem.offsetWidth - this.thumb.offsetWidth;
  }

  init() {
    this.elem.addEventListener('mousedown', (e) => {
      const target = e.target.closest('.thumb');
      if(target === this.thumb) {
        this.initDraggable(e.clientX);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if(!this.clicked) return;
      this.handleDrag(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      if(this.dragging || this.clicked) {
        this.dragging = false;
        this.clicked = false;
        this.dispatchEvent('change');
      }
    });

    this.elem.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  }

  initDraggable(x) {
    this.x = x;
    this.shiftX = x - this.thumb.getBoundingClientRect().left;
    this.clicked = true;
  }

  handleDrag(xCoord) {
    if(!this.dragging) {
      const moveX = Math.abs(this.x - xCoord);
      if(moveX < 3) return;
      this.dragging = true;
    }
    let moveTo = xCoord - this.shiftX;
    if(moveTo >= this.maxRight) moveTo = this.maxRight;
    if(moveTo <= this.maxLeft) moveTo = this.maxLeft;
    
    this.thumb.style.left = `${moveTo - this.maxLeft}px`;
    this.dispatchEvent('slide');
  }

  setValue(percVal) {
    if(percVal > this.max) percVal = this.max;
    let moveReal = Math.floor(percVal * this.runningCourse / this.max);
    this.thumb.style.left = `${moveReal}px`;
  }

  get runningCourse() {
    return this.maxRight - this.maxLeft;
  }

  getRelValue() {
    if(!this.thumb.style.left) this.thumb.style.left = getComputedStyle(this.thumb).left;
    return Math.floor(parseInt(this.thumb.style.left, 10) * this.max / this.runningCourse);
  }

  dispatchEvent(evtType) {
    const evt = new CustomEvent(evtType, {
      bubbles: true,
      detail: this.getRelValue(),
    });
    this.elem.dispatchEvent(evt);
  }
}