'use strict';
class HoverIntent {
  constructor({
    sensitivity = 0.1, // speed less than 0.1px/ms means "hovering over an element"
    interval = 100, // measure mouse speed once per 100ms: calculate the distance between previous and next points
    elem,
    over,
    out
  }) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // make sure "this" is the object in event handlers.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // assign the handlers
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);
    elem.addEventListener("mousemove", this.onMouseMove);

    this.data = {
      x: 0,
      prev: 0,
    };

    this.fun;
    this.isExecuting = false;
  }

  onMouseOver() { // from here on
    if(this.isExecuting) return;

    this.isExecuting = true;

    if(!tooltip.hidden) return;

    // we are going to use arrow function as a callback for setInterval
    // to preserve this ( otherwise setInterval redefines it into Window )
    this.fun = setInterval(() => {
      const speed = Math.abs(this.data.x - this.data.prev) / this.interval;
      if(speed < this.sensitivity) {
        this.over();
        this.destroy();
      }

      this.data.prev = this.data.x;
    }, this.interval);
  }

  onMouseOut(event) {
    if(event.relatedTarget.contains(this.elem.parentElement)) {
      this.destroy();
      this.out();
    }
  }

  onMouseMove(event) {
    this.data.x = event.pageX;
  }

  destroy() {
    clearInterval(this.fun);
    this.isExecuting = false;
  }
}