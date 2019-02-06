class DragManager {
  constructor() {
    this.makeDivs = this.makeDivs.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.colors = ['yellow', 'orange', 'brown', 'aqua'];
    this.dragData = {};

    const create = document.querySelector('#create');
    create.addEventListener('click', this.makeDivs);
  }

  makeDivs(e) {
    e.currentTarget.remove();

    for(let i = 0; i < 10; i++) {
      const div = document.createElement('div');
      div.style.height = '300px';
      div.style.backgroundColor = this.colors[this.getRndInteger(0, this.colors.length)];
      document.body.append(div);
    }
  
    const dude = document.querySelector('#dude');

    dude.style.display = 'block';
    dude.style.top = `${document.documentElement.clientHeight / 2  - dude.offsetHeight / 2}px`;
    dude.style.left = `${document.documentElement.clientWidth / 2  - dude.offsetWidth / 2}px`;
    dude.addEventListener('mousedown', this.mouseDown);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  mouseDown(e) {
    document.addEventListener('dragstart', (e) => e.preventDefault());

    this.dragData.elem = e.currentTarget;

    const coords = this.dragData.elem.getBoundingClientRect();

    this.dragData.shiftX = e.clientX - coords.left;
    this.dragData.shiftY = e.clientY - coords.top;
  
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  mouseMove(e) {
    let left = e.clientX - this.dragData.shiftX;
    let top = e.clientY - this.dragData.shiftY;

    this.dragData.elem.style.left = `${left}px`;
    this.dragData.elem.style.top = `${top}px`;

    // going outside upper edge
    if(top < 0) {
      this.dragData.elem.style.top = `0px`;
      // scroll up
      this.scrollIt(-4);
    }

    const bottom = this.dragData.elem.getBoundingClientRect().bottom;

    // going beyond lower edge
    if(bottom > document.documentElement.clientHeight) {
      const maxTop = document.documentElement.clientHeight - this.dragData.elem.offsetHeight;
      this.dragData.elem.style.top = `${maxTop}px`;
      // scroll down
      this.scrollIt(4);
    }
  }

  mouseUp() {
    this.dragData = {};
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }

  scrollIt(val) {
    // page can be scrolled no more than maxY
    const maxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const clearInt = () => {
      clearInterval(intOne);
      clearInterval(intTwo);
    };

    // the function that is going to scroll the page
    const intOne = setInterval(() => window.scrollBy(0, val), 30);

    // the function that is going to check if we should stop scrolling the page
    const intTwo = setInterval(() => {
      // if we released the button and cleared dragData object during scroll
      if(!this.dragData.elem) {
        clearInt();
        return;
      }

      const coords = this.dragData.elem.getBoundingClientRect();

      // if we are scrolling up and we can't scroll any more
      // or if we are scrolling up and the draggable has been moved away from the upper edge
      if((val < 0 && !window.pageYOffset) || (val < 0 && coords.top > 0)) {
        clearInt();
        return;
      }

      // if we are scrolling down and we can't scroll any more
      // or if we are scrolling down and the draggable has been moved away from the lower edge
      if((val >= 0 && window.pageYOffset >= maxY) || (val >= 0 && coords.bottom < document.documentElement.clientHeight)) {
        clearInt();
        return;
      }
    }, 30);
  }
}

new DragManager();