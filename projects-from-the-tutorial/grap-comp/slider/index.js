class Slider {
  constructor(elem) {
    this.elem = elem;
  }

  init() {
    this.elem.addEventListener('mousedown', (e) => {
      const target = e.target.closest('.thumb');
      if(target === this.elem.querySelector('.thumb')) {
        this.initDraggable(target, e.clientX);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if(!this.clicked) return;
      if(!this.dragging) {
        const moveX = Math.abs(this.x - e.clientX);
        if(moveX < 3) return;
        this.dragging = true;
      }
      let moveTo = e.clientX - this.shiftX;
      if(moveTo >= this.maxRight) moveTo = this.maxRight;
      if(moveTo <= this.maxLeft) moveTo = this.maxLeft;
  
      this.target.style.left = `${moveTo - this.maxLeft}px`;
    });

    document.addEventListener('mouseup', (e) => {
      if(this.dragging) {
        this.dragging = false;
        this.clicked = false;
      }
    });

    this.elem.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  }

  initDraggable(target, x) {
    const coords = this.elem.getBoundingClientRect();
    this.target = target;
    this.x = x;
    this.shiftX = x - this.target.getBoundingClientRect().left;
    this.maxLeft = coords.left;
    this.maxRight = coords.left + this.elem.offsetWidth - this.target.offsetWidth;
    this.clicked = true;
  }
}